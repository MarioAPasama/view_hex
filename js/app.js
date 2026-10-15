/**
 * Hex & ASCII Log Viewer - app.js
 * Main application coordinator: handles initialization, file I/O, drag-and-drop,
 * modal dialogs, and global keyboard shortcuts.
 */

// Application Core State
let currentBytes = null;
let currentFileName = "";

/**
 * Initialize Application on DOM Ready
 */
function init() {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("file-input");
  const searchBox = document.getElementById("search-box");
  const optLinebreaks = document.getElementById("opt-linebreaks");
  const optShowHex = document.getElementById("opt-showhex");

  // Language Switcher Selector
  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  // Theme Toggle (Dark / Light)
  const btnTheme = document.getElementById("btn-theme");
  if (btnTheme) btnTheme.addEventListener("click", toggleTheme);

  // Control Characters Dictionary Modal
  const btnLegend = document.getElementById("btn-legend");
  const legendModal = document.getElementById("legend-modal");
  if (btnLegend && legendModal) {
    btnLegend.addEventListener("click", () => legendModal.classList.add("open"));
  }

  // Paste Text / Hex Modal
  const btnPasteModal = document.getElementById("btn-paste-modal");
  const pasteModal = document.getElementById("paste-modal");
  const btnPasteApply = document.getElementById("btn-paste-apply");
  if (btnPasteModal && pasteModal) {
    btnPasteModal.addEventListener("click", () => pasteModal.classList.add("open"));
  }
  if (btnPasteApply) {
    btnPasteApply.addEventListener("click", handlePasteApply);
  }

  // File Picker
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        loadFile(e.target.files[0]);
      }
    });
  }

  // Drag and Drop Zone
  if (dropzone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add("drag-over");
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove("drag-over");
      }, false);
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files[0]) {
        loadFile(dt.files[0]);
      }
    });
  }

  // Tab Navigation
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeTab = btn.getAttribute("data-tab");
      renderView();
    });
  });

  // Options & Search Listeners
  if (optLinebreaks) optLinebreaks.addEventListener("change", renderView);
  if (optShowHex) optShowHex.addEventListener("change", renderView);
  if (searchBox) {
    searchBox.addEventListener("input", () => {
      if (activeTab === "badge-view") renderBadgeView();
    });
  }

  // Copy Buttons
  const btnCopyFormatted = document.getElementById("btn-copy-formatted");
  const btnCopyRaw = document.getElementById("btn-copy-raw");
  const btnCopyHex = document.getElementById("btn-copy-hex");
  if (btnCopyFormatted) btnCopyFormatted.addEventListener("click", copyFormattedText);
  if (btnCopyRaw) btnCopyRaw.addEventListener("click", copyRawText);
  if (btnCopyHex) btnCopyHex.addEventListener("click", copyHexText);

  // Global Keyboard Shortcuts (Shift + Arrows for range selection, Esc to clear)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setSelection(null, null);
      return;
    }
    if (selectionHeadIdx === null || !currentBytes) return;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

    let targetIdx = null;
    if (e.key === "ArrowLeft") targetIdx = selectionHeadIdx - 1;
    else if (e.key === "ArrowRight") targetIdx = selectionHeadIdx + 1;
    else if (e.key === "ArrowUp") targetIdx = selectionHeadIdx - 16;
    else if (e.key === "ArrowDown") targetIdx = selectionHeadIdx + 16;

    if (targetIdx !== null) {
      e.preventDefault();
      targetIdx = Math.max(0, Math.min(targetIdx, currentBytes.length - 1));
      if (e.shiftKey) {
        setSelection(selectionAnchorIdx !== null ? selectionAnchorIdx : selectionHeadIdx, targetIdx);
      } else {
        setSelection(targetIdx, targetIdx);
      }
    }
  });

  // Release mouse drag selection anywhere on window
  window.addEventListener("mouseup", () => {
    isSelecting = false;
  });

  // Setup Event Delegation for Viewer Hover & Click/Drag
  initViewerEvents();

  // Apply Initial Language (English default or from localStorage)
  setLanguage(currentLang);
}

/**
 * Read File from Disk
 */
function loadFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const buffer = e.target.result;
    currentBytes = new Uint8Array(buffer);
    currentFileName = file.name;
    onDataLoaded();
    showToast(t("toast_loaded", { name: file.name }));
  };
  reader.readAsArrayBuffer(file);
}

/**
 * Process Pasted Text or Hex String
 */
function handlePasteApply() {
  const pasteTypeSelect = document.getElementById("paste-type");
  const pasteContentTextarea = document.getElementById("paste-content");
  const pasteModal = document.getElementById("paste-modal");

  const pasteType = pasteTypeSelect ? pasteTypeSelect.value : "raw";
  const text = pasteContentTextarea ? pasteContentTextarea.value : "";

  if (!text.trim()) {
    alert(t("toast_paste_empty"));
    return;
  }

  if (pasteType === "hex") {
    const hexClean = text.replace(/0x/gi, '').replace(/[^0-9a-fA-F]/g, '');
    if (hexClean.length % 2 !== 0) {
      alert(t("toast_paste_hex_invalid"));
      return;
    }
    const bytes = new Uint8Array(hexClean.length / 2);
    for (let i = 0; i < hexClean.length; i += 2) {
      bytes[i / 2] = parseInt(hexClean.substr(i, 2), 16);
    }
    currentBytes = bytes;
    currentFileName = `${t("paste_opt_hex")} (${bytes.length} bytes)`;
  } else {
    const encoder = new TextEncoder();
    currentBytes = encoder.encode(text);
    currentFileName = `${t("paste_opt_raw")} (${currentBytes.length} bytes)`;
  }

  if (pasteModal) pasteModal.classList.remove("open");
  onDataLoaded();
  showToast(t("toast_paste_success"));
}

/**
 * Handle state reset and rendering after new data is loaded
 */
function onDataLoaded() {
  if (!currentBytes) return;
  selectionAnchorIdx = null;
  selectionHeadIdx = null;
  updateStatusBar(null);
  renderView();
}

/**
 * Toggle Dark / Light Theme
 */
function toggleTheme() {
  const current = document.body.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", next);
}

// Bootstrap application on DOM ready
window.addEventListener("DOMContentLoaded", init);

