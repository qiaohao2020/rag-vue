# AI 知识库问答系统

基于 Vue 3 + TypeScript + Element Plus 开发的智能知识库问答系统，支持文档管理、智能问答、多语言切换等功能。

## 主要功能

- 📚 知识库管理：支持文档上传、分类管理、全文检索
- 💬 智能问答：基于大语言模型的智能问答系统
- 🌐 多语言支持：支持中文、英文等多语言切换
- 🎨 主题定制：支持深色/浅色主题切换
- 📱 响应式设计：支持多种设备屏幕尺寸

## 技术栈

- Vue 3：渐进式 JavaScript 框架
- TypeScript：JavaScript 的超集，提供类型系统
- Element Plus：基于 Vue 3 的组件库
- Vite：下一代前端构建工具

## 开发环境配置

推荐使用 [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 插件（需要禁用 Vetur）。

## TypeScript 支持

TypeScript 默认无法处理 `.vue` 文件的类型信息，因此我们使用 `vue-tsc` 替代 `tsc` 进行类型检查。在编辑器中，需要安装 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 插件来支持 `.vue` 文件的 TypeScript 语言服务。

## 自定义配置

查看 [Vite 配置参考](https://vite.dev/config/)。

## 项目设置

```sh
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## API 示例

```bash
# 调用 Ollama API 示例
curl http://localhost:11434/api/generate -X POST -H "Content-Type: application/json" -d '{"model":"llama3", "prompt":"你好，Ollama!"}'
```