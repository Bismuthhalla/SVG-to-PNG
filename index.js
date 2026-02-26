const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const progress = Math.min(100, Math.max(0, parseFloat(req.query.p) || 0) * 100);
  const title = req.query.title || '';
  const borderRadius = 4;
  const height = 20;
  const fontSize = 11;
  const titleWidth = title ? 10 + (6 * title.length) : 0;
  const progressWidth = title ? 60 : 90;
  const totalWidth = titleWidth + progressWidth;

  let progressColor;
  const ratio = progress / 100;
  if (ratio < 0.3)       progressColor = 'd9534f';
  else if (ratio < 0.7)  progressColor = 'f0ad4e';
  else                   progressColor = '5cb85c';

  const fillWidth = Math.round(Math.min(progress / 100, 1) * progressWidth);
  const titleColor = '428bca';
  const progressBackground = '555';
  const textColor = 'fff';
  const titlePosX = 5;
  const titlePosY = 14;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${totalWidth}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="a" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
      <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <clipPath id="progress_clip">
      <rect rx="${borderRadius}" x="${titleWidth}" width="${progressWidth}" height="100%"/>
    </clipPath>
  </defs>
  <rect rx="${borderRadius}" x="0" width="${totalWidth}" height="100%" fill="#${titleColor}"/>
  <rect rx="${borderRadius}" x="${titleWidth}" width="${progressWidth}" height="100%" fill="#${progressBackground}"/>
  <rect rx="${borderRadius}" x="${titleWidth}" width="${fillWidth}" height="100%" fill="#${progressColor}"/>
  ${title ? `<rect x="${titleWidth}" y="0" width="4" height="100%" fill="#${progressColor}"/>` : ''}
  <rect rx="${borderRadius}" width="${totalWidth}" height="100%" fill="url(#a)"/>
  ${title ? `
  <g fill="#${textColor}" text-anchor="left" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${fontSize}">
    <text x="${titlePosX}" y="${titlePosY + 1}" fill="#010101" fill-opacity=".3">${title}</text>
    <text x="${titlePosX}" y="${titlePosY}">${title}</text>
  </g>` : ''}
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${fontSize}" font-weight="bold">
    <text x="${Math.round(progressWidth / 2) + titleWidth}" y="${titlePosY + 1}" fill="#010101" fill-opacity=".3">${Math.round(progress)}%</text>
    <text x="${Math.round(progressWidth / 2) + titleWidth}" y="${titlePosY}">${Math.round(progress)}%</text>
  </g>
</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-cache');
  res.send(svg);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
