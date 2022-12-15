// Component that displays mobile-friendly input buttons in the style
// of Nintendo's classical Game Boy.

// required props
const buttonDownHandler = props.buttonDownHandler;

// optional styling props
const width = props.width ?? "100%";
const buttonSize = props.buttonSize ?? "80px";
const dPadWidth = props.buttonSize ?? "240px";
const margin = props.margin ?? "0px";

// enum for button values
const Button = {
  A: "a",
  B: "b",
  LEFT: "left",
  UP: "up",
  RIGHT: "right",
  DOWN: "down",
};

// reusable styled button component
const RoundButton = styled.button`
  border-radius: ${buttonSize};
  font-size: xx-large;
  margin: 10px;
  width: ${buttonSize};
  height: ${buttonSize};
  border: 2px solid black;
  ${(props) => props.primary}
`;

// reusable styled button component
const SquareButton = styled.button`
  font-size: xx-large;
  margin: 10px;
  width: ${buttonSize};
  height: ${buttonSize};
  border: 2px solid black;
  ${(props) => props.primary}
`;

// Directional pad
const Dpad = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateAreas: '". up ." "left . right" ". down ."',
        width: dPadWidth,
      }}
    >
      <SquareButton
        style={{ gridArea: "left" }}
        onClick={() => buttonDownHandler(Button.LEFT)}
      >
        &#9664;
      </SquareButton>
      <SquareButton
        style={{ gridArea: "right" }}
        onClick={() => buttonDownHandler(Button.RIGHT)}
      >
        &#9654;
      </SquareButton>
      <SquareButton
        style={{ gridArea: "up" }}
        onClick={() => buttonDownHandler(Button.UP)}
      >
        &#9650;
      </SquareButton>
      <SquareButton
        style={{ gridArea: "down" }}
        onClick={() => buttonDownHandler(Button.DOWN)}
      >
        &#9660;
      </SquareButton>
    </div>
  );
};

return (
  <div
    style={{
      width,
      margin,
      display: "grid",
      gridTemplateColumns: "1fr 2fr 1fr",
    }}
  >
    <RoundButton onClick={() => buttonDownHandler(Button.B)}>B</RoundButton>
    {Dpad()}
    <RoundButton onClick={() => buttonDownHandler(Button.A)}>A</RoundButton>
  </div>
);
