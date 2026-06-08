# GitHub Pages 发布流程

当前站点部署在 GitHub Pages。

仓库地址：

- `https://github.com/EXIST-D/exist.github.io`

线上地址：

- `https://exist-d.github.io/exist.github.io/`

## 自动发布

`.github/workflows/deploy.yml` 会在 `main` 分支收到新提交后自动执行：

1. 安装依赖
2. 运行 `npm run build`
3. 上传 `dist`
4. 发布到 GitHub Pages

## 本地发布流程

```bash
cd D:\User\Desktop\exist.github.io
npm run build
git add .
git commit -m "Update site"
git push origin main
```

推送后打开 GitHub 仓库的 `Actions` 页面，等待部署任务完成。

## 路径说明

这个仓库作为项目页部署，站点使用 `/exist.github.io/` 作为 base path。

因此：

- 正确：首页 `https://exist-d.github.io/exist.github.io/`
- 正确：项目页 `https://exist-d.github.io/exist.github.io/projects/`
- 错误：`https://exist-d.github.io/projects/`

如果以后改成用户主页仓库根路径或自定义域名，需要同步调整 `astro.config.mjs` 中的 `base`。
