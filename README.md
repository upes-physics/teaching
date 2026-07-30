# UPES Physics · Applied Science Cluster

A responsive, static course-content website for undergraduate and postgraduate physics teaching.

Place the university logo at `upes-logo.png` in the repository root. The site header displays this image beside the **UPES Physics · Applied Science Cluster** identity. Until the image is present, the header uses a compact text fallback instead of showing a broken image.

## Local preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. Course data can be customised in `app.js`.

## Updating courses by semester

Courses are grouped under `coursesBySemester` in `app.js`. Add each course to the numbered semester in which it should appear:

```js
coursesBySemester: {
  1: [
    {
      code: "PHY101",
      name: "Classical Mechanics",
      description: "Course description.",
      dataCard: "data/ug/sem1/classical-mechanics/datacard.json",
      content: "data/ug/sem1/classical-mechanics/index.html"
    }
  ],
  2: [],
  3: []
}
```

`dataCard` is required and points to the JSON file used to construct the course landing page. `content` is optional and embeds a separate static HTML lesson beneath the generated landing page. Keep an empty array for a semester that does not have course information yet. The semester cards automatically show the number of configured courses.

### Course data-card format

Every course folder contains a `datacard.json` with the course identity, L–T–P–C credit breakdown, objectives, outcomes and syllabus:

```json
{
  "courseCode": "PHY101",
  "courseName": "Classical Mechanics",
  "credits": { "L": 3, "T": 1, "P": 0, "C": 4 },
  "objectives": [
    "Develop a mathematical understanding of motion and forces."
  ],
  "outcomes": [
    { "code": "CO1", "statement": "Apply Newton's laws to physical systems." },
    { "code": "CO2", "statement": "Use conservation laws to solve problems." }
  ],
  "syllabus": [
    {
      "title": "Kinematics and Newton's Laws",
      "lectureHours": 10,
      "topics": "Reference frames, vectors, motion and equations of motion."
    }
  ]
}
```

The course landing page reads this file at runtime, so objectives, outcomes, credit values and syllabus units can be updated without editing HTML or the rendering logic.

The root `index.html` and `app.js` are shared by every course; do not create a
separate landing-page `index.html` in each course folder. Once a course is added
to `coursesBySemester`, its card links to the shared renderer using the stable
course code, for example:

```text
?view=course&level=undergraduate&semester=1&course=PHYS1037
```

Only add a course-folder `index.html` when the course has optional standalone
lesson material to embed beneath its generated data-card landing page.

## Adding static HTML course material

Course material can live in its own folder, including its own stylesheets and assets. Use this structure:

```text
data/
├── ug/
│   └── sem1/
│       └── classical-mechanics/
│           ├── datacard.json
│           ├── index.html
│           └── course.css
└── pg/
    └── sem1/
        └── advanced-quantum-mechanics/
            ├── datacard.json
            ├── index.html
            └── course.css
```

Link optional HTML from the matching course object in `app.js` using its `content` property:

```js
content: "data/ug/sem1/classical-mechanics/index.html"
```

The course page embeds that file in an `iframe` and also provides an **Open in a new tab** link. Because an iframe is a separate document, a stylesheet referenced inside the course HTML—such as `<link rel="stylesheet" href="course.css">`—only styles that course and cannot override the main website. Paths are relative to the course HTML file, so images can similarly be placed beside it and referenced with `src="diagram.png"`.

The repository includes `data/ug/sem1/classical-mechanics/` as a working example. Keep folder and file names lowercase and avoid spaces so their GitHub Pages URLs remain predictable.

## Deployment

The GitHub Actions workflow deploys the site to GitHub Pages after a push to `main`, `master`, or `work`. In the repository settings, set **Pages → Source** to **GitHub Actions**.
