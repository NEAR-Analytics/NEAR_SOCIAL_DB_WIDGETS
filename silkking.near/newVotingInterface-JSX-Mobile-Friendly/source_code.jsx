const FlexContainer = styled.div`
    display:flex;
    @media screen and (max-width: 768px)  {
      display: block;
      padding: 1rem;
    }
`;

const VotingContainer = styled.div`
    width: 75%;
    margin: 2rem 0.5rem 2rem 2rem;
    padding: 2rem;
    @media screen and (max-width: 768px)  {
      width: 100%;
      margin: 0rem;
    }
`;

const NoFlexInMobile = styled.div`
  display:flex;
   @media screen and (max-width: 768px)  {
     display: block;
    }
`;

const widgetOwner = "silkking.near";

return (
  <div>
    <FlexContainer className="content-align-start justify-content-between">
      <VotingContainer
        style={{
          borderRadius: "18px",
          background: "white",
          boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
        }}
      >
        <NoFlexInMobile className="justify-content-between">
          <NoFlexInMobile>
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                profile: props.profile,
                question: props.state.poll.accountId,
                className: "float-start d-inline-block me-2",
                style: {
                  width: "3.5rem",
                  aspectRatio: "1",
                  marginLeft: "1rem",
                  borderRadius: "100%",
                  overflow: "hidden",
                },
              }}
            />
            <div>
              <p style={{ margin: "0", fontWeight: "300" }}>Created by</p>
              <p style={{ fontWeight: "500" }}>
                {props.sliceString(props.state.poll.accountId, 18)}
              </p>
            </div>
          </NoFlexInMobile>

          {Date.now() < props.state.poll.value.endTimestamp && (
            <>
              <span>
                Started{" "}
                {new Date(
                  props.state.poll.value.startTimestamp
                ).toLocaleDateString()}
              </span>

              <span
                style={{
                  paddingLeft: "1.5rem",
                  borderLeft: "2px solid #ced4da",
                  height: "max-content",
                }}
              >
                Ends
                <Widget
                  src={`silkking.near/widget/timeAgo`}
                  props={{
                    timeInFuture: props.state.poll.value.endTimestamp,
                    reduced: true,
                  }}
                />
              </span>
            </>
          )}
          <span
            style={{
              backgroundColor: props.isUpcoming(props.state.poll)
                ? "#FFF3B4"
                : props.isActive(props.state.poll)
                ? "#D9FCEF"
                : "#FFE5E5",

              height: "2.1rem",
              width: "5rem",
              textAlign: "center",
              borderRadius: "16px",
              marginRight: "1rem",
              lineHeight: "1.9rem",
              fontSize: "1rem",
              letterSpacing: "-0.025rem",
              color: props.isUpcoming(props.state.poll)
                ? "#FFC905"
                : props.isActive(props.state.poll)
                ? "#00B37D"
                : "#FF4747",
              fontWeight: "500",
            }}
          >
            {props.isUpcoming(props.state.poll)
              ? "Upcoming"
              : props.isActive(props.state.poll)
              ? "Active"
              : "Closed"}
          </span>
        </NoFlexInMobile>
        <div className="d-flex my-3">
          <div
            style={{
              height: "inherit",
              backgroundColor: "#AAC8F7",
              width: "0.5rem",
              minWidth: "5px",
              marginRight: "0.5rem",
              borderRadius: "8px",
            }}
          >
            {/*Decorative div, do not delete*/}
          </div>
          <h2
            style={{
              fontWeight: "700",
              fontSize: "2rem",
              letterSpacing: "0.1px",
              color: "#010A2D",
              wordWrap: "anywhere",
            }}
          >
            {props.state.poll.value.title}
          </h2>
        </div>
        <div
          style={{
            position: "relative",
            width: "max-content",
            margin: "1rem",
          }}
        >
          <Widget
            src={`${widgetOwner}/widget/shareWidget`}
            props={{ blockHeight: props.questionBlockHeight }}
          />
        </div>
        <div
          className="p-3"
          style={{
            position: "relative",
            border: "1.5px solid rgb(206, 212, 218)",
            borderRadius: "24px",
            wordWrap: "anywhere",
          }}
        >
          <h3
            style={{
              fontWeight: "700",
              fontSize: "1.2rem",
              marginBottom: "1.2rem",
            }}
          >
            Description
          </h3>
          <p style={{ fontSize: "0.9rem" }}>
            {props.showDescription(props.state.poll.value.description)}
          </p>
          {props.state.poll.value.description.length > 501 &&
          !props.state.descriptionHeightLimited ? (
            <div
              style={{
                position: "absolute",
                bottom: "-1.125rem",
                left: "0",
                right: "0",
                marginRight: "auto",
                marginLeft: "auto",
                textAlign: "center",
              }}
            >
              <h4
                style={{
                  fontSize: "1.2rem",
                  display: "inline-block",
                  backgroundColor: "white",
                  padding: "0 1rem",
                  cursor: "pointer",
                }}
                onClick={() =>
                  props.stateUpdate({ descriptionHeightLimited: true })
                }
              >
                Show less <i className="bi bi-arrow-up"></i>
              </h4>
            </div>
          ) : (
            props.state.poll.value.description.length > 501 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "-1.125rem",
                  left: "0",
                  right: "0",
                  marginRight: "auto",
                  marginLeft: "auto",
                  textAlign: "center",
                }}
              >
                <h4
                  style={{
                    fontSize: "1.2rem",
                    display: "inline-block",
                    backgroundColor: "white",
                    padding: "0 1rem",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    props.stateUpdate({ descriptionHeightLimited: false })
                  }
                >
                  Show more <i className="bi bi-arrow-down"></i>
                </h4>
              </div>
            )
          )}
        </div>
        {props.state.poll.value.tgLink != "" &&
          props.state.poll.value.tgLink != undefined && (
            <div
              className="mt-3 d-flex justify-content-between"
              style={{
                border: "1.5px solid #D4E5FB",
                padding: "1.2rem 1.7rem",
                borderRadius: "24px",
              }}
            >
              <div className="d-flex">
                <i
                  className="bi bi-people d-flex align-items-center justify-content-center"
                  style={{
                    height: "100%",
                    aspectRatio: "1",
                    backgroundColor: "#2F5BCF",
                    borderRadius: "14px",
                    marginRight: "1rem",
                    color: "white",
                  }}
                ></i>
                <div>
                  <p
                    className="m-0"
                    style={{
                      color: "#2F5BCF",
                      fontWeight: "500",
                      fontSize: "0.7rem",
                    }}
                  >
                    Discussion link
                  </p>
                  <h6>
                    <a
                      style={{ color: "#2346B1" }}
                      href={props.state.poll.value.tgLink}
                    >
                      {props.sliceString(props.state.poll.value.tgLink, 30)}
                    </a>
                  </h6>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <a
                  target="_blank"
                  href={props.state.poll.value.tgLink}
                  style={{ userSelect: "none" }}
                >
                  <i
                    className="bi bi-box-arrow-up-right"
                    style={{
                      color: "#2F5BCF",
                      cursor: "pointer",
                    }}
                  ></i>
                </a>
                <i
                  className="bi bi-clipboard"
                  style={{
                    userSelect: "none",
                    color: "#2F5BCF",
                    cursor: "pointer",
                    marginLeft: "0.8rem",
                  }}
                  onClick={() =>
                    clipboard.writeText(props.state.poll.value.tgLink)
                  }
                ></i>
              </div>
            </div>
          )}
        {
          <Widget
            src={`${widgetOwner}/widget/allVotingWidget-Mobile-Friendly-v2`}
            props={{
              poll: props.state.poll,
              isPreview: props.isPreview,
            }}
          />
        }
      </VotingContainer>
      <Widget
        src={`${widgetOwner}/widget/newVotingInterface-Polls-By-Creator-Mobile-Friendly`}
        props={{
          ...props,
        }}
      />
    </FlexContainer>
    {props.state.showQuestionsByThisUser && props.renderModal()}
  </div>
);
