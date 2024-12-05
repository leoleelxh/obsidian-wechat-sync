import { App, Notice, PluginSettingTab, Setting } from 'obsidian';
import type WeChatSyncPlugin from './main';

export interface WeChatSyncSettings {
    selectedTheme: string;
    selectedCodeTheme: string;
    platform: 'wechat' | 'zhihu' | 'juejin';
    customCSS: string;
}

export const DEFAULT_SETTINGS: WeChatSyncSettings = {
    selectedTheme: 'wechatPro',
    selectedCodeTheme: 'atom-one-dark',
    platform: 'wechat',
    customCSS: ''
};

export class WeChatSyncSettingTab extends PluginSettingTab {
    plugin: WeChatSyncPlugin;

    constructor(app: App, plugin: WeChatSyncPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: 'WeChat Sync Settings' });

        // Theme Setting
        new Setting(containerEl)
            .setName('Theme')
            .setDesc('Choose the theme for your content')
            .addDropdown(dropdown => dropdown
                .addOption('default', 'Default')
                .addOption('elegant', 'Elegant')
                .addOption('minimal', 'Minimal')
                .addOption('dark', 'Dark')
                .addOption('zhihu', 'Zhihu')
                .addOption('juejin', 'Juejin')
                .addOption('chinese', 'Chinese')
                .addOption('wechatPro', 'WeChat Pro')
                .setValue(this.plugin.settings.selectedTheme)
                .onChange(async (value) => {
                    this.plugin.settings.selectedTheme = value;
                    await this.plugin.saveSettings();
                    this.plugin.refreshPreview();
                }));

        // Code Theme Setting
        new Setting(containerEl)
            .setName('Code Theme')
            .setDesc('Choose the theme for code blocks')
            .addDropdown(dropdown => dropdown
                .addOption('github', 'GitHub')
                .addOption('monokai', 'Monokai')
                .addOption('dracula', 'Dracula')
                .addOption('vs2015', 'VS2015')
                .addOption('atom-one-dark', 'Atom One Dark')
                .setValue(this.plugin.settings.selectedCodeTheme)
                .onChange(async (value) => {
                    this.plugin.settings.selectedCodeTheme = value;
                    await this.plugin.saveSettings();
                    this.plugin.refreshPreview();
                }));

        // Platform Setting
        new Setting(containerEl)
            .setName('Platform')
            .setDesc('Choose the target platform')
            .addDropdown(dropdown => dropdown
                .addOption('wechat', 'WeChat')
                .addOption('zhihu', 'Zhihu')
                .addOption('juejin', 'Juejin')
                .setValue(this.plugin.settings.platform)
                .onChange(async (value: 'wechat' | 'zhihu' | 'juejin') => {
                    this.plugin.settings.platform = value;
                    await this.plugin.saveSettings();
                    this.plugin.refreshPreview();
                }));

        // Custom CSS Setting
        new Setting(containerEl)
            .setName('Custom CSS')
            .setDesc('Add custom CSS styles')
            .addTextArea(text => text
                .setValue(this.plugin.settings.customCSS)
                .onChange(async (value) => {
                    this.plugin.settings.customCSS = value;
                    await this.plugin.saveSettings();
                    this.plugin.refreshPreview();
                }));
    }
}
