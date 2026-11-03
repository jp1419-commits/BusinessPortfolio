# Innovation Partner website

Marketing site for **Innovation Partner**, built with Angular 20 and Tailwind CSS 3 and deployed on Vercel.

Live site: https://innovation-partner.vercel.app/

## Editing content

All page text lives in [`src/content/company.json`](src/content/company.json), so most updates need no code
changes. The file is built into the app, so the page shows instantly; edits go live with the next deploy.

| Key | What it controls |
| --- | --- |
| `company` | Brand name, footer tagline, logo path |
| `hero` | Page 1: small label, headline (`highlight` is the blue part), subtitle, and the label above the Client Value points (`valuesLabel`) |
| `overview` | Page 2 labels and headlines for What We Deliver and How We Work |
| `services` | What We Deliver cards: title, description, illustration (`systems`, `software` or `operations`), tags |
| `process` | How We Work steps: title, description, icon |
| `roles` | Roles We Staff page: label, headline, intro, the role groups (title, icon, roles), and the closing line for roles not listed (`more`, `moreLink`) |
| `techStack` | Tech Stack page: label, headline, intro, the technology groups (title, icon, items, and `frame`: what the card is drawn as, `editor`, `browser`, `phone`, `sheet`, `rack` or `board`; a board also takes `columns`, which the items fill in order), and the closing line for anything not listed (`more`, `moreLink`) |
| `clientValue` | Client Value statements and their icons, shown on page 1 |
| `about` | About Us: label, headline, mission, vision, values (with icons) |
| `contact` | Get In Touch headline and intro, the email and phone card wording (`emailCta`, `phoneCta`), email, phone, location, LinkedIn |

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

- The site address https://innovation-partner.vercel.app appears in `public/robots.txt`,
  `public/sitemap.xml`, and the canonical and link-preview tags in `src/index.html`. Update all of them if the
  site moves to a custom domain.
- Link previews (LinkedIn, Facebook, Messenger, Viber, X) use the title, description and
  `public/og-image.jpg` (1200x630) set in `src/index.html`.
- Business details for search engines (schema.org structured data) are generated from `company.json` at
  runtime by `src/app/services/structured-data.service.ts`.
- Vercel Web Analytics is wired in `src/index.html`. Turn it on in Vercel under Project > Analytics > Enable.

## Project structure

- `src/app/components/`: one component per page section (hero, overview, roles, tech-stack, about, contact,
  navbar, footer), plus shared pieces (`backdrop` for section backgrounds, `icon`, `illustration`)
- `src/app/directives/reveal.directive.ts`: the fade-in-on-scroll animation
- `src/app/directives/carousel.directive.ts`: the sideways swipe carousels on phones (What We Deliver, Roles
  We Staff, Tech Stack) and their position dots
- `src/app/services/page-scroll.service.ts`: Reels-style page flipping. The slightest swipe, mouse wheel or
  trackpad gesture, or arrow key moves exactly one page, and in-page links open the page that contains their
  section. The pages scroll inside the app root (`.page-scroller` in `src/styles.css`), so phone browsers
  keep their toolbars still and each page fills exactly one screen.
- Pages: each full-screen page is an element marked `data-page` with the classes `snap-start snap-always`. A
  new page needs both, and should fit one screen at every size. On phones and tablets, What We Deliver and
  How We Work are separate pages; on desktop they share page 2.
- `src/styles.css`: shared styles. `tailwind.config.js`: brand colours (`primary`, `navy`, `ink`) and the
  breakpoints that keep pages within one screen: `phone` (narrower than 640px), `short` (phones and tablets
  up to 640px tall), and `compact` and `tight` (laptops up to 760px and 640px tall).
