return styled.button`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : "unset")};
  border: 1px solid black;
  border-radius: 4px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1rem")};
  max-width: 220px;

  > * {
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
