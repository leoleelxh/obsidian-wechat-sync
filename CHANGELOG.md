# Changelog

All notable changes to the Obsidian WeChat Sync Plugin will be documented in this file.

## [0.2.1] - 2024-01-16

### Fixed
- 修复字号和行距设置不生效的问题
  - 更新了 MarkdownConverter 以正确处理字号和行距参数
  - 改进了主题系统中的样式应用逻辑
  - 优化了动态样式更新机制

### Enhanced
- 改进了样式系统的类型安全性
- 优化了实时预览的性能
- 提升了样式设置的响应速度

## [0.2.0] - 2024-01-15

### Added
- 主题系统
  - 8 种预设主题（default、elegant、minimal、dark、zhihu、juejin、chinese、wechatPro）
  - 5 种代码高亮主题（github、monokai、dracula、vs2015、atom-one-dark）
  - 类型安全的主题定义系统
  - 自定义 CSS 注入支持

### Enhanced
- 类型系统改进
  - 添加完整的 TypeScript 类型定义
  - 类型安全的设置接口
  - 改进错误处理和类型检查
- 多平台支持
  - 微信公众号优化
  - 知乎平台支持
  - 掘金平台支持
- 设置系统优化
  - 主题和代码主题选择器
  - 平台选择器
  - 自定义 CSS 编辑器

### Fixed
- 修复类型错误和导入问题
- 改进错误处理和用户反馈
- 优化 HTML 结构和样式兼容性

### Technical
- 重构项目结构，提高代码组织性
- 改进构建系统和开发工具配置
- 添加类型安全的 API 调用

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
