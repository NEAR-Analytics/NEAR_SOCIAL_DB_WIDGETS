function closeModalClickingOnTransparent() {
  return (e) => {
    e.target.id == "modal" && stateHandler({ showQuestionsByThisUser: false });
  };
}

let poll = props.poll;
let indexVersion = props.indexVersion;
let canOperate = props.canOperate;

return (
  <div
    className="modal"
    id="modal"
    style={
      props.showQuestionsByThisUser && {
        display: "block",
        backgroundColor: "#7e7e7e70",
      }
    }
    tabindex="-1"
    role="dialog"
    onClick={closeModalClickingOnTransparent()}
  >
    <div className="modal-dialog" style={{ maxWidth: "100%" }} role="document">
      <div
        className="modal-content"
        style={{ backgroundColor: "rgb(230, 230, 230)" }}
      >
        <div className="modal-header flex-row-reverse">
          <button
            type="button"
            className="close"
            dataDismiss="modal"
            ariaLabel="Close"
            onClick={() => stateHandler({ showQuestionsByThisUser: false })}
          >
            <span ariaHidden="true">&times;</span>
          </button>
        </div>
        <div
          className="modal-body"
          style={{
            width: "90%",
            borderRadius: "1rem",
            margin: "0 auto",
          }}
        >
          <Widget
            src={`${widgetOwner}/widget/EasyPoll.Questions`}
            props={{
              accountId: poll.accountId,
              onlyUser: true,
              indexVersion,
              canOperate,
            }}
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => stateHandler({ showQuestionsByThisUser: false })}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);
