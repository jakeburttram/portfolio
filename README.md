# Jake Burttram — Maker Portfolio

An editable, responsive portfolio for creative engineering and prototyping work.

## Run it locally

1. Install Node.js 22 or later.
2. Run `npm install` in this folder.
3. On macOS/Linux, run `npm run dev`. On Windows PowerShell, run `$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'; npx vinext dev`.
4. Open the local address shown in the terminal.

## Add or change a project

Open `app/page.tsx` and edit the `projects` list near the top. Each entry controls a gallery card and its detail view. Copy an existing entry to add another project.

## Replace project media

The current media panels are intentionally styled placeholders. To use an image, add it in `public/assets`, then replace the `project-media` button contents with an image:

```tsx
<img src="/assets/my-project.jpg" alt="Describe the project" />
```

For a demo video, use this accessible, control-free pattern:

```tsx
<video autoPlay muted loop playsInline preload="metadata">
  <source src="/assets/my-project-demo.mp4" type="video/mp4" />
</video>
```

Use an image poster or a simple text fallback if a video is unavailable. Keep videos short and compressed for fast loading.

## Resume and contact links

Put your PDF at `public/assets/Jake-Burttram-Resume.pdf`. Update the email address and the placeholder LinkedIn/GitHub links near the footer of `app/page.tsx`.

## Change the visual theme

Theme colors, fonts, spacing, and responsive behavior are organized at the top of `app/globals.css` as CSS variables.

## Deploy

### GitHub Pages

For a simple static deployment, build/export with your preferred static adapter, commit the output, then configure the repository’s Pages source in GitHub settings. Because this starter uses Vinext, deploying to Vercel or Netlify is usually simpler.

### Netlify or Vercel

Push this project to GitHub, import the repository into Netlify or Vercel, and use the platform’s detected Node build settings. Both services will build and deploy on every push.
