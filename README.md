# Obsidian WeChat Sync Plugin

一个强大的 Obsidian 插件，用于将 Markdown 笔记优雅地同步到微信公众号等中文内容平台。

## ✨ 特性

- 🎨 精美的微信公众号样式
- 📝 完整的 Markdown 语法支持
- 🖼️ 图片自动处理和优化
- 📋 一键复制到剪贴板
- 🎯 多平台支持（微信公众号、知乎、掘金等）
- 🎭 自定义主题支持

## 🚀 安装

1. 在 Obsidian 中打开设置
2. 进入第三方插件设置
3. 关闭安全模式
4. 点击浏览社区插件
5. 搜索 "WeChat Sync"
6. 点击安装
7. 启用插件

## 💡 使用方法

1. 在 Obsidian 中打开任意 Markdown 文件
2. 点击侧边栏的微信同步图标
3. 在预览窗口中查看效果
4. 点击复制按钮将内容复制到剪贴板
5. 直接粘贴到微信公众号编辑器中

## 🔧 配置选项

- 主题选择：8 种预设主题（default、elegant、minimal、dark、zhihu、juejin、chinese、wechatPro）
- 代码高亮：5 种代码主题（github、monokai、dracula、vs2015、atom-one-dark）
- 平台适配：支持微信公众号、知乎、掘金
- 自定义 CSS：支持自定义样式注入

## 📝 实现思路

### 核心架构

```
obsidian-wechat-sync/
├── src/
│   ├── main.ts              # 插件主入口
│   ├── settings.ts          # 设置管理
│   ├── styles/             # 样式系统
│   │   ├── themes.ts      # 主题定义
│   │   └── codeThemes.ts  # 代码主题
│   └── utils/             # 工具类
│       ├── markdown.ts    # Markdown 转换
│       └── clipboard.ts   # 剪贴板处理
```

### 关键实现方法

1. **Markdown 转换流程**
   - 使用 TypeScript 实现类型安全的转换器
   - 自定义渲染器处理各类节点
   - 动态主题和代码高亮应用
   - 平台特定优化

2. **富文本复制实现**
   - 类型安全的剪贴板工具类
   - HTML 结构优化
   - 样式保持和兼容性处理
   - 错误处理和用户反馈

3. **主题系统**
   - 8 种预设内容主题
   - 5 种代码高亮主题
   - 类型安全的主题定义
   - 自定义 CSS 注入支持

4. **设置管理**
   - 类型安全的设置接口
   - 主题和代码主题选择
   - 平台选择
   - 自定义样式配置

### 技术实现

1. **插件主体**
   ```typescript
   export default class WeChatSyncPlugin extends Plugin {
       settings: WeChatSyncSettings;
       private markdownConverter: MarkdownConverter;

       async onload() {
           // 加载设置
           // 初始化转换器
           // 注册命令
           // 添加设置界面
       }
   }
   ```

2. **设置管理**
   ```typescript
   export interface WeChatSyncSettings {
       selectedTheme: string;
       selectedCodeTheme: string;
       platform: 'wechat' | 'zhihu' | 'juejin';
       customCSS: string;
   }
   ```

3. **主题系统**
   ```typescript
   interface Theme {
       name: string;
       styles: {
           [key: string]: string;
       };
   }
   ```

## 🛠️ 开发

```bash
# 克隆项目
git clone https://github.com/yourusername/obsidian-wechat-sync.git

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建项目
npm run build
```

## 📝 开发环境要求

- Node.js >= 14
- TypeScript >= 4.0
- Obsidian >= 0.12.0

## 🤝 贡献指南

欢迎提交 Pull Request 或 Issue！

1. Fork 本仓库
2. 创建新分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'Add some feature'`
4. 推送分支：`git push origin feature/your-feature`
5. 提交 Pull Request

## 📄 许可证

[MIT](LICENSE) 2024

## 🙏 致谢

- [Obsidian](https://obsidian.md/)
- [marked](https://marked.js.org/)
- [highlight.js](https://highlightjs.org/)
