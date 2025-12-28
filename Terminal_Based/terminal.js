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
