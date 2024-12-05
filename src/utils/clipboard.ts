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
                        'text/html': new Blob([container.innerHTML], { type: 'text/html' }),
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
     * @param html HTML内容
     */
    public static optimizeForWeChat(html: string): string {
        // 创建一个临时的div来解析HTML
        const div = document.createElement('div');
        div.innerHTML = html;

        // 处理内联样式
        const elements = div.getElementsByTagName('*');
        Array.from(elements).forEach(element => {
            const style = element.getAttribute('style');
            if (style) {
                // 移除可能导致问题的样式属性
                element.setAttribute('style', style
                    .replace(/font-family:[^;]+;?/g, '')  // 移除字体系列
                    .replace(/background-color:\s*transparent;?/g, '')  // 移除透明背景
                    .replace(/margin:\s*0;?/g, '')  // 移除默认外边距
                    .replace(/padding:\s*0;?/g, '') // 移除默认内边距
                );
            }
        });

        // 处理代码块
        const codeBlocks = div.querySelectorAll('pre');
        codeBlocks.forEach(pre => {
            const originalBgColor = pre.style.backgroundColor;
            const originalColor = pre.style.color;

            // 确保背景色不是透明的
            const bgColor = originalBgColor && originalBgColor !== 'transparent' 
                ? originalBgColor 
                : '#282c34';

            // 确保文本颜色不是透明的
            const textColor = originalColor && originalColor !== 'transparent'
                ? originalColor
                : '#abb2bf';

            // 设置 pre 元素样式
            pre.setAttribute('style', `
                background-color: ${bgColor} !important;
                padding: 15px !important;
                border-radius: 5px !important;
                margin: 10px 0 !important;
                overflow: auto !important;
                border: 1px solid #3e4451 !important;
            `);

            // 处理 code 元素
            const code = pre.querySelector('code');
            if (code) {
                code.setAttribute('style', `
                    color: ${textColor} !important;
                    font-family: Consolas, Monaco, monospace !important;
                    font-size: 14px !important;
                    line-height: 1.6 !important;
                    background: transparent !important;
                `);
            }

            // 保持语法高亮样式
            const highlightedElements = pre.querySelectorAll('[class*="hljs-"]');
            Array.from(highlightedElements).forEach(el => {
                const originalStyle = el.getAttribute('style') || '';
                el.setAttribute('style', originalStyle + ' !important');
            });
        });

        return div.innerHTML;
    }
}
