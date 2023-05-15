return (
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
          : props.state.vote[props.questionNumber] == props.optionNumber + ""
      }
      onClick={
        props.questionType != "2" &&
        props.clickRadioInputHandler(props.questionNumber, props.optionNumber)
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
);
