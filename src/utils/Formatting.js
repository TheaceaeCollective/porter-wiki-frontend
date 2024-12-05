export default class Formatting {
  static formatDate(secs, dateOptions = {}) {
	let defaultDateOptions = {day: '2-digit', month: 'long', year: 'numeric'};
	dateOptions = { ...defaultDateOptions, ...dateOptions }; // Merge options
    if (isNaN(secs)) {
      try {
        secs = (new Date(secs).getTime() / 1000);
      } catch {
        return 'Invalid Date';
      }
    };

    return new Date(secs * 1000)
        .toLocaleDateString(
            'en-US', dateOptions);
  }

  static convertHumanFromStamp(secs) {
    let months = Math.floor(secs / 2592000);
    let days = Math.floor(secs / 86400);
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor(secs / 60); let seconds = Math.floor(secs % 60);

    if (months > 0) return `${months} month${months > 1 ? "s" : ""}`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    if (seconds >= 30) return `${seconds} second${seconds > 1 ? "s" : ""}`;
    return "just now";
  }
}