<https://marioapasama.github.io/view_hex/>

# Hex & ASCII Log Viewer

A lightweight, modern, and privacy-focused web application designed to inspect binary logs, serial communication streams, and raw byte files. Features visual ASCII control character badges and a synchronized 16-column Hex Dump with multi-cell range calculations.

**100% Offline • Zero Dependencies • Pure HTML5, CSS3 & Vanilla JavaScript**

---

## ✨ Features

- **🏷️ Visual Control Character Badges**
  - Renders non-printable ASCII control characters (`0x00` - `0x1F` and `0x7F`), including `STX`, `ETX`, `EOT`, `ACK`, `ENQ`, `CR`, and `LF`, as distinct, color-coded badges.
  - Interactive tooltips display byte code (hex & decimal), character name, and standard function.
  - Optional toggle to display hex values directly on badges (e.g., `STX:02`).
  - Toggleable newline formatting for `CR` / `LF` byte sequences.

- **🔢 Synchronized 16-Column Hex Dump**
  - Classic hexadecimal editor view with column headers (`00` through `0F`) and 8-digit row offsets.
  - Real-time synchronous hover highlights between hexadecimal byte values and their corresponding ASCII characters.

- **📊 Floating Multi-Cell Range Inspector & Calculations**
  - Persistent sticky status bar docked at the bottom of the viewport for effortless viewing during long file scrolling.
  - **Single Byte Inspection**: Displays Row, Column, Offset (Hex & Dec), Byte value (Hex & Dec), and character name.
  - **Multi-Cell Range Calculations**: Select multiple bytes to compute in real time:
    - **Byte Count**: Total number of selected bytes and offset range (e.g., `16 bytes (0x0000 - 0x000F)`).
    - **Total (Sum)**: Decimal and hexadecimal sum of all selected byte values.
    - **Average (Avg)**: Arithmetic mean value of selected bytes.
    - **Min / Max**: Minimum and maximum byte values in range.
    - **Checksum (mod 256)**: Standard 8-bit modulo 256 checksum in hexadecimal format.
    - **Copy Selected**: One-click button to copy the selected byte range as hex string.

- **🌐 Dual-Language Support (Bilingual EN & ID)**
  - Fully localized in **English (Default)** and **Indonesian (Bahasa Indonesia)**.
  - Switch languages on the fly without reloading or losing active file data.
  - Automatically persists user preference in browser `localStorage`.

- **🛠️ Productivity Tools**
  - **Search & Filter**: Real-time text search with highlight overlay.
  - **Clipboard Export**: Copy labeled text (`[STX]...[ETX]`), clean printable text, or raw hexadecimal byte strings (`05 02 31 48 ...`).
  - **Paste Drawer**: Input raw text or raw hex strings directly without needing a file.
  - **ASCII Control Dictionary**: Built-in reference modal detailing ASCII control codes and their functions.
  - **Theme Toggle**: High-contrast Dark mode and clean Light mode.
  - **Keyboard Navigation**: Move selection with Arrow keys, extend range with `Shift + Arrow keys`, or press `Esc` to deselect.

---

## 🛠️ Technology Stack

- **HTML5**: Semantic markup, drag-and-drop file API, and native file input.
- **CSS3**: Custom CSS design tokens, Flexbox & Grid layouts, and backdrop blur glassmorphism. Fully responsive across desktop, tablet, and mobile devices.
- **Vanilla JavaScript (ES6+)**:
  - `FileReader` & `Uint8Array` (ArrayBuffer) for binary file parsing.
  - `Clipboard API` with fallback for secure clipboard copying.
  - **High-Performance Event Delegation**: Uses container-level event listeners on `#viewer-content` to handle thousands of bytes smoothly without memory leaks or DOM lag.
- **Zero Build Tools**: No Node.js, npm, Webpack, Vite, or external CDN dependencies required.

---

## 🚀 How to Run Locally

Because this project is built entirely with standard Vanilla web technologies, **no installation, build process, or internet connection is required**.

### Option 1: Direct File Execution (Recommended)
1. Download or clone this repository to your local machine:
   ```bash
   git clone https://github.com/MarioAPasama/view_hex.git
   cd view_hex
   ```
