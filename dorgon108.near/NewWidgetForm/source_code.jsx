State.init({
  titleVal: "",
  urlVal: "",
  ownerVal: "",
});

// Set Contract Name
const cName = "5star.dorgon108.near";

const sendToBlockChain = () => {
  Near.call(cName, "addNewWidget", {
    title: state.titleVal,
    url: state.urlVal,
    owner: state.ownerVal,
  });
};

return (
  <div style={{ backgroundColor: "#A8A8A8", padding: "3vw" }}>
    <div style={{ margin: "10px" }}>
      <div>
        <label>Enter Widget Title</label>
      </div>
      <input
        style={{ width: "25vw", borderRadius: "10px" }}
        type="text"
        name="Comment"
        placeholder="Enter Title Here"
        onChange={(e) => {
          State.update({ titleVal: e.target.value });
        }}
      />
    </div>
    <div style={{ margin: "10px" }}>
      <div>
        <label>Enter Widget URL</label>
      </div>
      <input
        style={{ width: "25vw", borderRadius: "10px" }}
        type="text"
        name="Comment"
        placeholder="Enter Url Here"
        onChange={(e) => {
          State.update({ urlVal: e.target.value });
        }}
      />
    </div>
    <div style={{ margin: "10px" }}>
      <div>
        {" "}
        <label>Enter Widget Owner</label>
      </div>
      <input
        style={{ width: "25vw", borderRadius: "10px" }}
        type="text"
        name="Owner"
        placeholder="Enter Owner Here"
        onChange={(e) => {
          State.update({ ownerVal: e.target.value });
        }}
      />
      <div>
        <input
          style={{ borderRadius: "10px", margin: "10px" }}
          type="submit"
          value="Submit"
          onClick={sendToBlockChain}
        />
      </div>
    </div>
  </div>
);
