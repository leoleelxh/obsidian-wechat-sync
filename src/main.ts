import { Editor, MarkdownView, Notice, Plugin, WorkspaceLeaf } from 'obsidian';
import { createRoot } from 'react-dom/client';
import { WeChatSyncView, VIEW_TYPE_WECHAT } from './view';
import { WeChatSyncSettings, DEFAULT_SETTINGS, WeChatSyncSettingTab } from './settings';
import { MarkdownConverter } from './utils/markdown';
import { ClipboardHelper } from './utils/clipboard';

export default class WeChatSyncPlugin extends Plugin {
    settings: WeChatSyncSettings;
    private markdownConverter: MarkdownConverter;

    async onload() {
        await this.loadSettings();

        // 初始化 Markdown 转换器
        this.markdownConverter = new MarkdownConverter({
            theme: this.settings.selectedTheme,
            codeTheme: this.settings.selectedCodeTheme,
            platform: this.settings.platform
        });

        // 注册视图
        this.registerView(
            VIEW_TYPE_WECHAT,
            (leaf) => new WeChatSyncView(leaf, this.settings)
        );

        // 添加功能区图标
        this.addRibbonIcon('share', 'WeChat Sync', () => {
            this.activateView();
        });

        // 添加命令：复制当前文档为富文本
        this.addCommand({
            id: 'copy-as-rich-text',
            name: 'Copy as Rich Text',
            callback: () => this.copyCurrentDocumentAsRichText()
        });

        // 添加设置标签页
        this.addSettingTab(new WeChatSyncSettingTab(this.app, this));
    }

    async onunload() {
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_WECHAT);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    refreshPreview() {
        // 更新 Markdown 转换器的配置
        this.markdownConverter = new MarkdownConverter({
            theme: this.settings.selectedTheme,
            codeTheme: this.settings.selectedCodeTheme,
            platform: this.settings.platform
        });
    }

    async activateView() {
        const { workspace } = this.app;
        
        let leaf: WorkspaceLeaf | null = null;
        const leaves = workspace.getLeavesOfType(VIEW_TYPE_WECHAT);

        if (leaves.length > 0) {
            // View already exists
            leaf = leaves[0];
        } else {
            // Create new leaf
            leaf = workspace.getRightLeaf(false);
            await leaf.setViewState({
                type: VIEW_TYPE_WECHAT,
                active: true,
            });
        }

        // Reveal the leaf
        if (leaf) {
            workspace.revealLeaf(leaf);
        }
    }

    async copyCurrentDocumentAsRichText() {
        try {
            const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (!activeView) {
                new Notice('No active markdown view');
                return;
            }

            // 获取当前文档的 Markdown 内容
            const content = activeView.editor.getValue();

            // 转换为 HTML
            const html = this.markdownConverter.convert(content);

            // 添加自定义 CSS
            const htmlWithCustomCSS = this.settings.customCSS 
                ? `<style>${this.settings.customCSS}</style>${html}`
                : html;

            // 根据平台优化 HTML 并复制到剪贴板
            const optimizedHtml = ClipboardHelper.optimizeForWeChat(htmlWithCustomCSS);
            await ClipboardHelper.copyToClipboard(optimizedHtml);

            // 显示成功消息
            new Notice('Content copied to clipboard');
        } catch (error) {
            console.error('Error copying document:', error);
            new Notice('Error copying document');
        }
    }
}
