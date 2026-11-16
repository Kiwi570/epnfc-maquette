import sharp from 'sharp';
const L = [['accueil-ouverture',1168,784],['accueil-ouverture-mobile',784,1168],['accueil-initiation',784,1168],['initiation-ouverture',784,1168],['reserver-ouverture',1168,784],['reserver-ouverture-mobile',784,1168],['appel-fond',1168,784],['page-404',1168,784]];
for (const [n,w,h] of L) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5f97cf"/><stop offset=".62" stop-color="#cfe2f1"/><stop offset=".63" stop-color="#8fb27a"/><stop offset="1" stop-color="#5d8a4e"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><ellipse cx="${w*.62}" cy="${h*.56}" rx="${w*.2}" ry="${h*.04}" fill="#fff" opacity=".8"/></svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 80 }).toFile(`recu/grok/${n}.jpg`);
}
console.log('ok');
