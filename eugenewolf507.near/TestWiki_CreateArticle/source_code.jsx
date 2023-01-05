State.init({});

return (
  <div>
    <div>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => {
          console.log("save article");
          console.log(state);
        }}
      >
        Save Article{" "}
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => {
          console.log("cancel");
          State.update({ note: article.body });
        }}
      >
        Cancel{" "}
      </button>
    </div>
    <div>
      Input article id (case-sensitive):
      <input
        onChange={(e) => {
          console.log("e", e.data);
          State.update({ ...state, articleId: e.target.value });
        }}
      />
    </div>
    <div>
      Input article body (in makrdown format):
      <textarea
        id="textarea1"
        type="text"
        rows={10}
        className="form-control mt-2"
        onChange={(e) => {
          console.log("e", e.data);
          State.update({ ...state, articleBody: e.target.value });
        }}
      />
    </div>
  </div>
);
