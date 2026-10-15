/**
 * Hex & ASCII Log Viewer - viewer.js
 * Rendering engines for Control Badges View and Hex Dump View.
 * Implements high-performance Event Delegation for hover synchronization and selection.
 */

let activeTab = "badge-view";

/**
 * Render Current Active View (Badge or Hex)
 */
function renderView() {
  const viewerTitle = document.getElementById("viewer-title");
  const viewerMeta = document.getElementById("viewer-meta");
  const optLinebreaksWrapper = document.getElementById("opt-linebreaks-wrapper");
  const optShowhexWrapper = document.getElementById("opt-showhex-wrapper");
  const searchBox = document.getElementById("search-box");

  if (!currentBytes) {
    if (viewerTitle) viewerTitle.textContent = t("viewer_title_default");
    if (viewerMeta) viewerMeta.textContent = t("viewer_meta_empty");
    return;
  }

  if (activeTab === "badge-view") {
    if (viewerTitle) viewerTitle.textContent = t("badge_title");
    if (viewerMeta) viewerMeta.textContent = `${currentFileName} (${formatFileSize(currentBytes.length)})`;
    if (optLinebreaksWrapper) optLinebreaksWrapper.style.display = "inline-flex";
    if (optShowhexWrapper) optShowhexWrapper.style.display = "inline-flex";
    if (searchBox) searchBox.style.display = "inline-block";
    renderBadgeView();
  } else if (activeTab === "hex-view") {
    if (viewerTitle) viewerTitle.textContent = t("hex_title");
    if (viewerMeta) viewerMeta.textContent = t("hex_meta");
    if (optLinebreaksWrapper) optLinebreaksWrapper.style.display = "none";
    if (optShowhexWrapper) optShowhexWrapper.style.display = "none";
    if (searchBox) searchBox.style.display = "none";
    renderHexView();
  }
}

/**
 * TAB 1: Interactive Text View with Control Character Badges
 */
function renderBadgeView() {
  const viewerContent = document.getElementById("viewer-content");
  const optLinebreaks = document.getElementById("opt-linebreaks");
  const optShowHex = document.getElementById("opt-showhex");
  const searchBox = document.getElementById("search-box");
  if (!viewerContent || !currentBytes) return;

  const breakLines = optLinebreaks ? optLinebreaks.checked : true;
  const showHex = optShowHex ? optShowHex.checked : false;
  const searchQuery = searchBox ? searchBox.value.trim().toLowerCase() : "";

  let html = "";
  let lineNum = 1;
  let currentLineHtml = "";
  let colNum = 1;

  const minSel = (selectionAnchorIdx !== null) ? Math.min(selectionAnchorIdx, selectionHeadIdx) : -1;
  const maxSel = (selectionAnchorIdx !== null) ? Math.max(selectionAnchorIdx, selectionHeadIdx) : -1;

  function pushLine() {
    html += `<div class="badge-line"><span class="line-number">${lineNum}</span><span class="line-content">${currentLineHtml}</span></div>`;
    lineNum++;
    colNum = 1;
    currentLineHtml = "";
  }

  for (let i = 0; i < currentBytes.length; i++) {
    const b = currentBytes[i];
    const hex = b.toString(16).padStart(2, '0').toUpperCase();

    let selClass = "";
    if (minSel !== -1 && i >= minSel && i <= maxSel) {
      if (minSel === maxSel) {
        selClass = "selected";
      } else {
        selClass = (i === minSel || i === maxSel) ? "in-range range-edge" : "in-range";
      }
    }

    if (typeof CTRL_CHARS !== 'undefined' && b in CTRL_CHARS) {
      const ctrl = CTRL_CHARS[b];
      const desc = getCtrlCharDesc(b);
      const badgeText = showHex ? `${ctrl.name}:${hex}` : ctrl.name;
      const titleLabel = currentLang === 'id' 
        ? `Kode: 0x${hex} (${b}) &#10;Nama: ${ctrl.name} (${desc})` 
        : `Code: 0x${hex} (${b}) &#10;Name: ${ctrl.name} (${desc})`;

      currentLineHtml += `<span class="ctrl-badge ${ctrl.cls} ${selClass}" data-idx="${i}" data-row="${lineNum}" data-col="${colNum}" title="${titleLabel}">${badgeText}</span>`;
      colNum++;

      if (breakLines) {
        if (b === 10) { // LF
          pushLine();
        } else if (b === 13) { // CR
          if (i + 1 < currentBytes.length && currentBytes[i + 1] !== 10) {
            pushLine();
          }
        }
      }
    } else {
      const char = String.fromCharCode(b);
      currentLineHtml += `<span class="badge-char ${selClass}" data-idx="${i}" data-row="${lineNum}" data-col="${colNum}">${escapeHtml(char)}</span>`;
      colNum++;
    }
  }

  if (currentLineHtml) {
    pushLine();
  }

  viewerContent.innerHTML = html;

  // Search filter highlighting
  if (searchQuery) {
    viewerContent.querySelectorAll(".badge-line").forEach(lineEl => {
      const text = lineEl.textContent.toLowerCase();
      if (text.includes(searchQuery)) {
        lineEl.style.backgroundColor = "rgba(56, 189, 248, 0.15)";
      } else {
        lineEl.style.opacity = "0.35";
      }
    });
  }

  // Restore active range highlights if selection exists
  if (selectionAnchorIdx !== null) {
    setSelection(selectionAnchorIdx, selectionHeadIdx);
  }
}

