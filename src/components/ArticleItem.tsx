import React from "react";
import { useAppSelector } from "@hooks/redux";
import { selectArticleById } from "@features/newsSlice";
import NewsBlock from "./NewsBlock";

interface ArticleItemProps {
  id: string;
}

const ArticleItem = React.memo(({ id }: ArticleItemProps) => {
  const article = useAppSelector((s) => selectArticleById(s, id));
  return article ? <NewsBlock article={article} /> : null;
});

export default ArticleItem;
