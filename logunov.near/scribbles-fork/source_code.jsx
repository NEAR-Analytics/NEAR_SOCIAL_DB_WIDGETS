const accountId = context.accountId;
if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const inodes = Social.get(`${accountId}/scribbles/inode/**`, "final") || [];
console.log(inodes);
const db_next_inode = parseInt(
  Social.get(`${accountId}/scribbles/next_inode`, "final")
);

function traverse(inode, path, fs_map) {
  if (inodes[inode].entries) {
    fs_map = {};
    Object.entries(inodes[inode].entries).map(([filename, other_inode]) => {
      fs_map[filename] = traverse(parseInt(other_inode), path + `${filename}/`);
      parent_inodes[other_inode] = inode;
    });
    return fs_map;
  } else {
    console.log(path, inodes[inode].data);
    return inodes[inode].data;
  }
}

const scribbles = [];
const parent_inodes = [];
scribbles = traverse(state.fs.root, "/");
console.log(scribbles);
console.log(parent_inodes);

State.init({
  fs: {
    root: 0,
    inodes: inodes,
    parent_inodes: parent_inodes,
    next_inode: db_next_inode,
    new_filename: "",
    new_data: "",
  },
  selectedINodeIndex: 0,
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
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          onClick={() =>
            State.update({
              fs: { ...state.fs, root: parent_inodes[root] },
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
// let currDir = state.dir
//   .split("/")
//   .filter((a) => !!a)
//   .reduce((acc, curr) => acc[curr], scribbles);
// if (currDir == "**FOLDER**") {
//   currDir = {};
// }

return (
  <>
    root = {JSON.stringify(state.fs.root)}
    next_inode = {state.fs.next_inode}
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
            fs: { ...state.fs, root: parent_inodes[root] },
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
      {Object.entries(state.fs.inodes[state.fs.root].entries)
        .map(([filename, index]) => [filename, parseInt(index)])
        .map(([filename, index]) => (
          <li
            class={`list-group-item ${
              index === state.selectedINodeIndex ? "active" : ""
            }`}
            onClick={() =>
              state.selectedINodeIndex === index
                ? state.fs.inodes[index].type === "1"
                  ? State.update({
                      fs: { ...state.fs, root: index },
                      dir: state.dir + `${filename}/`,
                    })
                  : State.update({
                      showEditView: true,
                      editView: {
                        editViewText: currDir[str],
                        fileName: filename,
                      },
                    })
                : State.update({ selectedINodeIndex: index })
            }
            style={{ cursor: "pointer" }}
          >
            {filename}
          </li>
        ))}
    </ul>
  </>
);