/**
 * TAB 2: Hex Dump Viewer (16 Columns Hexadecimal Editor Format)
 */
function renderHexView() {
  const viewerContent = document.getElementById("viewer-content");
  if (!viewerContent || !currentBytes) return;

  const minSel = (selectionAnchorIdx !== null) ? Math.min(selectionAnchorIdx, selectionHeadIdx) : -1;
  const maxSel = (selectionAnchorIdx !== null) ? Math.max(selectionAnchorIdx, selectionHeadIdx) : -1;

  // Column Headers 00 to 0F
  let colsHeader = "";
  for (let c = 0; c < 16; c++) {
    const colHex = c.toString(16).padStart(2, '0').toUpperCase();
    const isActive = (minSel !== -1 && minSel === maxSel && (minSel % 16) === c) ? "active" : "";
    colsHeader += `<span class="hex-col-hdr ${isActive}" data-col="${c}">${colHex}</span> `;
    if (c === 7) colsHeader += "&nbsp; ";
  }

  let html = `<div class="hex-dump-wrapper">
    <table class="hex-dump-table">
      <thead>
        <tr>
          <th class="hex-offset-hdr">${t('hex_hdr_offset')}</th>
          <th class="hex-bytes-hdr">${colsHeader}</th>
          <th class="hex-ascii-hdr">${t('hex_hdr_decoded')}</th>
        </tr>
      </thead>
      <tbody>`;

  const total = currentBytes.length;

  for (let i = 0; i < total; i += 16) {
    const offsetHex = i.toString(16).padStart(8, '0').toUpperCase();
    const isRowActive = (minSel !== -1 && i >= Math.floor(minSel / 16) * 16 && i <= Math.floor(maxSel / 16) * 16) ? "active" : "";
    let hexCols = "";
    let asciiCols = "";

    for (let j = 0; j < 16; j++) {
      const byteIdx = i + j;
      if (byteIdx < total) {
        const b = currentBytes[byteIdx];
        const hex = b.toString(16).padStart(2, '0').toUpperCase();
        const isCtrl = (typeof CTRL_CHARS !== 'undefined' && b in CTRL_CHARS);
        const ctrlCls = isCtrl ? "ctrl" : "";

        let selClass = "";
        if (minSel !== -1 && byteIdx >= minSel && byteIdx <= maxSel) {
          if (minSel === maxSel) {
            selClass = "selected";
          } else {
            selClass = (byteIdx === minSel || byteIdx === maxSel) ? "in-range range-edge" : "in-range";
          }
        }

        // Hex Byte span
        hexCols += `<span class="hex-byte ${ctrlCls} ${selClass}" data-idx="${byteIdx}" data-row="${Math.floor(i / 16) + 1}" data-col="${j + 1}" title="Offset: 0x${byteIdx.toString(16).toUpperCase()} | Dec: ${b}">${hex}</span> `;
        if (j === 7) hexCols += "&nbsp; ";

        // ASCII span
        let asciiChar = ".";
        if (b >= 32 && b <= 126) {
          asciiChar = escapeHtml(String.fromCharCode(b));
        }
        asciiCols += `<span class="ascii-char ${ctrlCls} ${selClass}" data-idx="${byteIdx}" data-row="${Math.floor(i / 16) + 1}" data-col="${j + 1}" title="Byte 0x${hex}">${asciiChar}</span>`;
      } else {
        hexCols += `&nbsp;&nbsp; `;
        if (j === 7) hexCols += "&nbsp; ";
        asciiCols += `&nbsp;`;
      }
    }

    html += `<tr>
      <td class="hex-offset ${isRowActive}" data-row-offset="${offsetHex}">${offsetHex}</td>
      <td class="hex-bytes">${hexCols}</td>
      <td class="hex-ascii">${asciiCols}</td>
    </tr>`;
  }

  html += `</tbody></table></div>`;
  viewerContent.innerHTML = html;

  if (selectionAnchorIdx !== null) {
    setSelection(selectionAnchorIdx, selectionHeadIdx);
  }
}

