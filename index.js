const express = require('express');
const { createCanvas } = require('canvas');
const app = express();

app.get('/', (req, res) => {
  const p = Math.min(1, Math.max(0, parseFloat(req.query.p) || 0));
  
  const scale = 3;
  const W = 400, H = 60;
  const canvas = createCanvas(W * scale, H * scale);
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  const anchoProgreso = Math.max(p * W, p > 0 ? 60 : 0);
  const porcentaje = Math.round(p * 100) + '%';

  let color, emoji;
  if (p <= 0.16)      { color = '#FF3B30'; emoji = '😰'; }
  else if (p <= 0.33) { color = '#FF9500'; emoji = '😕'; }
  else if (p <= 0.50) { color = '#FFCC00'; emoji = '😐'; }
  else if (p <= 0.67) { color = '#d9ef9f'; emoji = '🙂'; }
  else if (p <= 0.84) { color = '#b7cd7f'; emoji = '😊'; }
  else                { color = '#4CD964'; emoji = '😁'; }

  // Fondo oscuro píldora
  ctx.fillStyle = '#3a3a3a';
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

  // Emoji en el borde de la barra
  if (p > 0) {
    ctx.font = '28px Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(emoji, anchoProgreso + 4, H / 2);
  }

  // Porcentaje en blanco sobre fondo oscuro
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(porcentaje, anchoProgreso + (W - anchoProgreso) / 2 + 16, H / 2);

  res.setHeader('Content-Type', 'image/png');
  canvas.createPNGStream().pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
