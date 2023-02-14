return (
  <div className="container">
    <div className="row mb-3"></div>

    <div className="row mb-3">
      <div>
        <h1>Near Social Hackathon</h1>
        <h2>February 8-17</h2>
        <h5>Learn, Create, and Grow</h5>
        <p>
          To get started, check out ideas on the{" "}
          <a href="https://devgovgigs.near.social">Gigs Board</a>.
        </p>
        <div>
          <h4>Prize Pools</h4>
          <ul>
            <li>ONBOARDING: $5000</li>
            <li>GAMING: 1000 NEAR</li>
          </ul>
        </div>
        <div className="mb-3"></div>
        <a className="btn btn-success" href="https://devgovgigs.near.social">
          Submit
        </a>
        <a
          className="btn btn-outline-primary"
          href="https://devgovgigs.near.social"
        >
          Explore
        </a>
        <a className="btn btn-outline-primary" href="https://t.me/NearSocial">
          Chat
        </a>
        <div className="mb-3"></div>
        <div className="mb-3"></div>
        <h3>Evolving Guides for Builders</h3>
        <div className="mb-3"></div>
        <a
          className="btn btn-primary"
          href="https://near.social/#/hack.near/widget/Dev"
        >
          Widgets
        </a>
        <a
          className="btn btn-primary"
          href="https://near.social/#/hack.near/widget/Docs"
        >
          APIs
        </a>
        <a
          className="btn btn-primary"
          href="https://near.social/#/hack.near/widget/Data"
        >
          Data
        </a>
      </div>
      <div className="mb-3"></div>
      <Widget src="hack.near/widget/SubmitProject" />
    </div>
  </div>
);
