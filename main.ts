import { Plugin, WorkspaceLeaf } from 'obsidian';
import { WeChatSyncView, VIEW_TYPE_WECHAT } from './src/view';
import { WeChatSyncSettings, DEFAULT_SETTINGS } from './src/settings';

export default class WeChatSyncPlugin extends Plugin {
    settings: WeChatSyncSettings;
    view: WeChatSyncView | null = null;

    async onload() {
        await this.loadSettings();

        this.registerView(
            VIEW_TYPE_WECHAT,
            (leaf) => {
                this.view = new WeChatSyncView(leaf, this);
                return this.view;
            }
        );

        this.addRibbonIcon('share', '微信同步', () => {
            this.activateView();
        });
    }

    async onunload() {
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_WECHAT);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        if (this.view) {
            this.view.refresh();
        }
    }

    async updateSettings(newSettings: Partial<WeChatSyncSettings>) {
        this.settings = {
            ...this.settings,
            ...newSettings
        };
        await this.saveSettings();
    }

    async activateView() {
        const { workspace } = this.app;
        
        let leaf: WorkspaceLeaf | null = null;
        const leaves = workspace.getLeavesOfType(VIEW_TYPE_WECHAT);

        if (leaves.length > 0) {
            leaf = leaves[0];
        } else {
            leaf = workspace.getRightLeaf(false);
            await leaf.setViewState({
                type: VIEW_TYPE_WECHAT,
                active: true,
            });
        }

        if (leaf) {
            workspace.revealLeaf(leaf);
        }
    }
}
