let authors = props.authors ?? ["Nobody"];

function humanList(list) {
  return [list.pop(), list.join(", ")].filter(Boolean).reverse().join(" and ");
}

return (
  <span class="text-muted">
    By
    {authors.map((author) => (
      <a
        href={`#/mob.near/widget/ProfilePage?accountId=${author}`}
        class="text-muted text-truncate"
      >
        <Widget
          src="mob.near/widget/ProfileLine"
          props={{
            accountId: author,
            hideAccountId: true,
            tooltip: true,
            link: false,
          }}
        />
      </a>
    ))}
  </span>
);
