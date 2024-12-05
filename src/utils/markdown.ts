import { marked } from 'marked';
import hljs from 'highlight.js';
import { themes } from '../styles/themes';
import { codeThemes } from '../styles/codeThemes';

export interface MarkdownConverterOptions {
    theme: keyof typeof themes;
    codeTheme: keyof typeof codeThemes;
    platform: 'wechat' | 'zhihu' | 'juejin';
    fontSize?: number;
    lineHeight?: number;
}

export class MarkdownConverter {
    private options: MarkdownConverterOptions;

    constructor(options: MarkdownConverterOptions) {
        this.options = options;
        this.setupMarked();
    }

    /**
     * 设置marked渲染器的配置
     */
    private setupMarked(): void {
        const renderer = this.createRenderer();

        // 配置marked选项
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
            pedantic: false,
            gfm: true,
            breaks: true,
            sanitize: false,
            smartypants: false,
            xhtml: false
        });
    }

    /**
     * 创建自定义渲染器
     */
    private createRenderer() {
        const renderer = new marked.Renderer();
        const theme = themes[this.options.theme];
        const codeTheme = codeThemes[this.options.codeTheme];
        const { fontSize, lineHeight } = this.options;

        // 自定义段落渲染
        renderer.paragraph = (text: string): string => {
            return `<p style="${theme.paragraph(fontSize, lineHeight)}">${text}</p>`;
        };

        // 自定义标题渲染
        renderer.heading = (text: string, level: number): string => {
            const style = level === 1 ? theme.heading1 :
                         level === 2 ? theme.heading2 :
                         theme.heading3;
            return `<h${level} style="${style}">${text}</h${level}>`;
        };

        // 自定义引用块渲染
        renderer.blockquote = (quote: string): string => {
            return `<blockquote style="${theme.blockquote}">${quote}</blockquote>`;
        };

        // 自定义代码块渲染
        renderer.code = (code: string, language: string | undefined): string => {
            let highlightedCode = code;
            if (language && hljs.getLanguage(language)) {
                try {
                    highlightedCode = hljs.highlight(code, { language }).value;
                } catch (err) {
                    console.warn('Failed to highlight code block:', err);
                }
            }

            // 为代码高亮添加基础样式
            const highlightStyles = `
                .hljs-comment { color: ${codeTheme.comment} !important; }
                .hljs-keyword { color: ${codeTheme.keyword} !important; }
                .hljs-function { color: ${codeTheme.function} !important; }
                .hljs-string { color: ${codeTheme.string} !important; }
                .hljs-number { color: ${codeTheme.number} !important; }
                .hljs-operator { color: ${codeTheme.operator} !important; }
                .hljs-variable { color: ${codeTheme.variable} !important; }
                .hljs-built_in { color: ${codeTheme.function} !important; }
                .hljs-title { color: ${codeTheme.function} !important; }
                .hljs-params { color: ${codeTheme.variable} !important; }
                .hljs-attr { color: ${codeTheme.variable} !important; }
            `;

            return `
                <div class="code-block-wrapper" style="margin: 10px 0;">
                    <style>${highlightStyles}</style>
                    <div class="code-block-header" style="
                        background: ${codeTheme.headerBackground};
                        padding: 8px 16px;
                        border-radius: 5px 5px 0 0;
                        border: 1px solid ${codeTheme.border};
                        border-bottom: none;
                        color: ${codeTheme.text};
                        font-family: -apple-system-font, BlinkMacSystemFont, Arial, sans-serif;
                        font-size: 14px;
                    ">
                        ${language || 'plaintext'}
                    </div>
                    <pre style="
                        margin: 0;
                        background-color: ${codeTheme.background} !important;
                        padding: 16px;
                        border-radius: 0 0 5px 5px;
                        border: 1px solid ${codeTheme.border};
                        overflow-x: auto;
                    "><code style="
                        display: block;
                        background-color: transparent !important;
                        color: ${codeTheme.text} !important;
                        font-family: Consolas, Monaco, 'Andale Mono', monospace;
                        font-size: 14px;
                        line-height: 1.6;
                    ">${highlightedCode}</code></pre>
                </div>
            `;
        };

        // 自定义行内代码渲染
        renderer.codespan = (code: string): string => {
            return `<code style="
                background-color: ${codeTheme.background} !important;
                color: ${codeTheme.text} !important;
                padding: 2px 5px;
                border-radius: 3px;
                font-family: Consolas, Monaco, 'Andale Mono', monospace;
                font-size: 0.9em;
            ">${code}</code>`;
        };

        // 自定义链接渲染
        renderer.link = (href: string, title: string | null, text: string): string => {
            return `<a href="${href}" title="${title || ''}" style="${theme.link}">${text}</a>`;
        };

        // 自定义图片渲染
        renderer.image = (href: string, title: string | null, text: string): string => {
            return `<img src="${href}" alt="${text}" title="${title || ''}" style="${theme.image}">`;
        };

        // 自定义列表渲染
        renderer.list = (body: string, ordered: boolean): string => {
            const tag = ordered ? 'ol' : 'ul';
            return `<${tag} style="${theme.list}">${body}</${tag}>`;
        };

        // 自定义列表项渲染
        renderer.listitem = (text: string): string => {
            return `<li style="${theme.listItem}">${text}</li>`;
        };

        return renderer;
    }

    /**
     * 转换Markdown为HTML
     */
    public convert(markdown: string): string {
        const theme = themes[this.options.theme];
        const { fontSize, lineHeight } = this.options;
        const html = marked(markdown);
        
        return `
            <section id="nice" data-tool="mdnice编辑器" data-website="https://aizhuanqian.com" style="font-size: 16px; padding: 0 10px; word-spacing: 0px; word-break: break-word; word-wrap: break-word; text-align: left; line-height: 1.75; color: #595959; font-family: Optima-Regular, Optima, PingFangTC-Light, PingFangSC-light, PingFangTC-light; letter-spacing: 2px; background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%); background-size: 20px 20px; background-position: center center;">
                <div style="${theme.container(fontSize, lineHeight)}">
                    ${html}
                </div>
            </section>
        `;
    }
}
