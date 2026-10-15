/**
 * Hex & ASCII Log Viewer - selection.js
 * Multi-cell range selection, real-time calculations (Sum, Avg, Min/Max, Checksum Mod 256),
 * status bar inspector, and range clipboard copying.
 */

// Selection State
let selectionAnchorIdx = null; // Start index of selection
let selectionHeadIdx = null;   // End index of selection
let isSelecting = false;       // Mouse drag selection flag

/**
 * Select a single cell or a multi-cell range and update calculations
 */
function setSelection(anchor, head) {
  const viewerContent = document.getElementById("viewer-content");
  if (!viewerContent || anchor === null || !currentBytes || currentBytes.length === 0) {
    selectionAnchorIdx = null;
    selectionHeadIdx = null;
    updateStatusBar(null);
    if (viewerContent) {
      viewerContent.querySelectorAll(".selected, .in-range, .range-edge").forEach(el => {
        el.classList.remove("selected", "in-range", "range-edge");
      });
      viewerContent.querySelectorAll(".hex-col-hdr.active, .hex-offset.active").forEach(el => {
        el.classList.remove("active");
      });
    }
    return;
  }

  if (head === null) head = anchor;

  selectionAnchorIdx = Math.max(0, Math.min(anchor, currentBytes.length - 1));
  selectionHeadIdx = Math.max(0, Math.min(head, currentBytes.length - 1));

  const minIdx = Math.min(selectionAnchorIdx, selectionHeadIdx);
  const maxIdx = Math.max(selectionAnchorIdx, selectionHeadIdx);
  const count = maxIdx - minIdx + 1;

  // Clear previous highlights
  viewerContent.querySelectorAll(".selected, .in-range, .range-edge").forEach(el => {
    el.classList.remove("selected", "in-range", "range-edge");
  });
  viewerContent.querySelectorAll(".hex-col-hdr.active, .hex-offset.active").forEach(el => {
    el.classList.remove("active");
  });

  if (count === 1) {
    // ----------------------------------------------------
    // CASE 1: SINGLE CELL SELECTED
    // ----------------------------------------------------
    const idx = minIdx;
    const b = currentBytes[idx];
    const hex = b.toString(16).padStart(2, '0').toUpperCase();
    const dec = b;
    const offsetHex = "0x" + idx.toString(16).padStart(6, '0').toUpperCase();
    const offsetDec = idx;

    let row, col, colHex;
    if (activeTab === "hex-view") {
      row = Math.floor(idx / 16) + 1;
      col = (idx % 16) + 1;
      colHex = "0x" + (idx % 16).toString(16).toUpperCase();
    } else {
      const el = viewerContent.querySelector(`[data-idx="${idx}"]`);
      row = el ? el.getAttribute("data-row") : Math.floor(idx / 16) + 1;
      col = el ? el.getAttribute("data-col") : (idx % 16) + 1;
      colHex = "0x" + (idx % 16).toString(16).toUpperCase();
    }

    let charName = "";
    if (typeof CTRL_CHARS !== 'undefined' && b in CTRL_CHARS) {
      charName = `${CTRL_CHARS[b].name} (${getCtrlCharDesc(b)})`;
    } else if (b >= 32 && b <= 126) {
      charName = `'${String.fromCharCode(b)}' (ASCII)`;
    } else {
      charName = t("binary_label", { hex });
    }

    viewerContent.querySelectorAll(`[data-idx="${idx}"]`).forEach(el => el.classList.add("selected"));

    if (activeTab === "hex-view") {
      const colIdx = idx % 16;
      const colHdr = viewerContent.querySelector(`.hex-col-hdr[data-col="${colIdx}"]`);
      if (colHdr) colHdr.classList.add("active");

      const rowOffsetHex = (Math.floor(idx / 16) * 16).toString(16).padStart(8, '0').toUpperCase();
      const rowEl = viewerContent.querySelector(`[data-row-offset="${rowOffsetHex}"]`);
      if (rowEl) rowEl.classList.add("active");
    }

    updateStatusBar({
      isRange: false,
      row,
      col,
      colHex,
      offsetHex,
      offsetDec,
      hex,
      dec,
      charName
    });
  } else {
    // ----------------------------------------------------
    // CASE 2: MULTI-CELL RANGE SELECTED WITH CALCULATIONS
    // ----------------------------------------------------
    let sum = 0;
    let minVal = 256;
    let maxVal = -1;

    for (let i = minIdx; i <= maxIdx; i++) {
      const b = currentBytes[i];
      sum += b;
      if (b < minVal) minVal = b;
      if (b > maxVal) maxVal = b;
    }

    const avg = (sum / count).toFixed(1);
    const sumHex = "0x" + sum.toString(16).toUpperCase();
    const chkMod256 = (sum % 256).toString(16).padStart(2, '0').toUpperCase();
    const startOffsetHex = "0x" + minIdx.toString(16).padStart(4, '0').toUpperCase();
    const endOffsetHex = "0x" + maxIdx.toString(16).padStart(4, '0').toUpperCase();

    // High performance DOM highlight
    if (count <= 600) {
      for (let i = minIdx; i <= maxIdx; i++) {
        const matches = viewerContent.querySelectorAll(`[data-idx="${i}"]`);
        matches.forEach(el => {
          el.classList.add("in-range");
          if (i === minIdx || i === maxIdx) el.classList.add("range-edge");
        });
      }
    } else {
      viewerContent.querySelectorAll("[data-idx]").forEach(el => {
        const i = parseInt(el.getAttribute("data-idx"), 10);
        if (i >= minIdx && i <= maxIdx) {
          el.classList.add("in-range");
          if (i === minIdx || i === maxIdx) el.classList.add("range-edge");
        }
      });
    }

    if (activeTab === "hex-view") {
      const startRowOffset = Math.floor(minIdx / 16) * 16;
      const endRowOffset = Math.floor(maxIdx / 16) * 16;
      viewerContent.querySelectorAll(".hex-offset").forEach(el => {
        const rowVal = parseInt(el.getAttribute("data-row-offset"), 16);
        if (rowVal >= startRowOffset && rowVal <= endRowOffset) {
          el.classList.add("active");
        }
      });
    }

    updateStatusBar({
      isRange: true,
      count,
      startOffsetHex,
      endOffsetHex,
      minIdx,
      maxIdx,
      sum,
      sumHex,
      avg,
      minValHex: "0x" + minVal.toString(16).padStart(2, '0').toUpperCase(),
      maxValHex: "0x" + maxVal.toString(16).padStart(2, '0').toUpperCase(),
      chkMod256
    });
  }
}

