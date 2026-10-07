// Zet de Docusaurus-build om in omleidingen naar de nieuwe plek van de site.
//
// De site is verhuisd naar https://wo.coderius.nl/onderzoek/ (monorepo
// Coderius-Education/docs, map sites/wo/onderzoek). GitHub Pages kan geen
// echte 301 geven, dus maken we voor elke pagina uit de oude build een
// HTML-pagina met canonical, meta refresh en location.replace naar hetzelfde
// pad op de nieuwe site. Een onbekend pad valt op 404.html, die het pad zelf
// uit de adresbalk haalt.
//
// Gebruik: node scripts/maak-omleidingen.mjs build omleiding

import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';

const NIEUW = 'https://wo.coderius.nl/onderzoek';
const OUD_BASIS = '/onderzoek';

const [bron = 'build', doel = 'omleiding'] = process.argv.slice(2);

function htmlBestanden(map) {
  return readdirSync(map, { withFileTypes: true }).flatMap((item) => {
    const pad = join(map, item.name);
    if (item.isDirectory()) return htmlBestanden(pad);
    return item.name.endsWith('.html') ? [pad] : [];
  });
}

// build/spelregels/valide.html -> /spelregels/valide
// build/index.html             -> /
// build/werkvormen/index.html  -> /werkvormen
function routeVan(bestand) {
  const pad = relative(bron, bestand).split(sep).join('/');
  const zonderExtensie = pad.replace(/\.html$/, '').replace(/(^|\/)index$/, '');
  return `/${zonderExtensie}`;
}

const escape = (tekst) =>
  tekst.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function pagina(doelUrl, script) {
  const url = escape(doelUrl);
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<title>Onderzoek is verhuisd</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta http-equiv="refresh" content="0; url=${url}">
<script>${script}</script>
</head>
<body>
<p>Deze site is verhuisd naar <a href="${url}">${url}</a>.</p>
</body>
</html>
`;
}

rmSync(doel, { recursive: true, force: true });

let aantal = 0;
for (const bestand of htmlBestanden(bron)) {
  const uit = join(doel, relative(bron, bestand));
  mkdirSync(dirname(uit), { recursive: true });

  if (relative(bron, bestand) === '404.html') {
    const script = `var p=location.pathname.replace(/^${OUD_BASIS.replace(/\//g, '\\/')}(?=\\/|$)/,'').replace(/\\.html$/,'');location.replace(${JSON.stringify(NIEUW)}+(p||'/')+location.search+location.hash);`;
    writeFileSync(uit, pagina(`${NIEUW}/`, script));
  } else {
    const doelUrl = NIEUW + routeVan(bestand);
    const script = `location.replace(${JSON.stringify(doelUrl)}+location.search+location.hash);`;
    writeFileSync(uit, pagina(doelUrl, script));
  }
  aantal++;
}

writeFileSync(join(doel, '.nojekyll'), '');
console.log(`${aantal} omleidingen geschreven naar ${doel}/`);
