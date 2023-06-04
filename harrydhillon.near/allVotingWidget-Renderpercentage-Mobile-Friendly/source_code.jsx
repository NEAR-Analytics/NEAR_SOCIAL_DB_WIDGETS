const ResponsiveText = styled.span`
  @media screen and (max-width: 1024px)  {
      font-size: 11px;
  }
`;
const ResponsiveTextOption = styled.p`
  width:100px;
  whitespace: pre-wrap;
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
        </ResponsiveTextOption>
      )}
      {!props.canVote ? (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            backgroundColor: `${props.getBgColor(props.optionNumber, false)}`,
            color: `${props.getFontColor(props.optionNumber)}`,
            width: "100%",
            margin: "0.3rem 0px",
            height: "2.4rem",
            borderRadius: `${props.getBorderRadious(
              props.questionNumber,
              props.optionNumber
            )}`,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              padding: "0.01em 22px 0.01em 11px",
              display: "block",
              width: `${props.calculatePercentageOfOption(
                props.countVotes(props.questionNumber, props.questionType),
                props.optionNumber
              )}%`,
              textAlign: "center",
              overflow: "visible",
              whiteSpace: "nowrap",
              textAlign: "left",
              backgroundColor: `${props.getBgColor(props.optionNumber, true)}`,
              borderRadius: "4px",
            }}
          >
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
          </div>
          <TopMarginPercentage
            style={{
              minWidth: "max-content",
              fontWeight: "500",
              position: "absolute",
              right: "1.7rem",
            }}
          >
            {props.calculatePercentageOfOption(
              props.countVotes(props.questionNumber, props.questionType),
              props.optionNumber
            )}
            %
          </TopMarginPercentage>
        </div>
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
