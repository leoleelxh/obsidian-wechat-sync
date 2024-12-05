import { App, Notice, PluginSettingTab, Setting } from 'obsidian';
import type WeChatSyncPlugin from './main';

export interface WeChatSyncSettings {
    selectedTheme: string;
    selectedCodeTheme: string;
    platform: 'wechat' | 'zhihu' | 'juejin';
    customCSS: string;
    fontSize: number;
    lineHeight: number;
    fontFamily: string;
    textColor: string;
    linkColor: string;
    codeBackground: string;
    blockquoteColor: string;
}

export const DEFAULT_SETTINGS: WeChatSyncSettings = {
    selectedTheme: 'wechatPro',
    selectedCodeTheme: 'atom-one-dark',
    platform: 'wechat',
    customCSS: '',
    fontSize: 16,
    lineHeight: 1.75,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    textColor: '#333333',
    linkColor: '#576b95',
    codeBackground: '#f8f8f8',
    blockquoteColor: '#888888'
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

        containerEl.createEl('h2', { text: '微信同步设置' });

        containerEl.createEl('h3', { text: '平台设置' });
        
        new Setting(containerEl)
            .setName('目标平台')
            .setDesc('选择要发布的平台')
            .addDropdown(dropdown => dropdown
                .addOption('wechat', '微信公众号')
                .addOption('zhihu', '知乎')
                .addOption('juejin', '掘金')
                .setValue(this.plugin.settings.platform)
                .onChange(async (value: 'wechat' | 'zhihu' | 'juejin') => {
                    this.plugin.settings.platform = value;
                    await this.plugin.saveSettings();
                    this.plugin.refreshPreview();
                }));

        containerEl.createEl('h3', { text: '主题设置' });

        new Setting(containerEl)
            .setName('内容主题')
            .setDesc('选择文章的整体风格')
            .addDropdown(dropdown => dropdown
                .addOption('default', '默认主题')
                .addOption('elegant', '优雅')
                .addOption('minimal', '极简')
                .addOption('dark', '暗色')
                .addOption('zhihu', '知乎')
                .addOption('juejin', '掘金')
                .addOption('chinese', '中文')
                .addOption('wechatPro', '微信专业版')
                .setValue(this.plugin.settings.selectedTheme)
                .onChange(async (value) => {
                    this.plugin.settings.selectedTheme = value;
                    await this.plugin.saveSettings();
                    this.plugin.refreshPreview();
                }));

        containerEl.createEl('h3', { text: '字体设置' });

        new Setting(containerEl)
            .setName('字体大小')
            .setDesc('设置正文字体大小（像素）')
            .addSlider(slider => slider
                .setLimits(12, 24, 1)
                .setValue(this.plugin.settings.fontSize)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    this.plugin.settings.fontSize = value;
                    await this.plugin.saveSettings();
                    this.plugin.refreshPreview();
                }));

        new Setting(containerEl)
            .setName('行高')
            .setDesc('设置文本行高')
            .addSlider(slider => slider
                .setLimits(1, 2.5, 0.05)
                .setValue(this.plugin.settings.lineHeight)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    this.plugin.settings.lineHeight = value;
                    await this.plugin.saveSettings();
                    this.plugin.refreshPreview();
                }));

        containerEl.createEl('h3', { text: '颜色设置' });

        new Setting(containerEl)
            .setName('文本颜色')
            .setDesc('设置正文文本颜色')
            .addText(text => text
                .setValue(this.plugin.settings.textColor)
                .onChange(async (value) => {
                    this.plugin.settings.textColor = value;
                    await this.plugin.saveSettings();
                    this.plugin.refreshPreview();
                }));

        new Setting(containerEl)
            .setName('链接颜色')
            .setDesc('设置链接文本颜色')
            .addText(text => text
                .setValue(this.plugin.settings.linkColor)
                .onChange(async (value) => {
                    this.plugin.settings.linkColor = value;
                    await this.plugin.saveSettings();
                    this.plugin.refreshPreview();
                }));

        containerEl.createEl('h3', { text: '代码设置' });

        new Setting(containerEl)
            .setName('代码主题')
            .setDesc('选择代码块的高亮主题')
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

        containerEl.createEl('h3', { text: '自定义样式' });

        new Setting(containerEl)
            .setName('自定义 CSS')
            .setDesc('添加自定义 CSS 样式（将覆盖默认样式）')
            .addTextArea(text => text
                .setValue(this.plugin.settings.customCSS)
                .setPlaceholder('在此输入自定义 CSS...')
                .onChange(async (value) => {
                    this.plugin.settings.customCSS = value;
                    await this.plugin.saveSettings();
                    this.plugin.refreshPreview();
                }));
    }
}
