import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  useMemo,
} from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { fetchNewsMonth } from "@features/newsSlice";
import dayjs from "dayjs";
import ArticleItem from "./ArticleItem";
import useInfiniteScroll from "@hooks/useInfiniteScroll";
import Typography from "./ui/Typography";

const NewsList = () => {
  const [visibleDays, setVisibleDays] = useState(1);
  const monthCursor = useRef(dayjs().startOf("month"));
  const dispatch = useAppDispatch();
  const { idsByDate, datesLoaded, status } = useAppSelector((s) => s.news);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadMonth = useCallback(
    (d: dayjs.Dayjs) => {
      dispatch(fetchNewsMonth(d.format("YYYY-MM-DD")));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!datesLoaded.length) loadMonth(monthCursor.current);
  }, [datesLoaded.length, loadMonth]);

  const revealNext = useCallback(() => {
    if (visibleDays < datesLoaded.length) {
      setVisibleDays((v) => v + 1);
      return;
    }

    monthCursor.current = monthCursor.current.subtract(1, "month");
    loadMonth(monthCursor.current);
  }, [visibleDays, datesLoaded.length, status, loadMonth]);

  useInfiniteScroll(sentinelRef, revealNext, status === "idle");
  const daysToShow = useMemo(
    () => datesLoaded.slice(0, visibleDays),
    [datesLoaded, visibleDays]
  );

  return (
    <div className="p-4 max-w-2xl mx-auto ">
      {daysToShow.map((date) => (
        <section key={date} className="gap-4">
          <Typography className="text-[18px] font-bold sticky top-0 bg-white py-4">
            News for {dayjs(date).format("DD MMMM YYYY")}
          </Typography>

          {idsByDate[date]?.map((id) => (
            <ArticleItem key={id} id={id} />
          ))}
        </section>
      ))}

      {status === "loading" && <p className="text-center py-4">Загрузка...</p>}
      <div ref={sentinelRef} className="h-8"></div>
    </div>
  );
};

export default NewsList;
