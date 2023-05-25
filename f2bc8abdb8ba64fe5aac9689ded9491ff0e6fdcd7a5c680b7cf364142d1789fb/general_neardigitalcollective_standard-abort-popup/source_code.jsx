/*----------------------------------------------Start get props----------------------------------------------*/
const showAbort = props.showAbort ?? false;
const handlerStateUpdate = props.handlerStateUpdate;
const abortThroughPage = props.abortThroughPage ?? 1;

const abortInfoText =
  props.abortInfoText ?? "If you leave now, you will lose all your changes";
const confirmAbortText = props.confirmAbortText ?? "Discard changes";
const cancelAbortText = props.cancelAbortText ?? "Continue editing";
const closeIcon = props.icons.closeIcon ?? "bi bi-x-lg";
const colors = props.colors;

/*-----------------------------------------------End get props-----------------------------------------------*/

/*----------------------------------------------Start styles----------------------------------------------*/
const abortPopupStyles = {
  generalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green3,
    backdropFilter: "blur(4px)",
  },
  modalDialogContainer: { width: "540px", borderRadius: "28px" },
  modalContentContainer: { border: "none", borderRadius: "28px" },
  modalHeader: { padding: "0", margin: "0", border: "none" },
  closeButton: {
    border: "none",
    backgroundColor: "transparent",
    margin: "0.5rem 0.5rem 0px 0px",
    borderRadius: "28px",
    marginRight: "0.3rem",
    padding: "0.3rem 0.7rem 0 0",
  },
  modalBody: {
    width: "90%",
    borderRadius: "1rem",
    margin: "0 auto",
    padding: "0",
  },
  discardChangesTitle: {
    fontWeight: "700",
    fontSize: "1.5rem",
    letterSpacing: "0.1px",
    textAlign: "center",
  },
  discardChangesText: {
    letterSpacing: "-0.01",
    color: colors.grey3,
    fontSize: "1rem",
    textAlign: "center",
  },
  modalFooter: { border: "none", justifyContent: "space-around" },
  continueEditingButton: {
    padding: "0.7rem",
    borderRadius: "16px",
    width: "45%",
    backgroundColor: colors.color2,
    border: `1.5px solid ${colors.grey4}`,
    color: colors.color1,
    fontWeight: "700",
    letterSpacing: "0.01em",
  },
  discardChangesButton: {
    padding: "0.7rem",
    borderRadius: "16px",
    width: "45%",
    backgroundColor: colors.red3,
    border: "1.5px solid transparent",
    color: colors.color2,
    fontWeight: "700",
    letterSpacing: "0.01em",
  },
};

/*-----------------------------------------------End styles-----------------------------------------------*/

/*----------------------------------------------Start functions----------------------------------------------*/
function closeModalClickingOnTransparent() {
  return (e) => {
    e.target.id == "modal" && handlerStateUpdate({ showAbort: false });
  };
}

/*-----------------------------------------------End functions-----------------------------------------------*/

/*----------------------------------------------Start rendering----------------------------------------------*/

return (
  <div
    className="modal"
    id="modal"
    style={showAbort && abortPopupStyles.generalContainer}
    tabindex="-1"
    role="dialog"
    onClick={closeModalClickingOnTransparent()}
  >
    <div
      className="modal-dialog"
      style={abortPopupStyles.modalDialogContainer}
      role="document"
    >
      <div
        className="modal-content"
        style={abortPopupStyles.modalContentContainer}
      >
        <div
          className="modal-header flex-row-reverse"
          style={abortPopupStyles.modalHeader}
        >
          <button
            type="button"
            className="close"
            style={abortPopupStyles.closeButton}
            dataDismiss="modal"
            ariaLabel="Close"
            onClick={() => handlerStateUpdate({ showAbort: false })}
          >
            <i className={closeIcon}></i>
          </button>
        </div>
        <div className="modal-body" style={abortPopupStyles.modalBody}>
          <h3 style={abortPopupStyles.discardChangesTitle}>Discard changes</h3>
          <p style={abortPopupStyles.discardChangesText}>{abortInfoText}</p>
        </div>
        <div className="modal-footer" style={abortPopupStyles.modalFooter}>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            style={abortPopupStyles.continueEditingButton}
            onClick={() => handlerStateUpdate({ showAbort: false })}
          >
            {cancelAbortText}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            style={abortPopupStyles.discardChangesButton}
            onClick={() => {
              handlerStateUpdate({
                tab: abortThroughPage,
                hoveringElement: "",
                showAbort: false,
              });
            }}
          >
            {confirmAbortText}
          </button>
        </div>
      </div>
    </div>
  </div>
);
/*-----------------------------------------------End rendering-----------------------------------------------*/
