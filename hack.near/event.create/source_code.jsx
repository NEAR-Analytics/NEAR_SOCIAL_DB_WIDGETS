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
  <>
    <div className="row">
      <div className="col-lg-6">
        <div className="m-2">
          <h3>
            <b>create an event page</b>
          </h3>
          <hr />
          <div className="mb-3">
            <CommitButton data={{ event: state.event }}>save</CommitButton>
            <a
              className="btn btn-outline-success ms-2"
              href={`#/hack.near/widget/event.page?accountId=${accountId}`}
            >
              propose
            </a>
            <a
              className="btn btn-outline-primary ms-2"
              href={`#/hack.near/widget/event.page?accountId=${accountId}`}
            >
              view
            </a>
          </div>
          <div className="d-flex justify-content-center m-2">
            <div className="col-6 m-2">
              <h5>date</h5>
              <input
                type="date"
                value={state.date}
                onChange={(e) => {
                  State.update({ data: e.target.value });
                }}
              />
            </div>
            <div className="col-6 m-2">
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
          <br />
          <div className="mb-2">
            <h5>id</h5>
            <input
              type="text"
              value={state.eventId}
              onChange={(e) => {
                State.update({ eventId: e.target.value });
              }}
            />
          </div>
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
        <Widget
          src="hack.near/widget/event.view"
          props={{ accountId, event: state.event }}
        />
      </div>
    </div>
  </>
);
