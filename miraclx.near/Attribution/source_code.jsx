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

if (props.dep)
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

let Capped = styled.div`
& > .col.md {
    padding-top: 0px;
    padding-left: 0px;
    padding-bottom: 0px;
}

& > .col.md > pre {
    margin: 0px;
}

& > .col.md > pre > div {
    margin: 0px !important;
}
`;

return (
  <>
    <Capped className="row no-gutters">
      <div class="col md">
        <Markdown
          text={`\`\`\`jsx
<Widget
  src="miraclx.near/widget/Attribution"
  props={{ dep: true, authors: ["miraclx.near"] }}
/>`}
        />
      </div>
      <div class="col border-start">
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ dep: true, authors: ["miraclx.near"] }}
        />
      </div>
    </Capped>
    <Capped className="row no-gutters border-top">
      <div class="col md">
        <Markdown
          text={`\`\`\`jsx
<Widget
  src="miraclx.near/widget/Attribution"
  props={{ dep: true, authors: ["miraclx.near", "logunov.near"] }}
/>`}
        />
      </div>
      <div class="col border-start">
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ dep: true, authors: ["miraclx.near", "logunov.near"] }}
        />
      </div>
    </Capped>
    <Capped className="row no-gutters border-top">
      <div class="col md">
        <Markdown
          text={`\`\`\`jsx
<Widget
  src="miraclx.near/widget/Attribution"
  props={{
    dep: true,
    authors: [
      "miraclx.near",
      "logunov.near",
      "esaminu.near"
    ]
  }}
/>`}
        />
      </div>
      <div class="col border-start">
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{
            dep: true,
            authors: ["miraclx.near", "logunov.near", "esaminu.near"],
          }}
        />
      </div>
    </Capped>
    <Capped className="row no-gutters border-top">
      <div class="col md">
        <Markdown
          text={`\`\`\`jsx
<Widget src="miraclx.near/widget/Attribution" />`}
        />
      </div>
      <div class="col border-start">
        <Widget src="miraclx.near/widget/Attribution" />
      </div>
    </Capped>
  </>
);
