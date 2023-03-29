const LZUTF8Decompressor = (props) => {
  const { frames, onDecompress } = props;

  const [output, setOutput] = React.useState("");

  const accountId = "chloe.near";

  const handleDecompress = async () => {
    const decompressedFrames = [];
    for (const input of frames) {
      const inputBytes = new TextEncoder().encode(input);
      const outputBytes = await window.nearApi.connection.provider.query({
        request_type: "call_function",
        finality: "final",
        account_id: accountId,
        method_name: "decompressBlockToString",
        args_base64: Buffer.from(inputBytes).toString("base64"),
        args: {
          input: inputBytes,
        },
      });

      decompressedFrames.push(new TextDecoder().decode(outputBytes));
    }
    setOutput(decompressedFrames);
    onDecompress(decompressedFrames);
  };

  return (
    <div>
      <button onClick={handleDecompress}>Decompress</button>
      <div>
        <label>Output:</label>
        <textarea value={output} readOnly />
      </div>
      <Widget src="chloe.near/widget/ArrayTools" />
      <Widget src="chloe.near/widget/CompressionCommon" />
      <Widget src="chloe.near/widget/UTF8Decoder" />
    </div>
  );
};
