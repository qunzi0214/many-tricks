const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[tag] || tag),
  )

escapeHTML('<a href="#">Me & you</a>') // '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'
