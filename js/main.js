(function () {

  var $result = document.getElementById("result");

  function update() {
    var result = null
      , input = editor.getValue()
      ;

    try {
      result = ejs.render(input)
      $result.parentNode.style.background = "#27ae60";
    } catch (e) {
      result = e.stack;
      $result.parentNode.style.background = "#c0392b";
    }

    $result.textContent = result;
  }

  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/ejs");
  editor.on("change", update);
  editor.setValue(`<%
const data = [{ ID: 1, MESSAGE: 'Hello, World!' },{ ID: 2, MESSAGE: 'Foo Bar' },{ ID: 3 }];
-%>
<%
data.forEach((record) => {
  const recordObj = {
    ...record
  };

  recordObj.hasMessage = !_.isNil(record.MESSAGE);
%>
<%-
JSON.stringify(recordObj);
-%>
<%
});
%>`, -1);
  editor.focus();
})();
