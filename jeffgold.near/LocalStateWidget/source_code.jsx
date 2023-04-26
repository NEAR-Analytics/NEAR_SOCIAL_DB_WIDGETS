const LocalStateWidget = ({ handleStateChange, initState }) => {
  const [text, setText] = React.useState(initState("textInput", ""));

  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    handleStateChange("textInput", newText);
  };

  return <input type="text" value={text} onChange={handleChange} />;
};
