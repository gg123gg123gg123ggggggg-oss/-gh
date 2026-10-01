# 云闪部署项目

这个目录里就是需要部署到 Cloudflare Workers 的全部文件。

## 当前文件
- `worker.js`：Workers 主驱动 JS 文件
- `wrangler.toml`：部署配置
- `package.json`：本地部署脚本
- `README.md`：说明文档

## 部署前唯一要改的
打开 `wrangler.toml`，把：

```toml
id = "REPLACE_WITH_KV_NAMESPACE_ID"
```

替换成你真实创建好的 KV namespace ID。

## 部署命令
```bash
cd 云闪部署项目
npm install
npx wrangler login
npx wrangler deploy
```

本地测试：
```bash
cd 云闪部署项目
npx wrangler dev
```

## 说明
- 当前方案：Workers + KV
- 不使用 R2
- 不依赖本机 Android 服务器
- 图片上传/照片管理不可用，接口会明确返回错误说明