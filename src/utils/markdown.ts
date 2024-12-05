import { marked } from 'marked';
import hljs from 'highlight.js';
import { themes } from '../styles/themes';
import { codeThemes } from '../styles/codeThemes';

export interface MarkdownConverterOptions {
    platform: 'wechat' | 'zhihu' | 'juejin';
    theme: string;
    codeTheme: string;
    fontSize: number;
    lineHeight: number;
    textColor: string;
    linkColor: string;
}

export class MarkdownConverter {
    private options: MarkdownConverterOptions;

    constructor(options: MarkdownConverterOptions) {
        this.options = options;
        this.setupMarked();
    }

    private createRenderer(): marked.Renderer {
        const renderer = new marked.Renderer();
        const theme = themes[this.options.theme];
        const codeTheme = codeThemes[this.options.codeTheme];

        // 自定义段落渲染
        renderer.paragraph = (text: string): string => {
            return `<p style="margin-bottom: 1em;">${text}</p>`;
        };

        // 自定义标题渲染
        renderer.heading = (text: string, level: number): string => {
            const sizes = {
                1: '2em',
                2: '1.5em',
                3: '1.17em',
                4: '1em',
                5: '0.83em',
                6: '0.67em',
            };
            return `<h${level} style="
                font-size: ${sizes[level as keyof typeof sizes]};
                font-weight: bold;
                margin: 1em 0 0.5em;
            ">${text}</h${level}>`;
        };

        // 自定义代码块渲染
        renderer.code = (code: string, language: string | undefined): string => {
            const highlightedCode = language && hljs.getLanguage(language)
                ? hljs.highlight(code, { language }).value
                : code;

            return `
                <pre style="
                    background-color: ${codeTheme.background};
                    padding: 1em;
                    border-radius: 5px;
                    overflow-x: auto;
                "><code style="
                    color: ${codeTheme.text};
                    font-family: Consolas, Monaco, 'Andale Mono', monospace;
                ">${highlightedCode}</code></pre>
            `;
        };

        // 自定义行内代码渲染
        renderer.codespan = (code: string): string => {
            return `<code style="
                background-color: ${codeTheme.background};
                color: ${codeTheme.text};
                padding: 0.2em 0.4em;
                border-radius: 3px;
                font-family: Consolas, Monaco, monospace;
            ">${code}</code>`;
        };

        // 自定义链接渲染
        renderer.link = (href: string, title: string | null, text: string): string => {
            return `<a href="${href}" title="${title || ''}" style="
                color: ${this.options.linkColor};
                text-decoration: none;
            ">${text}</a>`;
        };

        // 自定义列表渲染
        renderer.list = (body: string, ordered: boolean): string => {
            const tag = ordered ? 'ol' : 'ul';
            return `<${tag} style="
                padding-left: 2em;
                margin: 1em 0;
            ">${body}</${tag}>`;
        };

        // 自定义列表项渲染
        renderer.listitem = (text: string): string => {
            return `<li style="margin: 0.5em 0;">${text}</li>`;
        };

        // 自定义引用块渲染
        renderer.blockquote = (quote: string): string => {
            return `<blockquote style="
                margin: 1em 0;
                padding-left: 1em;
                border-left: 4px solid #ddd;
                color: #666;
            ">${quote}</blockquote>`;
        };

        return renderer;
    }

    private setupMarked(): void {
        const renderer = this.createRenderer();
        
        marked.setOptions({
            renderer: renderer,
            highlight: (code: string, lang: string): string => {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(code, { language: lang }).value;
                    } catch (err) {
                        console.error('Highlight error:', err);
                    }
                }
                return code;
            },
            gfm: true,
            breaks: true
        });
    }

    public convert(markdown: string): string {
        // 添加全局样式
        const globalStyles = `
            <style>
                .markdown-content {
                    font-size: ${this.options.fontSize}px;
                    line-height: ${this.options.lineHeight};
                    color: ${this.options.textColor};
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
                }
                .markdown-content a {
                    color: ${this.options.linkColor};
                }
                .markdown-content img {
                    max-width: 100%;
                    height: auto;
                }
            </style>
        `;
        
        const htmlContent = marked.parse(markdown);
        return `${globalStyles}<div class="markdown-content">${htmlContent}</div>`;
    }
}
