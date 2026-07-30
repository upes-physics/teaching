const catalog = {
  undergraduate: {
    label: "Undergraduate",
    semesterCount: 8,
    description: "Build a rigorous foundation in the laws that govern matter, energy, space, and time.",
    semesters: [
      ["PHY101", "Classical Mechanics", "Motion, forces, energy and the mathematical language of mechanics.", "data/ug/sem1/classical-mechanics/index.html"],
      ["PHY103", "Mathematical Methods", "Vectors, calculus and differential equations for physical systems."],
      ["PHY105", "Experimental Physics", "Measurement, uncertainty and scientific practice in the laboratory."]
    ]
  },
  postgraduate: {
    label: "Postgraduate",
    semesterCount: 4,
    description: "Move beyond the fundamentals through advanced theory, computation, and research-led study.",
    semesters: [
      ["PHY501", "Advanced Quantum Mechanics", "Symmetries, approximation methods and quantum dynamics."],
      ["PHY503", "Statistical Field Theory", "Collective phenomena, phase transitions and renormalisation."],
      ["PHY505", "Research Methods", "Literature, reproducible computation and research communication."]
    ]
  }
};

const app = document.querySelector("#app");
const nav = document.querySelector("nav");
const menu = document.querySelector(".menu-button");
const universityLogo = document.querySelector(".university-logo");
document.querySelector("#year").textContent = new Date().getFullYear();

function showLogoFallback() {
  universityLogo.classList.add("logo-unavailable");
}

universityLogo.addEventListener("error", showLogoFallback);
if (universityLogo.complete && universityLogo.naturalWidth === 0) showLogoFallback();

function home() {
  app.innerHTML = `<section class="hero"><div class="hero-copy"><p class="eyebrow">Department of Physics</p><h1>Understand the universe.</h1><p>Explore course materials designed to turn curiosity into insight — from the first principles of motion to the frontiers of modern physics.</p></div><div class="hero-art" aria-label="Abstract illustration of planetary orbits"><span class="orbit"></span><span class="orbit two"></span><span class="planet"></span><i class="star s1"></i><i class="star s2"></i><i class="star s3"></i><i class="star s4"></i><i class="star s5"></i></div></section>
  <section class="pathways"><div class="section-heading"><div><p class="eyebrow">Choose your pathway</p><h2>Where are you in your journey?</h2></div><p>Select your level to find courses and resources organised by semester.</p></div><div class="path-grid">${pathCard("undergraduate", "01", "Undergraduate", "Develop strong foundations through clear theory, guided problems and practical experiments.")}${pathCard("postgraduate", "02", "Postgraduate", "Deepen your expertise with advanced topics and research-focused learning.")}</div></section>`;
}

function pathCard(key, number, title, copy) {
  return `<article class="path-card" data-action="level" data-level="${key}" tabindex="0"><span class="number">${number}</span><span class="arrow">↗</span><h3>${title}</h3><p>${copy}</p></article>`;
}

function levelPage(level) {
  const data = catalog[level];
  const semesters = Array.from({ length: data.semesterCount }, (_, index) => index + 1);
  app.innerHTML = `<section class="page intro"><div class="breadcrumb"><button data-action="home">Home</button> &nbsp;/&nbsp; ${data.label}</div><p class="eyebrow">Select a semester</p><h1>${data.label} Physics</h1><p class="lead">${data.description} Choose your current semester to see the available courses.</p><div class="semester-grid">${semesters.map(n => `<button class="semester-card" data-action="semester" data-level="${level}" data-semester="${n}"><span>${String(n).padStart(2, "0")}</span><strong>Semester ${n}</strong><small>${n === 1 ? "3 courses available" : "Course template ready"}</small></button>`).join("")}</div></section>`;
}

function semesterPage(level, semester) {
  const data = catalog[level];
  const courses = data.semesters.map((course, index) => [course[0].replace(/\d/, String(semester)), course[1], course[2], index]);
  app.innerHTML = `<section class="page"><div class="breadcrumb"><button data-action="home">Home</button> &nbsp;/&nbsp; <button data-action="level" data-level="${level}">${data.label}</button> &nbsp;/&nbsp; Semester ${semester}</div><p class="eyebrow">${data.label} · Semester ${semester}</p><h1>Your courses</h1><p class="lead">Everything you need for this semester, gathered in one place. Select a course to view its overview and learning modules.</p><div class="course-grid">${courses.map(c => `<article class="course-card" tabindex="0" data-action="course" data-level="${level}" data-semester="${semester}" data-course="${c[3]}"><span class="course-code">${c[0]}</span><h2>${c[1]}</h2><p>${c[2]}</p><span class="explore">Explore course &nbsp; →</span></article>`).join("")}</div></section>`;
}

