/**
 * Hex & ASCII Log Viewer - i18n.js
 * Internationalization (i18n) engine for English (default) and Indonesian.
 * Handles language switching, translation lookups, and dictionary rendering.
 */

const TRANSLATIONS = {
  en: {
    doc_title: "Hex & ASCII Log Viewer - Control Characters Display",
    brand_subtitle: "View Control Characters (STX, ETX, EOT, ACK, ENQ) & Hex Dump",
    btn_theme: "🌓 Theme",
    btn_theme_title: "Toggle Dark / Light Theme",
    btn_legend: "📖 Dictionary",
    btn_legend_title: "ASCII Control Characters Dictionary",
    btn_paste: "📋 Paste Text / Hex",
    btn_paste_title: "Paste raw text or hex string",
    dropzone_title: "Drag & drop log file here",
    dropzone_or: "or",
    btn_select_file: "Select File",
    dropzone_subtext: "Supports .log, .txt, .dat, .bin, .hex, or any binary files. 100% processed offline in your browser.",
    tab_badge: "🏷️ Control Badges (Text + Symbols)",
    tab_hex: "🔢 Hex Dump (Editor)",
    opt_linebreaks: "Format Newlines (CR/LF)",
    opt_showhex: "Show Hex Value in Badges",
    search_placeholder: "🔍 Search text / characters...",
    btn_copy_labeled: "Copy Labeled",
    btn_copy_labeled_title: "Copy text with [STX][ETX] labels",
    btn_copy_clean: "Copy Clean Text",
    btn_copy_clean_title: "Copy printable text only",
    btn_copy_hex: "Copy Hex",
    btn_copy_hex_title: "Copy hexadecimal string (05 02 31 ...)",
    viewer_title_default: "Interactive View",
    viewer_meta_empty: "No file loaded yet",
    empty_title: "No file loaded yet",
    empty_desc: "Please select or drop your log file above.",
    badge_title: "Interactive Text View with Control Character Badges",
    hex_title: "Hex Dump Viewer (Hexadecimal Editor Format)",
    hex_meta: "Offset | Hexadecimal Bytes (16 columns) | ASCII Stream",
    hex_hdr_offset: "Offset",
    hex_hdr_decoded: "Decoded Text",
    status_placeholder: "📍 Click or drag to select cell range and view calculations.",
    status_hint: "💡 Tip: Hold Shift + Drag / Arrow keys to select range | Esc to clear",
    tag_row: "Row:",
    tag_col: "Col:",
    tag_offset: "Offset:",
    tag_hex: "Hex:",
    tag_dec: "Dec:",
    tag_char: "Character:",
    tag_selected: "Selected:",
    tag_total: "Total (Sum):",
    tag_avg: "Average:",
    tag_minmax: "Min / Max:",
    tag_checksum: "Checksum (mod 256):",
    btn_copy_selection: "📋 Copy Selected",
    title_selected: "Number of selected bytes",
    title_sum: "Sum of byte values",
    title_avg: "Average byte value",
    title_minmax: "Minimum and maximum byte values",
    title_checksum: "Modulo 256 checksum (standard 8-bit sum)",
    title_copy_sel: "Copy selected bytes as hex",
    legend_title: "📖 ASCII Control Characters Dictionary",
    legend_intro: "These control characters (0x00 - 0x1F and 0x7F) are standard non-printable ASCII characters commonly used in serial communications, hardware interfaces, network protocols, and data streams:",
    modal_close: "Close",
    paste_title: "📋 Paste Text or Hex String",
    paste_type_label: "Select input type:",
    paste_opt_raw: "Raw Text (Raw String)",
    paste_opt_hex: "Hex String (e.g.: 05 02 31 48 7C ...)",
    paste_placeholder: "Paste data here...",
    modal_cancel: "Cancel",
    modal_apply: "Apply & View",
    toast_loaded: "Successfully loaded {name}",
    toast_paste_empty: "Please enter text first.",
    toast_paste_hex_invalid: "Invalid hex string (number of characters must be even).",
    toast_paste_success: "Text data applied successfully!",
    toast_range_copied: "{count} selected bytes copied to clipboard!",
    toast_no_file: "No file loaded yet!",
    toast_labeled_copied: "Labeled text [STX][ETX] copied to clipboard!",
    toast_clean_copied: "Clean text copied to clipboard!",
    toast_hex_copied: "Hex string copied to clipboard!",
    prompt_copy_byte: "Copy the following bytes:",
    prompt_copy_text: "Copy the following text:",
    prompt_copy_hex: "Copy the following hex:",
    binary_label: "Binary (0x{hex})"
  },
  id: {
    doc_title: "Hex & ASCII Log Viewer - Tampilan Karakter Kontrol",
    brand_subtitle: "Lihat Karakter Kontrol (STX, ETX, EOT, ACK, ENQ) & Hex Dump",
    btn_theme: "🌓 Tema",
    btn_theme_title: "Ganti Tema Gelap / Terang",
    btn_legend: "📖 Kamus Simbol",
    btn_legend_title: "Kamus Karakter Kontrol ASCII",
    btn_paste: "📋 Tempel Teks / Hex",
    btn_paste_title: "Tempel teks mentah atau hex string",
    dropzone_title: "Tarik & Lepaskan file log di sini",
    dropzone_or: "atau",
    btn_select_file: "Pilih File",
    dropzone_subtext: "Mendukung file .log, .txt, .dat, .bin, .hex, atau file biner lainnya. 100% diproses di browser Anda secara offline.",
    tab_badge: "🏷️ Tampilan Badge (Teks + Simbol)",
    tab_hex: "🔢 Hex Dump (Editor)",
    opt_linebreaks: "Format Baris Baru (CR/LF)",
    opt_showhex: "Tampilkan Nilai Hex di Badge",
    search_placeholder: "🔍 Cari teks...",
    btn_copy_labeled: "Salin Berlabel",
    btn_copy_labeled_title: "Salin dengan simbol [STX][ETX]",
    btn_copy_clean: "Salin Teks Bersih",
    btn_copy_clean_title: "Salin teks biasa",
    btn_copy_hex: "Salin Hex",
    btn_copy_hex_title: "Salin string hexadesimal (05 02 31 ...)",
    viewer_title_default: "Tampilan Interaktif",
    viewer_meta_empty: "Belum ada file yang dimuat",
    empty_title: "Belum ada file yang dimuat",
    empty_desc: "Silakan pilih atau tarik file log Anda ke kotak di atas.",
    badge_title: "Tampilan Teks Interaktif dengan Simbol Karakter Kontrol",
    hex_title: "Hex Dump Viewer (Format Editor Hexadesimal)",
    hex_meta: "Offset | Byte Heksadesimal (16 kolom) | ASCII Stream",
    hex_hdr_offset: "Offset",
    hex_hdr_decoded: "Decoded Text",
    status_placeholder: "📍 Klik atau drag untuk memilih rentang sel dan melihat hitungannya.",
    status_hint: "💡 Tips: Tahan Shift + Drag / Tombol Panah untuk memilih rentang | Esc batal",
    tag_row: "Baris:",
    tag_col: "Kolom:",
    tag_offset: "Offset:",
    tag_hex: "Hex:",
    tag_dec: "Dec:",
    tag_char: "Karakter:",
    tag_selected: "Terpilih:",
    tag_total: "Total (Sum):",
    tag_avg: "Rata-rata:",
    tag_minmax: "Min / Max:",
    tag_checksum: "Checksum (mod 256):",
    btn_copy_selection: "📋 Salin Terpilih",
    title_selected: "Jumlah Byte yang Dipilih",
    title_sum: "Total Penjumlahan Nilai Byte (Sum)",
    title_avg: "Rata-rata Nilai Byte",
    title_minmax: "Nilai Byte Terkecil dan Terbesar",
    title_checksum: "Checksum Modulo 256 (standar 8-bit sum)",
    title_copy_sel: "Salin byte yang dipilih",
    legend_title: "📖 Kamus Karakter Kontrol ASCII",
    legend_intro: "Karakter kontrol ini (0x00 - 0x1F dan 0x7F) merupakan karakter non-printable standar ASCII yang umum digunakan pada komunikasi serial, antarmuka perangkat keras, protokol jaringan, dan aliran data:",
    modal_close: "Tutup",
    paste_title: "📋 Tempel Teks atau Hex String",
    paste_type_label: "Pilih jenis input:",
    paste_opt_raw: "Teks Mentah (Raw String)",
    paste_opt_hex: "Hex String (contoh: 05 02 31 48 7C ...)",
    paste_placeholder: "Tempel data di sini...",
    modal_cancel: "Batal",
    modal_apply: "Terapkan & Lihat",
    toast_loaded: "Berhasil memuat {name}",
    toast_paste_empty: "Silakan masukkan teks terlebih dahulu.",
    toast_paste_hex_invalid: "Hex string tidak valid (jumlah karakter harus genap).",
    toast_paste_success: "Data teks berhasil diterapkan!",
    toast_range_copied: "{count} byte terpilih berhasil disalin!",
    toast_no_file: "Belum ada file yang dimuat!",
    toast_labeled_copied: "Teks berlabel [STX][ETX] berhasil disalin!",
    toast_clean_copied: "Teks bersih berhasil disalin!",
    toast_hex_copied: "Hex string berhasil disalin!",
    prompt_copy_byte: "Salin byte berikut:",
    prompt_copy_text: "Salin teks berikut:",
    prompt_copy_hex: "Salin hex berikut:",
    binary_label: "Biner (0x{hex})"
  }
};

