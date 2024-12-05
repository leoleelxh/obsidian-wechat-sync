import { App, PluginSettingTab, Setting } from 'obsidian';
import WeChatSyncPlugin from './main';
import { themes } from './styles/themes';
import { codeThemes } from './styles/codeThemes';

export interface WeChatSyncSettings {
    platform: 'wechat' | 'zhihu' | 'juejin';
    selectedTheme: string;
    selectedCodeTheme: string;
    fontSize: number;
    lineHeight: number;
    customCSS: string;
}

export const DEFAULT_SETTINGS: WeChatSyncSettings = {
    platform: 'wechat',
    selectedTheme: 'default',
    selectedCodeTheme: 'github',
    fontSize: 16,
    lineHeight: 1.6,
    customCSS: '',
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

        containerEl.createEl('h2', { text: 'WeChat Sync 设置' });

        new Setting(containerEl)
            .setName('发布平台')
            .setDesc('选择要发布的目标平台')
            .addDropdown(dropdown => dropdown
                .addOption('wechat', '微信公众号')
                .addOption('zhihu', '知乎')
                .addOption('juejin', '掘金')
                .setValue(this.plugin.settings.platform)
                .onChange(async (value: 'wechat' | 'zhihu' | 'juejin') => {
                    this.plugin.settings.platform = value;
                    await this.plugin.saveSettings();
                })
            );

        new Setting(containerEl)
            .setName('内容主题')
            .setDesc('选择内容的显示主题')
            .addDropdown(dropdown => {
                Object.keys(themes).forEach(theme => {
                    dropdown.addOption(theme, theme);
                });
                return dropdown
                    .setValue(this.plugin.settings.selectedTheme)
                    .onChange(async (value) => {
                        this.plugin.settings.selectedTheme = value;
                        await this.plugin.saveSettings();
                    });
            });

        new Setting(containerEl)
            .setName('代码主题')
            .setDesc('选择代码块的显示主题')
            .addDropdown(dropdown => {
                Object.keys(codeThemes).forEach(theme => {
                    dropdown.addOption(theme, theme);
                });
                return dropdown
                    .setValue(this.plugin.settings.selectedCodeTheme)
                    .onChange(async (value) => {
                        this.plugin.settings.selectedCodeTheme = value;
                        await this.plugin.saveSettings();
                    });
            });

        new Setting(containerEl)
            .setName('字体大小')
            .setDesc('设置内容的字体大小（像素）')
            .addSlider(slider => slider
                .setLimits(12, 24, 1)
                .setValue(this.plugin.settings.fontSize)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    this.plugin.settings.fontSize = value;
                    await this.plugin.saveSettings();
                })
            );

        new Setting(containerEl)
            .setName('行距')
            .setDesc('设置内容的行距倍数')
            .addSlider(slider => slider
                .setLimits(1, 2, 0.1)
                .setValue(this.plugin.settings.lineHeight)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    this.plugin.settings.lineHeight = value;
                    await this.plugin.saveSettings();
                })
            );

        new Setting(containerEl)
            .setName('自定义 CSS')
            .setDesc('添加自定义 CSS 样式')
            .addTextArea(text => text
                .setValue(this.plugin.settings.customCSS)
                .onChange(async (value) => {
                    this.plugin.settings.customCSS = value;
                    await this.plugin.saveSettings();
                })
            );
    }
}
