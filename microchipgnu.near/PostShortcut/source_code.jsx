const text = props?.text || "";

const data = {
  post: {
    main: JSON.stringify({
      type: "md",
      text: text,
    }),
  },
  index: {
    post: JSON.stringify({
      key: "main",
      value: {
        type: "md",
      },
    }),
  },
};

if (text) {
  const gas = 200000000000000;
  const deposit = 0;

  Near.call([
    {
      contractName: "social.near",
      methodName: "set",
      args: {
        data,
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
}

return <div>Post Shortcut by microchipgnu.near</div>;
