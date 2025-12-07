export type ArticleType = "wiki" | "news" | "blog";

export type ArticleMetadata = {
    title: string;
    description: string;
    author: string;
    image: string;
    layout: string;
    type: ArticleType;
    date: number;
    tags: string[];
};

export class ArticleMetadataUtil {
    static parseArticleTypeFromBackend(input: number): ArticleType {
        switch (input) {
            case 1:
            default:
                return "wiki";
            case 2:
                return "news";
            case 3:
                return "blog";
        }
    }
}
