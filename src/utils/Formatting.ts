export default class Formatting {
    static formatDate(
        secs: number,
        dateOptions: Intl.DateTimeFormatOptions = {}
    ): string {
        const defaultDateOptions: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "long",
            year: "numeric",
        };
        dateOptions = { ...defaultDateOptions, ...dateOptions }; // Merge options
        if (isNaN(secs)) {
            try {
                secs = new Date(secs).getTime() / 1000;
            } catch {
                return "Invalid Date";
            }
        }

        return new Date(secs * 1000).toLocaleDateString("en-US", dateOptions);
    }

    static formatDateTime(
        secs: number,
        dateTimeOptions: Intl.DateTimeFormatOptions = {}
    ): string {
        const defaultDateTimeOptions: Intl.DateTimeFormatOptions = {
            hourCycle: "h24",
        };
        dateTimeOptions = { ...defaultDateTimeOptions, ...dateTimeOptions }; // Merge options
        try {
            return new Date(secs * 1000).toLocaleString(
                "en-US",
                dateTimeOptions
            );
        } catch {
            return "Invalid Date";
        }
    }

    static convertHumanFromStamp(secs: number): string {
        let months = Math.floor(secs / 2592000);
        let days = Math.floor(secs / 86400);
        let hours = Math.floor(secs / 3600);
        let minutes = Math.floor(secs / 60);
        let seconds = Math.floor(secs % 60);

        if (months > 0) return `${months} month${months > 1 ? "s" : ""}`;
        if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
        if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""}`;
        if (seconds >= 30) return `${seconds} second${seconds > 1 ? "s" : ""}`;
        return "just now";
    }
}
