function byId(id) { return document.getElementById(id); }
function setText(id, text) { const el = byId(id); if (el) el.textContent = text; }
function simulateVariables() {
  const a = Number(byId("varA").value); const b = Number(byId("varB").value); const c = a + b;
  setText("variablesOutput", `Step 1: a = ${a}\nStep 2: b = ${b}\nStep 3: c = a + b\nStep 4: c = ${a} + ${b}\nOutput: ${c}`);
}
function simulateCondition() {
  const x = Number(byId("conditionNumber").value); const isEven = x % 2 === 0;
  setText("conditionOutput", `Input: x = ${x}\nCondition checked: x % 2 == 0\nRemainder: ${x % 2}\nCondition result: ${isEven}\nOutput: ${isEven ? "Even" : "Odd"}`);
}
function simulateLoop() {
  const n = Number(byId("loopCount").value); let out = "";
  for (let i = 0; i < n; i++) out += `Iteration ${i + 1}: i = ${i}\n`;
  setText("loopOutput", out + `\nLoop finished after ${n} repetitions.`);
}
function simulateFunction() {
  const x = Number(byId("functionInput").value); const y = x * x;
  setText("functionOutput", `Function called: square(${x})\nInside function: x * x = ${x} * ${x}\nReturned value: ${y}\nOutput: ${y}`);
}
function simulateList() {
  const numbers = byId("listInput").value.split(",").map(v => Number(v.trim())).filter(v => !isNaN(v));
  if (!numbers.length) return setText("listOutput", "Please enter valid comma-separated numbers.");
  const sum = numbers.reduce((a,b)=>a+b,0); const max = Math.max(...numbers); const avg = sum / numbers.length;
  const sorted = [...numbers].sort((a,b)=>a-b);
  setText("listOutput", `numbers = [${numbers.join(", ")}]\n\nNumber of elements: ${numbers.length}\nSum: ${sum}\nMaximum: ${max}\nAverage: ${avg.toFixed(3)}\nSorted list: [${sorted.join(", ")}]`);
}
function simulateDictionary() {
  const name = byId("dictStudent").value;
  const marks = { Amit: 82, Riya: 91, Farhan: 76, Meera: 88 };
  setText("dictionaryOutput", `Dictionary: marks = {"Amit": 82, "Riya": 91, "Farhan": 76, "Meera": 88}\nLookup key: ${name}\nOutput: marks["${name}"] = ${marks[name]}`);
}
function simulateFileProcessing() {
  const lines = byId("fileText").value.split(/\n+/).map(v => v.trim()).filter(Boolean);
  const values = lines.map(Number).filter(v => !isNaN(v));
  const avg = values.reduce((a,b)=>a+b,0) / values.length;
  setText("fileOutput", `Lines read: ${lines.length}\nNumeric values: [${values.join(", ")}]\nAverage value: ${avg.toFixed(3)}`);
}
function simulateLinspace() {
  const start = Number(byId("npStart").value), stop = Number(byId("npStop").value), n = Math.max(2, Number(byId("npN").value));
  const step = (stop - start) / (n - 1);
  const arr = Array.from({length:n}, (_,i) => start + i * step);
  setText("linspaceOutput", `start = ${start}\nstop = ${stop}\nn = ${n}\nstep = (${stop} - ${start}) / (${n} - 1) = ${step.toFixed(4)}\n\nx = [${arr.map(v=>v.toFixed(3)).join(", ")}]`);
}
function simulatePandas() {
  const lines = byId("csvText").value.trim().split(/\n+/);
  const rows = lines.slice(1).map(line => line.split(",")).filter(r => r.length >= 2);
  const marks = rows.map(r => Number(r[1])).filter(v => !isNaN(v));
  const avg = marks.reduce((a,b)=>a+b,0) / marks.length;
  const max = Math.max(...marks); const min = Math.min(...marks);
  setText("pandasOutput", `Rows loaded: ${rows.length}\nColumn analyzed: Marks\nMean: ${avg.toFixed(2)}\nMinimum: ${min}\nMaximum: ${max}\n\nDataframe preview:\n${lines.join("\n")}`);
}
function simulatePlot() {
  const canvas = byId("plotCanvas"); if (!canvas) return;
  const ctx = canvas.getContext("2d"), type = byId("plotFunction").value;
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0,0,w,h); drawAxes(ctx,w,h); ctx.beginPath();
  for (let px=0; px<w; px++) {
    const x = (px - w/2)/25; let y = x;
    if (type === "square") y = x*x;
    if (type === "sine") y = Math.sin(x);
    if (type === "cosine") y = Math.cos(x);
    const py = h/2 - y*45;
    if (px === 0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
  }
  ctx.strokeStyle = "#244a9b"; ctx.lineWidth = 2; ctx.stroke();
  const msg = { linear:"The graph of y = x is a straight line.", square:"The graph of y = x² is a parabola.", sine:"The graph of y = sin(x) is periodic.", cosine:"The graph of y = cos(x) is periodic and starts at a maximum at x = 0." }[type];
  setText("plotOutput", msg);
}
function drawAxes(ctx,w,h) {
  ctx.strokeStyle = "#9aa7bd"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0,h/2); ctx.lineTo(w,h/2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w/2,0); ctx.lineTo(w/2,h); ctx.stroke();
  ctx.fillStyle = "#59667a"; ctx.font = "12px Arial"; ctx.fillText("0", w/2+5, h/2-5);
}
function generateLatexDocument() {
  const title = byId("docTitle").value, author = byId("docAuthor").value;
  setText("docOutput", `\\documentclass{article}\n\\title{${title}}\n\\author{${author}}\n\\date{\\today}\n\n\\begin{document}\n\\maketitle\n\n\\section{Introduction}\nThis is my first LaTeX document.\n\n\\end{document}`);
}
function generateEquation() {
  const eq = byId("eqInput").value;
  setText("eqCode", `\\[\n${eq}\n\\]`);
  const prev = byId("eqPreview"); prev.innerHTML = `\\[${eq}\\]`; if (window.MathJax) MathJax.typesetPromise([prev]);
}
function generateIntegral() {
  const f = byId("integrand").value, a = byId("lowerLimit").value, b = byId("upperLimit").value;
  const code = `\\[\n\\int_{${a}}^{${b}} ${f} \\, dx\n\\]`;
  setText("integralCode", code);
  const prev = byId("integralPreview"); prev.innerHTML = `\\[\\int_{${a}}^{${b}} ${f} \\, dx\\]`; if (window.MathJax) MathJax.typesetPromise([prev]);
}
function generateLatexTable() {
  const rows = byId("tableRows").value.trim().split(/\n+/).map(r => r.split(",").map(x => x.trim()));
  let body = rows.map(r => `${r[0]} & ${r[1]} \\\\`).join("\n");
  setText("tableOutput", `\\begin{tabular}{|c|c|}\n\\hline\nName & Marks \\\\ \n\\hline\n${body}\n\\hline\n\\end{tabular}`);
}
function generateLatexFigure() {
  const file = byId("figFile").value, cap = byId("figCaption").value;
  setText("figureOutput", `\\begin{figure}[h]\n\\centering\n\\includegraphics[width=0.6\\textwidth]{${file}}\n\\caption{${cap}}\n\\label{fig:sample}\n\\end{figure}`);
}
function generateBeamerSlide() {
  const title = byId("slideTitle").value;
  const bullets = byId("slideBullets").value.trim().split(/\n+/).map(b => `  \\item ${b}`).join("\n");
  setText("beamerOutput", `\\begin{frame}{${title}}\n\\begin{itemize}\n${bullets}\n\\end{itemize}\n\\end{frame}`);
}
function generateBibliography() {
  const key = byId("citeKey").value, author = byId("bibAuthor").value, title = byId("bibTitle").value, year = byId("bibYear").value;
  setText("bibOutput", `Citation in text:\n\\cite{${key}}\n\nBibTeX entry:\n@article{${key},\n  author = {${author}},\n  title = {${title}},\n  year = {${year}}\n}`);
}
function generateGnuplotFunction() {
  const f = byId("gpFunction").value;
  setText("gpFunctionOutput", `set title "Function plot"\nset xlabel "x"\nset ylabel "y"\nplot ${f} with lines title "${f}"`);
}
function generateGnuplotFile() {
  const file = byId("gpFile").value, x = byId("gpXcol").value, y = byId("gpYcol").value;
  setText("gpFileOutput", `set title "Data from file"\nset xlabel "Column ${x}"\nset ylabel "Column ${y}"\nplot "${file}" using ${x}:${y} with points title "data"`);
}
function generateGnuplotMulti() {
  const file = byId("gpMultiFile").value;
  const cols = byId("gpYcols").value.split(",").map(c => c.trim()).filter(Boolean);
  const plots = cols.map(c => `"${file}" using 1:${c} with linespoints title "Column ${c}"`).join(", \\\n     ");
  setText("gpMultiOutput", `set title "Multiple datasets"\nset xlabel "x"\nset ylabel "y"\nplot ${plots}`);
}
function generateGnuplotExport() {
  const out = byId("gpOutputName").value, title = byId("gpTitle").value;
  setText("gpExportOutput", `set terminal pngcairo size 1000,700 enhanced font "Arial,12"\nset output "${out}"\nset title "${title}"\nset xlabel "x"\nset ylabel "y"\nplot "data.txt" using 1:2 with linespoints title "data"\nset output`);
}
function simulateDataStats() {
  const vals = byId("gpDataValues").value.split(/\n+/).map(Number).filter(v => !isNaN(v));
  const mean = vals.reduce((a,b)=>a+b,0)/vals.length;
  const min = Math.min(...vals), max = Math.max(...vals);
  setText("gpStatsOutput", `Values: [${vals.join(", ")}]\nNumber of values: ${vals.length}\nMean: ${mean.toFixed(3)}\nMinimum: ${min}\nMaximum: ${max}\nRange: ${(max-min).toFixed(3)}`);
}
window.addEventListener("load", () => {
  [simulateVariables, simulateCondition, simulateLoop, simulateFunction, simulateList, simulateDictionary, simulateFileProcessing, simulateLinspace, simulatePandas, simulatePlot, generateLatexDocument, generateEquation, generateIntegral, generateLatexTable, generateLatexFigure, generateBeamerSlide, generateBibliography, generateGnuplotFunction, generateGnuplotFile, generateGnuplotMulti, generateGnuplotExport, simulateDataStats].forEach(fn => { try { fn(); } catch(e) {} });
});
