const fs = require('fs')
const path = require('path')

let cachedData = null
let categoriesCache = null
let lastMTime = 0

function readWallpapers() {
  const filePath = path.join(process.cwd(), 'wallpapers.json')
  const stats = fs.statSync(filePath)

  if (cachedData && stats.mtimeMs === lastMTime) {
    return { wallpapers: cachedData, categories: categoriesCache }
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(raw)
  cachedData = data.wallpapers || []
  categoriesCache = data.categories || []
  lastMTime = stats.mtimeMs

  return { wallpapers: cachedData, categories: categoriesCache }
}

module.exports = { readWallpapers }
