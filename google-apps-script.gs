/**
 * Holberton-Turing Oath — signature collector
 * ------------------------------------------------------------
 * Saves each signature from the website into a Google Sheet.
 *
 * SETUP
 * 1. Create a Google Sheet. In row 1 add these headers (column A→G):
 *      Timestamp | Name | Email | Role | Country | Message | Language
 * 2. Extensions ▸ Apps Script. Delete the sample code, paste this file.
 * 3. Deploy ▸ New deployment ▸ type "Web app".
 *      - Execute as:  Me
 *      - Who has access:  Anyone
 *    Click Deploy, authorize, and COPY the Web app URL (ends in /exec).
 * 4. Open index.html and paste that URL into FORM_ENDPOINT (top of the
 *    <script> logic), e.g.  FORM_ENDPOINT = "https://script.google.com/.../exec";
 * ------------------------------------------------------------
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Signatures') || ss.getSheets()[0];

    var d = {};
    if (e && e.postData && e.postData.contents) {
      d = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      d = e.parameter;
    }

    sheet.appendRow([
      new Date(),
      d.name || '',
      d.email || '',
      d.role || '',
      d.country || '',
      d.message || '',
      d.language || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Holberton-Turing Oath signature endpoint is running.');
}
