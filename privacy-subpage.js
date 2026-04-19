(function () {
  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function linkifyText(text) {
    var pattern = /(https?:\/\/[^\s]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;
    var html = "";
    var lastIndex = 0;
    var match;

    while ((match = pattern.exec(text)) !== null) {
      var raw = match[0];
      var start = match.index;
      var end = start + raw.length;
      var clean = raw.replace(/[),.;:!?]+$/g, "");
      var trailing = raw.slice(clean.length);
      var isMail = clean.indexOf("@") > -1 && clean.indexOf("http") !== 0;

      html += escapeHtml(text.slice(lastIndex, start));
      html += '<a href="' + (isMail ? "mailto:" + clean : clean) + '">' + escapeHtml(clean) + "</a>";
      html += escapeHtml(trailing);
      lastIndex = end;
    }

    html += escapeHtml(text.slice(lastIndex));
    return html.replace(/\n/g, "<br>");
  }

  document.querySelectorAll("pre").forEach(function (pre) {
    pre.innerHTML = linkifyText(pre.textContent);
  });
})();
