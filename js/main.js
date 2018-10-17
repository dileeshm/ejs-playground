(function () {
  const defaultValue = `<%\nconst data = [{ ID: 1, MESSAGE: 'Hello, World!' },{ ID: 2, MESSAGE: 'Foo Bar' },{ ID: 3 }];\n-%>\n<%\ndata.forEach((record) => {\n  const recordObj = {\n    ...record\n  };\n\n  recordObj.hasMessage = !_.isNil(record.MESSAGE);\n%>\n<%-\nJSON.stringify(recordObj);\n-%>\n<%\n});\n%>`;
  const resultEl = document.getElementById('result');

  const editor = ace.edit('editor');
  editor.setTheme('ace/theme/monokai');
  editor.getSession().setMode('ace/mode/ejs');
  editor.setValue(window.localStorage.getItem('previous-session') || defaultValue, -1);
  editor.focus();

  const colors = {
    success: 'rgb(39, 174, 96)',
    failed: 'rgb(192, 57, 43)'
  };

  /**
   * @function handleEditorChange
   * @description Render EJS template OR error stack to result DOM element.
   */
  const handleEditorChange = () => {
    let result;
    try {
      result = ejs.render(editor.getValue());
      resultEl.parentNode.style.background = colors.success;
    } catch (e) {
      result = e.stack;
      resultEl.parentNode.style.background = colors.failed;
    }

    resultEl.textContent = result;
  };

  editor.on('change', handleEditorChange);
  handleEditorChange();


  /**
   * @listens window.beforeunload
   * @description Save the current editor text to load on next visit.
   */
  window.addEventListener('beforeunload', () => {
    if (resultEl.parentNode.style.background === colors.success) {
      window.localStorage.setItem('previous-session', editor.getValue());
    }
  });
})();
