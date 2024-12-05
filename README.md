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

- 主题选择：支持多种预设主题
- 代码高亮样式：多种代码配色方案
- 图片处理：可配置图片上传方式
- 自定义 CSS：支持自定义样式

## 📝 实现思路

### 核心架构

```
obsidian-wechat-sync/
├── src/
│   ├── main.ts              # 插件主入口
│   ├── view.tsx             # 视图组件
│   ├── settings.ts          # 设置管理
│   ├── components/          # React 组件
│   │   └── WeChatSync.tsx   # 主界面组件
│   └── utils/              # 工具类
│       ├── markdown.ts     # Markdown 转换
│       └── clipboard.ts    # 剪贴板处理
```

### 关键实现方法

1. **Markdown 转换流程**
   - 使用 `marked` 库解析 Markdown
   - 自定义渲染器处理各类节点
   - 添加微信公众号特定样式
   - 优化图片和代码块显示

2. **富文本复制实现**
   - 使用 `ClipboardHelper` 处理复制
   - 保持样式和格式信息
   - 优化 HTML 结构
   - 处理特殊字符和编码

3. **实时预览功能**
   - 监听文件变化
   - 实时转换更新
   - React 状态管理
   - 性能优化

4. **样式处理策略**
   - 内联样式优先
   - 适配微信编辑器
   - 主题系统支持
   - 响应式设计

### 技术要点

1. **Markdown 解析优化**
   ```typescript
   class MarkdownConverter {
       private renderer: marked.Renderer;
       
       constructor() {
           this.renderer = new marked.Renderer();
           this.setupMarked();
       }
       
       private setupMarked() {
           // 自定义渲染规则
           this.renderer.heading = (text, level) => {
               // 处理标题
           };
           
           this.renderer.code = (code, language) => {
               // 处理代码块
           };
           
           // 更多渲染器配置...
       }
   }
   ```

2. **剪贴板处理**
   ```typescript
   class ClipboardHelper {
       public static async copyToClipboard(html: string) {
           // 处理富文本复制
       }
       
       public static optimizeForWeChat(html: string) {
           // 优化 HTML 结构
       }
   }
   ```

3. **React 组件设计**
   ```typescript
   const WeChatSyncComponent: React.FC = () => {
       // 状态管理
       const [content, setContent] = useState('');
       
       // 文件监听
       useEffect(() => {
           // 监听文件变化
       }, []);
       
       // 渲染逻辑
       return (
           // UI 组件
       );
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
