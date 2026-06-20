/**
 * Holberton-Turing Oath — signatures + suggestions collector
 * ------------------------------------------------------------
 * Saves submissions from BOTH website forms into ONE Google Sheet, routed to
 * two tabs (headers are added automatically on first write):
 *
 *   • "sign"         ← the Sign form
 *       Timestamp | Name | Email | Role | Country | Message | Language
 *   • "propositions" ← the Suggest form  (sent with role = "(suggestion)")
 *       Timestamp | Email | Suggestion | Language
 *
 * (Tab names match the sheet "HolberthonTuring_Oath". If you rename a tab,
 *  update TAB_SIGN / TAB_SUGGEST below.)
 *
 * SETUP
 * 1. Open your Google Sheet (tabs "sign" and "propositions" already created).
 * 2. Extensions ▸ Apps Script → delete the sample code, paste THIS file, Save.
 * 3. Deploy ▸ New deployment ▸ type "Web app"
 *      - Execute as:      Me
 *      - Who has access:  Anyone
 *    Click Deploy, authorize, and COPY the Web app URL (ends in /exec).
 * 4. Send that /exec URL back to wire it into the site (FORM_ENDPOINT).
 *
 * Both forms POST JSON: { name, email, role, country, message, language, timestamp }.
 * ------------------------------------------------------------
 */

var TAB_SIGN    = 'sign';          // Sign form  → signatures
var TAB_SUGGEST = 'propositions';  // Suggest form → suggestions

function doPost(e) {
  try {
    var d = {};
    if (e && e.postData && e.postData.contents) {
      d = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      d = e.parameter;
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var isSuggestion = String(d.role || '').toLowerCase().indexOf('suggestion') !== -1;

    if (isSuggestion) {
      var sug = sheetWithHeaders_(ss, TAB_SUGGEST,
        ['Timestamp', 'Email', 'Suggestion', 'Language']);
      sug.appendRow([ new Date(), d.email || '', d.message || '', d.language || '' ]);
    } else {
      var sig = sheetWithHeaders_(ss, TAB_SIGN,
        ['Timestamp', 'Name', 'Email', 'Role', 'Country', 'Message', 'Language']);
      sig.appendRow([ new Date(), d.name || '', d.email || '', d.role || '',
                      d.country || '', d.message || '', d.language || '' ]);
    }

    return json_({ result: 'ok' });
  } catch (err) {
    return json_({ result: 'error', message: String(err) });
  }
}

function doGet() {
  return ContentService.createTextOutput('Holberton-Turing Oath signature endpoint is running.');
}

/** Get a tab by name, creating it (with a frozen header row) if missing;
 *  also adds the header row if the tab exists but is empty. */
function sheetWithHeaders_(ss, name, headers) {
  var sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); }
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
