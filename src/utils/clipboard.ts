/**
 * 剪贴板工具类
 */
export class ClipboardHelper {
    /**
     * 将HTML内容复制到剪贴板，保持富文本格式
     * @param html HTML内容
     */
    public static async copyToClipboard(html: string): Promise<void> {
        try {
            // 创建一个临时的div元素来存放HTML内容
            const container = document.createElement('div');
            container.innerHTML = html;
            container.style.position = 'fixed';
            container.style.pointerEvents = 'none';
            container.style.opacity = '0';
            document.body.appendChild(container);

            // 选择临时元素
            const range = document.createRange();
            range.selectNode(container);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }

            // 使用新的Clipboard API
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        'text/html': new Blob([html], { type: 'text/html' }),
                        'text/plain': new Blob([container.innerText], { type: 'text/plain' })
                    })
                ]);
            } catch (err) {
                // 如果新API不可用，回退到传统方法
                document.execCommand('copy');
            }

            // 清理
            if (selection) {
                selection.removeAllRanges();
            }
            document.body.removeChild(container);
        } catch (error) {
            console.error('复制到剪贴板失败:', error);
            throw error;
        }
    }

    /**
     * 优化HTML以适应微信公众号
     * @param html 原始HTML
     * @returns 优化后的HTML
     */
    public static optimizeForWeChat(html: string): string {
        // 1. 确保所有样式都是内联的
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // 2. 处理代码块
        const codeBlocks = tempDiv.querySelectorAll('pre code');
        codeBlocks.forEach(codeBlock => {
            // 保持代码块的格式和样式
            const pre = codeBlock.parentElement;
            if (pre) {
                pre.style.backgroundColor = '#f6f8fa';
                pre.style.borderRadius = '5px';
                pre.style.padding = '16px';
                pre.style.margin = '10px 0';
                codeBlock.style.fontFamily = 'Consolas, monospace';
                codeBlock.style.fontSize = '14px';
                codeBlock.style.lineHeight = '1.5';
            }
        });

        // 3. 处理图片
        const images = tempDiv.querySelectorAll('img');
        images.forEach(img => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            if (img.parentElement?.tagName === 'P') {
                img.parentElement.style.textAlign = 'center';
            }
        });

        // 4. 处理标题
        const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            heading.style.fontWeight = 'bold';
            heading.style.lineHeight = '1.4';
            heading.style.margin = '20px 0';
        });

        // 5. 处理段落
        const paragraphs = tempDiv.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.lineHeight = '1.75';
            p.style.margin = '10px 0';
        });

        // 6. 处理引用
        const blockquotes = tempDiv.querySelectorAll('blockquote');
        blockquotes.forEach(quote => {
            quote.style.backgroundColor = '#f8f8f8';
            quote.style.borderLeft = '4px solid #ddd';
            quote.style.margin = '10px 0';
            quote.style.padding = '10px 15px';
        });

        return tempDiv.innerHTML;
    }
}
