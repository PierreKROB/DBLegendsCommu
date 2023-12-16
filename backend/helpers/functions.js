function htmlEscape(string) {
    return string.replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#39;") // Prevent HTML injection
}

module.exports = { htmlEscape }