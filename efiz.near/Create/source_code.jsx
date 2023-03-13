/*
---props---

props.widgetPath?: string,

*/

// How can I access the widget path dynamically?
const initWidgetPath = "efiz.near/widget/Create";

State.init({
  widgetPath: initWidgetPath,
  color: "",
  brand: "",
  size: "",
  material: "",
  img: null,
  message: "",
});

// START GET THE WIDGET COMMIT
const historyBlocksRequest = Social.keys(`${initWidgetPath}`, "final", {
  return_type: "History",
});

if (historyBlocksRequest === null) return "loading...";

const [widgetAccountId, _, widgetName] = initWidgetPath.split("/");

let blocksChanges =
  historyBlocksRequest[widgetAccountId]?.["widget"]?.[widgetName];

// Latest commit sits at blocksChanges[0]
// How do we know this is the one they are using though?
// END GET THE WIDGET COMMIT

const composeData = () => {
  const data = {
    thing: {
      main: JSON.stringify({
        color: state.color,
        brand: state.brand,
        size: state.size,
        material: state.material,
        commit: blocksChanges[0],
        img: state.img
          ? `https://ipfs.near.social/ipfs/${state.img.cid}`
          : null,
      }),
    },
    index: {
      thing: JSON.stringify({
        key: "main",
        value: {
          type: "thing",
        },
      }),
    },
  };

  return data;
};

const handleImageUpload = (files) => {
  if (files?.length > 0) {
    State.update({
      img: {
        uploading: true,
        cid: null,
      },
    });
    const body = files[0];
    State.update({
      img: body,
    });
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    }).then((res) => {
      const cid = res.body.cid;

      State.update({
        img: {
          cid,
        },
      });
    });
  } else {
    State.update({
      img: null,
    });
  }
};

const createThing = () => {
  asyncFetch("https://monkfish-app-ginhc.ondigitalocean.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      mutation {
        things {
          create(type: { name: { is: "Idea"} }) {
            message
          }
        }
      }
  `,
    }),
  }).then((res) => {
    const message = res.body?.message || res.body?.errors[0]?.message;

    State.update({
      message,
    });
  });
};

return (
  <div>
    <h1 class="text-center">Thing</h1>
    {state.img ? (
      <img
        class="rounded w-100 h-100"
        style={{ objectFit: "cover" }}
        src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
        alt="upload preview"
      />
    ) : null}
    <Files
      multiple={false}
      accepts={["image/*"]}
      minFileSize={1}
      clickable
      onChange={handleImageUpload}
      style={{
        cursor: "pointer",
      }}
      class="text-center d-flex justify-content-center align-items-center"
    >
      <div class="d-flex m-4 px-2 py-1 rounded bg-black text-white justify-content-center align-items-center">
        {state.img?.uploading ? (
          <>...</>
        ) : state.img?.cid ? (
          "Replace"
        ) : (
          "Take photo"
        )}
      </div>
    </Files>
    <div class="input-group mb-3">
      <input
        class="form-control"
        placeholder={"color"}
        onChange={({ target }) => State.update({ color: target.value })}
      />
      <input
        class="form-control"
        placeholder={"brand"}
        onChange={({ target }) => State.update({ brand: target.value })}
      />
      <input
        class="form-control"
        placeholder={"size"}
        onChange={({ target }) => State.update({ size: target.value })}
      />
      <input
        class="form-control"
        placeholder={"material"}
        onChange={({ target }) => State.update({ material: target.value })}
      />
    </div>
    <div>
      <div className={"list-group-item list-group-item-action "}>
        #{blocksChanges[0]}
      </div>
      <div className={"list-group-item list-group-item-action "}>
        {state.color}
      </div>
      <div className={"list-group-item list-group-item-action "}>
        {state.brand}
      </div>
      <div className={"list-group-item list-group-item-action "}>
        {state.size}
      </div>
      <div className={"list-group-item list-group-item-action "}>
        {state.material}
      </div>
    </div>
    {state.message}
    <button onClick={createThing}>Create</button>
    {/* <CommitButton
      disabled={false}
      force
      className="btn btn-dark rounded-3"
      data={composeData}
    >
      Create
    </CommitButton> */}
  </div>
);
