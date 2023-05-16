const ResponsiveText = styled.span`
  @media screen and (max-width: 1024px)  {
      font-size: 11px;
  }
`;
const ResponsiveTextOption = styled.p`
  whitespace: pre-wrap;
  margin-bottom: 2px !important;
  @media screen and (max-width: 1024px)  {
      font-size: 11px;
  }
`;
const TopMarginPercentage = styled.span`
  margin: 0.5rem 0px 0.4rem 0.3rem;
  @media screen and (max-width: 1024px)  {
      margin: 0.6rem 0px 0.4rem 0.3rem;
      font-size: 11px;
  }
`;

const VoteButton = styled.button`
  border-radius: 20px;
  border: none;
  display: flex;
  padding: 0;
  position: relative;
  background: #f3f3f2;
  width: 100%;
  margin-bottom: 14px;
  cursor: pointer;

  .button {
    border-radius: 20px;
    padding: 12px 20px;
    text-align: left;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.4s ease-in-out;
    text-align: center;
    display: flex;
    justify-content: center;
    min-width: 90px;
    width: 90px;

    @media (max-width: 600px) {
      justify-content: start;
    }
  }

  .votes {
    text-align: right;
    padding: 12px 16px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    color: rgb(27, 27, 24);
  }

  .preview {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 20px;
    transition: all 0.4s ease-in-out;
    z-index: 0;
  }

`;

return (
  <div>
    <div className="align-content-center">
      {/* Set the width of the next div to make the bar grow. At the same, use the same value to fill the span tag */}
      {!props.canVote && (
        <ResponsiveTextOption
          style={{
            marginTop: 15,
            fontWeight: "500",
          }}
        >
          {props.option} •
          <TopMarginPercentage
            className="text-secondary"
            style={{
              fontWeight: "400",
              marginTop: "0.8rem",
            }}
          >
            (
            {
              props.countVotes(props.questionNumber, props.questionType)[
                props.optionNumber
              ]
            }{" "}
            votes)
          </TopMarginPercentage>
        </ResponsiveTextOption>
      )}
      {!props.canVote ? (
        <>
          <VoteButton>
            <span
              style={{
                width: `${
                  props.calculatePercentageOfOption(
                    props.countVotes(props.questionNumber, props.questionType),
                    props.optionNumber
                  ) > 10
                    ? 10
                    : props.calculatePercentageOfOption(
                        props.countVotes(
                          props.questionNumber,
                          props.questionType
                        ),
                        props.optionNumber
                      )
                }%`,
                opacity: 1,
                backgroundColor: `${props.getBgColor(
                  props.optionNumber,
                  false
                )}`,
              }}
              className="button"
            >
              <span className="vote">
                <span style={{ opacity: 0 }}>b</span>
              </span>
            </span>
            <span className="votes">
              <span className="preview" />
              {props.calculatePercentageOfOption(
                props.countVotes(props.questionNumber, props.questionType),
                props.optionNumber
              )}
              %
            </span>
          </VoteButton>
        </>
      ) : (
        <>
          <input
            className="form-check-input"
            id={`${props.questionNumber}-${props.optionNumber}`}
            name={`${props.questionNumber}-${props.questionType}`}
            key={`${props.questionNumber}-${props.optionNumber}-${props.state.vote}`}
            style={props.getInputStyles(
              props.questionType,
              props.questionNumber,
              props.optionNumber
            )}
            type={props.questionType == "2" ? "checkbox" : "radio"}
            value={props.optionNumber}
            checked={
              props.questionType == "2"
                ? props.state.vote[props.questionNumber].includes(
                    props.optionNumber + ""
                  )
                : props.state.vote[props.questionNumber] ==
                  props.optionNumber + ""
            }
            onClick={
              props.questionType != "2" &&
              props.clickRadioInputHandler(
                props.questionNumber,
                props.optionNumber
              )
            }
            onChange={
              props.questionType == "2" &&
              props.clickCheckboxInputHandler(
                props.questionNumber,
                props.optionNumber
              )
            }
          />
          <label for={`${props.questionNumber}-${props.optionNumber}`}>
            {props.option}
          </label>
        </>
      )}
    </div>
  </div>
);
