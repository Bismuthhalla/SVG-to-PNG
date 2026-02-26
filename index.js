const express = require('express');
const { createCanvas } = require('canvas');
const app = express();

app.get('/', (req, res) => {
  const p = Math.min(1, Math.max(0, parseFloat(req.query.p) || 0));
  const anchoTotal = 300;
  const anchoProgreso = Math.max(p * anchoTotal, p > 0 ? 50 : 0);
  const porcentaje = Math.round(p * 100) + '%';

  let color;
  if (p <= 0.16)      color = '#FF3B30';
  else if (p <= 0.33) color = '#FF9500';
  else if (p <= 0.50) color = '#FFCC00';
  else if (p <= 0.67) color = '#d9ef9f';
  else if (p <= 0.84) color = '#b7cd7f';
  else                color = '#4CD964';

  const canvas = createCanvas(300, 50);
  const ctx = canvas.getContext('2d');

  // Fondo gris píldora
  ctx.fillStyle = '#d3d3d3';
  ctx.beginPath();
  ctx.roundRect(0, 0, 300, 50, 25);
  ctx.fill();

  // Barra de progreso
  if (anchoProgreso > 0) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(0, 0, anchoProgreso, 50, 25);
    ctx.fill();
  }

  // Texto porcentaje
  ctx.fillStyle = '#444444';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(porcentaje, 150, 28);

  res.setHeader('Content-Type', 'image/png');
  canvas.createPNGStream().pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
