import React from "react";
import { ArticleEntity } from "types/news";
import Typography from "./ui/Typography";
import dayjs from "dayjs";
import Link from "./ui/Link";

interface NewsBlockProps {
  article: ArticleEntity;
}

const NewsBlock = ({ article }: NewsBlockProps) => {
  return (
    <div className="flex flex-row gap-4 h-44 items-center border-b-1 border-gray-200">
      <div className="shrink-0 w-[100px] h-[80px] overflow-hidden rounded">
        <img
          src={article.image}
          alt={"preview"}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Link className="text-[16px] font-bold" href={article.web_url}>
          CNN
        </Link>
        <Typography
          className="text-[16px] overflow-hidden text-ellipsis
          [display:-webkit-box] [-webkit-line-clamp:4] [-webkit-box-orient:vertical]"
        >
          {article.snippet}
        </Typography>
        <Typography className="text-[16px] text-gray-500">
          {dayjs(article.pub_date).format("MMM D, YYYY, HH:mm")}
        </Typography>
      </div>
    </div>
  );
};

export default NewsBlock;
