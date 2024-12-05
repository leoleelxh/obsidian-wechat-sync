import { ItemView, WorkspaceLeaf } from 'obsidian';
import { createRoot } from 'react-dom/client';
import { WeChatSyncComponent } from './components/WeChatSync';
import { StyleConfigPanel } from './components/StyleConfigPanel';
import { WeChatSyncSettings } from './settings';
import { WeChatSyncPlugin } from './plugin';

export const VIEW_TYPE_WECHAT = 'wechat-sync-view';

export class WeChatSyncView extends ItemView {
    private plugin: WeChatSyncPlugin;
    private root: ReturnType<typeof createRoot>;

    constructor(leaf: WorkspaceLeaf, plugin: WeChatSyncPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType(): string {
        return VIEW_TYPE_WECHAT;
    }

    getDisplayText(): string {
        return '微信同步预览';
    }

    async onOpen(): Promise<void> {
        const container = this.containerEl.children[1];
        container.empty();
        container.addClass('wechat-sync-view');

        const splitContainer = container.createDiv('wechat-sync-split');
        
        this.root = createRoot(splitContainer);
        this.renderView();
    }

    private renderView() {
        this.root.render(
            <>
                <WeChatSyncComponent 
                    app={this.app} 
                    settings={this.plugin.settings} 
                />
                <StyleConfigPanel 
                    settings={this.plugin.settings}
                    onSettingsChange={this.handleSettingsChange}
                />
            </>
        );
    }

    async onClose(): Promise<void> {
        this.root.unmount();
    }

    private handleSettingsChange = async (newSettings: Partial<WeChatSyncSettings>) => {
        await this.plugin.updateSettings(newSettings);
    };

    refresh() {
        this.renderView();
    }
}
