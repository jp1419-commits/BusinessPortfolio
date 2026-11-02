# Innovation Partner website

Marketing site for **Innovation Partner**, built with Angular 20 and Tailwind CSS 3 and deployed on Vercel.

Live site: https://innovation-partner.vercel.app/

## Editing content

All page text lives in [`src/assets/company.json`](src/assets/company.json), so most updates need no code changes.

| Key | What it controls |
| --- | --- |
| `company` | Brand name, footer tagline, logo path |
| `hero` | Page 1: small label, headline (`highlight` is the blue part), subtitle |
| `overview` | Page 2 labels and headlines for What We Deliver, How We Work and Client Value |
| `services` | What We Deliver cards: title, description, illustration (`systems`, `software` or `operations`), tags |
| `process` | How We Work steps: title, description, icon |
| `clientValue` | Client Value statements and their icons |
| `about` | About Us: label, headline, mission, vision, values (with icons) |
| `contact` | Get In Touch copy, email, phone, location, LinkedIn |

Icons are referenced by name. The available names are listed in `IconName` in
[`src/app/models/company.model.ts`](src/app/models/company.model.ts).

## Development

```bash
npm install
```

```bash
npm start
```

The dev server runs at http://localhost:4200 and reloads on changes.

```bash
npm run build
```

The production build goes to `dist/project/browser`.

## Deployment

Vercel builds and deploys the site automatically on every push to `main`. Pushes to other branches get
preview deployments.

## Search engines and analytics

- `public/robots.txt` and `public/sitemap.xml` point at https://innovation-partner.vercel.app. Update both
  if the site moves to a custom domain.
- Business details for search engines (schema.org structured data) are generated from `company.json` at
  runtime by `src/app/services/structured-data.service.ts`.
- Vercel Web Analytics is wired in `src/index.html`. Turn it on in Vercel under Project > Analytics > Enable.

## Project structure

- `src/app/components/`: one component per page section (hero, overview, about, contact, navbar, footer),
  plus shared pieces (`backdrop` for section backgrounds, `icon`, `illustration`)
- `src/app/directives/reveal.directive.ts`: the fade-in-on-scroll animation
- `src/styles.css`: shared styles; `tailwind.config.js`: brand colours (`primary`, `navy`, `ink`) and the
  `compact` breakpoint for short laptop screens
