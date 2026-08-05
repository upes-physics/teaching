const catalog = {
    undergraduate: {
	label: "Undergraduate",
	semesterCount: 8,
	description: "Build a rigorous foundation in the laws that govern matter, energy, space, and time.",
	coursesBySemester: {
	    1: [
		{ code: "PHYS1037", name: "Mathematical Physics I", description: "Calculus, vector analysis, matrices, and mathematical methods for physics.", dataCard: "data/ug/sem1/mp1/datacard.json" },
		{ code: "MECH1001", name: "Mechanics", description: "", dataCard: "data/ug/sem1/mechanics/datacard.json" },
		{ id: "optics", code: "PHYSXXXX", name: "Optics", description: "", dataCard: "data/ug/sem1/optics/datacard.json" },
		{ id: "waves-oscillations", code: "PHYSXXXX", name: "Waves and Oscillations", description: "", dataCard: "data/ug/sem1/waves-oscillations/datacard.json" },
		{ code: "CSEG1023", name: "Computational Techniques", description: "", dataCard: "data/ug/sem1/comptech/datacard.json" },
	    ],
	    2: [],
	    3: [ 
	        {code: "PHYS2014K", name: "Computational Physics", description: "", dataCard: "data/ug/sem3/PHYS2014K/datacard.json"},
		   ],
	    4: [],
	    5: [],
	    6: [],
	    7: [
		{ code: "PHYS8204", name: "Fundamentals of Astronomy", description: "", dataCard: "data/ug/sem7/PHYS8204/datacard.json" },
	    ],
	    8: []
	}
    },
    postgraduate: {
	label: "Postgraduate",
	semesterCount: 4,
	description: "Move beyond the fundamentals through advanced theory, computation, and research-led study.",
	coursesBySemester: {
	    1: [],
	    2: [],
	    3: [
		{ code: "", name: "Fundamentals of Astronomy", description: "", dataCard: "data/ug/sem7/PHYS4023P/datacard.json" },
	    ],
	    4: []
	}
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
    app.innerHTML = `<section class="page intro"><div class="breadcrumb"><button data-action="home">Home</button> &nbsp;/&nbsp; ${data.label}</div><p class="eyebrow">Select a semester</p><h1>${data.label} Physics</h1><p class="lead">${data.description} Choose your current semester to see the available courses.</p><div class="semester-grid">${semesters.map(n => { const count = (data.coursesBySemester[n] || []).length; return `<button class="semester-card" data-action="semester" data-level="${level}" data-semester="${n}"><span>${String(n).padStart(2, "0")}</span><strong>Semester ${n}</strong><small>${count} ${count === 1 ? "course" : "courses"} available</small></button>`; }).join("")}</div></section>`;
}

function semesterPage(level, semester) {
    const data = catalog[level];
    const courses = data.coursesBySemester[semester] || [];
    const courseCards = courses.length
	  ? courses.map(course => `<article class="course-card" tabindex="0" data-action="course" data-level="${level}" data-semester="${semester}" data-course="${course.id || course.code}"><span class="course-code">${course.code}</span><h2>${course.name}</h2><p>${course.description}</p><span class="explore">Explore course &nbsp; →</span></article>`).join("")
	  : `<div class="empty-state"><h2>Course information coming soon</h2><p>No courses have been added to this semester yet.</p></div>`;
    app.innerHTML = `<section class="page"><div class="breadcrumb"><button data-action="home">Home</button> &nbsp;/&nbsp; <button data-action="level" data-level="${level}">${data.label}</button> &nbsp;/&nbsp; Semester ${semester}</div><p class="eyebrow">${data.label} · Semester ${semester}</p><h1>Your courses</h1><p class="lead">Everything you need for this semester, gathered in one place. Select a course to view its overview and learning modules.</p><div class="course-grid">${courseCards}</div></section>`;
}

async function coursePage(level, semester, courseId) {
    const data = catalog[level];
    const courses = data.coursesBySemester[semester] || [];
    // Explicit IDs keep routes unique when provisional course codes are shared.
    // Codes and numeric indexes remain supported for existing bookmarks.
    const course = courses.find(item => item.id === courseId)
	  || courses.find(item => item.code === courseId)
	  || courses[Number(courseId)];
    if (!course) {
	semesterPage(level, semester);
	return;
    }
    app.innerHTML = `<section class="page"><div class="breadcrumb"><button data-action="home">Home</button> &nbsp;/&nbsp; <button data-action="level" data-level="${level}">${data.label}</button> &nbsp;/&nbsp; <button data-action="semester" data-level="${level}" data-semester="${semester}">Semester ${semester}</button></div><div class="loading-state">Loading course information…</div></section>`;
    
    try {
	const response = await fetch(course.dataCard);
	if (!response.ok) throw new Error(`Could not load ${course.dataCard}`);
	const card = await response.json();
	const dataCardUrl = response.url || new URL(course.dataCard, document.baseURI).href;
	renderCourseDataCard(data.label, semester, course, card, dataCardUrl);
    } catch (error) {
	app.innerHTML = `<section class="page"><p class="eyebrow">Course unavailable</p><h1>We could not load this course.</h1><p class="lead">Check that <code>${course.dataCard}</code> exists and contains valid JSON.</p><button class="back-button" data-action="semester" data-level="${level}" data-semester="${semester}">← All courses</button></section>`;
	console.error(error);
    }
}

function renderCourseDataCard(levelLabel, semester, course, card, dataCardUrl) {
    const simulators = Array.isArray(card.simulators) ? card.simulators : [];
    const faculty = Array.isArray(card.faculty) ? card.faculty : card.faculty ? [card.faculty] : [];
    const simulatorCards = simulators.length
	  ? simulators.map(simulator => {
	      const link = new URL(simulator.link, dataCardUrl).href;
	      return `<a class="simulator-card" href="${link}" target="_blank" rel="noopener"><span class="simulator-icon" aria-hidden="true">▶</span><div><h3>${simulator.name}</h3><p>${simulator.desc}</p><span class="launch-simulator">Launch simulator ↗</span></div></a>`;
	  }).join("")
	  : `<div class="simulator-empty"><p>Simulator information will be updated soon.</p></div>`;
    const simulatorSection = `<section class="simulators"><p class="eyebrow">Interactive learning</p><h2>Simulators</h2><div class="simulator-grid">${simulatorCards}</div></section>`;
    const facultyCards = faculty.filter(member => member.name || member.email).map(member => {
	const email = member.email ? `<a href="mailto:${member.email}">${member.email}</a>` : "";
	return `<article><h3>${member.name}</h3>${email}</article>`;
    }).join("") || `<p class="faculty-empty">Faculty information will be updated soon.</p>`;
    const facultySection = `<section class="faculty"><p class="eyebrow">Course team</p><h2>Faculty</h2><div class="faculty-grid">${facultyCards}</div></section>`;
    app.innerHTML = `<section class="page"><div class="breadcrumb"><button data-action="home">Home</button> &nbsp;/&nbsp; <button data-action="level" data-level="${levelLabel.toLowerCase()}">${levelLabel}</button> &nbsp;/&nbsp; <button data-action="semester" data-level="${levelLabel.toLowerCase()}" data-semester="${semester}">Semester ${semester}</button> &nbsp;/&nbsp; ${card.courseCode}</div><p class="eyebrow">${card.courseCode} · Semester ${semester}</p><h1>${card.courseName}</h1>${simulatorSection}${facultySection}</section>`;
}

function aboutPage() {
    app.innerHTML = `<section class="page intro"><div class="breadcrumb"><button data-action="home">Home</button> &nbsp;/&nbsp; About</div><p class="eyebrow">Our teaching</p><h1>Physics starts with a good question.</h1><p class="lead">UPES Physics is a flexible course-content template for undergraduate and postgraduate teaching in the Applied Science Cluster. Add your own notes, recordings, assignments, and reading lists to each course page as the curriculum grows.</p><div class="path-grid" style="margin-top:55px"><div class="path-card"><span class="number">LEARN</span><h3>Clear foundations</h3><p>Structured pathways help every student find the right material quickly.</p></div><div class="path-card"><span class="number">EXPLORE</span><h3>Room for discovery</h3><p>Course pages provide a dependable home for lectures, problems and resources.</p></div></div></section>`;
}

function navigate(view, params = {}, push = true) {
    if (view === "home") home();
    if (view === "about") aboutPage();
    if (view === "level") levelPage(params.level);
    if (view === "semester") semesterPage(params.level, params.semester);
    if (view === "course") coursePage(params.level, params.semester, params.course);
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
