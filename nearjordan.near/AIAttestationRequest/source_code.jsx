//<script src="https://unpkg.com/ipfs-http-client/dist/index.min.js"></script>

  // Once above IPFS library can be imported:
  // const ipfs = window.IpfsHttpClient.create({
  //   host: "localhost",
  //   port: 5001,
  //   protocol: "http",
  // });

  async function addFile(content) {
    // Workaround - return hex string
    return ethers.utils.sha256(ethers.utils.toUtf8Bytes(JSON.stringify(content)))

    // Once above IPFS library can be imported:
    // const { path } = await ipfs.add(content);
    // await ipfs.pin.add(path);
    // return path;
  }

  async function getFile(cid) {
    return "<DUMMY CID RESOLVE>"

    // Once above IPFS library can be imported:
    // const stream = ipfs.cat(cid);
    // let data = "";

    // for await (const chunk of stream) {
    //   data += new TextDecoder().decode(chunk);
    // }

    // return data;
  }

  function queryGPT3() {
    const xhr = new XMLHttpRequest();
console.log("xhr", xhr);
    xhr.open("POST", "https://api.openai.com/v1/chat/completions");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + state.apiKey);

    const data = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: state.question }],
      temperature: 0.0,
    });

    xhr.send(data);

    xhr.onload = function () {
      console.log("xhr", xhr);
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
console.log("response", response);
        const a = response.choices[0].message.content;
        State.update({answer: a});

        attestationRequest = {question: state.question, answer: a };

        addFile(JSON.stringify(attestationRequest))
          .then((cid) => {
                console.log("CID: ", cid);
                State.update({cid: cid});
            
                getFile(cid)
                .then((r) => console.log("Verification: ", JSON.parse(r)))
                .catch(console.error);
            })
          .catch(console.error);
      } else {
        console.log("Error: " + xhr.status);
      }
    };
  }

return (<>
  <input placeholder="LLM API KEY" onChange={(e) => State.update({apiKey: e.target.value})} />
  <textarea
    onChange={(e) => State.update({question: e.target.value})}
    placeholder="Enter your query"
    rows="10"
    cols="50"></textarea>
  <button onclick="queryGPT3()">Query GPT-3.5</button>
  <div>{state.answer}</div>
  <div>{state.attestationRequestCID}</div>
</>)