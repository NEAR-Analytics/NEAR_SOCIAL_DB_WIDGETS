let authors = props.authors;

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

if (props.dep) return attribution(authors);

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
      <a href="https://near.social/#/miraclx.near/widget/YouTubeVideo">
        <h1 class="display-1" style={{ "margin-bottom": "0.1rem" }}>
          <i class="fa-brands fa-youtube text-danger"></i>
        </h1>
      </a>
      <h4 class="text-secondary">Embed YouTube Videos in Near.Social</h4>
      <h6>{attribution(["miraclx.near"])}</h6>
    </div>

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
    <Capped className="row no-gutters border-top">
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
