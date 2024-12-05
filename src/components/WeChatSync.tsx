import * as React from 'react';
import { App, Notice, MarkdownView } from 'obsidian';
import { WeChatSyncSettings } from '../settings';
import { MarkdownConverter } from '../utils/markdown';
import { ClipboardHelper } from '../utils/clipboard';
import { StyleConfig, StyleConfigChanges } from './StyleConfig';

interface WeChatSyncProps {
    app: App;
    settings: WeChatSyncSettings;
}

export const WeChatSyncComponent: React.FC<WeChatSyncProps> = ({ app, settings }) => {
    const [content, setContent] = React.useState<string>('');
    const [currentSettings, setCurrentSettings] = React.useState({
        theme: settings.selectedTheme,
        codeTheme: settings.selectedCodeTheme,
        fontSize: settings.fontSize || 16,
        lineHeight: settings.lineHeight || 1.6,
        customCSS: settings.customCSS || '',
    });
    const [markdownContent, setMarkdownContent] = React.useState<string>('');

    const updatePreview = React.useCallback(() => {
        const converter = new MarkdownConverter({
            platform: settings.platform,
            theme: currentSettings.theme,
            codeTheme: currentSettings.codeTheme,
        });
        
        const baseHtml = converter.convert(markdownContent);
        const styleOverrides = `
            <style>
                .wechat-preview {
                    font-size: ${currentSettings.fontSize}px;
                    line-height: ${currentSettings.lineHeight};
                }
                ${currentSettings.customCSS}
            </style>
        `;
        setContent(styleOverrides + baseHtml);
    }, [markdownContent, currentSettings, settings.platform]);

    React.useEffect(() => {
        // 监听活动文件的变化
        const handleFileChange = async () => {
            const activeFile = app.workspace.getActiveFile();
            if (activeFile) {
                const content = await app.vault.read(activeFile);
                setMarkdownContent(content);
            }
        };

        // 初始加载
        handleFileChange();

        // 添加文件变化监听器
        const fileChangeHandler = app.workspace.on('file-open', handleFileChange);
        
        // 添加编辑监听器
        const editorChangeHandler = app.workspace.on('editor-change', async () => {
            const activeView = app.workspace.getActiveViewOfType(MarkdownView);
            if (activeView) {
                const content = activeView.editor.getValue();
                setMarkdownContent(content);
            }
        });
        
        return () => {
            // 清理监听器
            app.workspace.offref(fileChangeHandler);
            app.workspace.offref(editorChangeHandler);
        };
    }, [app.workspace]);

    // 当 Markdown 内容或设置改变时更新预览
    React.useEffect(() => {
        updatePreview();
    }, [markdownContent, currentSettings, updatePreview]);

    const handleStyleChange = (changes: StyleConfigChanges) => {
        setCurrentSettings(prev => ({
            ...prev,
            ...changes
        }));
    };

    const handleCopy = async () => {
        try {
            // 优化HTML以适应微信公众号
            const optimizedHtml = ClipboardHelper.optimizeForWeChat(content);
            
            // 复制到剪贴板
            await ClipboardHelper.copyToClipboard(optimizedHtml);
            
            // 显示成功提示
            new Notice('已复制到剪贴板');
        } catch (error) {
            console.error('复制失败:', error);
            new Notice('复制失败');
        }
    };

    return (
        <div className="wechat-sync-container">
            <div className="wechat-sync-toolbar">
                <button onClick={handleCopy}>复制为富文本</button>
            </div>
            
            <div className="wechat-sync-content">
                <div className="wechat-sync-preview">
                    <div 
                        className="wechat-preview"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
                
                <div className="wechat-sync-config">
                    <StyleConfig
                        {...currentSettings}
                        onChange={handleStyleChange}
                    />
                </div>
            </div>
        </div>
    );
};
