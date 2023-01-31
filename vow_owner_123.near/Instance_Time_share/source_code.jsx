let accountId = props.accountId;

State.init({
  showShareOptions: false,
  linkCopied: false,
});

let widgetOwner = "easypoll.near";

return (
  <>
    <i
      style={{ cursor: "pointer" }}
      className="bi bi-share"
      onClick={() => {
        State.update({ showShareOptions: !state.showShareOptions });
      }}
    ></i>
    {state.showShareOptions && (
      <div
        style={{
          position: "absolute",
          left: "1rem",
          backgroundColor: "#FFFFFF",
          border: "1.5px solid #F0F4F7",
          boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
          borderRadius: "28px",
          zIndex: "1",
          width: "40vw",
          padding: "1rem",
          border: "1.5px solid #F0F4F7",
        }}
      >
        <div className="d-flex flex-row-reverse">
          <i
            className="bi bi-x"
            style={{ cursor: "pointer" }}
            onClick={() =>
              State.update({ showShareOptions: false, linkCopied: false })
            }
          ></i>
        </div>
        <h3>Share</h3>
        <p
          style={{
            color: "#474D55",
            letterSpacing: "-0.01em",
          }}
        >
          Use this link to share the poll with your participants
        </p>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            backgroundColor: "#F2F6FA",
            padding: "1rem 2rem",
            borderRadius: "17px",
          }}
        >
          <span
            style={{ color: "#0065FF", wordWrap: "anywhere" }}
          >{`https://near.social/#/${widgetOwner}/vow_owner_123.near/widget/Instance_time_card?accountId=${accountId}`}</span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "0.5rem",
              minWidth: "2.5rem",
            }}
          >
            <i
              className="bi-clipboard"
              style={
                state.linkCopied
                  ? {
                      color: "#0065FF",
                      transition: "color 0.3s linear",
                      cursor: "pointer",
                    }
                  : {
                      transition: "color 0.3s linear",
                      cursor: "pointer",
                      color: "black",
                    }
              }
              onClick={() => {
                clipboard.writeText(
                  `https://near.social/#/${widgetOwner}/widget/EasyPoll?sharedBlockHeight=${blockHeightToShare}`
                );
                State.update({ linkCopied: true });
              }}
            ></i>
            {state.linkCopied && (
              <span className="text-secondary" style={{ fontSize: "0.7rem" }}>
                Copied!
              </span>
            )}
          </div>
        </div>
      </div>
    )}
  </>
);
