const { readWallpapers } = require('./_shared/wallpapers')

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const { wallpapers } = readWallpapers()
    if (!wallpapers.length) {
      return res.status(404).json({
        success: false,
        error: 'No wallpapers available',
      })
    }

    const wallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)]
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost'

    res.status(200).json({
      success: true,
      name: wallpaper.title,
      url: wallpaper.url,
      thumbnail: wallpaper.thumbnail,
      resolution: wallpaper.resolution,
      requestUrl: `${protocol}://${host}/api/rd`,
      wallpaper,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
}
