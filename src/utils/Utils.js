import Config from "./Config";

export default class Utils {
	static setTitle(title) {
		if (title === "")
			document.title = Config.siteName;
		else
			document.title = title + " | " + Config.siteName;
		return document.title;
	}
	
	static makeSlug = (s) => {
		if (s.endsWith("/")) s = s.slice(0, -1);
		s = s.replace("/", "").replaceAll("/", "-");
		s = s.replaceAll(" ", "-");
		s = s.replaceAll(".html", "");
		return s;
	}

	static truncateMDText = (content, maxLength = 400) => {
		const textOnly = content
			.replace(/!\[.*?\]\(.*?\)/g, "") // Remove: image links
			.replace(/\[([^\]]+)\]\(.*?\)/g, "$1") // Replace: links with just text
			.replace(/\[\^.*?\]/g, "") // Remove: footnotes
			.replace(/[#*`>\[\]]/g, "") // Remove: other symbols
			.replace(/\n+/g, " ") // Replace: multiple newlines with a space
			.trim(); // Trim: leading and trailing whitespace
		const truncated = textOnly.slice(0, maxLength);
		const lastSpaceIndex = truncated.lastIndexOf(" ");
		return truncated.slice(0, lastSpaceIndex) + "...";
	}

	static fixCDNImages(image, articlePath) {
		if (!image) return;

		// Check for @ - this will load article media from the CDN root
		if (image.startsWith("@")) image = `${Config.cdnURL}/${image.slice(1)}`;

		// Check for / - this will load article media from the CDN article directory
		if (articlePath && image.startsWith("/")) image = `${Config.cdnURL}/articles/${articlePath.split("/").pop()}/${image.slice(1)}`;

		return image;
	}
}