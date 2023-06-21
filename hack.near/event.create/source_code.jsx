const accountId = context.accountId;
if (!accountId) {
  return "Please connect your NEAR account :)";
}

const today = Math.floor((Date.now() + 0) / 86400000) * 86400000;
const tomorrow = today + 86400000;

State.init({
  participants: "",
  date: new Date(tomorrow).toISOString().substring(0, 10),
  time,
});

return (
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <h3>
          <b>create an event page</b>
        </h3>
        <br />
        <div className="mb-2">
          <CommitButton data={{ event: { state.eventId { "": } }}{
  "hack.near": {
    "widget": {
      "event.create": {
        "": "const accountId = context.accountId;\nif (!accountId) {\n  return \"Please connect your NEAR account :)\";\n}\n\nconst today = Math.floor((Date.now() + 0) / 86400000) * 86400000;\nconst tomorrow = today + 86400000;\n\nState.init({\n  participants: \"\",\n  date: new Date(tomorrow).toISOString().substring(0, 10),\n  time,\n});\n\nreturn (\n  <div className=\"container\">\n    <div className=\"row\">\n      <div className=\"col-lg-6\">\n        <h3>\n          <b>create an event page</b>\n        </h3>\n        <br />\n        <div className=\"mb-2\">\n          <CommitButton data={{ events: state.event }}>save</CommitButton>\n          <a\n            className=\"btn btn-outline-primary ms-2\"\n            href={`#/mob.near/widget/eventPage?accountId=${accountId}`}\n          >\n            view\n          </a>\n          <a\n            className=\"btn btn-outline-primary ms-2\"\n            href={`#/mob.near/widget/eventPage?accountId=${accountId}`}\n          >\n            propose\n          </a>\n        </div>\n        <br />\n        <div className=\"row\">\n          <div className=\"col-6 mb-2\">\n            <h5>date</h5>\n            <input\n              type=\"date\"\n              value={state.date}\n              onChange={(e) => {\n                State.update({ data: e.target.value });\n              }}\n            />\n          </div>\n          <div className=\"col-6 mb-2\">\n            <h5>time</h5>\n            <input\n              type=\"time\"\n              value={state.time}\n              onChange={(e) => {\n                State.update({ time: e.target.value });\n              }}\n            />\n          </div>\n        </div>\n\n        <div className=\"mb-3\">\n          <h5 className=\"mt-3\">metadata</h5>\n          <Widget\n            src=\"near/widget/MetadataEditor\"\n            props={{\n              initialMetadata: event,\n              onChange: (event) => State.update({ event }),\n              options: {\n                name: { label: \"title\" },\n                image: { label: \"logo\" },\n                backgroundImage: { label: \"image\" },\n                description: { label: \"description\" },\n                tags: {\n                  label: \"tags\",\n                  tagsPattern: \"*/community/*/tags/*\",\n                  placeholder:\n                    \"rust, engineer, artist, humanguild, nft, learner, founder\",\n                },\n                linktree: {\n                  links: [\n                    {\n                      label: \"Twitter\",\n                      prefix: \"https://twitter.com/\",\n                      name: \"twitter\",\n                    },\n                    {\n                      label: \"Github\",\n                      prefix: \"https://github.com/\",\n                      name: \"github\",\n                    },\n                    {\n                      label: \"Telegram\",\n                      prefix: \"https://t.me/\",\n                      name: \"telegram\",\n                    },\n                    {\n                      label: \"Website\",\n                      prefix: \"https://\",\n                      name: \"website\",\n                    },\n                  ],\n                },\n              },\n            }}\n          />\n        </div>\n      </div>\n      <div className=\"col-lg-6\">\n        <div>\n          <Widget\n            src=\"hack.near/widget/event.view\"\n            props={{ accountId, event: state.event }}\n          />\n        </div>\n      </div>\n    </div>\n  </div>\n);\n"
      }
    }
  }
}>save</CommitButton>
          <a
            className="btn btn-outline-primary ms-2"
            href={`#/mob.near/widget/eventPage?accountId=${accountId}`}
          >
            view
          </a>
          <a
            className="btn btn-outline-primary ms-2"
            href={`#/mob.near/widget/eventPage?accountId=${accountId}`}
          >
            propose
          </a>
        </div>
        <br />
        <div className="row">
          <div className="col-6 mb-2">
            <h5>date</h5>
            <input
              type="date"
              value={state.date}
              onChange={(e) => {
                State.update({ data: e.target.value });
              }}
            />
          </div>
          <div className="col-6 mb-2">
            <h5>time</h5>
            <input
              type="time"
              value={state.time}
              onChange={(e) => {
                State.update({ time: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="mb-3">
          <h5 className="mt-3">metadata</h5>
          <Widget
            src="near/widget/MetadataEditor"
            props={{
              initialMetadata: event,
              onChange: (event) => State.update({ event }),
              options: {
                name: { label: "title" },
                image: { label: "logo" },
                backgroundImage: { label: "image" },
                description: { label: "description" },
                tags: {
                  label: "tags",
                  tagsPattern: "*/community/*/tags/*",
                  placeholder:
                    "rust, engineer, artist, humanguild, nft, learner, founder",
                },
                linktree: {
                  links: [
                    {
                      label: "Twitter",
                      prefix: "https://twitter.com/",
                      name: "twitter",
                    },
                    {
                      label: "Github",
                      prefix: "https://github.com/",
                      name: "github",
                    },
                    {
                      label: "Telegram",
                      prefix: "https://t.me/",
                      name: "telegram",
                    },
                    {
                      label: "Website",
                      prefix: "https://",
                      name: "website",
                    },
                  ],
                },
              },
            }}
          />
        </div>
      </div>
      <div className="col-lg-6">
        <div>
          <Widget
            src="hack.near/widget/event.view"
            props={{ accountId, event: state.event }}
          />
        </div>
      </div>
    </div>
  </div>
);
