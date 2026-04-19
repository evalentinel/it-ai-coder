(function () {
  function appendTextWithBreaks(fragment, text) {
    var parts = text.split("\n");
    parts.forEach(function (part, index) {
      if (part) {
        fragment.appendChild(document.createTextNode(part));
      }
      if (index < parts.length - 1) {
        fragment.appendChild(document.createElement("br"));
      }
    });
  }

  function buildLinkifiedFragment(text) {
    var pattern = /(https?:\/\/[^\s]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;
    var fragment = document.createDocumentFragment();
    var lastIndex = 0;
    var match;

    while ((match = pattern.exec(text)) !== null) {
      var raw = match[0];
      var start = match.index;
      var end = start + raw.length;
      var clean = raw.replace(/[),.;:!?]+$/g, "");
      var trailing = raw.slice(clean.length);
      var isMail = clean.indexOf("@") > -1 && clean.indexOf("http") !== 0;

      appendTextWithBreaks(fragment, text.slice(lastIndex, start));

      var link = document.createElement("a");
      link.href = isMail ? "mailto:" + clean : clean;
      link.textContent = clean;
      fragment.appendChild(link);

      appendTextWithBreaks(fragment, trailing);
      lastIndex = end;
    }

    appendTextWithBreaks(fragment, text.slice(lastIndex));
    return fragment;
  }

  document.querySelectorAll("pre").forEach(function (pre) {
    pre.replaceChildren(buildLinkifiedFragment(pre.textContent));
  });
})();
