const accountId = props.accountId ?? "*";
const tag = props.tag;

const taggedWidgets = Social.keys(
  `${accountId}/widget/*/metadata/tags/${tag}`,
  "final"
);

if (taggedWidgets === null) {
  return "Loading tags";
}

const keys = Object.entries(taggedWidgets)
  .map((kv) => Object.keys(kv[1].widget).map((w) => `${kv[0]}/widget/${w}`))
  .flat();

if (!keys.length) {
  return `No widgets found by tag #${tag}`;
}

const accountIdArgument = props.accountId ? `?accountId=${accountId}` : "";

return (
  <>
    <div className="mb-2">
      Filtered by tag
      <a
        href={`#/mob.near/widget/LastWidgets${accountIdArgument}`}
        className="btn btn-outline-primary"
      >
        <span class="badge text-bg-secondary">#{tag}</span>
        <i class="bi bi-x-square"></i>
      </a>
    </div>
    <Widget
      src="mob.near/widget/LastWidgets"
      props={{ keys, accountId: props.accountId }}
    />
  </>
);
