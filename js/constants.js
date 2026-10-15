/**
 * Hex & ASCII Log Viewer - constants.js
 * ASCII Control Characters (0x00 - 0x1F and 0x7F) with English & Indonesian descriptions
 * and CSS badge classification.
 */

const CTRL_CHARS = {
  0:  { name: 'NUL', desc_en: 'Null Byte', desc_id: 'Null Byte', cls: 'ctrl-other' },
  1:  { name: 'SOH', desc_en: 'Start of Heading', desc_id: 'Start of Heading', cls: 'ctrl-other' },
  2:  { name: 'STX', desc_en: 'Start of Text (Frame Start)', desc_id: 'Start of Text (Awal Frame)', cls: 'ctrl-stx' },
  3:  { name: 'ETX', desc_en: 'End of Text (Frame End)', desc_id: 'End of Text (Akhir Frame)', cls: 'ctrl-etx' },
  4:  { name: 'EOT', desc_en: 'End of Transmission (Finished)', desc_id: 'End of Transmission (Selesai Kirim)', cls: 'ctrl-eot' },
  5:  { name: 'ENQ', desc_en: 'Enquiry (Request to Send)', desc_id: 'Enquiry (Permintaan Kirim)', cls: 'ctrl-enq' },
  6:  { name: 'ACK', desc_en: 'Acknowledge (OK / Received)', desc_id: 'Acknowledge (Konfirmasi OK)', cls: 'ctrl-ack' },
  7:  { name: 'BEL', desc_en: 'Bell', desc_id: 'Bell', cls: 'ctrl-other' },
  8:  { name: 'BS',  desc_en: 'Backspace', desc_id: 'Backspace', cls: 'ctrl-other' },
  9:  { name: 'TAB', desc_en: 'Horizontal Tab', desc_id: 'Tab Horizontal', cls: 'ctrl-other' },
  10: { name: 'LF',  desc_en: 'Line Feed (New Line / 0x0A)', desc_id: 'Line Feed (Pindah Baris / 0x0A)', cls: 'ctrl-lf' },
  11: { name: 'VT',  desc_en: 'Vertical Tab', desc_id: 'Tab Vertikal', cls: 'ctrl-other' },
  12: { name: 'FF',  desc_en: 'Form Feed', desc_id: 'Form Feed', cls: 'ctrl-other' },
  13: { name: 'CR',  desc_en: 'Carriage Return (0x0D)', desc_id: 'Carriage Return (0x0D)', cls: 'ctrl-cr' },
  14: { name: 'SO',  desc_en: 'Shift Out', desc_id: 'Shift Out', cls: 'ctrl-other' },
  15: { name: 'SI',  desc_en: 'Shift In', desc_id: 'Shift In', cls: 'ctrl-other' },
  16: { name: 'DLE', desc_en: 'Data Link Escape', desc_id: 'Data Link Escape', cls: 'ctrl-other' },
  17: { name: 'DC1', desc_en: 'Device Control 1 (XON)', desc_id: 'Device Control 1 (XON)', cls: 'ctrl-other' },
  18: { name: 'DC2', desc_en: 'Device Control 2', desc_id: 'Device Control 2', cls: 'ctrl-other' },
  19: { name: 'DC3', desc_en: 'Device Control 3 (XOFF)', desc_id: 'Device Control 3 (XOFF)', cls: 'ctrl-other' },
  20: { name: 'DC4', desc_en: 'Device Control 4', desc_id: 'Device Control 4', cls: 'ctrl-other' },
  21: { name: 'NAK', desc_en: 'Negative Acknowledge (Error / Reject)', desc_id: 'Negative Acknowledge (Gagal / Tolak)', cls: 'ctrl-nak' },
  22: { name: 'SYN', desc_en: 'Synchronous Idle', desc_id: 'Synchronous Idle', cls: 'ctrl-other' },
  23: { name: 'ETB', desc_en: 'End of Trans. Block', desc_id: 'End of Trans. Block', cls: 'ctrl-etx' },
  24: { name: 'CAN', desc_en: 'Cancel', desc_id: 'Cancel', cls: 'ctrl-other' },
  25: { name: 'EM',  desc_en: 'End of Medium', desc_id: 'End of Medium', cls: 'ctrl-other' },
  26: { name: 'SUB', desc_en: 'Substitute', desc_id: 'Substitute', cls: 'ctrl-other' },
  27: { name: 'ESC', desc_en: 'Escape', desc_id: 'Escape', cls: 'ctrl-other' },
  28: { name: 'FS',  desc_en: 'File Separator', desc_id: 'File Separator', cls: 'ctrl-other' },
  29: { name: 'GS',  desc_en: 'Group Separator', desc_id: 'Group Separator', cls: 'ctrl-other' },
  30: { name: 'RS',  desc_en: 'Record Separator', desc_id: 'Record Separator', cls: 'ctrl-other' },
  31: { name: 'US',  desc_en: 'Unit Separator', desc_id: 'Unit Separator', cls: 'ctrl-other' },
  127:{ name: 'DEL', desc_en: 'Delete', desc_id: 'Delete', cls: 'ctrl-other' }
};

