return (
  <div style={{ minWidth: "17rem" }}>
    <div
      style={{
        margin: "2rem 2rem 2rem 0.5rem",
        padding: "2rem",
        borderRadius: "18px",
        backgroundColor: "white",
        boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
      }}
    >
      {props.questionsByCreator.length != 1 && (
        <>
          <div
            className="d-flex"
            style={
              props.shouldDisplayViewAll
                ? {
                    justifyContent: "space-between",
                    alignItems: "center",
                  }
                : {
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }
            }
          >
            <h5>Polls by creator ({props.state.pollsByThisCreator.length})</h5>

            {props.shouldDisplayViewAll && (
              <div style={{ margin: "1rem 0", textAlign: "center" }}>
                <p
                  style={{
                    color: "#2346B1",
                    fontWeight: "500",
                    fontSize: "1rem",
                    margin: "0",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    props.stateUpdate({ showQuestionsByThisUser: true });
                  }}
                >
                  View All <i className="bi bi-arrow-right"></i>
                </p>
              </div>
            )}
          </div>

          <div
            style={{
              padding: "0.5rem 1rem",
            }}
          >
            {props.renderQuestionsByThisCreator()}
          </div>
        </>
      )}
    </div>
  </div>
);
