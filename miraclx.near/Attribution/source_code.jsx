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

function attribution(authors) {
  authors = Array.isArray(authors) && authors.length ? authors : ["Nobody"];
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
}

if (props.dep) return attribution(props.authors);

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
    <Widget src="miraclx.near/widget/FontAwesome" props={{ dep: true }} />
    <div class="text-center">
      <a href="#/miraclx.near/widget/Attribution">
        <h1 class="display-1" style={{ "margin-bottom": "0.1rem" }}>
          <i class="fa-solid fa-at"></i>
        </h1>
      </a>
      <h4 class="text-secondary">
        Add attribution to your Near.Social widgets
      </h4>
      <h6>
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ authors: ["miraclx.near"], dep: true }}
        />
      </h6>
    </div>
    <hr />
    <div class="text-center">
      Import this widget into yours to add author attribution.
    </div>
    <br />
    <Capped
      className="row no-gutters border-top text-center"
      style={{ "font-weight": "bold" }}
    >
      <div class="col md border-start">Code</div>
      <div class="col border-start border-end">Preview</div>
    </Capped>
    <Capped className="row no-gutters border-top">
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
    authors: ["miraclx.near", "logunov.near", "esaminu.near"],
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
    <Capped className="row no-gutters border-top border-bottom">
      <div class="col md">
        <Markdown
          text={`\`\`\`jsx
<Widget
  src="miraclx.near/widget/Attribution"
  props={{ dep: true }}
/>`}
        />
      </div>
      <div class="col border-start">
        <Widget src="miraclx.near/widget/Attribution" props={{ dep: true }} />
      </div>
    </Capped>
  </>
);
