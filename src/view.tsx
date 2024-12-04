import { ItemView, WorkspaceLeaf } from 'obsidian';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { WeChatSyncComponent } from './components/WeChatSync';
import { WeChatSyncSettings } from './settings';

export const VIEW_TYPE_WECHAT = 'wechat-sync-view';

export class WeChatSyncView extends ItemView {
    root: any;
    settings: WeChatSyncSettings;

    constructor(leaf: WorkspaceLeaf, settings: WeChatSyncSettings) {
        super(leaf);
        this.settings = settings;
    }

    getViewType(): string {
        return VIEW_TYPE_WECHAT;
    }

    getDisplayText(): string {
        return 'WeChat Sync';
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        container.createEl("div", { attr: { id: "wechat-sync-root" } });
        
        this.root = createRoot(container.children[0]);
        this.root.render(
            <WeChatSyncComponent 
                app={this.app}
                settings={this.settings}
            />
        );
    }

    async onClose() {
        if (this.root) {
            this.root.unmount();
        }
    }
}
