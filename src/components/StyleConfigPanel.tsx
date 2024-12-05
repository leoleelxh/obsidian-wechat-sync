import * as React from 'react';
import { WeChatSyncSettings } from '../settings';

interface StyleConfigPanelProps {
    settings: WeChatSyncSettings;
    onSettingsChange: (settings: Partial<WeChatSyncSettings>) => void;
}

export const StyleConfigPanel: React.FC<StyleConfigPanelProps> = ({
    settings,
    onSettingsChange
}) => {
    const handleFontSizeChange = (value: number) => {
        onSettingsChange({ fontSize: value });
    };

    const handleLineHeightChange = (value: number) => {
        onSettingsChange({ lineHeight: value });
    };

    return (
        <div className="style-config-panel">
            <div className="style-config-section">
                <h3>主题设置</h3>
                <div className="style-config-item">
                    <label>内容主题</label>
                    <select 
                        value={settings.selectedTheme}
                        onChange={(e) => onSettingsChange({ selectedTheme: e.target.value })}
                    >
                        <option value="default">默认主题</option>
                        <option value="elegant">优雅</option>
                        <option value="minimal">极简</option>
                        <option value="dark">暗色</option>
                        <option value="zhihu">知乎</option>
                        <option value="juejin">掘金</option>
                        <option value="chinese">中文</option>
                        <option value="wechatPro">微信专业版</option>
                    </select>
                </div>
            </div>

            <div className="style-config-section">
                <h3>字体设置</h3>
                <div className="style-config-item">
                    <label>字体大小: {settings.fontSize}px</label>
                    <input 
                        type="range"
                        min="12"
                        max="24"
                        step="1"
                        value={settings.fontSize}
                        onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                    />
                </div>
                <div className="style-config-item">
                    <label>行高: {settings.lineHeight}</label>
                    <input 
                        type="range"
                        min="1"
                        max="2.5"
                        step="0.05"
                        value={settings.lineHeight}
                        onChange={(e) => handleLineHeightChange(Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="style-config-section">
                <h3>颜色设置</h3>
                <div className="style-config-item">
                    <label>文本颜色</label>
                    <input 
                        type="color"
                        value={settings.textColor}
                        onChange={(e) => onSettingsChange({ textColor: e.target.value })}
                    />
                </div>
                <div className="style-config-item">
                    <label>链接颜色</label>
                    <input 
                        type="color"
                        value={settings.linkColor}
                        onChange={(e) => onSettingsChange({ linkColor: e.target.value })}
                    />
                </div>
            </div>

            <div className="style-config-section">
                <h3>代码设置</h3>
                <div className="style-config-item">
                    <label>代码主题</label>
                    <select 
                        value={settings.selectedCodeTheme}
                        onChange={(e) => onSettingsChange({ selectedCodeTheme: e.target.value })}
                    >
                        <option value="github">GitHub</option>
                        <option value="monokai">Monokai</option>
                        <option value="dracula">Dracula</option>
                        <option value="vs2015">VS2015</option>
                        <option value="atom-one-dark">Atom One Dark</option>
                    </select>
                </div>
            </div>

            <div className="style-config-section">
                <h3>自定义样式</h3>
                <div className="style-config-item">
                    <textarea
                        value={settings.customCSS}
                        onChange={(e) => onSettingsChange({ customCSS: e.target.value })}
                        placeholder="在此输入自定义 CSS..."
                    />
                </div>
            </div>
        </div>
    );
}; 