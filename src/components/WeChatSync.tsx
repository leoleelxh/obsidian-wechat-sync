import * as React from 'react';
import { useState, useEffect } from 'react';
import { App, TFile, MarkdownView } from 'obsidian';
import { MarkdownConverter } from '../utils/markdown';
import { WeChatSyncSettings } from '../settings';

interface WeChatSyncProps {
    app: App;
    settings: WeChatSyncSettings;
}

export const WeChatSyncComponent: React.FC<WeChatSyncProps> = ({ app, settings }) => {
    const [activeTab, setActiveTab] = useState(settings.defaultPlatform);
    const [previewMode, setPreviewMode] = useState('desktop');
    const [markdown, setMarkdown] = useState('');
    const [html, setHtml] = useState('');

    useEffect(() => {
        // 获取当前活动文件的内容
        const loadContent = async () => {
            const activeView = app.workspace.getActiveViewOfType(MarkdownView);
            if (activeView) {
                const content = await app.vault.read(activeView.file);
                setMarkdown(content);
            }
        };

        loadContent();

        // 监听编辑器变化
        const editorHandler = app.workspace.on('editor-change', async () => {
            const activeView = app.workspace.getActiveViewOfType(MarkdownView);
            if (activeView) {
                const content = await app.vault.read(activeView.file);
                setMarkdown(content);
            }
        });

        // 监听文件打开
        const fileOpenHandler = app.workspace.on('file-open', async (file: TFile) => {
            if (file) {
                const content = await app.vault.read(file);
                setMarkdown(content);
            }
        });

        return () => {
            app.workspace.offref(editorHandler);
            app.workspace.offref(fileOpenHandler);
        };
    }, [app.workspace]);

    useEffect(() => {
        updatePreview();
    }, [markdown, activeTab, settings]);

    const updatePreview = () => {
        const converter = new MarkdownConverter({
            theme: settings.theme,
            codeTheme: settings.codeTheme,
            platform: activeTab as 'wechat' | 'zhihu' | 'juejin'
        });
        
        const convertedHtml = converter.convert(markdown);
        setHtml(convertedHtml);
    };

    const copyToClipboard = async () => {
        try {
            // 直接复制HTML内容
            await navigator.clipboard.writeText(html);
            
            // 添加复制成功的视觉反馈
            const copyButton = document.querySelector('.copy-button');
            if (copyButton instanceof HTMLElement) {
                const originalText = copyButton.textContent;
                copyButton.textContent = '复制成功！';
                setTimeout(() => {
                    if (copyButton) {
                        copyButton.textContent = originalText;
                    }
                }, 2000);
            }
        } catch (err) {
            console.error('Failed to copy:', err);
            // 添加复制失败的视觉反馈
            const copyButton = document.querySelector('.copy-button');
            if (copyButton instanceof HTMLElement) {
                const originalText = copyButton.textContent;
                copyButton.textContent = '复制失败';
                setTimeout(() => {
                    if (copyButton) {
                        copyButton.textContent = originalText;
                    }
                }, 2000);
            }
        }
    };

    const exportToPDF = async () => {
        // TODO: 实现PDF导出功能
    };

    return (
        <div className="wechat-sync-container">
            <div className="wechat-sync-header">
                <div className="platform-tabs">
                    <button 
                        className={`tab ${activeTab === 'wechat' ? 'active' : ''}`}
                        onClick={() => setActiveTab('wechat')}
                    >
                        微信公众号
                    </button>
                    <button 
                        className={`tab ${activeTab === 'zhihu' ? 'active' : ''}`}
                        onClick={() => setActiveTab('zhihu')}
                    >
                        知乎
                    </button>
                    <button 
                        className={`tab ${activeTab === 'juejin' ? 'active' : ''}`}
                        onClick={() => setActiveTab('juejin')}
                    >
                        掘金
                    </button>
                </div>
                <div className="preview-mode-toggle">
                    <button 
                        className={`mode ${previewMode === 'desktop' ? 'active' : ''}`}
                        onClick={() => setPreviewMode('desktop')}
                    >
                        桌面预览
                    </button>
                    <button 
                        className={`mode ${previewMode === 'mobile' ? 'active' : ''}`}
                        onClick={() => setPreviewMode('mobile')}
                    >
                        手机预览
                    </button>
                </div>
            </div>
            <div className={`preview-container ${previewMode}`}>
                <div 
                    className="content-preview"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
            <div className="action-buttons">
                <button className="copy-button" onClick={copyToClipboard}>
                    复制内容
                </button>
                <button className="export-pdf" onClick={exportToPDF}>
                    导出 PDF
                </button>
            </div>
        </div>
    );
};