// Active Language State (Default: English)
let currentLang = localStorage.getItem("hex_viewer_lang") || "en";

/**
 * Retrieve translated string by key with optional parameter substitution
 */
function t(key, params = {}) {
  let str = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) ||
            (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) || key;
  for (const [k, v] of Object.entries(params)) {
    str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return str;
}

/**
 * Get localized description for a control character code
 */
function getCtrlCharDesc(code) {
  if (typeof CTRL_CHARS === 'undefined' || !(code in CTRL_CHARS)) return "";
  const item = CTRL_CHARS[code];
  return currentLang === 'id' ? item.desc_id : item.desc_en;
}

/**
 * Switch Active Language and update UI
 */
function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'id') lang = 'en';
  currentLang = lang;
  localStorage.setItem("hex_viewer_lang", currentLang);
  document.documentElement.lang = currentLang;

  const langSelect = document.getElementById("lang-select");
  if (langSelect && langSelect.value !== currentLang) {
    langSelect.value = currentLang;
  }

  applyTranslations();

  if (typeof renderView === 'function') {
    renderView();
  }
  if (typeof selectionAnchorIdx !== 'undefined' && selectionAnchorIdx !== null) {
    if (typeof setSelection === 'function') setSelection(selectionAnchorIdx, selectionHeadIdx);
  } else {
    if (typeof updateStatusBar === 'function') updateStatusBar(null);
  }
}

/**
 * Apply translations to DOM elements with data-i18n attributes
 */
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    if (key) el.setAttribute("title", t(key));
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) el.setAttribute("placeholder", t(key));
  });

  document.title = t("doc_title");
  renderLegendModal();
}

/**
 * Render items in the Control Characters Dictionary Modal in current language
 */
function renderLegendModal() {
  const grid = document.getElementById("legend-grid");
  if (!grid || typeof CTRL_CHARS === 'undefined') return;

  const topCodes = [2, 3, 4, 5, 6, 21, 23, 13, 10, 0, 1, 16];
  grid.innerHTML = topCodes.map(code => {
    const item = CTRL_CHARS[code];
    const hex = "0x" + code.toString(16).padStart(2, '0').toUpperCase();
    const desc = getCtrlCharDesc(code);
    return `
      <div class="legend-item">
        <span class="ctrl-badge ${item.cls}">${item.name}</span>
        <div><strong>${hex}</strong> - ${desc}</div>
      </div>
    `;
  }).join('');
}
