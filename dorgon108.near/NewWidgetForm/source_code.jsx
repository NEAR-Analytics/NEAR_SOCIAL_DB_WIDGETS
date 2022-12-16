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
      />
      <div>
        <input
          style={{ borderRadius: "10px", margin: "10px" }}
          type="submit"
          value="Submit"
        />
      </div>
    </div>
  </div>
);
