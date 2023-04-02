const font = props.font || "Times New Roman";
const text = props.text || "everything";

const Text = styled.h1`
    font-family: ${font}, Times, serif;
    font-size: 4em;
    line-height: 1.25;
    font-weight: 400;
`;

return <Text>{text}</Text>;
