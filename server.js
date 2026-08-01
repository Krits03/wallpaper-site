const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const wallpapersHandler = require('./api/wallpapers');
const rdHandler = require('./api/rd');

// 静态文件托管
app.use(express.static(path.join(__dirname, 'public')));

// 壁纸数据 API（本地开发时使用，Vercel 使用 api/ 目录下的 Functions）
app.get('/api/wallpapers', (req, res) => wallpapersHandler(req, res));
app.get('/api/rd', (req, res) => rdHandler(req, res));

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 本地开发时监听端口；Vercel 引入时直接导出 app
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Wallpaper Wall server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
