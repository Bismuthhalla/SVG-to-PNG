const express = require('express');
const { createCanvas } = require('canvas');
const app = express();

app.get('/', (req, res) => {
  const p = Math.min(1, Math.max(0, parseFloat(req.query.p) || 0));
  
  // Alta resolución (x3)
  const scale = 3;
  const W = 400, H = 60;
  const canvas = createCanvas(W * scale, H * scale);
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  const anchoProgreso = Math.max(p * W, p > 0 ? 60 : 0);
  const porcentaje = Math.round(p * 100) + '%';

  let color, emoji;
  if (p <= 0.16)      { color = '#FF3B30'; emoji = '🔴'; }
  else if (p <= 0.33) { color = '#FF9500'; emoji = '🟠'; }
  else if (p <= 0.50) { color = '#FFCC00'; emoji = '🟡'; }
  else if (p <= 0.67) { color = '#d9ef9f'; emoji = '🌱'; }
  else if (p <= 0.84) { color = '#b7cd7f'; emoji = '✅'; }
  else                { color = '#4CD964'; emoji = '🏆'; }

  // Fondo gris píldora
  ctx.fillStyle = '#e0e0e0';
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, H / 2);
  ctx.fill();

  // Barra de progreso
  if (anchoProgreso > 0) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(0, 0, anchoProgreso, H, H / 2);
    ctx.fill();
  }

  // Emoji al final de la barra
  if (p > 0) {
    ctx.font = '22px Arial';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, anchoProgreso - 28, H / 2);
  }

  // Porcentaje pegado a la derecha de la barra
  ctx.fillStyle = p > 0.3 ? '#ffffff' : '#555555';
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText(porcentaje, anchoProgreso - 32, H / 2 + 1);

  res.setHeader('Content-Type', 'image/png');
  canvas.createPNGStream().pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