function coursePage(level, semester, index) {
  const data = catalog[level];
  const course = data.semesters[index];
  const code = course[0].replace(/\d/, String(semester));
  const embeddedContent = course[3] && course[3].includes(`/sem${semester}/`)
    ? `<section class="embedded-material"><div class="embedded-heading"><div><p class="eyebrow">Course material</p><h2>Lecture content</h2></div><a href="${course[3]}" target="_blank" rel="noopener">Open in a new tab ↗</a></div><iframe src="${course[3]}" title="${course[1]} course content" loading="lazy"></iframe></section>`
    : "";
  app.innerHTML = `<section class="page"><div class="breadcrumb"><button data-action="home">Home</button> &nbsp;/&nbsp; <button data-action="level" data-level="${level}">${data.label}</button> &nbsp;/&nbsp; <button data-action="semester" data-level="${level}" data-semester="${semester}">Semester ${semester}</button> &nbsp;/&nbsp; ${code}</div><div class="course-layout"><div><p class="eyebrow">${code} · Semester ${semester}</p><h1>${course[1]}</h1><p class="lead">${course[2]} This course page is ready for lecture notes, problem sheets, readings, and assessments.</p><h2 style="font-size:36px;margin-top:55px">Course modules</h2><ol class="module-list"><li><span>01</span>Foundations and core concepts</li><li><span>02</span>Methods and worked examples</li><li><span>03</span>Applications and problem solving</li><li><span>04</span>Review and assessment</li></ol></div><aside class="course-meta"><div class="meta-row"><small>Course level</small>${data.label}</div><div class="meta-row"><small>Semester</small>${semester}</div><div class="meta-row"><small>Course code</small>${code}</div><div class="meta-row"><small>Course materials</small>Notes · Problems · Reading</div><button class="back-button" data-action="semester" data-level="${level}" data-semester="${semester}">← All courses</button></aside></div>${embeddedContent}</section>`;
}

function aboutPage() {
  app.innerHTML = `<section class="page intro"><div class="breadcrumb"><button data-action="home">Home</button> &nbsp;/&nbsp; About</div><p class="eyebrow">Our teaching</p><h1>Physics starts with a good question.</h1><p class="lead">UPES Physics is a flexible course-content template for undergraduate and postgraduate teaching in the Applied Science Cluster. Add your own notes, recordings, assignments, and reading lists to each course page as the curriculum grows.</p><div class="path-grid" style="margin-top:55px"><div class="path-card"><span class="number">LEARN</span><h3>Clear foundations</h3><p>Structured pathways help every student find the right material quickly.</p></div><div class="path-card"><span class="number">EXPLORE</span><h3>Room for discovery</h3><p>Course pages provide a dependable home for lectures, problems and resources.</p></div></div></section>`;
}

function navigate(view, params = {}, push = true) {
  if (view === "home") home();
  if (view === "about") aboutPage();
  if (view === "level") levelPage(params.level);
  if (view === "semester") semesterPage(params.level, params.semester);
  if (view === "course") coursePage(params.level, params.semester, Number(params.course));
  const query = view === "home" ? "" : `?view=${view}&${new URLSearchParams(params)}`;
  if (push) history.pushState({ view, ...params }, "", `./${query}`);
  document.title = `${view === "home" ? "UPES Physics" : "Courses"} · Applied Science Cluster`;
  window.scrollTo(0, 0); app.focus({ preventScroll: true }); nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false");
}

document.addEventListener("click", event => {
  const target = event.target.closest("[data-link], [data-action]");
  if (!target) return;
  event.preventDefault();
  const action = target.dataset.action || target.dataset.link;
  if (action === "undergraduate" || action === "postgraduate") navigate("level", { level: action });
  else if (action === "level") navigate("level", { level: target.dataset.level });
  else if (action === "semester") navigate("semester", { level: target.dataset.level, semester: target.dataset.semester });
  else if (action === "course") navigate("course", { level: target.dataset.level, semester: target.dataset.semester, course: target.dataset.course });
  else navigate(action);
});
document.addEventListener("keydown", event => { if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-action]")) event.target.click(); });
menu.addEventListener("click", () => { const open = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", String(open)); });
window.addEventListener("popstate", () => loadRoute(false));
function loadRoute(push = false) { const q = new URLSearchParams(location.search); navigate(q.get("view") || "home", Object.fromEntries(q), push); }
loadRoute(false);
