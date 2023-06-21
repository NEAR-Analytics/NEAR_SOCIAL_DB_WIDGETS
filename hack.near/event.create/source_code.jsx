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
          <CommitButton data={{ events: state.event }}>save</CommitButton>
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
