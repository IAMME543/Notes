(function () {
  function extractTitle(str) {
    const trimedstr = str.trimStart();

    if (trimedstr[0] === "#") {
      const nlIndex = trimedstr.indexOf("\n");

      if (nlIndex !== -1) {
        return trimedstr.substring(1, nlIndex);
      } else {
        return trimedstr;
      }
    } else {
      return "You need to name the file next time";
    }
  }
  const textarea = document.getElementById("notes");

  console.log("Started");
  const saveButton = document
    .getElementById("Save")
    .addEventListener("click", function () {
      console.log("Save");

      const blob = new Blob([textarea.value], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = extractTitle(textarea.value) + ".txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    });

  const loadButton = document
    .getElementById("Load")
    .addEventListener("click", function () {
      console.log("Load");

      const input = document.createElement("input");
      input.type = "file";
      input.accept = 'text/plain'


      document.body.appendChild(input);

      input.addEventListener("change", function () {
        const file = this.files[0];

      if (file && file.type === "text/plain") {
        const reader = new FileReader();

        reader.onload = function (e) {
          const content = e.target.result;

          textarea.value = content;
        };

        reader.readAsText(file);
      } else {
        alert("Please select a plain text (.txt) file.");
      }
      })

      input.click();

      
      document.body.removeChild(input);
    });
})();
