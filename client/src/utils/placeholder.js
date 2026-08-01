export function generatePlaceholder(id) {
  const num = parseInt(String(id).replace(/\D/g, ''), 10) || 0
  const hue1 = Math.round((num * 137.5) % 360)
  const hue2 = Math.round((hue1 + 45) % 360)
  return `linear-gradient(135deg, hsl(${hue1} 65% 78%), hsl(${hue2} 65% 72%))`
}
