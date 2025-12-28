# 🚀 Dual-Mode Portfolio Website (Normal UI + Linux Terminal Mode)

A **modern, interactive developer portfolio** that lets visitors choose how they want to explore my profile:

- 🖥️ **Normal Portfolio Mode** – clean UI/UX, animations, modern layout  
- 🐧 **Linux Terminal Mode** – portfolio navigated using **Linux-like commands**

By default, the website opens in **Normal Mode**, but visitors can switch to **Terminal Mode** for a unique, developer-centric experience.

---

## ✨ Key Features

### 🧭 Dual Experience
- Toggle between **Normal UI** and **Linux Command-Line UI**
- Visitor-controlled experience (default → Normal Mode)

### 🖥️ Normal Portfolio Mode
- Responsive modern design  
- Smooth animations & transitions  
- Sections: About, Skills, Projects, Experience, Contact  
- Optimized for desktop & mobile  

### 🐧 Linux Terminal Portfolio Mode
- Linux-style terminal interface  
- Command-based navigation (example: `ls`, `cd projects`, `cat about.txt`)  
- Real-time command parsing using JavaScript  
- Simulated file system structure  

### 🤖 AI-Enhanced Experience
- AI-powered interactive elements  
- Smart suggestions & guided exploration  
- Dynamic content rendering  

---

## 🛠️ Tech Stack

| Technology | Usage |
|----------|------|
| **HTML5** | Structure & semantic layout |
| **CSS3** | Styling, animations, responsiveness |
| **JavaScript (Vanilla)** | Logic, terminal simulation, interactions |
| **AI APIs / Libraries** | Smart UX & enhancements |
| **UI Libraries** | Animations & visual effects |

> ⚠️ No heavy frameworks. Clean, optimized, and fast.

---

## 📂 Project Structure

```bash
portfolio/
│
├── index.html          # Entry point (Mode selector)
├── normal/             # Normal portfolio UI
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── terminal/           # Linux-style portfolio
│   ├── terminal.html
│   ├── terminal.css
│   └── terminal.js
│
├── assets/             # Images, icons, fonts
├── ai/                 # AI logic & integrations
└── README.md
