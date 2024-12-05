import * as React from 'react';
import { App, Notice } from 'obsidian';
import { WeChatSyncSettings } from '../settings';
import { MarkdownConverter } from '../utils/markdown';
import { ClipboardHelper } from '../utils/clipboard';

interface WeChatSyncProps {
    app: App;
    settings: WeChatSyncSettings;
}

export const WeChatSyncComponent: React.FC<WeChatSyncProps> = ({ app, settings }) => {
    const [content, setContent] = React.useState<string>('');

    React.useEffect(() => {
        // 监听活动文件的变化
        const handleFileChange = async () => {
            const activeFile = app.workspace.getActiveFile();
            if (activeFile) {
                const content = await app.vault.read(activeFile);
                const converter = new MarkdownConverter({ platform: settings.defaultPlatform });
                const html = converter.convert(content);
                setContent(html);
            }
        };

        // 初始加载
        handleFileChange();

        // 添加文件变化监听器
        const fileChangeHandler = app.workspace.on('file-open', handleFileChange);
        
        return () => {
            // 清理监听器
            app.workspace.offref(fileChangeHandler);
        };
    }, [app.workspace, settings.defaultPlatform]);

    const handleCopy = async () => {
        try {
            // 优化HTML以适应微信公众号
            const optimizedHtml = ClipboardHelper.optimizeForWeChat(content);
            
            // 复制到剪贴板
            await ClipboardHelper.copyToClipboard(optimizedHtml);
            
            // 显示成功提示
            new Notice('内容已复制到剪贴板！');
        } catch (error) {
            console.error('复制失败:', error);
            new Notice('复制失败，请重试！');
        }
    };

    return (
        <div className="wechat-sync-container">
            <div className="wechat-sync-toolbar">
                <button onClick={handleCopy}>复制到剪贴板</button>
            </div>
            <div 
                className="wechat-sync-preview"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};
