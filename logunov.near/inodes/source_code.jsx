const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const data = Social.get(`${accountId}/scribbles/inode/0/type`, "final");

// File:
// {
//     type: 0,
//     data: "..."
// }

// Folder:
// {
//     type: 1,
//     entries: {}
// }

if (!data) {
  // Ask to initialize storage
  return (
    <div>
      <CommitButton
        data={{
          scribbles: {
            inode: {
              [0]: {
                type: 1,
                entries: {},
              },
            },
            next_inode: 1,
          },
        }}
      >
        Initialize storage
      </CommitButton>
    </div>
  );
}

const next_inode = parseInt(
  Social.get(`${accountId}/scribbles/next_inode`, "final")
);

State.init({
  fs: {
    root: 0,
    next_inode: next_inode,
    new_filename: "",
    new_data: "",
  },
});

return (
  <div>
    fs = {JSON.stringify(state.fs)}
    <div className="mb-2">
      <h4>Set root</h4>
      <input
        type="text"
        className="form-control"
        placeholder="0"
        onChange={(e) =>
          State.update({
            fs: { ...state.fs, root: parseInt(e.target.value) },
          })
        }
      />
    </div>
    <div className="mb-2">
      <h4>Add file</h4>
      <input
        type="text"
        className="form-control"
        placeholder="filename"
        onChange={(e) =>
          State.update({
            new_filename: e.target.value,
          })
        }
      />
      <input
        type="text"
        className="form-control"
        placeholder="data"
        onChange={(e) =>
          State.update({
            new_data: e.target.value,
          })
        }
      />
    </div>
    <CommitButton
      data={{
        scribbles: {
          inode: {
            [state.fs.root]: {
              entries: {
                [state.fs.new_filename]: state.fs.next_inode,
              },
            },
            [state.fs.next_inode]: {
              type: 0,
              data: state.fs.new_data,
            },
          },
          next_inode: state.fs.next_inode + 1,
        },
      }}
      onClick={(e) =>
        State.update({
          fs: { ...state.fs, next_inode: state.fs.next_inode + 1 },
        })
      }
    >
      Add file
    </CommitButton>
    <div className="mb-2">
      <h4>Remove widget by index</h4>
      <input
        type="text"
        className="form-control"
        placeholder="0"
        onChange={(e) => State.update({ remove_index: e.target.value })}
      />
    </div>
    <CommitButton data={{ graph: { widget: { [state.remove_index]: null } } }}>
      Remove
    </CommitButton>
  </div>
);
