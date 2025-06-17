import { RootState } from "@app/store";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getImageUrl } from "@utils/getImage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Article, ArticleEntity } from "types/news";

dayjs.extend(utc);

const articlesAdapter = createEntityAdapter<ArticleEntity>({
  sortComparer: (a, b) =>
    new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime(),
});

interface NewsState extends ReturnType<typeof articlesAdapter.getInitialState> {
  /**Ключ дата - массив айди статей этого дня */
  idsByDate: Record<string, string[]>;
  /**Список дней, уже загруженных (в порядке вывода) */
  datesLoaded: string[];
  monthsLoaded: Record<string, true>;
  status: "idle" | "loading" | "failed";
}

const initialState: NewsState = {
  ...articlesAdapter.getInitialState(),
  idsByDate: {},
  datesLoaded: [],
  monthsLoaded: {},
  status: "idle",
};

export const fetchNewsMonth = createAsyncThunk<
  ArticleEntity[],
  string,
  { rejectValue: "not_found" | "http_error" }
>(
  "news/fetchNewsMonth",
  async (anyDate, { rejectWithValue }) => {
    const d = dayjs(anyDate);
    const url = `/api/nyt/archive/${d.year()}/${d.month() + 1}`;

    const res = await fetch(url);

    if (!res.ok) return rejectWithValue("http_error");

    const isJson = res.headers
      .get("content-type")
      ?.includes("application/json");

    if (!isJson) return rejectWithValue("not_found");

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      return rejectWithValue("not_found");
    }

    const docs = (data as any).response?.docs as Article[] | undefined;
    if (!docs || docs.length === 0) return rejectWithValue("not_found");

    return docs.map((doc) => ({
      ...doc,
      id: doc.web_url,
      image: getImageUrl(doc.multimedia),
    }));
  },
  {
    condition: (date, { getState }) => {
      const { news } = getState() as RootState;
      return !news.monthsLoaded[date.slice(0, 7)];
    },
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    reset(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsMonth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewsMonth.fulfilled, (state, { payload: items }) => {
        articlesAdapter.upsertMany(state, items);

        const newDays = new Set<string>();

        items.forEach((it) => {
          const dayKey = dayjs(it.pub_date).local().format("YYYY-MM-DD");
          newDays.add(dayKey);

          state.idsByDate[dayKey] ??= [];
          if (!state.idsByDate[dayKey].includes(it.id)) {
            state.idsByDate[dayKey].push(it.id);
          }
        });

        newDays.forEach((day) => {
          state.idsByDate[day].sort(
            (a, b) =>
              new Date(state.entities[b]!.pub_date).getTime() -
              new Date(state.entities[a]!.pub_date).getTime()
          );
        });

        state.datesLoaded = Array.from(
          new Set([...state.datesLoaded, ...newDays])
        ).sort((a, b) => dayjs(b).valueOf() - dayjs(a).valueOf());

        const monthKey = items[0].pub_date.slice(0, 7);
        state.monthsLoaded[monthKey] = true;

        state.status = "idle";
      })
      .addCase(fetchNewsMonth.rejected, (state, { payload, meta }) => {
        state.monthsLoaded[meta.arg.slice(0, 7)] = true;
        if (payload === "not_found") {
          state.status = "idle";
          return;
        }
        state.status = "failed";
      });
  },
});

export const { reset } = newsSlice.actions;
export default newsSlice.reducer;

export const {
  selectById: selectArticleById,
  selectEntities: selectArticleEntities,
  selectAll: selectAllArticles,
} = articlesAdapter.getSelectors<RootState>((s) => s.news);
