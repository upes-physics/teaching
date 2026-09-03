function fmt(x, n = 6) { return Number(x).toFixed(n); }
function parseNumberList(text) {
  return text.split(',').map(v => Number(v.trim())).filter(v => !Number.isNaN(v));
}
function fRoot(x) { return x*x - 2; }

function simulateFortranVariables() {
  const a = Number(document.getElementById('fa').value);
  const b = Number(document.getElementById('fb').value);
  const c = a + b;
  document.getElementById('fortranVariablesOutput').textContent =
`a = ${a}
b = ${b}
c = a + b = ${a} + ${b} = ${c}

FORTRAN output from print *, c:
 ${c}`;
}

function simulateFortranIf() {
  const x = Number(document.getElementById('fx').value);
  let result = x > 0 ? 'Positive' : (x < 0 ? 'Negative' : 'Zero');
  document.getElementById('fortranIfOutput').textContent =
`Input x = ${x}
Check x .gt. 0: ${x > 0}
Check x .lt. 0: ${x < 0}
Selected branch: ${result}
Output: ${result}`;
}

function simulateFortranSelect() {
  const choice = document.getElementById('fchoice').value;
  const map = {1:'Addition selected',2:'Subtraction selected',3:'Multiplication selected'};
  document.getElementById('fortranSelectOutput').textContent =
`choice = ${choice}
SELECT CASE compares choice with available CASE labels.
Output: ${map[choice] || 'Invalid choice'}`;
}

function simulateFortranLoop() {
  const n = Number(document.getElementById('fn').value);
  let out = '';
  for (let i=1; i<=n; i++) out += `Iteration ${i}: i = ${i}\n`;
  out += `\nIn FORTRAN, do i = 1, ${n} includes both 1 and ${n}.`;
  document.getElementById('fortranLoopOutput').textContent = out;
}

function simulateFortranArray() {
  const arr = parseNumberList(document.getElementById('farray').value);
  if (!arr.length) { document.getElementById('fortranArrayOutput').textContent = 'Enter valid comma-separated numbers.'; return; }
  const sum = arr.reduce((a,b)=>a+b,0);
  const avg = sum / arr.length;
  let out = `Array x = [${arr.join(', ')}]\n`;
  arr.forEach((v,i)=> out += `x(${i+1}) = ${v}\n`);
  out += `\nsum = ${sum}\naverage = ${fmt(avg,3)}`;
  document.getElementById('fortranArrayOutput').textContent = out;
}

function simulateFortranFunction() {
  const r = Number(document.getElementById('fradius').value);
  const area = Math.PI * r * r;
  document.getElementById('fortranFunctionOutput').textContent =
`Input radius r = ${r}
Function area_circle(r) returns 3.14159*r*r
Area = ${fmt(area,5)}

A function returns a value; a subroutine performs a task and can modify arguments.`;
}

function simulateFortranFileIO() {
  const name = document.getElementById('ffile').value.trim() || 'output.dat';
  document.getElementById('fortranFileOutput').textContent =
`open(unit=10, file='${name}', status='replace')
write(10,*) x, y
close(10)

This creates or replaces ${name}, writes values, and closes the file.`;
}

function simulateFortranModule() {
  const t = (document.getElementById('ftype').value.trim() || 'particle').replace(/\s+/g,'_');
  document.getElementById('fortranModuleOutput').textContent =
`module physics_types
  implicit none
  type :: ${t}
     real :: mass
     real :: charge
  end type ${t}
end module physics_types

program use_type
  use physics_types
  implicit none
  type(${t}) :: obj
end program use_type`;
}

function simulateBisection() {
  let a = Number(document.getElementById('bisA').value);
  let b = Number(document.getElementById('bisB').value);
  const n = Number(document.getElementById('bisN').value);
  if (fRoot(a)*fRoot(b) > 0) { document.getElementById('bisectionOutput').textContent = 'f(a) and f(b) must have opposite signs.'; return; }
  let out = 'Iter | a | b | c | f(c)\n';
  for (let i=1; i<=n; i++) {
    const c = (a+b)/2;
    out += `${i} | ${fmt(a,4)} | ${fmt(b,4)} | ${fmt(c,4)} | ${fmt(fRoot(c),4)}\n`;
    if (fRoot(a)*fRoot(c) < 0) b = c; else a = c;
  }
  out += `\nApproximate root ≈ ${fmt((a+b)/2,6)}`;
  document.getElementById('bisectionOutput').textContent = out;
}

function simulateNewton() {
  let x = Number(document.getElementById('newtonX').value);
  const n = Number(document.getElementById('newtonN').value);
  let out = 'Iter | x_n | f(x_n) | x_{n+1}\n';
  for (let i=1; i<=n; i++) {
    const fx = fRoot(x);
    const xn = x - fx/(2*x);
    out += `${i} | ${fmt(x,6)} | ${fmt(fx,6)} | ${fmt(xn,6)}\n`;
    x = xn;
  }
  out += `\nApproximate root ≈ ${fmt(x,8)}`;
  document.getElementById('newtonOutput').textContent = out;
}

