import { marked } from 'marked';
import hljs from 'highlight.js';

export interface MarkdownConverterOptions {
    theme: string;
    codeTheme: string;
    platform: 'wechat' | 'zhihu' | 'juejin';
}

export class MarkdownConverter {
    private options: MarkdownConverterOptions;

    constructor(options: MarkdownConverterOptions) {
        this.options = options;
        this.setupMarked();
    }

    private setupMarked() {
        const renderer = new marked.Renderer();

        // 自定义标题渲染
        renderer.heading = (text, level) => {
            const id = text.toLowerCase().replace(/[^\w]+/g, '-');
            if (level === 1) {
                return `<h1 data-tool="mdnice编辑器" style="margin-top: 30px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 25px;"><span class="prefix" style="display: none;"></span><span class="content" style="display: inline-block; font-weight: bold; color: #595959;">${text}</span><span class="suffix"></span></h1>`;
            } else if (level === 2) {
                return `<h2 data-tool="mdnice编辑器" style="margin-top: 30px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 22px; text-align: left; margin: 20px 10px 0px 0px;"><span class="prefix" style="display: none;"></span><span class="content" style="font-size: 18px; font-weight: bold; display: inline-block; padding-left: 10px; border-left: 5px solid #DEC6FB; color: #595959;">${text}</span><span class="suffix"></span></h2>`;
            } else if (level === 3) {
                return `<h3 data-tool="mdnice编辑器" style="margin-top: 30px; margin-bottom: 15px; padding: 0px; color: black; font-size: 16px; font-weight: bold; text-align: center;"><span class="prefix" style="display: none;"></span><span class="content" style="border-bottom: 2px solid #DEC6FB; color: #595959;">${text}</span><span class="suffix" style="display: none;"></span></h3>`;
            }
            return `<h${level} id="${id}">${text}</h${level}>`;
        };

        // 自定义代码块渲染
        renderer.code = (code, language) => {
            const highlightedCode = language && hljs.getLanguage(language)
                ? hljs.highlight(code, { language }).value
                : code;
            
            return `<pre class="custom" data-tool="mdnice编辑器" style="margin-top: 10px; margin-bottom: 10px; border-radius: 5px; box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;">
                <span style="display: block; background: url(https://files.mdnice.com/point.png); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #282c34; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span>
                <code class="hljs" style="overflow-x: auto; padding: 16px; color: #abb2bf; display: block; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; padding-top: 15px; background: #282c34; border-radius: 5px;">${highlightedCode}</code>
            </pre>`.replace(/\n\s+/g, '\n').trim();
        };

        // 自定义段落渲染
        renderer.paragraph = (text) => {
            return `<p data-tool="mdnice编辑器" style="padding-top: 8px; padding-bottom: 8px; line-height: 26px; color: #595959; margin: 10px 0px; letter-spacing: 2px; font-size: 14px; word-spacing: 2px;">${text}</p>`;
        };

        // 自定义引用渲染
        renderer.blockquote = (quote) => {
            return `<blockquote data-tool="mdnice编辑器" style="display: block; font-size: 0.9em; overflow: auto; overflow-scrolling: touch; padding-top: 10px; padding-bottom: 10px; padding-left: 20px; padding-right: 10px; margin-bottom: 20px; margin-top: 20px; text-size-adjust: 100%; line-height: 1.55em; font-weight: 400; border-radius: 6px; color: #595959; font-style: normal; text-align: left; box-sizing: inherit; border-left: none; border: 1px solid #DEC6FB; background: #F6EEFF;"><span style="color: #DEC6FB; font-size: 34px; line-height: 1; font-weight: 700;">❝</span>${quote}<span style="float: right; color: #DEC6FB;">❞</span></blockquote>`;
        };

        // 自定义图片渲染
        renderer.image = (href, title, text) => {
            return `<figure data-tool="mdnice编辑器" style="margin: 0; margin-top: 10px; margin-bottom: 10px;">
                <img src="${href}" alt="${text || ''}" style="display: block; margin: 0 auto; max-width: 100%; border-radius: 6px;">
                ${title ? `<figcaption style="margin-top: 5px; text-align: center; color: #888; font-size: 14px;">${title}</figcaption>` : ''}
            </figure>`.replace(/\n\s+/g, '\n').trim();
        };

        // 自定义强调渲染
        renderer.strong = (text) => {
            return `<strong style="color: #595959; font-weight: bold;"><span>「</span>${text}<span>」</span></strong>`;
        };

        // 自定义斜体渲染
        renderer.em = (text) => {
            return `<em style="font-style: normal; color: #595959; background: #F6EEFF;">${text}</em>`;
        };

        // 自定义删除线渲染
        renderer.del = (text) => {
            return `<s>${text}</s>`;
        };

        // 自定义行内代码渲染
        renderer.codespan = (code) => {
            return `<code style="font-size: 14px; word-wrap: break-word; padding: 2px 4px; border-radius: 4px; margin: 0 2px; background-color: rgba(27,31,35,.05); font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; word-break: break-all; color: #595959;">${code}</code>`;
        };

        marked.setOptions({
            renderer: renderer,
            highlight: (code, lang) => {
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

    public convert(markdown: string): string {
        // 转换Markdown为HTML
        const html = marked(markdown);
        
        // 包装HTML并添加全局样式
        const wrappedHtml = `
        <section id="nice" data-tool="mdnice编辑器" data-website="https://aizhuanqian.com" style="font-size: 16px; padding: 0 10px; word-spacing: 0px; word-break: break-word; word-wrap: break-word; text-align: left; line-height: 1.75; color: #595959; font-family: Optima-Regular, Optima, PingFangTC-Light, PingFangSC-light, PingFangTC-light; letter-spacing: 2px; background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%); background-size: 20px 20px; background-position: center center;">
            ${html}
        </section>`;

        // 清理HTML，移除多余的空白和换行
        return wrappedHtml.replace(/\n\s+/g, '\n').trim();
    }
}
