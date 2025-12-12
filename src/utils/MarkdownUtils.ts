import { marked } from "marked";
import markedFootnote from "marked-footnote";
import Utils from "./Utils";
import TypeUtils from "./TypeUtils";

export interface MarkdownSection {
    title: string;
    id: string;
    subsections?: MarkdownSection[];
}

export interface InputMarkdown {
    content: string;
}

export interface OutputMarkdown {
    sections: MarkdownSection[];
    content: string;
}

export type ExtractedMetadata = { [Key: string]: string };

export default class MarkdownUtils {
    static regex = /^---([\s\S]*?)---/;
    static headerRegex = /[ `~!@#$%^&*()_|+\-=?;:'",.<>]/g;

    static parse(markdown: InputMarkdown): OutputMarkdown {
        const headerStorage = {};
        const genHead = (headerId: string): string => {
            if (headerStorage[headerId] == null) headerStorage[headerId] = 0;
            else headerStorage[headerId]++;

            if (headerStorage[headerId] > 0) headerId = `${headerId}-${headerStorage[headerId]}`;

            return headerId;
        };

        let data: OutputMarkdown = {
            sections: [],
            content: "",
        };

        data.content = markdown.content;

        data.content.split("\n").forEach((line) => {
            if (line.startsWith("## ")) {
                data.sections.push({
                    title: line.slice(3),
                    id: genHead(line.slice(3).toLowerCase().trim().replace(this.headerRegex, "-")),
                    subsections: [],
                });
            }

            if (line.startsWith("### ")) {
                const last = data.sections[data.sections.length - 1];

                if (!last) return;

                const subsection: MarkdownSection = {
                    title: line.slice(4),
                    id: genHead(line.slice(4).toLowerCase().trim().replace(this.headerRegex, "-")),
                };

                last.subsections.push(subsection);
            }
        });

        return data;
    }

    static async render(content: string, articleUrl: string, wrapP = true, isEditor = false): Promise<string> {
        const headerStorage = {};
        const renderer = {
            heading: (text: string, level: number) => {
                const d = (s: string, r: string) => s.replace(/&\w+;|&#\d+;/g, r);
                let headerId = d(text.toLowerCase(), "-").replace(this.headerRegex, "-");
                if (headerStorage[headerId] == null) headerStorage[headerId] = 0;
                else headerStorage[headerId]++;

                if (headerStorage[headerId] > 0) headerId = `${headerId}-${headerStorage[headerId]}`;
                return `<MarkdownHeader text="${text}" :level="${level}" headerId="${headerId}" ${isEditor ? "isEditor" : ""} />`;
            },
            paragraph: (text: string) => (wrapP ? `<p>${text}</p>` : text),
            blockquote: (quote: string) => {
                // remove <p> tags
                var content = quote.replace(/<p>/g, "").replace(/<\/p>/g, "");

                // find {: .tip } or {: .warning } or whatever
                var typeMatch = content.match(/\{: \.(\w+) \}/);

                // determine if it's a blockquote note
                var headerMatch = content.match(/^<MarkdownHeader\s+?.*?:level="1".*?\/>/);
                if (headerMatch) {
                    // extract the header text
                    var titleMatch = headerMatch[0].match(/^<MarkdownHeader\s+?.*?text="(.*?)".*?\/>$/);
                    if (titleMatch) {
                        var finalContent = content.replace(titleMatch[0], "");
                        var title = titleMatch[1];
                        if (typeMatch) {
                            var type = typeMatch[1];
                            return `<BlockquoteNote title="${title}" type="${type}">${finalContent.replace(
                                typeMatch[0],
                                ""
                            )}</BlockquoteNote>`;
                        }

                        return `<BlockquoteNote title="${title}">${finalContent}</BlockquoteNote>`;
                    }
                }

                if (typeMatch) {
                    var type = typeMatch[1];
                    return `<Blockquote type="${type}">${content.replace(typeMatch[0], "")}</Blockquote>`;
                }

                return `<Blockquote>${quote}</Blockquote>`;
            },
            // idk if this was fixed in the backend because fixCDNImages was like, completely removed lol
            image: (href: string, title: string, text: string) => {
                if (articleUrl) {
                    // Check for @ or /
                    if (href.startsWith("@") || href.startsWith("/")) return `<MarkdownImage url="${Utils.fixCDNImages(href, articleUrl)}" alt="${text}" />`;
                }

                // Default
                return `<MarkdownImage url="${href}" alt="${text}" />`;
            },
        };

        marked.use({ renderer });
        marked.use(markedFootnote());

        const parseResult = marked.parse(content);
        let html = TypeUtils.isPromise(parseResult) ? await parseResult : parseResult;

        html = html.replace(`<h2 id="footnote-label" class="sr-only">Footnotes</h2>`, "");

        return html;
    }

    static extractMetadata(markdown: string): ExtractedMetadata {
        var match = markdown.match(MarkdownUtils.regex);

        if (match) {
            var metadata = match[1].split("\n");
            var metadataObject: ExtractedMetadata = {};

            metadata.forEach((metadataLine) => {
                if (metadataLine.trim().length === 0) return;

                if (!metadataLine.includes(":")) {
                    // append the line to the last key
                    var lastKey = Object.keys(metadataObject).pop();
                    metadataObject[lastKey] += " " + metadataLine.trim();
                    return;
                }

                var metadataLineParts = metadataLine.split(":");
                var key = metadataLineParts[0].trim();
                var value = metadataLineParts.slice(1).join(":").trim();

                metadataObject[key] = value;
            });

            return metadataObject;
        }

        return {};
    }

    static getEndOfMetadataIndex(markdown: string): number {
        var match = markdown.match(MarkdownUtils.regex);

        if (match) return match[0].length;

        return -1;
    }
}