function simulateLagrange() {
  const pairs = document.getElementById('lagData').value.split(',').map(p => p.trim().split(':').map(Number));
  const data = pairs.filter(p => p.length === 2 && !Number.isNaN(p[0]) && !Number.isNaN(p[1]));
  const x = Number(document.getElementById('lagX').value);
  if (data.length < 2) { document.getElementById('lagrangeOutput').textContent = 'Enter at least two points like 0:1, 1:3.'; return; }
  let y = 0, out = `Interpolating at x = ${x}\n`;
  for (let i=0; i<data.length; i++) {
    let Li = 1;
    for (let j=0; j<data.length; j++) if (i !== j) Li *= (x-data[j][0])/(data[i][0]-data[j][0]);
    y += data[i][1]*Li;
    out += `L_${i}(x) = ${fmt(Li,5)}, contribution = ${fmt(data[i][1]*Li,5)}\n`;
  }
  out += `\nP(${x}) = ${fmt(y,6)}`;
  document.getElementById('lagrangeOutput').textContent = out;
}

function simulateTrapezoid() {
  const n = Number(document.getElementById('trapN').value);
  const a = 0, b = 1, h = (b-a)/n;
  let sum = 0.5*(a*a + b*b);
  let out = `h = ${fmt(h,5)}\n`;
  for (let i=1; i<n; i++) {
    const x = a+i*h;
    sum += x*x;
    out += `x_${i} = ${fmt(x,5)}, f(x_${i}) = ${fmt(x*x,5)}\n`;
  }
  const I = h*sum;
  out += `\nApprox integral = ${fmt(I,8)}\nExact value = 1/3 = ${fmt(1/3,8)}`;
  document.getElementById('trapOutput').textContent = out;
}

function simulateEuler() {
  const h = Number(document.getElementById('eulerH').value);
  const n = Number(document.getElementById('eulerN').value);
  let x=0, y=1, out = 'Step | x | y\n0 | 0.0000 | 1.000000\n';
  for (let i=1; i<=n; i++) {
    y = y + h*y;
    x = x + h;
    out += `${i} | ${fmt(x,4)} | ${fmt(y,6)}\n`;
  }
  document.getElementById('eulerOutput').textContent = out;
}

function simulateRK4() {
  const h = Number(document.getElementById('rkH').value);
  const n = Number(document.getElementById('rkN').value);
  let x=0, y=1, out = 'Step | x | y_RK4\n0 | 0.0000 | 1.000000\n';
  for (let i=1; i<=n; i++) {
    const k1 = h*y;
    const k2 = h*(y+k1/2);
    const k3 = h*(y+k2/2);
    const k4 = h*(y+k3);
    y = y + (k1 + 2*k2 + 2*k3 + k4)/6;
    x = x + h;
    out += `${i} | ${fmt(x,4)} | ${fmt(y,6)}\n`;
  }
  document.getElementById('rkOutput').textContent = out;
}

function simulateLinear2x2() {
  const r1 = parseNumberList(document.getElementById('lin1').value);
  const r2 = parseNumberList(document.getElementById('lin2').value);
  if (r1.length !== 3 || r2.length !== 3) { document.getElementById('linearOutput').textContent = 'Enter rows as a,b,c and d,e,f.'; return; }
  const [a,b,c] = r1, [d,e,fv] = r2;
  const D = a*e - b*d;
  if (Math.abs(D) < 1e-12) { document.getElementById('linearOutput').textContent = 'Determinant is zero; no unique solution.'; return; }
  const Dx = c*e - b*fv;
  const Dy = a*fv - c*d;
  document.getElementById('linearOutput').textContent =
`D = ae - bd = ${fmt(D,5)}
Dx = ce - bf = ${fmt(Dx,5)}
Dy = af - cd = ${fmt(Dy,5)}

x = ${fmt(Dx/D,6)}
y = ${fmt(Dy/D,6)}`;
}

function simulateHeatStep() {
  const u = parseNumberList(document.getElementById('heatVals').value);
  const r = Number(document.getElementById('heatR').value);
  if (u.length < 3) { document.getElementById('heatOutput').textContent = 'Enter at least three grid values.'; return; }
  const unew = [...u];
  let out = `Old values: [${u.join(', ')}]\n`;
  for (let i=1; i<u.length-1; i++) {
    unew[i] = u[i] + r*(u[i+1] - 2*u[i] + u[i-1]);
    out += `u_${i}^{new} = ${fmt(unew[i],4)}\n`;
  }
  out += `\nNew values: [${unew.map(v=>fmt(v,3)).join(', ')}]`;
  document.getElementById('heatOutput').textContent = out;
}

window.addEventListener('DOMContentLoaded', () => {
  const calls = [
    'simulateFortranVariables','simulateFortranIf','simulateFortranSelect','simulateFortranLoop','simulateFortranArray','simulateFortranFunction','simulateFortranFileIO','simulateFortranModule',
    'simulateBisection','simulateNewton','simulateLagrange','simulateTrapezoid','simulateEuler','simulateRK4','simulateLinear2x2','simulateHeatStep'
  ];
  calls.forEach(name => { if (typeof window[name] === 'function') window[name](); });
});

Object.assign(window, {simulateFortranVariables, simulateFortranIf, simulateFortranSelect, simulateFortranLoop, simulateFortranArray, simulateFortranFunction, simulateFortranFileIO, simulateFortranModule, simulateBisection, simulateNewton, simulateLagrange, simulateTrapezoid, simulateEuler, simulateRK4, simulateLinear2x2, simulateHeatStep});
