const { readWallpapers } = require('./_shared/wallpapers')

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const data = readWallpapers()
    res.status(200).json({
      success: true,
      ...data,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
}
