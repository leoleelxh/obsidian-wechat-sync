# Changelog

All notable changes to the Obsidian WeChat Sync Plugin will be documented in this file.

## [0.1.0] - 2024-01-10

### Added
- 基础功能实现
  - Markdown 到微信公众号格式的转换
  - 富文本格式复制到剪贴板
  - 实时预览功能
  - 基础样式支持

### 核心功能
- 使用 `marked` 进行 Markdown 解析
- 自定义渲染器实现微信公众号样式
- 实现了 `ClipboardHelper` 工具类处理富文本复制
- 支持代码高亮（使用 highlight.js）

### 技术细节
- 使用 TypeScript 开发
- React 组件化开发
- Obsidian 插件 API 集成
- 实现了实时文件监听和内容更新

### 已知问题
- 部分复杂样式可能在微信编辑器中显示不正确
- 图片上传功能尚未实现
- 主题切换功能待完善

## [Unreleased]
### 计划功能
- 图片自动上传到图床
- 多主题支持
- 自定义样式配置
- PDF 导出功能
- 知乎、掘金等平台支持
- 批量处理功能
