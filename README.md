# Onderzoek

> **Verhuisd.** Deze site staat nu op **https://wo.coderius.nl/onderzoek/** en wordt
> bijgehouden in [Coderius-Education/docs](https://github.com/Coderius-Education/docs)
> (map `sites/wo/onderzoek`). Wijzig het lesmateriaal daar, niet hier.
>
> De GitHub Pages-site van deze repo stuurt elke pagina door naar hetzelfde pad op
> de nieuwe site (zie `scripts/maak-omleidingen.mjs`).

Materiaal voor het doen van onderzoek, gericht op bovenbouw havo/vwo. Gebouwd met [Docusaurus](https://docusaurus.io/) en gehost op GitHub Pages:

**https://coderius-education.github.io/onderzoek/**

## Lokaal draaien

Vereist Node.js 20 of hoger.

```bash
npm install
npm start
```

De site draait dan op http://localhost:3000/onderzoek/ en herlaadt automatisch bij wijzigingen.

## Productie-build

```bash
npm run build
```

De statische site komt in de map `build/`.

## Deployment

Elke push naar `main` bouwt en publiceert de site automatisch via de GitHub Actions-workflow in `.github/workflows/deploy.yml`.

**Eenmalige instelling:** zet in de repo onder **Settings → Pages → Build and deployment → Source** de optie op **"GitHub Actions"**.

## Inhoud toevoegen

Pagina's zijn Markdown-bestanden in `docs/`. Voeg een nieuw bestand toe en zet het id in `sidebars.js` om het in het menu te tonen.
