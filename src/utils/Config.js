export default class Config {
    static siteName = "Porter Wiki";

    // Backend
    static backendURL = "https://backend.porter.wiki";
    // static backendURL = "http://localhost:1984";

    // CDN
    static cdnURL = "https://cdn.porter.wiki";

    // Auth
    // TODO: REPLACE THIS
    static Discord = {
        ClientID: "1290974200126771263",
    };
    static GitHub = {
        ClientID: "",
    };

    static ArticleTypes = {
        Article: 1,
        News: 2,
        Community: 3,
    };
}
