let authors = props.authors ?? ["Nobody"];

function humanList(list) {
  let last = list.pop();
  return (
    <>
      {list.length ? (
        [...list.flatMap((item, idx) => [...(idx ? [","] : []), item]), " and "]
      ) : (
        <></>
      )}
      {last}
    </>
  );
}

return (
  <span class="text-muted">
    By
    {humanList(
      authors.map((author) => (
        <a
          href={`#/mob.near/widget/ProfilePage?accountId=${author}`}
          class="text-muted"
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
      ))
    )}
  </span>
);
