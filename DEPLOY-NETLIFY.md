# Netlify 部署指引（归档）

这份流程仅作为历史参考。当前仓库的正式方案是：

- 站点托管：GitHub Pages
- 在线编辑：Pages CMS
- 内容格式：Markdown + LaTeX

如果你准备继续用 Netlify，这份文档仍然可以作为参考。

## 1. 准备仓库

- GitHub 仓库名
- 已提交本项目代码

## 2. 在 Netlify 新建站点

1. 进入 Netlify Dashboard，点击 Add new site。
2. 选择从 GitHub 连接仓库。
3. 选择目标仓库并配置构建参数：
   - Build command: `npm run build`
   - Publish directory: `dist`

## 3. 开启 CMS 登录

1. 打开 Site configuration -> Identity。
2. 启用 Identity。
3. 在 Identity 设置中启用 Git Gateway。

## 4. 修改 CMS 配置

旧方案里需要改 `public/admin/config.yml`。当前仓库已经切换到 Pages CMS，所以这一步只保留作历史说明，不再需要手动修改这个文件。

## 5. 验证上线

- 访问站点首页确认内容正常。
- 访问 `https://你的域名/admin` 时，当前仓库会引导你进入 Pages CMS。

## 常见检查项

- Netlify 构建环境是否完成依赖安装
- GitHub 仓库权限与 CMS 认证是否正确配置
- `siteConfig.site` 是否改成真实域名
