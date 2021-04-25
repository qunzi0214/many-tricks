const fromCamelCase = (str, separator = '_') =>
  str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase()

fromCamelCase('someDatabaseFieldName', ' ') // 'some database field name'
fromCamelCase('someLabelThatNeedsToBeCamelized', '-') // 'some-label-that-needs-to-be-camelized'
fromCamelCase('someJavascriptProperty', '_') // 'some_javascript_property'
