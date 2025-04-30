export default class TextboxActions {
    
    // bold text
    static boldFormatting(textarea) {
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        let newText, newPos;

        if (start === end) {
            newText = `${value.slice(0, start)}****${value.slice(end)}`;
            newPos = start + 2;
        } else {
            newText = `${value.slice(0, start)}**${value.slice(start, end)}**${value.slice(end)}`;
            newPos = end + 4;
        }

        textarea.value = newText;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();
        
        return newText;
    };

    // italic text
    static italicFormatting(textarea) {
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        let newText, newPos;

        if (start === end) {
            newText = `${value.slice(0, start)}**${value.slice(end)}`;
            newPos = start + 1;
        } else {
            newText = `${value.slice(0, start)}*${value.slice(start, end)}*${value.slice(end)}`;
            newPos = end + 2;
        }

        textarea.value = newText;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();
        
        return newText;
    };

    // underlined text
    static underlineFormatting(textarea) {
        if (!textarea) return;
                
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        let newText, newPos;
        
        if (start === end) {
            newText = `${value.slice(0, start)}<u></u>${value.slice(end)}`;
            newPos = start + 3;
        } else {
            newText = `${value.slice(0, start)}<u>${value.slice(start, end)}</u>${value.slice(end)}`;
            newPos = end + 7;
        }
        
        textarea.value = newText;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();
                
        return newText;
    };

    // strikethrough text
    static strikethroughFormatting(textarea) {
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        let newText, newPos;

        if (start === end) {
            newText = `${value.slice(0, start)}~~~~${value.slice(end)}`;
            newPos = start + 2;
        } else {
            newText = `${value.slice(0, start)}~~${value.slice(start, end)}~~${value.slice(end)}`;
            newPos = end + 4;
        }

        textarea.value = newText;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();
        
        return newText;
    };

     // list formatting
    static listFormatting(textarea) {
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        let newText, newPos;

        if (start === end) {
            newText = `${value.slice(0, start)}- ${value.slice(end)}`;
            newPos = start + 2;
        } else {
            newText = `${value.slice(0, start)}- ${value.slice(start, end)}`;
            newPos = end + 2;
        }

        textarea.value = newText;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();
        
        return newText;
    };

     // number list formatting
    static numberListFormatting(textarea) {
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        let newText, newPos;

        if (start === end) {
            newText = `${value.slice(0, start)}1. ${value.slice(end)}`;
            newPos = start + 3;
        } else {
            newText = `${value.slice(0, start)}1. ${value.slice(start, end)}`;
            newPos = end + 3;
        }

        textarea.value = newText;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();
        
        return newText;
    };

     // quote formatting
    static quoteFormatting(textarea) {
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        let newText, newPos;

        if (start === end) {
            newText = `${value.slice(0, start)}>${value.slice(end)}`;
            newPos = start + 2;
        } else {
            newText = `${value.slice(0, start)}>${value.slice(start, end)}`;
            newPos = end + 2;
        }

        textarea.value = newText;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();
        
        return newText;
    };
    

    // todo:
    // links, images

     // spoiler formatting
    static spoilerFormatting(textarea) {
        if (!textarea) return;
                
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        let newText, newPos;
        
        if (start === end) {
            newText = `${value.slice(0, start)}<p class=spoiler></p>${value.slice(end)}`;
            newPos = start + 17;
        } else {
            newText = `${value.slice(0, start)}<p class=spoiler>${value.slice(start, end)}</p>${value.slice(end)}`;
            newPos = end + 21;
        }
        
        textarea.value = newText;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();
                
        return newText;
    };

    // link formatting
    static linkFormatting(textarea) {
        if (!textarea) return;
                
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        let newText, newPos;

        if (start === end) {
            newText = `${value.slice(0, start)}[](#url)${value.slice(end)}`;
            newPos = start + 1;
        } else {
            newText = `${value.slice(0, start)}[${value.slice(start, end)}](#url)${value.slice(end)}`;
            newPos = end + 8;
        }

        textarea.value = newText;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();
        
        return newText;
    };

    // image formatting
    static imageFormatting(textarea) {
        if (!textarea) return;
                
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        let newText, newPos;

        if (start === end) {
            newText = `${value.slice(0, start)}![](#imageUrl)${value.slice(end)}`;
            newPos = start + 2;
        } else {
            newText = `${value.slice(0, start)}![${value.slice(start, end)}](#imageUrl)${value.slice(end)}`;
            newPos = end + 14;
        }

        textarea.value = newText;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();
        
        return newText;
    };

    // table formatting (unfinished)
    static tableFormatting(textarea) {
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.slice(start, end);
        
        const tableContent = selectedText 
            ? `| ${selectedText} |\n|-----|\n|     |`
            : `|     |     |\n|-----|-----|\n|     |     |`;
        
        const newText = `${textarea.value.slice(0, start)}${tableContent}${textarea.value.slice(end)}`;
        
        // Update textarea
        textarea.value = newText;
        textarea.selectionStart = start + 2;
        textarea.selectionEnd = start + 2;
        textarea.focus();
        
        return newText;
    }
}