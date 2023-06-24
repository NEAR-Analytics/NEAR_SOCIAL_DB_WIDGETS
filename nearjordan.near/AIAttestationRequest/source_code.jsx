//<script src="https://unpkg.com/ipfs-http-client/dist/index.min.js"></script>

// Once above IPFS library can be imported:
// const ipfs = window.IpfsHttpClient.create({
//   host: "localhost",
//   port: 5001,
//   protocol: "http",
// });

// async function addFile(content) {
//   Once above IPFS library can be imported:
//   const { path } = await ipfs.add(content);
//   await ipfs.pin.add(path);
//   return path;
// }

// async function getFile(cid) {
//   Once above IPFS library can be imported:
//   const stream = ipfs.cat(cid);
//   let data = "";

//   for await (const chunk of stream) {
//     data += new TextDecoder().decode(chunk);
//   }

//   return data;
// }

const queryGPT3 = () => {
  fetchGPTResponse().then((res) => {
    const data = res.body;
console.log(data);
    const a = data.choices[0].message.content;
    State.update({ answer: a });
    attestationRequest = { question: state.question, answer: a };
    State.update({ cid: ethers.utils.sha256(ethers.utils.toUtf8Bytes(JSON.stringify(content))) });
});
};

const fetchGPTResponse = () => {
  return asyncFetch("https://api.openai.com/v1/chat/completions", {
    body: {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: state.question }],
      temperature: 0.0,
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + state.apiKey,
    },
    method: "POST",
  });
};

return (<>
  <input type="password" placeholder="LLM API KEY" onChange={(e) => State.update({ apiKey: e.target.value })} />
  <textarea
    onChange={(e) => State.update({ question: e.target.value })}
    placeholder="Enter your query"
    rows="10"
    cols="50"></textarea>
  <button onclick={queryGPT3}>Query GPT-3.5</button>
  <div>{state.answer}</div>
  <div>{state.attestationRequestCID}</div>
</>)