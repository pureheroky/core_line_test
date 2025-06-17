interface Article {
  web_url: string;
  snippet: string;
  pub_date: string;
  multimedia: Multimedia[];
}

interface Multimedia {
  url: string;
}

export interface ArticleEntity extends Article {
  id: string;
  image: string;
}
