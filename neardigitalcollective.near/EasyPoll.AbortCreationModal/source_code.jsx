return (
    <div
      className="modal"
      id="modal"
      style={
        props.state.showAbortPollCreation && {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#7e7e7e70",
          backdropFilter: "blur(4px)",
        }
      }
      tabindex="-1"
      role="dialog"
      onClick={props.closeModalClickingOnTransparent()}
    >
      <div
        className="modal-dialog"
        style={{ width: "540px", borderRadius: "28px" }}
        role="document"
      >
        <div
          className="modal-content"
          style={{ border: "none", borderRadius: "28px" }}
        >
          <div
            className="modal-header flex-row-reverse"
            style={{ padding: "0", margin: "0", border: "none" }}
          >
            <button
              type="button"
              className="close"
              style={{
                border: "none",
                backgroundColor: "transparent",
                margin: "0.5rem 0.5rem 0px 0px",
                borderRadius: "28px",
                marginRight: "0.3rem",
                padding: "0.3rem 0.7rem 0 0",
              }}
              dataDismiss="modal"
              ariaLabel="Close"
              onClick={() => props.stateUpdate({ showAbortPollCreation: false })}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div
            className="modal-body"
            style={{
              width: "90%",
              borderRadius: "1rem",
              margin: "0 auto",
              padding: "0",
            }}
          >
            <h3
              style={{
                fontWeight: "700",
                fontSize: "1.5rem",
                letterSpacing: "0.1px",
                textAlign: "center",
              }}
            >
              Discard changes
            </h3>
            <p
              style={{
                letterSpacing: "-0.01",
                color: "#4B516A",
                fontSize: "1rem",
                textAlign: "center",
              }}
            >
              If you leave now, you will lose all your changes
            </p>
          </div>
          <div
            className="modal-footer"
            style={{ border: "none", justifyContent: "space-around" }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              style={{
                padding: "0.7rem",
                borderRadius: "16px",
                width: "45%",
                backgroundColor: "white",
                border: "1.5px solid #B0B3BE",
                color: "#010A2D",
                fontWeight: "700",
                letterSpacing: "0.01em",
              }}
              onClick={() => props.stateUpdate({ showAbortPollCreation: false })}
            >
              Continue editing
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              style={{
                padding: "0.7rem",
                borderRadius: "16px",
                width: "45%",
                backgroundColor: "#FF4747",
                border: "1.5px solid transparent",
                color: "white",
                fontWeight: "700",
                letterSpacing: "0.01em",
              }}
              onClick={() => {
                if (props.state.abortThroughAllExistingPolls) {
                  props.stateUpdate({
                    displaying: props.tabs.GET_VERIGIED_AS_A_HUMAN.id,
                    abortThroughAllExistingPolls: false,
                    hoveringElement: "",
                    showAbortPollCreation: false,
                  });
                } else {
                  props.stateUpdate({
                    displaying: props.tabs.MY_POLLS.id,
                    hoveringElement: "",
                    showAbortPollCreation: false,
                  });
                }
              }}
            >
              Discard changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  