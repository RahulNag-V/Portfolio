// Select the boot text area
const bootText = document.getElementById("boot-text");

// Select screens
const bootScreen = document.getElementById("boot-screen");
const mainContent = document.getElementById("main-content");

// Characters used to generate random code
const chars = `xQ7@F$kG}m2%T0<ZJbL5^s8O+YdE]3nP"rH!*C4U?M9lV{&W6=iqK(a_e#1y/DR)f>hS^@pXJm0Y2F!{=6Q$]8A9G7<+R#iL"Z5%P}T*E&cU?K(>sV_4rWnD^bH/O1y)3kM@x9Q5=8T{FLJ6^DRK_&*S+P4mG%!?Y3WCH]O2"0Eri#)bV>1<@k7XAMn(9l5{T}FZ^EJ!W0#yP?i>r2@H+G%O4D8m3&xkN_1Q]6A7C(SB"L=K{YJ}^P*9WZfQ<@xU7C!A]1m_8+5H0L%N&?r3#6(OY^E}4="PD2BViSk>FJ$R)G@<WlZ9x^?}0S#(H1C*+6!NAB8)kL%R&{5=Q_7J3mT"XWi>4E2@ZK`;

// Function to generate one random line
function generateRandomLine() {
  let line = "";

  // Random line length between 30 and 80
  let length = Math.floor(Math.random() * 150) + 30;

  // Build the line character by character
  for (let i = 0; i < length; i++) {
    line += chars[Math.floor(Math.random() * chars.length)];
  }

  return line;
}

// Function to keep adding random lines
function startBootSequence() {
  let linesCount = 0;

  // Interval runs every 50ms
  const interval = setInterval(() => {
    // Add new random line
    bootText.textContent += generateRandomLine() + "\n";

    linesCount++;

    // Stop after 40 lines
    if (linesCount > 150) {
      clearInterval(interval);

      // Wait 1 second, then switch screens
      setTimeout(showMainPage, 100);
    }
  }, 20);
}

// Function to hide boot screen and show main page
function showMainPage() {
  bootScreen.style.display = "none"; // hide boot
  mainContent.style.display = "flex"; // show main page
}

// Start everything when page loads
window.onload = startBootSequence;






// ---------- Terminal UI ----------
function print(text = "") {
  const div = document.createElement("div");
  div.textContent = text;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

function prompt() {
  const line = document.createElement("div");
  const p = document.createElement("span");
  p.textContent = `cd nags ${currentDir} $ `;
  const input = document.createElement("span");
  input.contentEditable = true;
  input.className = "cmd";
  input.spellcheck = false;

  line.append(p, input);
  terminal.appendChild(line);
  input.focus();

  input.addEventListener("keydown", e => handleKey(e, input));
}

function handleKey(e, input) {
  if (e.key === "Enter") {
    e.preventDefault();
    const cmd = input.textContent.trim();
    history.push(cmd);
    hIndex = history.length;
    input.contentEditable = false;
    execute(cmd);
  }

  if (e.key === "ArrowUp" && hIndex > 0) {
    hIndex--;
    input.textContent = history[hIndex];
  }

  if (e.key === "ArrowDown") {
    hIndex++;
    input.textContent = history[hIndex] || "";
  }
}

// ---------- Commands ----------
function execute(cmd) {
  const [base, arg] = cmd.split(" ");

  switch (base) {
    case "help":
    case "nags":
    case "nags-h":
      print("Available commands:");
      print("ls");
      print("cd <folder>");
      print("exit");
      print("clear");
      break;

    case "ls":
      fs[currentDir]?.forEach(f => print(f));
      break;

    case "cd":
      if (!arg) break;
      if (arg === "..") {
        currentDir = "home";
        clearRight();
      } else if (fs[currentDir]?.includes(arg)) {
        currentDir = arg;
        openSection(arg);
      } else {
        print("No such directory");
      }
      break;

    case "exit":
      currentDir = "home";
      clearRight();
      break;

    case "clear":
      terminal.innerHTML = "";
      break;

    default:
      print("Command not found");
  }

  prompt();
}



// ---------- Right Panel ----------
function clearRight() {
  rightPanel.innerHTML = "";
}

function openSection(name) {
  clearRight();

  if (name === "projects") {
    projectMenu();
    return;
  }

  if (name === "calculator") {
    calculatorApp();
    return;
  }

  if (name === "paint") {
    paintApp();
    return;
  }

  rightPanel.innerHTML = `
    <h2>${name.toUpperCase()}</h2>
    <p>Content managed by admin.</p>
  `;
}

// ---------- Projects ----------
function projectMenu() {
  print("Select a project:");
  fs.projects.forEach((p, i) => print(`${i + 1}. ${p}`));
  print(`${fs.projects.length + 1}. Exit`);
  print("Enter your choice:");

  const input = document.createElement("input");
  input.type = "number";
  terminal.appendChild(input);
  input.focus();

  input.onkeydown = e => {
    if (e.key === "Enter") {
      const choice = Number(input.value);
      input.remove();

      if (choice >= 1 && choice <= fs.projects.length) {
        openProject(fs.projects[choice - 1]);
      } else {
        print("Exit project menu");
      }
      prompt();
    }
  };
}

function openProject(name) {
  rightPanel.innerHTML = `
    <h2>${name}</h2>
    <p>Project details here.</p>
  `;
}

// ---------- Calculator ----------
function calculatorApp() {
  rightPanel.innerHTML = `
    <h2>Calculator</h2>
    <input id="calc-display" readonly>
    <div id="calc-buttons">
      ${"789/456*123-0.=+".split("").map(b =>
        `<button onclick="calc('${b}')">${b}</button>`
      ).join("")}
    </div>
  `;
}

window.calc = function (v) {
  const d = document.getElementById("calc-display");
  if (v === "=") d.value = eval(d.value);
  else d.value += v;
};

// ---------- Start Terminal ----------
print("Type help to begin.");
prompt();