export default class Config {
    static siteName = "Camellia Wiki";

    // Backend
    static backendURL = "https://backend.camellia.wiki";
    // static backendURL = "http://localhost:1984";

    // CDN
    static cdnURL = "https://cdn.camellia.wiki";

    // Auth
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
