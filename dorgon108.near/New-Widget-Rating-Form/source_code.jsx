State.init({
  FormWidgetTitle: "",
  FormWidgetUrl: "",
  FormWidgetOwner: "",
});

const submitInfo = () => {};

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
          State.update({ FormWidgetTitle: e.target.value });
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
          State.update({ FormWidgetUrl: e.target.value });
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
          State.update({ FormWidgetOwner: e.target.value });
        }}
      />
      <div>
        <input
          style={{ borderRadius: "10px", margin: "10px" }}
          type="submit"
          value="Submit"
          onClick={submitInfo}
        />
      </div>
    </div>
  </div>
);
