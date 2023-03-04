const SEARCH_API_KEY = props.searchApiKey ?? "57ad1944e94432510f067a6e3d13f022";
const APPLICATION_ID = props.appId ?? "B6PI9UKKJT";
const INDEX = props.index ?? "test_near-social-feed";
const API_URL =
  props.apiUrl ??
  `https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/${INDEX}/query?`;

const fetchSearchHits =
  props.fetchSearchHits ??
  ((query, { pageNumber, optionalFilters }) => {
    let body = {
      query,
      page: pageNumber ?? 0,
      optionalFilters: optionalFilters ?? [
        "categories:profile<score=3>",
        "categories:widget<score=2>",
        "categories:post<score=1>",
        "categories:comment<score=0>",
      ],
    };

    return asyncFetch(API_URL, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "X-Algolia-Api-Key": SEARCH_API_KEY,
        "X-Algolia-Application-Id": APPLICATION_ID,
      },
      method: "POST",
    });
  });

const computeResults = (term) => {
  State.update({
    term,
  });

  fetchSearchHits(term, 0).then((result) => {
    State.update({
      result,
    });

    if (props.onChange) {
      props.onChange({ term, result });
    }
  });
};

const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  position: relative;

  .bi-search {
      position: absolute;
      top: 0;
      left: 18px;
      z-index: 100;
      font-size: 14px;
      line-height: 40px;
      color: #687076;
  }

  .input-group {
      height: 100%;
  }

  input {
      padding: 0 14px 0 42px;
      border: 1px solid #D0D5DD !important;
      background: #FFFFFF;
      border-radius: 100px;
  }

  button {
      border-color: #D0D5DD !important;
      border-radius: 0 100px 100px 0 !important;
      border-left: none !important;
      background: #fff !important;
      color: #687076 !important;

      &:hover, &:focus {
          color: #000 !important;
      }
  }

  @media (max-width: 500px) {
      width: 100%;
  }
`;

return (
  <Wrapper>
    <i className="bi bi-search"></i>
    <div className="input-group">
      <input
        type="text"
        className={`form-control ${state.term ? "border-end-0" : ""}`}
        value={state.term ?? ""}
        onChange={(e) => computeResults(e.target.value)}
        placeholder={props.placeholder ?? `Search`}
      />

      {state.term && (
        <button
          className="btn btn-outline-secondary border border-start-0"
          type="button"
          onClick={() => computeResults("")}
        >
          <i className="bi bi-x"></i>
        </button>
      )}
    </div>

    {props.debug && <pre>{JSON.stringify(state.result, undefined, 2)}</pre>}
  </Wrapper>
);
