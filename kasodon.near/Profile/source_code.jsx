const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name;
const image = profile.image;

return (
  <div className="container mt-5 d-flex justify-content-center justify-content-md-start justify-content-sm-start justify-content-lg-start">
    <a
      href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
      className="text-decoration-none link-dark"
    >
      <div
        style={{
          border: "none",
          borderRadius: "10px",
          backgroundColor: "#FAF8D4",
        }}
        class="card p-3"
      >
        <div class="d-flex align-items-center justify-content-between">
          <Widget
            src="kasodon.near/widget/ProfileImage"
            props={{
              profile,
              accountId,
              className: "float-start d-inline-block me-2",
            }}
          />
          <div style={{ marginLeft: "10px" }} class="">
            <h4 class="mb-0 mt-0 fw-bold">@{accountId}</h4>
            <div
              style={{ background: "#11151C", color: "#FAF8D4" }}
              class="p-2 mt-2 d-flex justify-content-between rounded"
            >
              <div style={{ marginRight: "5px" }} class="d-flex flex-column">
                <span class="fw-bold text-lowercase">Widgets</span>
                <span class="text-center">
                  {context.accountId &&
                  Object.keys(
                    Social.keys(`${context.accountId}/widget/*`) || {}
                  ).length > 0
                    ? Object.keys(
                        Social.keys(`${context.accountId}/widget/*`) || {}
                      ).length
                    : 0}
                </span>
              </div>
              <div style={{ marginRight: "5px" }} class="d-flex flex-column">
                <span class="fw-bold text-lowercase">Memes</span>
                <span class="text-center">
                  {context.accountId &&
                  Object.keys(
                    Social.keys(`${context.accountId}/widget/*`) || {}
                  ).length > 0
                    ? Object.keys(
                        Social.keys(`${context.accountId}/meme/*`) || {}
                      ).length
                    : 0}
                </span>
              </div>
              <div class="d-flex flex-column">
                <span class="fw-bold text-lowercase">Review</span>
                <span class="text-center">0</span>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </a>
  </div>
);
