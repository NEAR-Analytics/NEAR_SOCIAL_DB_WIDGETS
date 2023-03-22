State.init({
  jsonStr: "",
  prettifiedJson: "",
  fiexedJsonErrors: "",
});
async function formatClickHandler() {
  let formattedJsonStr = "";
  let fixedErrors = "";

  try {
    // Validate input as JSON according to RFC 8259
    const jsonObj = JSON.parse(state.jsonStr);
    // Stringify the JSON object with indentation and sorting keys
    formattedJsonStr = JSON.stringify(jsonObj, null, 4);
  } catch (error) {
    // If parsing fails, try to fix common errors in the JSON string
    let fixedJsonStr = jsonStr
      // Fix missing quotes around property names
      .replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, (match, p1, p2) => {
        fixedErrors += `Missing quotes around "${p2}"\n`;
        return `${p1}"${p2}":`;
      })
      // Fix trailing commas in arrays and objects
      .replace(/,(?=\s*([}\]]))/g, (match) => {
        fixedErrors += `Trailing comma removed\n`;
        return "";
      })
      // Fix single quotes around property names and string values
      .replace(/'/g, (match) => {
        fixedErrors += `Single quotes replaced with double quotes\n`;
        return '"';
      })
      // Fix unquoted property values
      .replace(
        /([{,]\s*)([a-zA-Z0-9_$]+)\s*:\s*([a-zA-Z0-9_$]+)\s*(?=([,}]))/g,
        (match, p1, p2, p3, p4) => {
          fixedErrors += `Unquoted value "${p3}" surrounded with quotes\n`;
          return `${p1}"${p2}":"${p3}"${p4}`;
        }
      )
      // Fix invalid escape sequences in string values
      .replace(/\\([^"\\/bfnrtu])/g, (match, p1) => {
        fixedErrors += `Invalid escape sequence "\\${p1}" removed\n`;
        return "";
      });
    try {
      // Try to parse the fixed JSON string
      const jsonObj = JSON.parse(fixedJsonStr);
      // Stringify the JSON object with indentation and sorting keys
      formattedJsonStr = JSON.stringify(jsonObj, null, 4);
    } catch (error) {
      // If parsing still fails, return an error message
      formattedJsonStr = `Error: ${error.message}`;
    }
  }
  State.update({ prettifiedJson: formattedJsonStr });
  State.update({ fiexedJsonErrors: fixedErrors });
}

async function dragAndDropHandler(event) {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const fileData = fileReader.result;
    State.update({ jsonStr: fileData });
    State.update({ prettifiedJson: "" });
    State.update({ fiexedJsonErrors: "" });
  };
  fileReader.readAsText(file);
}

function fileUploadHandler({ target }) {
  const file = target.files[0];

  if (!file) {
    return;
  }

  const fileReader = new FileReader();
  fileReader.onload = () => {
    const fileData = JSON.parse(fileReader.result);
    State.update({ jsonStr: fileData });
    State.update({ prettifiedJson: "" });
    State.update({ fiexedJsonErrors: "" });
  };
  fileReader.readAsText(file);
}

async function urlInputHandler(event) {
  const url = event.target.value;
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    const newJsonStr = JSON.stringify(jsonData, null, 4);
    State.update({ jsonStr: newJsonStr });
    State.update({ prettifiedJson: "" });
    State.update({ fiexedJsonErrors: "" });
  } catch (error) {
    console.error(error);
    State.update({ jsonStr: "" });
    State.update({
      prettifiedJson: "Error: Failed to fetch JSON data from URL",
    });
    State.update({ fiexedJsonErrors: "" });
  }
}

const clickCopyHandler = () => {
  navigator.clipboard.writeText(state.prettifiedJson);
};

const fileDownloadHandler = () => {
  const element = document.createElement("a");
  const file = new Blob([state.prettifiedJson], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "formatted.json";
  document.body.appendChild(element);
  element.click();
};

const changeHandler = ({ target }) => {
  State.update({ jsonStr: target.value });
};

return (
  <div>
    <div class="container-fluid">
      <h3 class="text-center">Input JSON data</h3>
      <textarea
        class="container-fluid"
        rows="10"
        value={state.jsonStr}
        onChange={changeHandler}
        onDrop={dragAndDropHandler}
        onDragOver={(e) => e.preventDefault()}
        placeholder="Enter or drag and drop JSON data here..."
      />
      <div className="input-actions">
        <input type="file" accept=".json" onChange={fileUploadHandler} />
        <input
          type="text"
          placeholder="Enter URL to fetch JSON data"
          onBlur={urlInputHandler}
        />
      </div>
    </div>
    <button onClick={formatClickHandler}>Format JSON</button>
    {state.prettifiedJson && (
      <>
        <div class="output-container">
          <h3>Formatted JSON data</h3>
          {state.fiexedJsonErrors && (
            <div class="border">
              <h3>Fixed errors</h3>
              <pre>{state.fiexedJsonErrors}</pre>
            </div>
          )}
          <textarea
            class="container-fluid"
            rows="10"
            value={state.prettifiedJson}
            readOnly
          />
        </div>

        <div class="output-actions">
          <button onClick={clickCopyHandler}>Copy to clipboard</button>
          <button onClick={fileDownloadHandler}>Download as file</button>
        </div>
      </>
    )}
  </div>
);
