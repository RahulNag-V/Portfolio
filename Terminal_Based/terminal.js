/* ================= BOOT SEQUENCE ================= */

const bootText = document.getElementById("boot-text");
const bootScreen = document.getElementById("boot-screen");
const mainContent = document.getElementById("main-content");

const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]<>?/|";

const MIN_LEN = 30;
const MAX_LEN = 120;
const MAX_LINES = 120;
const SPEED = 20;

function randomLine() {
  let len = Math.floor(Math.random() * (MAX_LEN - MIN_LEN)) + MIN_LEN;
  let out = "";
  for (let i = 0; i < len; i++) {
    out += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return out;
}

function startBoot() {
  let lines = 0;

  const timer = setInterval(() => {
    bootText.textContent += randomLine() + "\n";
    if (++lines >= MAX_LINES) {
      clearInterval(timer);
      setTimeout(showMain, 200);
    }
  }, SPEED);
}

function showMain() {
  bootScreen.style.display = "none";
  mainContent.hidden = false;
}

/* ================= TERMINAL CORE ================= */

const terminal = document.getElementById("terminal");
const rightPanel = document.getElementById("main-content-right");

let history = [];
let hIndex = 0;
let currentDir = "home";

const fs = {
  home: ["projects", "calculator", "about"],
  projects: ["Terminal Portfolio", "Mini Apps", "UI Experiments"]
};

function print(text = "") {
  const div = document.createElement("div");
  div.textContent = text;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

function newPrompt() {
  const line = document.createElement("div");
  const label = document.createElement("span");
  const input = document.createElement("span");

  label.textContent = `cd nags ${currentDir} $ `;
  input.contentEditable = true;
  input.className = "cmd";
  input.spellcheck = false;

  line.append(label, input);
  terminal.appendChild(line);
  input.focus();

  input.addEventListener("keydown", e => handleInput(e, input));
}

function handleInput(e, input) {
  if (e.key === "Enter") {
    e.preventDefault();
    const cmd = input.textContent.trim();
    history.push(cmd);
    hIndex = history.length;
    input.contentEditable = false;
    runCommand(cmd);
    return;
  }

  if (e.key === "ArrowUp" && hIndex > 0) {
    input.textContent = history[--hIndex];
  }

  if (e.key === "ArrowDown") {
    input.textContent = history[++hIndex] || "";
  }
}

/* ================= COMMANDS ================= */

function runCommand(cmd) {
  const [base, arg] = cmd.split(" ");

  switch (base) {
    case "help":
      print("Available commands:");
      ["ls", "cd <folder>", "clear", "exit"].forEach(print);
      break;

    case "ls":
      fs[currentDir]?.forEach(print);
      break;

    case "cd":
      changeDir(arg);
      break;

    case "clear":
      terminal.innerHTML = "";
      break;

    case "exit":
      currentDir = "home";
      clearRight();
      break;

    default:
      print("Command not found");
  }

  newPrompt();
}

function changeDir(dir) {
  if (!dir) return;

  if (dir === "..") {
    currentDir = "home";
    clearRight();
    return;
  }

  if (fs[currentDir]?.includes(dir)) {
    currentDir = dir;
    openSection(dir);
  } else {
    print("No such directory");
  }
}

/* ================= RIGHT PANEL ================= */

function clearRight() {
  rightPanel.innerHTML = "";
}

function openSection(name) {
  clearRight();

  if (name === "projects") return showProjects();
  if (name === "calculator") return showCalculator();
  if (name === "about") return showAbout();

  rightPanel.innerHTML = `<h2>${name}</h2><p>Content coming soon.</p>`;
}

/* ================= APPS ================= */

function showProjects() {
  rightPanel.innerHTML = `
    <h2>Projects</h2>
    <ul>
      ${fs.projects.map(p => `<li>${p}</li>`).join("")}
    </ul>
  `;
}

function showCalculator() {
  rightPanel.innerHTML = `
    <h2>Calculator</h2>
    <input id="calc-display" readonly />
    <div id="calc-buttons">
      ${"789/456*123-0.=+".split("").map(b =>
        `<button data-val="${b}">${b}</button>`
      ).join("")}
    </div>
  `;

  rightPanel.querySelectorAll("button").forEach(btn => {
    btn.onclick = () => calc(btn.dataset.val);
  });
}

function showAbout() {
  rightPanel.innerHTML = `
    <h2>About Me</h2>
    <p>Frontend Developer. UI focused. Terminal obsessed.</p>
  `;
}

function calc(v) {
  const d = document.getElementById("calc-display");
  if (v === "=") {
    try {
      d.value = eval(d.value);
    } catch {
      d.value = "Error";
    }
  } else {
    d.value += v;
  }
}

/* ================= INIT ================= */

window.addEventListener("load", () => {
  startBoot();
  print("Type help to begin.");
  newPrompt();
});