/**
 * Display Single Cell Info or Multi-Cell Range Calculations in the Floating Status Bar
 */
function updateStatusBar(info) {
  const statusContainer = document.getElementById("viewer-statusbar");
  if (!statusContainer) return;

  if (!info) {
    statusContainer.innerHTML = `
      <div class="status-placeholder">
        <span>${t("status_placeholder")}</span>
        <span class="status-hint">${t("status_hint")}</span>
      </div>
    `;
    return;
  }

  if (info.isRange) {
    statusContainer.innerHTML = `
      <div class="status-details">
        <span class="status-tag" title="${t('title_selected')}"><strong>${t('tag_selected')}</strong> ${info.count} byte <small style="opacity:0.75">(${info.startOffsetHex} - ${info.endOffsetHex})</small></span>
        <span class="status-tag" title="${t('title_sum')}"><strong>${t('tag_total')}</strong> ${info.sum} <small style="opacity:0.75">(${info.sumHex})</small></span>
        <span class="status-tag" title="${t('title_avg')}"><strong>${t('tag_avg')}</strong> ${info.avg}</span>
        <span class="status-tag" title="${t('title_minmax')}"><strong>${t('tag_minmax')}</strong> ${info.minValHex} / ${info.maxValHex}</span>
        <span class="status-tag" title="${t('title_checksum')}"><strong>${t('tag_checksum')}</strong> 0x${info.chkMod256}</span>
        <button class="btn" id="btn-copy-selection" title="${t('title_copy_sel')}" style="padding: 0.2rem 0.55rem; font-size: 0.72rem; min-height: 28px;">${t('btn_copy_selection')}</button>
      </div>
    `;

    const copyBtn = document.getElementById("btn-copy-selection");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        copySelectionRange(info.minIdx, info.maxIdx);
      });
    }
  } else {
    statusContainer.innerHTML = `
      <div class="status-details">
        <span class="status-tag" title="${t('tag_row')}"><strong>${t('tag_row')}</strong> ${info.row}</span>
        <span class="status-tag" title="${t('tag_col')}"><strong>${t('tag_col')}</strong> ${info.col} <small style="opacity:0.75">(${info.colHex})</small></span>
        <span class="status-tag" title="${t('tag_offset')}"><strong>${t('tag_offset')}</strong> ${info.offsetHex} <small style="opacity:0.75">(${info.offsetDec})</small></span>
        <span class="status-tag" title="${t('tag_hex')}"><strong>${t('tag_hex')}</strong> 0x${info.hex}</span>
        <span class="status-tag" title="${t('tag_dec')}"><strong>${t('tag_dec')}</strong> ${info.dec}</span>
        <span class="status-tag" title="${t('tag_char')}"><strong>${t('tag_char')}</strong> ${escapeHtml(info.charName)}</span>
      </div>
    `;
  }
}

/**
 * Copy Bytes in Selected Range as Space-Separated Hex String
 */
function copySelectionRange(minIdx, maxIdx) {
  if (!currentBytes) return;
  const hexArr = [];
  for (let i = minIdx; i <= maxIdx; i++) {
    hexArr.push(currentBytes[i].toString(16).padStart(2, '0').toUpperCase());
  }
  const result = hexArr.join(' ');
  navigator.clipboard.writeText(result).then(() => {
    showToast(t("toast_range_copied", { count: maxIdx - minIdx + 1 }));
  }).catch(() => {
    prompt(t("prompt_copy_byte"), result);
  });
}

