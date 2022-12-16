const accountId = context.accountId;
if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const inodes = Social.get(`${accountId}/scribbles/inode/**`, "final") || [];
console.log(inodes);
const scribbles = [];

State.init({
  fs: {
    root: 0,
    next_inode: next_inode,
    new_filename: "",
    new_data: "",
  },
  selectedIdx: 0,
  showEditView: false,
  editView: {
    editViewText: "",
    fileName: null,
  },
  dir: "/",
});

function traverse(inode, path, fs_map) {
  if (inodes[inode].entries) {
    fs_map = {};
    Object.entries(inodes[inode].entries).map(([filename, other_inode]) => {
      fs_map[filename] = traverse(parseInt(other_inode), path + `${filename}/`);
    });
    return fs_map;
  } else {
    console.log(path, inodes[inode].data);
    return inodes[inode].data;
  }
}

scribbles = traverse(state.fs.root, "/");
console.log(scribbles);

if (state.showEditView) {
  return (
    <>
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          onClick={() =>
            State.update({
              showEditView: false,
              editView: { ...state.editView, editViewText: "", fileName: null },
            })
          }
        >
          Back
        </button>
        <h5>{state.editView.fileName}</h5>
      </div>
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
        Submit note
      </CommitButton>
    </>
  );
}
let currDir = state.dir
  .split("/")
  .filter((a) => !!a)
  .reduce((acc, curr) => acc[curr], scribbles);
if (currDir == "**FOLDER**") {
  currDir = {};
}

return (
  <>
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
          Add note
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
          Add Folder
        </CommitButton>
      </div>
    </div>
    <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        type="button"
        onClick={() =>
          State.update({
            dir: state.dir
              .split("/")
              .filter((a) => !!a)
              .slice(0, -1)
              .join("/"),
          })
        }
      >
        ..
      </button>
    </div>
    <ul class="list-group">
      {Object.keys(currDir).map((str, i) => (
        <li
          class={`list-group-item ${i === state.selectedIdx ? "active" : ""}`}
          onClick={() =>
            state.selectedIdx === i
              ? currDir[str] === "**FOLDER**" || typeof currDir[str] != "string"
                ? State.update({ dir: state.dir + `${str}/` })
                : State.update({
                    showEditView: true,
                    editView: {
                      editViewText: currDir[str],
                      fileName: str,
                    },
                  })
              : State.update({ selectedIdx: i })
          }
          style={{ cursor: "pointer" }}
        >
          {str}
        </li>
      ))}
    </ul>
  </>
);
