import { Plugin, WorkspaceLeaf } from 'obsidian';
import { createRoot } from 'react-dom/client';
import { WeChatSyncView, VIEW_TYPE_WECHAT } from './src/view';
import { WeChatSyncSettings, DEFAULT_SETTINGS, WeChatSyncSettingTab } from './src/settings';

export default class WeChatSyncPlugin extends Plugin {
    settings: WeChatSyncSettings;

    async onload() {
        await this.loadSettings();

        this.registerView(
            VIEW_TYPE_WECHAT,
            (leaf) => new WeChatSyncView(leaf, this.settings)
        );

        this.addRibbonIcon('share', 'WeChat Sync', () => {
            this.activateView();
        });

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
}