2. Double-click **`index.html`** in your file manager to open it directly in any modern browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Brave, etc.).
3. Or launch via command line:
   - **Linux**: `xdg-open index.html`
   - **macOS**: `open index.html`
   - **Windows**: `start index.html`

### Option 2: Local HTTP Server (Optional)
If you prefer running through a local web server:
- **Python 3**:
  ```bash
  python3 -m http.server 8080
  ```
  Then navigate to `http://localhost:8080` in your browser.
- **Node.js**:
  ```bash
  npx serve .
  ```
- **PHP**:
  ```bash
  php -S localhost:8080
  ```

---

## 📖 User Guide

### 1. Loading Data
- **Drag & Drop**: Drag any file (`.log`, `.txt`, `.dat`, `.bin`, `.hex`, or any raw binary file) directly into the drop area.
- **Select File**: Click the **Select File** button to choose a file from your file system.
- **Paste Data**: Click **📋 Paste Text / Hex** in the header to paste either a raw string or space-separated hexadecimal bytes.

### 2. Switching Views
- **🏷️ Control Badges**: Best for reading text streams while clearly spotting delimiters, control codes, and frame boundaries.
- **🔢 Hex Dump**: Best for low-level byte analysis, inspecting offsets, checking byte alignments, and examining binary structures.

### 3. Selecting Bytes & Computing Statistics
- **Click**: Selects an individual byte to inspect its row, column, offset, hex, decimal, and character description in the floating status bar.
- **Mouse Drag**: Click and drag across multiple bytes to select a continuous range.
- **Shift + Click**: Click the first byte, hold `Shift`, then click the last byte to select the range.
- **Keyboard**: Click any byte, then press `Arrow keys` (`←`, `→`, `↑`, `↓`) to navigate. Hold `Shift` while pressing arrow keys to expand the selection.
- **Deselect**: Press the **`Esc`** key on your keyboard or select a single byte.

### 4. Copying Data
- **Copy Labeled**: Copies the stream with non-printable bytes labeled as `[STX]`, `[ETX]`, etc.
- **Copy Clean Text**: Copies only readable ASCII characters, stripping control codes.
- **Copy Hex**: Copies all loaded bytes as uppercase space-separated hex values.
- **📋 Copy Selected**: Copies only the currently highlighted range as hex values.

---

## 📁 Project Architecture

The codebase follows the **Single Responsibility Principle (SRP)** with clean modular separation:

```text
view_hex/
├── index.html          # Main HTML structure, layout, and modal definitions
├── style.css           # Styling, themes (dark/light), badge colors, and responsive rules
├── js/
│   ├── constants.js    # ASCII control characters mapping & badge CSS classifications
│   ├── utils.js        # Helper functions: HTML escaping, file size, and toast popups
│   ├── i18n.js         # Internationalization engine (EN default & ID) and dictionary modal
│   ├── selection.js    # Range selection, statistics engine (Sum, Avg, Min/Max, Checksum), and status bar
│   ├── viewer.js       # Badge & Hex rendering engines and centralized Event Delegation
│   └── app.js          # Main coordinator: file I/O, drag-and-drop, modals, and keyboard shortcuts
└── README.md           # Project documentation
```

---

## 🔒 Privacy & Security

- **100% Client-Side Processing**: Every byte is parsed locally in your browser memory using the `FileReader` API.
- **No Network Requests**: Zero telemetry, zero analytics, zero external scripts, and no server communication. Your sensitive log files never leave your computer.

---

## 🤖 Credits & Attribution

This project was developed and crafted collaboratively with **AI (Antigravity by Google DeepMind)**.

- **Architecture & Codebase**: Prompt-engineered, designed, implemented, and refactored by AI.
- **Philosophy**: Pure Vanilla web standards, zero-dependency engineering, modular design, and 100% offline-first execution.
- **Human Collaboration**: Iterated and guided by the user's requirements, feature requests, and domain feedback.

---

## 📄 License

This project is open-source and free to use under the [MIT License](LICENSE).
