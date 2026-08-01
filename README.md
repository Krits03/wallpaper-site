# Wallpaper Wall

一个 为Echoes678建立的壁纸墙网站。前端使用 Vue 3 + Element Plus，后端使用 Node.js + Express，推荐部署到 Vercel ，以使用serverless服务

## 技术栈

- 前端：Vue 3、Vite、Element Plus
- 后端：Node.js、Express
- 部署：Vercel（Serverless Functions）

### 环境要求

- Node.js 20+ (推荐24)

>[!WARNING]
>因为太懒，所以以下内容由AI编写，仅做审查与些许修改

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

- 前端开发服务器：http://localhost:5173 （Vite 会将 /api 代理到 3000 端口）
- 后端 API 服务器：http://localhost:3000

也可以分开启动：

```bash
npm run dev:server   # 仅后端
npm run dev:client   # 仅前端 Vite
```

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `public/` 目录。

### 本地预览

```bash
npm start
```

启动 Express 服务器并托管 `public/` 下的静态文件，访问 http://localhost:3000。


部署时 `api/` 目录下的文件会作为 Serverless Functions 运行，无需额外配置。

## 项目结构

```
.
├── api/                  # Vercel Serverless Functions
│   ├── wallpapers.js     # 壁纸列表接口
│   ├── rd.js             # 随机壁纸接口
│   └── _shared/          # 共享逻辑
├── client/               # Vue 3 前端源码
│   ├── src/
│   │   ├── components/   # WallpaperCard、PreviewDialog 等组件
│   │   ├── composables/  # useWallpapers 组合式函数
│   │   ├── App.vue
│   │   └── main.js
│   └── vite.config.js    # 构建输出到 public/，dev 代理 /api
├── public/               # 构建产物（由 vite build 生成，已 gitignore）
├── server.js             # 本地 Express 服务器
├── wallpapers.json       # 壁纸数据
├── vercel.json           # Vercel 配置
└── package.json
```

## API

本地开发时由 `server.js` 提供，部署到 Vercel 后由 `api/` 下的 Serverless Functions 提供：

| 接口 | 说明 |
| --- | --- |
| `GET /api/wallpapers` | 壁纸列表，支持分类和关键词过滤 |
| `GET /api/rd` | 随机推荐壁纸 |
| `GET /api/health` | 健康检查 |

