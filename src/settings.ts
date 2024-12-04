import { App, PluginSettingTab, Setting } from 'obsidian';
import WeChatSyncPlugin from '../main';

export interface WeChatSyncSettings {
    theme: string;
    codeTheme: string;
    defaultPlatform: 'wechat' | 'zhihu' | 'juejin';
}

export const DEFAULT_SETTINGS: WeChatSyncSettings = {
    theme: 'default',
    codeTheme: 'github',
    defaultPlatform: 'wechat'
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

        new Setting(containerEl)
            .setName('主题')
            .setDesc('选择文章的主题样式')
            .addDropdown(dropdown => dropdown
                .addOption('default', '默认主题')
                .addOption('elegant', '优雅主题')
                .addOption('simple', '简约主题')
                .setValue(this.plugin.settings.theme)
                .onChange(async (value) => {
                    this.plugin.settings.theme = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('代码主题')
            .setDesc('选择代码块的主题样式')
            .addDropdown(dropdown => dropdown
                .addOption('github', 'GitHub')
                .addOption('monokai', 'Monokai')
                .addOption('dracula', 'Dracula')
                .setValue(this.plugin.settings.codeTheme)
                .onChange(async (value) => {
                    this.plugin.settings.codeTheme = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('默认平台')
            .setDesc('选择默认的发布平台')
            .addDropdown(dropdown => dropdown
                .addOption('wechat', '微信公众号')
                .addOption('zhihu', '知乎')
                .addOption('juejin', '掘金')
                .setValue(this.plugin.settings.defaultPlatform)
                .onChange(async (value: any) => {
                    this.plugin.settings.defaultPlatform = value;
                    await this.plugin.saveSettings();
                }));
    }
}
