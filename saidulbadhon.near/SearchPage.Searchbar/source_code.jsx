const allMetadata =
  Social.get(
    ["*/widget/*/metadata/name", "*/widget/*/metadata/tags/*"],
    "final"
  ) || {};
const keys = Social.keys(["*/widget/*"], "final", { values_only: true }) || {};

const requiredTag = props.filterTag;
const boostedTag = props.boostedTag;
const inputTerm = props.term;

const computeResults = (term) => {
  const terms = (term || "")
    .toLowerCase()
    .split(/[^\w._\/-]/)
    .filter((s) => !!s.trim());

  const matchedWidgets = [];

  const limit = props.limit ?? 30;

  const MaxSingleScore = 1;
  const MaxScore = MaxSingleScore * 4;

  const computeScore = (s) => {
    s = s.toLowerCase();
    return (
      terms
        .map((term) => {
          const pos = s.indexOf(term);
          return pos >= 0 ? Math.exp(-pos) : 0;
        })
        .reduce((s, v) => s + v, 0) / terms.length
    );
  };

  Object.entries(keys).forEach(([accountId, data]) => {
    Object.keys(data.widget).forEach((componentId) => {
      const widgetSrc = `${accountId}/widget/${componentId}`;
      const widgetSrcScore = computeScore(widgetSrc);
      const componentIdScore = computeScore(componentId);
      const metadata = allMetadata[accountId].widget[componentId].metadata;
      const name = metadata.name || componentId;
      if (requiredTag && !(metadata.tags && requiredTag in metadata.tags)) {
        return;
      }
      const boosted =
        boostedTag && metadata.tags && boostedTag in metadata.tags;
      const tags = Object.keys(metadata.tags || {}).slice(0, 10);
      const nameScore = computeScore(name);
      const tagsScore = Math.min(
        MaxSingleScore,
        tags.map(computeScore).reduce((s, v) => s + v, 0)
      );
      const score =
        (widgetSrcScore + componentIdScore + nameScore + tagsScore) / MaxScore;
      if (score > 0) {
        matchedWidgets.push({
          score,
          accountId,
          widgetName: componentId,
          widgetSrc,
          name,
          tags,
          boosted,
        });
      }
    });
  });

  matchedWidgets.sort(
    (a, b) => (b.boosted ? 2 : 0) + b.score - (a.boosted ? 2 : 0) - a.score
  );
  const result = matchedWidgets.slice(0, limit);

  State.update({
    term,
    result,
  });

  if (props.onChange) {
    props.onChange({ term, result });
  }
};

if (props.term && props.term !== state.oldTerm) {
  State.update({
    oldTerm: props.term,
  });
  if (props.term !== state.term) {
    computeResults(props.term);
  }
}

const Container = styled.div`
  background-color: ${theme.ui};
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;

    border: 1px ${props.theme.borderColor} solid;
    borderRadius: 4px;
`;

const Input = styled.input`
  color: ${props.theme.textColor};
  width: calc(100% - 40px);
//   height: 40px;
  outline:none;
  border:none;

  &:focus{
    color: ${props.theme.textColor};
    outline:none;
    border:none;
  }
`;

const Button = styled.button`
  background-color: ${props.theme.buttonColor};
  color: ${props.theme.buttonTextColor};
  width: 40px;
  height: 40px;
  outline:none;
  border:none;
  transition: all .2s ease-in-out;

  &:hover{
    background-color: ${props.theme.buttonColor}CC;
    outline:none;
    border:none;
  }
  &:active{
    background-color: ${props.theme.buttonColor}99;
  }
`;

return (
  <Container>
    <i
      className="bi bi-search"
      style={{ width: 50, display: "flex", justifyContent: "center" }}
    ></i>
    <Input
      type="text"
      value={state.term ?? ""}
      onChange={(e) => computeResults(e.target.value)}
      placeholder={props.placeholder ?? `Search components`}
    />

    {/*{state.term && (*/}
    <Button type="button" onClick={() => computeResults("")}>
      <i className="bi bi-x"></i>
    </Button>
    {/*})}*/}

    {props.debug && <pre>{JSON.stringify(state.result, undefined, 2)}</pre>}
  </Container>
);
