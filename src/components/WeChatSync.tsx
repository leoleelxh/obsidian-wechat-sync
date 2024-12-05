import * as React from 'react';
import { App, Notice } from 'obsidian';
import { WeChatSyncSettings } from '../settings';
import { MarkdownConverter } from '../utils/markdown';

interface WeChatSyncProps {
    app: App;
    settings: WeChatSyncSettings;
}

export const WeChatSyncComponent: React.FC<WeChatSyncProps> = ({ app, settings }) => {
    const [content, setContent] = React.useState<string>('');
    const [activeFile, setActiveFile] = React.useState(app.workspace.getActiveFile());

    // 监听文件变化
    React.useEffect(() => {
        const handleFileOpen = async (file: any) => {
            setActiveFile(file);
        };

        const handleFileModify = async (file: any) => {
            if (file === activeFile) {
                await updateContent(file);
            }
        };

        // 注册事件监听器
        const fileOpenRef = app.workspace.on('file-open', handleFileOpen);
        const fileModifyRef = app.vault.on('modify', handleFileModify);

        // 初始加载
        if (activeFile) {
            updateContent(activeFile);
        }

        return () => {
            // 清理事件监听器
            app.workspace.offref(fileOpenRef);
            app.vault.offref(fileModifyRef);
        };
    }, [app.workspace, app.vault, activeFile, settings]);

    // 更新内容的函数
    const updateContent = async (file: any) => {
        if (file) {
            try {
                const markdown = await app.vault.read(file);
                const converter = new MarkdownConverter({
                    platform: settings.platform,
                    theme: settings.selectedTheme,
                    codeTheme: settings.selectedCodeTheme,
                    fontSize: settings.fontSize,
                    lineHeight: settings.lineHeight,
                    textColor: settings.textColor,
                    linkColor: settings.linkColor
                });
                const html = converter.convert(markdown);
                setContent(html);
            } catch (error) {
                console.error('Error updating content:', error);
                new Notice('更新内容时出错');
            }
        }
    };

    return (
        <div className="wechat-sync-preview">
            <div 
                className="preview-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};
