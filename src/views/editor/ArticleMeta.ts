export type ArticleMetaType = "wiki" | "news" | "blog";

export type ArticleMeta = {
    title: string;
    type: ArticleMetaType;
    date: number;
    description: string;
    tags: string[];
};
