// handle only ask once
// handle waiting process to display

const queryURI = "https://api.openai.com/v1/chat/completions";
const token = "Bearer <<API_KEY>>";
const data = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "user",
      content: "plan a 30days trip to usa",
    },
  ],
  temperature: 1,
  top_p: 1,
  n: 1,
  stream: false,
  max_tokens: 100,
  presence_penalty: 0,
  frequency_penalty: 0,
};
const fetchAskChatGPT = (queryURI) => {
  return asyncFetch(queryURI, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const handleAskChatGPT = () => {
  fetchAskChatGPT(queryURI).then((res) => {
    // console.log(res);
    console.log(res.body.choices[0].message.content);
  });
};

const allNumbers = Array.from(Array(1000).keys());

State.init({
  displayNums: [],
  lastNumber: 0,
});

const loadNumbers = (page) => {
  allNumbers
    .slice(state.lastNumber, state.lastNumber + 10)
    .map((n) => numberToElem(n))
    .forEach((i) => state.displayNums.push(i));
  state.lastNumber += 10;
  State.update();
  console.log("loading more ...");
};

const numberToElem = (number) => <div> {number} </div>;

return (
  <div>
    <button class="btn btn-success" onClick={handleAskChatGPT} disabled={false}>
      Ask ChatGPT
    </button>
    <InfiniteScroll
      loadMore={loadNumbers}
      hasMore={state.displayNums.length < allNumbers.length}
    >
      {state.displayNums}
    </InfiniteScroll>
  </div>
);
