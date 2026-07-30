# UPES Physics · Applied Science Cluster

A responsive, static course-content website for undergraduate and postgraduate physics teaching.

Place the university logo at `upes-logo.png` in the repository root. The site header displays this image beside the **UPES Physics · Applied Science Cluster** identity.

## Local preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. Course data can be customised in `app.js`.

## Adding static HTML course material

Course material can live in its own folder, including its own stylesheets and assets. Use this structure:

```text
data/
├── ug/
│   └── sem1/
│       └── classical-mechanics/
│           ├── index.html
│           └── course.css
└── pg/
    └── sem1/
        └── advanced-quantum-mechanics/
            ├── index.html
            └── course.css
```

Link the HTML file from the matching course entry in `app.js` by adding its path as the fourth value:

```js
["PHY101", "Classical Mechanics", "Course description.", "data/ug/sem1/classical-mechanics/index.html"]
```

The course page embeds that file in an `iframe` and also provides an **Open in a new tab** link. Because an iframe is a separate document, a stylesheet referenced inside the course HTML—such as `<link rel="stylesheet" href="course.css">`—only styles that course and cannot override the main website. Paths are relative to the course HTML file, so images can similarly be placed beside it and referenced with `src="diagram.png"`.

The repository includes `data/ug/sem1/classical-mechanics/` as a working example. When adding another embedded course, set its fourth catalog value only for the semester in which that course appears. Keep folder and file names lowercase and avoid spaces so their GitHub Pages URLs remain predictable.

## Deployment

The GitHub Actions workflow deploys the site to GitHub Pages after a push to `main`, `master`, or `work`. In the repository settings, set **Pages → Source** to **GitHub Actions**.
