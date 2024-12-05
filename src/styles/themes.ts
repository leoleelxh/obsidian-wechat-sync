export interface Theme {
    container: (fontSize?: number, lineHeight?: number) => string;
    heading1: string;
    heading2: string;
    heading3: string;
    paragraph: (fontSize?: number, lineHeight?: number) => string;
    blockquote: string;
    link: string;
    image: string;
    list: string;
    listItem: string;
}

export const themes: Record<string, Theme> = {
    default: {
        container: (fontSize = 16, lineHeight = 1.6) => `
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
            color: #24292e;
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
        `,
        heading1: `
            font-size: 2em;
            margin: 1em 0 0.5em;
            color: #24292e;
            font-weight: 600;
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
        `,
        heading2: `
            font-size: 1.5em;
            margin: 1em 0 0.5em;
            color: #24292e;
            font-weight: 600;
        `,
        heading3: `
            font-size: 1.25em;
            margin: 1em 0 0.5em;
            color: #24292e;
            font-weight: 600;
        `,
        paragraph: (fontSize = 16, lineHeight = 1.6) => `
            margin: 1em 0;
            color: #24292e;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
        `,
        blockquote: `
            margin: 1em 0;
            padding: 0 1em;
            color: #6a737d;
            border-left: 0.25em solid #dfe2e5;
        `,
        link: `
            color: #0366d6;
            text-decoration: none;
        `,
        image: `
            max-width: 100%;
            height: auto;
            display: block;
            margin: 1em auto;
        `,
        list: `
            margin: 1em 0;
            padding-left: 2em;
        `,
        listItem: `
            margin: 0.25em 0;
        `
    },

    elegant: {
        container: (fontSize = 16, lineHeight = 1.8) => `
            font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
            color: #2c3e50;
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
        `,
        heading1: `
            font-size: 2.2em;
            margin: 1.2em 0 0.6em;
            color: #2c3e50;
            font-weight: 700;
            text-align: center;
            letter-spacing: -0.5px;
        `,
        heading2: `
            font-size: 1.8em;
            margin: 1em 0 0.5em;
            color: #2c3e50;
            font-weight: 600;
            letter-spacing: -0.3px;
        `,
        heading3: `
            font-size: 1.4em;
            margin: 1em 0 0.5em;
            color: #2c3e50;
            font-weight: 600;
        `,
        paragraph: (fontSize = 16, lineHeight = 1.8) => `
            margin: 1.2em 0;
            color: #2c3e50;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
            text-align: justify;
        `,
        blockquote: `
            margin: 1.2em 0;
            padding: 1em;
            color: #34495e;
            border-left: 4px solid #3498db;
            background: #f8f9fa;
            font-style: italic;
        `,
        link: `
            color: #3498db;
            text-decoration: none;
            border-bottom: 1px solid #3498db;
        `,
        image: `
            max-width: 100%;
            height: auto;
            display: block;
            margin: 1.5em auto;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        `,
        list: `
            margin: 1.2em 0;
            padding-left: 2.5em;
        `,
        listItem: `
            margin: 0.4em 0;
            line-height: 1.6;
        `
    },

    minimal: {
        container: (fontSize = 16, lineHeight = 1.6) => `
            font-family: -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
            color: #333;
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
        `,
        heading1: `
            font-size: 1.8em;
            margin: 1em 0 0.5em;
            color: #333;
            font-weight: 500;
        `,
        heading2: `
            font-size: 1.4em;
            margin: 1em 0 0.5em;
            color: #333;
            font-weight: 500;
        `,
        heading3: `
            font-size: 1.2em;
            margin: 1em 0 0.5em;
            color: #333;
            font-weight: 500;
        `,
        paragraph: (fontSize = 16, lineHeight = 1.6) => `
            margin: 1em 0;
            color: #333;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
        `,
        blockquote: `
            margin: 1em 0;
            padding: 0.5em 1em;
            color: #666;
            border-left: 2px solid #ddd;
        `,
        link: `
            color: #666;
            text-decoration: underline;
        `,
        image: `
            max-width: 100%;
            height: auto;
            display: block;
            margin: 1em auto;
        `,
        list: `
            margin: 1em 0;
            padding-left: 1.5em;
        `,
        listItem: `
            margin: 0.2em 0;
        `
    },

    dark: {
        container: (fontSize = 16, lineHeight = 1.6) => `
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
            color: #c9d1d9;
            background-color: #0d1117;
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
        `,
        heading1: `
            font-size: 2em;
            margin: 1em 0 0.5em;
            color: #c9d1d9;
            font-weight: 600;
            border-bottom: 1px solid #30363d;
            padding-bottom: 0.3em;
        `,
        heading2: `
            font-size: 1.5em;
            margin: 1em 0 0.5em;
            color: #c9d1d9;
            font-weight: 600;
        `,
        heading3: `
            font-size: 1.25em;
            margin: 1em 0 0.5em;
            color: #c9d1d9;
            font-weight: 600;
        `,
        paragraph: (fontSize = 16, lineHeight = 1.6) => `
            margin: 1em 0;
            color: #c9d1d9;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
        `,
        blockquote: `
            margin: 1em 0;
            padding: 0 1em;
            color: #8b949e;
            border-left: 0.25em solid #30363d;
        `,
        link: `
            color: #58a6ff;
            text-decoration: none;
        `,
        image: `
            max-width: 100%;
            height: auto;
            display: block;
            margin: 1em auto;
        `,
        list: `
            margin: 1em 0;
            padding-left: 2em;
            color: #c9d1d9;
        `,
        listItem: `
            margin: 0.25em 0;
        `
    },

    zhihu: {
        container: (fontSize = 16, lineHeight = 1.7) => `
            font-family: -apple-system, "Helvetica Neue", "Helvetica", "Arial", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
            color: #1a1a1a;
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
        `,
        heading1: `
            font-size: 24px;
            margin: 1.2em 0 0.6em;
            color: #1a1a1a;
            font-weight: 600;
            line-height: 1.4;
        `,
        heading2: `
            font-size: 20px;
            margin: 1em 0 0.5em;
            color: #1a1a1a;
            font-weight: 600;
            line-height: 1.4;
        `,
        heading3: `
            font-size: 18px;
            margin: 1em 0 0.5em;
            color: #1a1a1a;
            font-weight: 600;
            line-height: 1.4;
        `,
        paragraph: (fontSize = 16, lineHeight = 1.7) => `
            margin: 1.2em 0;
            color: #1a1a1a;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
        `,
        blockquote: `
            margin: 1em 0;
            padding: 0 1em;
            color: #646464;
            border-left: 3px solid #b4b4b4;
        `,
        link: `
            color: #175199;
            text-decoration: none;
        `,
        image: `
            max-width: 100%;
            height: auto;
            display: block;
            margin: 1em auto;
        `,
        list: `
            margin: 1em 0;
            padding-left: 2em;
        `,
        listItem: `
            margin: 0.3em 0;
            line-height: 1.7;
        `
    },

    juejin: {
        container: (fontSize = 16, lineHeight = 1.75) => `
            font-family: -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
            color: #252933;
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
        `,
        heading1: `
            font-size: 26px;
            margin: 1.5em 0 0.8em;
            color: #252933;
            font-weight: 600;
            line-height: 1.4;
        `,
        heading2: `
            font-size: 22px;
            margin: 1.2em 0 0.6em;
            color: #252933;
            font-weight: 600;
            line-height: 1.4;
        `,
        heading3: `
            font-size: 18px;
            margin: 1em 0 0.5em;
            color: #252933;
            font-weight: 600;
            line-height: 1.4;
        `,
        paragraph: (fontSize = 16, lineHeight = 1.75) => `
            margin: 1.2em 0;
            color: #252933;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
        `,
        blockquote: `
            margin: 1em 0;
            padding: 1em;
            color: #666;
            background-color: #f7f8fa;
            border-left: 4px solid #e4e6eb;
        `,
        link: `
            color: #1e80ff;
            text-decoration: none;
        `,
        image: `
            max-width: 100%;
            height: auto;
            display: block;
            margin: 1em auto;
        `,
        list: `
            margin: 1em 0;
            padding-left: 2em;
        `,
        listItem: `
            margin: 0.3em 0;
            line-height: 1.75;
        `
    },

    chinese: {
        container: (fontSize = 16, lineHeight = 2) => `
            font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", "Helvetica Neue", Arial, sans-serif;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
            color: #333;
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
        `,
        heading1: `
            font-size: 28px;
            margin: 1.2em 0 0.6em;
            color: #333;
            font-weight: 700;
            text-align: center;
        `,
        heading2: `
            font-size: 22px;
            margin: 1em 0 0.5em;
            color: #333;
            font-weight: 700;
        `,
        heading3: `
            font-size: 18px;
            margin: 1em 0 0.5em;
            color: #333;
            font-weight: 700;
        `,
        paragraph: (fontSize = 16, lineHeight = 2) => `
            margin: 1.2em 0;
            color: #333;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
            text-align: justify;
        `,
        blockquote: `
            margin: 1em 0;
            padding: 0.5em 1em;
            color: #666;
            border-left: 4px solid #999;
            background: #f8f8f8;
        `,
        link: `
            color: #1890ff;
            text-decoration: none;
        `,
        image: `
            max-width: 100%;
            height: auto;
            display: block;
            margin: 1.5em auto;
            border-radius: 4px;
        `,
        list: `
            margin: 1em 0;
            padding-left: 2em;
        `,
        listItem: `
            margin: 0.5em 0;
            line-height: 2;
        `
    },

    wechatPro: {
        container: (fontSize = 16, lineHeight = 1.8) => `
            font-family: -apple-system-font, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
            color: #3f3f3f;
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
            letter-spacing: 0.05em;
        `,
        heading1: `
            font-size: 24px;
            margin: 1.5em 0 1em;
            color: #1a1a1a;
            font-weight: bold;
            text-align: center;
            letter-spacing: 0.1em;
        `,
        heading2: `
            font-size: 20px;
            margin: 1.5em 0 0.8em;
            color: #1a1a1a;
            font-weight: bold;
            padding-left: 10px;
            border-left: 4px solid #07c160;
        `,
        heading3: `
            font-size: 18px;
            margin: 1.2em 0 0.6em;
            color: #1a1a1a;
            font-weight: bold;
        `,
        paragraph: (fontSize = 16, lineHeight = 1.8) => `
            margin: 1.5em 0;
            color: #3f3f3f;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
            letter-spacing: 0.05em;
            text-align: justify;
        `,
        blockquote: `
            margin: 1.5em 0;
            padding: 15px;
            color: #666;
            background-color: #f7f7f7;
            border-left: 4px solid #07c160;
            border-radius: 3px;
        `,
        link: `
            color: #576b95;
            text-decoration: none;
            border-bottom: 1px solid #d9d9d9;
        `,
        image: `
            max-width: 100%;
            height: auto;
            display: block;
            margin: 2em auto;
            border-radius: 6px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        `,
        list: `
            margin: 1.5em 0;
            padding-left: 2em;
            color: #3f3f3f;
        `,
        listItem: `
            margin: 0.5em 0;
            line-height: 1.8;
        `
    }
};
