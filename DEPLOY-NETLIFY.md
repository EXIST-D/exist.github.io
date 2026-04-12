# Netlify 部署指引

这份流程适合希望使用 Netlify 托管站点并开启 CMS 在线编辑的情况。

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

在 `public/admin/config.yml` 中，把 `repo` 改成你的仓库：

```
repo: your-github-name/your-repo-name
```

## 5. 验证上线

- 访问站点首页确认内容正常。
- 访问 `https://你的域名/admin` 进行在线编辑。

## 常见检查项

- Netlify 构建环境是否完成依赖安装
- GitHub 仓库权限与 CMS 认证是否正确配置
- `siteConfig.site` 是否改成真实域名