/**
 * Event Delegation for Viewer (High Performance Hover and Click/Drag Handling)
 * Replaces thousands of element-level listeners with centralized container handling.
 */
function initViewerEvents() {
  const viewerContent = document.getElementById("viewer-content");
  if (!viewerContent) return;

  // Hover sync (Highlight matching byte representation in Hex & ASCII)
  viewerContent.addEventListener("mouseover", (e) => {
    const el = e.target.closest("[data-idx]");
    if (!el) return;
    const idx = el.getAttribute("data-idx");
    if (!idx) return;

    viewerContent.querySelectorAll(`[data-idx="${idx}"]`).forEach(match => match.classList.add("hovered"));

    // Mouse drag selection continuation
    if (isSelecting && selectionAnchorIdx !== null) {
      setSelection(selectionAnchorIdx, parseInt(idx, 10));
    }
  });

  viewerContent.addEventListener("mouseout", (e) => {
    const el = e.target.closest("[data-idx]");
    if (!el) return;
    const idx = el.getAttribute("data-idx");
    if (!idx) return;

    viewerContent.querySelectorAll(`[data-idx="${idx}"]`).forEach(match => match.classList.remove("hovered"));
  });

  // Mouse selection initiation
  viewerContent.addEventListener("mousedown", (e) => {
    const el = e.target.closest("[data-idx]");
    if (!el) return;
    e.preventDefault();

    const idx = parseInt(el.getAttribute("data-idx"), 10);
    if (e.shiftKey && selectionAnchorIdx !== null) {
      setSelection(selectionAnchorIdx, idx);
    } else {
      isSelecting = true;
      setSelection(idx, idx);
    }
  });
}

/**
 * Copy Labeled Text ([STX]...[ETX])
 */
function copyFormattedText() {
  if (!currentBytes) {
    showToast(t("toast_no_file"));
    return;
  }
  let result = "";
  for (let i = 0; i < currentBytes.length; i++) {
    const b = currentBytes[i];
    if (typeof CTRL_CHARS !== 'undefined' && b in CTRL_CHARS) {
      result += `[${CTRL_CHARS[b].name}]`;
      if (b === 10) result += "\n";
    } else {
      result += String.fromCharCode(b);
    }
  }
  navigator.clipboard.writeText(result).then(() => {
    showToast(t("toast_labeled_copied"));
  }).catch(() => {
    prompt(t("prompt_copy_text"), result);
  });
}

/**
 * Copy Clean Printable Text
 */
function copyRawText() {
  if (!currentBytes) {
    showToast(t("toast_no_file"));
    return;
  }
  let result = "";
  for (let i = 0; i < currentBytes.length; i++) {
    const b = currentBytes[i];
    if (b === 10) {
      result += "\n";
    } else if (b >= 32 && b <= 126) {
      result += String.fromCharCode(b);
    }
  }
  navigator.clipboard.writeText(result).then(() => {
    showToast(t("toast_clean_copied"));
  }).catch(() => {
    prompt(t("prompt_copy_text"), result);
  });
}

/**
 * Copy Hexadecimal String (05 02 31 ...)
 */
function copyHexText() {
  if (!currentBytes) {
    showToast(t("toast_no_file"));
    return;
  }
  const hexArr = [];
  for (let i = 0; i < currentBytes.length; i++) {
    hexArr.push(currentBytes[i].toString(16).padStart(2, '0').toUpperCase());
  }
  const result = hexArr.join(' ');
  navigator.clipboard.writeText(result).then(() => {
    showToast(t("toast_hex_copied"));
  }).catch(() => {
    prompt(t("prompt_copy_hex"), result);
  });
}

