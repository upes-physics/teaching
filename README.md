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
      id: "classical-mechanics",
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

`dataCard` is required and points to the JSON file used to construct the course landing page. Keep an empty array for a semester that does not have course information yet. The semester cards automatically show the number of configured courses.

### Course data-card format

Every course folder contains a `datacard.json` with only the course identity,
simulators, and faculty information:

```json
{
  "courseCode": "PHY101",
  "courseName": "Classical Mechanics",
  "simulators": [
    {
      "name": "Projectile Motion",
      "desc": "Explore how launch angle and speed affect a projectile's path.",
      "link": "projectile-motion.html"
    }
  ],
  "faculty": {
    "name": "Dr Jane Smith",
    "email": "jane.smith@upes.ac.in"
  }
}
```

The course landing page reads this file at runtime and displays the course code,
name, simulators, and faculty. `faculty` accepts either one object or an array of
objects when a course has multiple instructors. The `simulators` property is
optional; when it is omitted or empty, the landing page displays an update-soon
message.

Simulator documents can sit directly beside `datacard.json` in the course's
top-level data directory. Their links are resolved relative to `datacard.json`,
so a typical course layout is:

```text
classical-mechanics/
├── datacard.json
└── projectile-motion.html
```

The root `index.html` and `app.js` are shared by every course; do not create a
separate landing-page `index.html` in each course folder. Once a course is added
to `coursesBySemester`, its card links to the shared renderer using `id` when
provided, or the course code otherwise. Give courses unique IDs whenever they
share a provisional or cross-listed code. For example:

```text
?view=course&level=undergraduate&semester=1&course=classical-mechanics
```

## Deployment

The GitHub Actions workflow deploys the site to GitHub Pages after a push to `main`, `master`, or `work`. In the repository settings, set **Pages → Source** to **GitHub Actions**.
