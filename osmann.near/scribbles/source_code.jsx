const accountId = context.accountId;
if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const scribbles = Social.get(`${accountId}/scribbles/**`, "final") || [];

State.init({
  selectedIdx: 0,
  showEditView: false,
  editView: {
    editViewText: "",
    fileName: null,
  },
  dir: "/",
});

if (state.showEditView) {
  return (
    <>
      <div
        class="input-group-append"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          class="btn btn-outline-secondary"
          type="button"
          onClick={() =>
            State.update({
              showEditView: false,
              editView: { ...state.editView, editViewText: "", fileName: null },
            })
          }
          style={{ fontSize: 22, border: "none" }}
        >
          ✖
        </button>
        <h5 style={{ marginLeft: 10, marginBottom: 0 }}>
          {state.editView.fileName}
        </h5>
      </div>
      <hr style={{ marginTop: 5 }} />
      <textarea
        class="form-control"
        id="notetext"
        rows="10"
        value={state.editView.editViewText}
        onChange={(e) =>
          State.update({
            editView: { ...state.editView, editViewText: e.target.value },
          })
        }
      ></textarea>
      <hr />
      <CommitButton
        data={{
          scribbles: state.dir
            .split("/")
            .filter((a) => !!a)
            .reduceRight((acc, curr) => ({ [curr]: acc }), {
              [state.editView.fileName]: state.editView.editViewText,
            }),
        }}
      >
        Submit Note 📄
      </CommitButton>
    </>
  );
}

let currDir = state.dir
  .split("/")
  .filter((a) => !!a)
  .reduce((acc, curr) => acc[curr], scribbles);
if (currDir == "**FOLDER**" || !currDir) {
  currDir = {};
}

return (
  <>
    <h1
      style={{
        fontFamily: "Bradley hand, cursive",
        textAlign: "center",
        fontSize: 64,
      }}
    >
      ✎ Scribbles
    </h1>
    <div class="input-group mb-3" style={{ marginTop: 20 }}>
      <input
        type="text"
        class="form-control"
        placeholder="Note name"
        aria-describedby="basic-addon2"
        value={state.editView.fileName}
        onChange={(e) => {
          if (e.data != " ") {
            State.update({
              editView: { ...state.editView, fileName: e.target.value },
            });
          }
        }}
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          disabled={!state.editView.fileName}
          onClick={() =>
            State.update({
              showEditView: true,
              editView: { ...state.editView, editViewText: "" },
            })
          }
        >
          Add Note 📄
        </button>
      </div>
    </div>
    <div class="input-group mb-3" style={{ marginTop: 20 }}>
      <input
        type="text"
        class="form-control"
        placeholder="Folder name"
        aria-describedby="basic-addon2"
        value={state.folderName}
        onChange={(e) => {
          if (e.data != " ") {
            State.update({
              folderName: e.target.value,
            });
          }
        }}
      />
      <div class="input-group-append">
        <CommitButton
          class="btn btn-outline-secondary"
          type="button"
          disabled={!state.folderName}
          data={{
            scribbles: state.dir
              .split("/")
              .filter((a) => !!a)
              .reduceRight((acc, curr) => ({ [curr]: acc }), {
                [state.folderName]: "**FOLDER**",
              }),
          }}
        >
          Add Folder 📁
        </CommitButton>
      </div>
    </div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">
          <a
            onClick={(e) => {
              State.update({ dir: "/" });
            }}
            style={{ cursor: "pointer" }}
          >
            🏠
          </a>
        </li>
        {state.dir
          .split("/")
          .filter((a) => !!a)
          .map((str, i, arr) => (
            <li
              class="breadcrumb-item active"
              aria-current="page"
              style={i !== arr.length - 1 ? { color: "#007bff" } : {}}
            >
              <a
                onClick={(e) => {
                  if (i !== arr.length - 1) {
                    State.update({ dir: arr.slice(0, i + 1).join("/") + "/" });
                  }
                }}
                style={i !== arr.length - 1 ? { cursor: "pointer" } : {}}
              >
                {str}
              </a>
            </li>
          ))}
      </ol>
    </div>
    <div class="list-group">
      {state.dir !== "/" && state.dir ? (
        <button
          class="list-group-item"
          type="button"
          style={{ textAlign: "left" }}
          onClick={() =>
            State.update({
              dir:
                state.dir
                  .split("/")
                  .filter((a) => !!a)
                  .slice(0, -1)
                  .join("/") + "/",
            })
          }
        >
          <span style={{ fontSize: 24, fontWeight: 800 }}>⤺</span> ..
        </button>
      ) : null}
      {Object.keys(currDir)
        .filter((a) => !!a)
        .map((str, i) => (
          <button
            type="button"
            class={`list-group-item list-group-item-action ${
              i === state.selectedIdx ? "active" : ""
            }`}
            onDoubleClick={() =>
              currDir[str] === "**FOLDER**" || typeof currDir[str] != "string"
                ? State.update({ dir: state.dir + `${str}/` })
                : State.update({
                    showEditView: true,
                    editView: {
                      editViewText: currDir[str],
                      fileName: str,
                    },
                  })
            }
            onClick={() => State.update({ selectedIdx: i })}
          >
            {currDir[str] === "**FOLDER**" || typeof currDir[str] != "string"
              ? "📁"
              : "📄"}{" "}
            {str}
          </button>
        ))}
    </div>
  </>
);
