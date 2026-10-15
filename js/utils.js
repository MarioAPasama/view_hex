/**
 * Hex & ASCII Log Viewer - utils.js
 * Common utility functions: HTML escaping, file size formatting, and toast notifications.
 */

let toastTimeout = null;

/**
 * Escape HTML special characters to prevent injection
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Format bytes to human-readable size (B, KB, MB)
 */
function formatFileSize(bytes) {
  if (typeof bytes !== 'number' || isNaN(bytes)) return "0 B";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(2) + " MB";
}

/**
 * Display toast popup notification
 */
function showToast(msg) {
  const toastEl = document.getElementById("toast");
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2200);
}

