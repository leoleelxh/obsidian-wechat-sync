import * as React from 'react';
import { themes } from '../styles/themes';
import { codeThemes } from '../styles/codeThemes';

interface StyleConfigProps {
    theme: string;
    codeTheme: string;
    fontSize: number;
    lineHeight: number;
    customCSS: string;
    onChange: (settings: StyleConfigChanges) => void;
}

export interface StyleConfigChanges {
    theme?: string;
    codeTheme?: string;
    fontSize?: number;
    lineHeight?: number;
    customCSS?: string;
}

export const StyleConfig: React.FC<StyleConfigProps> = ({
    theme,
    codeTheme,
    fontSize,
    lineHeight,
    customCSS,
    onChange
}) => {
    return (
        <div className="style-config-panel">
            <div className="style-config-section">
                <h3>主题设置</h3>
                <div className="style-config-item">
                    <label>内容主题</label>
                    <select 
                        value={theme}
                        onChange={(e) => onChange({ theme: e.target.value })}
                    >
                        {Object.keys(themes).map((themeName) => (
                            <option key={themeName} value={themeName}>
                                {themeName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="style-config-item">
                    <label>代码主题</label>
                    <select 
                        value={codeTheme}
                        onChange={(e) => onChange({ codeTheme: e.target.value })}
                    >
                        {Object.keys(codeThemes).map((themeName) => (
                            <option key={themeName} value={themeName}>
                                {themeName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="style-config-section">
                <h3>排版设置</h3>
                <div className="style-config-item">
                    <label>字体大小 ({fontSize}px)</label>
                    <input 
                        type="range"
                        min="12"
                        max="24"
                        value={fontSize}
                        onChange={(e) => onChange({ fontSize: parseInt(e.target.value) })}
                    />
                </div>

                <div className="style-config-item">
                    <label>行距 ({lineHeight})</label>
                    <input 
                        type="range"
                        min="1"
                        max="2"
                        step="0.1"
                        value={lineHeight}
                        onChange={(e) => onChange({ lineHeight: parseFloat(e.target.value) })}
                    />
                </div>
            </div>

            <div className="style-config-section">
                <h3>自定义 CSS</h3>
                <div className="style-config-item">
                    <textarea
                        value={customCSS}
                        onChange={(e) => onChange({ customCSS: e.target.value })}
                        placeholder="输入自定义 CSS..."
                        rows={5}
                    />
                </div>
            </div>
        </div>
    );
};
