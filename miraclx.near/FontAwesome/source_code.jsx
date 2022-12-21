let FA = styled.i`@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css");`;

if (props.dep) return <FA />;

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
    <FA />
    <div class="text-center">
      <a href="#/miraclx.near/widget/FontAwesome">
        <h1 class="display-1" style={{ "margin-bottom": "0.1rem" }}>
          <i class="fa-brands fa-square-font-awesome"></i>
        </h1>
      </a>
      <h4 class="text-secondary">Use FontAwesome in Near.Social</h4>
      <h6>
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ authors: ["miraclx.near"], dep: true }}
        />
      </h6>
    </div>
    <hr />
    This is a demo showing that Font Awesome works in the browser.
    <br />
    Import this widget into yours to add font awesome support.
    <br />
    <Markdown
      text={`\`\`\`jsx
<Widget src="miraclx.near/widget/FontAwesome" props={{ dep: true }} />`}
    />
    <hr />
    See
    <a href="https://fontawesome.com/icons">https://fontawesome.com/icons</a>
    for a list of all icons.
    <hr />
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
<i class="fa-solid fa-user"></i>
<i class="fa-regular fa-user"></i>
<i class="fa-light fa-user"></i>
<i class="fa-duotone fa-user"></i>
<i class="fa-thin fa-user"></i>
<i class="fa-sharp fa-solid fa-user"></i>
<i class="fa-brands fa-github-square"></i>`}
        />
      </div>
      <div class="col border-start">
        <i class="fa-solid fa-user"></i>
        <i class="fa-regular fa-user"></i>
        <i class="fa-light fa-user"></i>
        <i class="fa-duotone fa-user"></i>
        <i class="fa-thin fa-user"></i>
        <i class="fa-sharp fa-solid fa-user"></i>
        <i class="fa-brands fa-github-square"></i>
      </div>
    </Capped>
    <Capped className="row no-gutters border-top">
      <div class="col md overflow-auto">
        <Markdown
          text={`\`\`\`jsx
<ul class="fa-ul">
  <li>
    <span class="fa-li">
      <i class="fa-solid fa-check-square"></i>
    </span>
    List icons can
  </li>
  <li>
    <span class="fa-li">
      <i class="fa-solid fa-check-square"></i>
    </span>
    be used to
  </li>
  <li>
    <span class="fa-li">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </span>
    replace bullets
  </li>
  <li>
    <span class="fa-li">
      <i class="fa-regular fa-square"></i>
    </span>
    in lists
  </li>
</ul>`}
        />
      </div>
      <div class="col border-start">
        <ul class="fa-ul">
          <li>
            <span class="fa-li">
              <i class="fa-solid fa-check-square"></i>
            </span>
            List icons can
          </li>
          <li>
            <span class="fa-li">
              <i class="fa-solid fa-check-square"></i>
            </span>
            be used to
          </li>
          <li>
            <span class="fa-li">
              <i class="fa-solid fa-spinner fa-pulse"></i>
            </span>
            replace bullets
          </li>
          <li>
            <span class="fa-li">
              <i class="fa-regular fa-square"></i>
            </span>
            in lists
          </li>
        </ul>
      </div>
    </Capped>
    <Capped className="row no-gutters border-top">
      <div class="col md">
        <Markdown
          text={`\`\`\`jsx
<div style={{ "font-size": "2rem" }}>
  <div>
    <i
      class="fa-solid fa-skating fa-fw"
      style={{ background: "DodgerBlue" }}
    ></i>
    Skating
  </div>
  <div>
    <i
      class="fa-solid fa-skiing fa-fw"
      style={{ background: "SkyBlue" }}
    ></i>
    Skiing
  </div>
  <div>
    <i
      class="fa-solid fa-skiing-nordic fa-fw"
      style={{ background: "DodgerBlue" }}
    ></i>
    Nordic Skiing
  </div>
  <div>
    <i
      class="fa-solid fa-snowboarding fa-fw"
      style={{ background: SkyBlue }}
    ></i>
    Snowboarding
  </div>
  <div>
    <i
      class="fa-solid fa-snowplow fa-fw"
      style={{ background: "DodgerBlue" }}
    ></i>
    Snowplow
  </div>
</div>`}
        />
      </div>
      <div class="col border-start">
        <div style={{ "font-size": "2rem" }}>
          <div>
            <i
              class="fa-solid fa-skating fa-fw"
              style={{ background: "DodgerBlue" }}
            ></i>
            Skating
          </div>
          <div>
            <i
              class="fa-solid fa-skiing fa-fw"
              style={{ background: "SkyBlue" }}
            ></i>
            Skiing
          </div>
          <div>
            <i
              class="fa-solid fa-skiing-nordic fa-fw"
              style={{ background: "DodgerBlue" }}
            ></i>
            Nordic Skiing
          </div>
          <div>
            <i
              class="fa-solid fa-snowboarding fa-fw"
              style={{ background: SkyBlue }}
            ></i>
            Snowboarding
          </div>
          <div>
            <i
              class="fa-solid fa-snowplow fa-fw"
              style={{ background: "DodgerBlue" }}
            ></i>
            Snowplow
          </div>
        </div>
      </div>
    </Capped>
    <Capped className="row no-gutters border-top border-bottom">
      <div class="col md">
        <Markdown
          text={`\`\`\`jsx
<span class="fa-stack fa-2x">
  <i class="fa-solid fa-square fa-stack-2x"></i>
  <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
</span>
<span class="fa-stack fa-2x">
  <i class="fa-solid fa-circle fa-stack-2x"></i>
  <i class="fa-solid fa-flag fa-stack-1x fa-inverse"></i>
</span>
<span class="fa-stack fa-2x">
  <i class="fa-solid fa-camera fa-stack-1x"></i>
  <i
    class="fa-solid fa-ban fa-stack-2x"
    style={{ color: "Tomato" }}
  ></i>
</span>
<span class="fa-stack fa-2x">
  <i class="fa-solid fa-square fa-stack-2x"></i>
  <i class="fa-solid fa-terminal fa-stack-1x fa-inverse"></i>
</span>
<span class="fa-stack fa-4x">
  <i class="fa-solid fa-square fa-stack-2x"></i>
  <i class="fa-solid fa-terminal fa-stack-1x fa-inverse"></i>
</span>`}
        />
      </div>
      <div class="col border-start">
        <span class="fa-stack fa-2x">
          <i class="fa-solid fa-square fa-stack-2x"></i>
          <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
        </span>
        <span class="fa-stack fa-2x">
          <i class="fa-solid fa-circle fa-stack-2x"></i>
          <i class="fa-solid fa-flag fa-stack-1x fa-inverse"></i>
        </span>
        <span class="fa-stack fa-2x">
          <i class="fa-solid fa-camera fa-stack-1x"></i>
          <i
            class="fa-solid fa-ban fa-stack-2x"
            style={{ color: "Tomato" }}
          ></i>
        </span>
        <span class="fa-stack fa-2x">
          <i class="fa-solid fa-square fa-stack-2x"></i>
          <i class="fa-solid fa-terminal fa-stack-1x fa-inverse"></i>
        </span>
        <span class="fa-stack fa-4x">
          <i class="fa-solid fa-square fa-stack-2x"></i>
          <i class="fa-solid fa-terminal fa-stack-1x fa-inverse"></i>
        </span>
      </div>
    </Capped>
  </>
);
