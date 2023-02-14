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
          <a href="https://devgovgigs.near.social">Gigs Board</a>. You might
          want to add #hackathon and other tags to facilitate discovery!
        </p>
        <div className="mb-3"></div>
        <a className="btn btn-primary" href="https://devgovgigs.near.social">
          Explore Ideas
        </a>
        <a className="btn btn-outline-primary" href="https://nearbuilders.com">
          Learn More
        </a>
        <div className="mb-3"></div>
        <div className="mb-3"></div>
        <h3>Evolving Guides for Builders</h3>
        <div className="mb-3"></div>
        <a
          className="btn btn-outline-primary"
          href="https://near.social/#/hack.near/widget/Dev"
        >
          Widgets
        </a>
        <a
          className="btn btn-outline-primary"
          href="https://near.social/#/hack.near/widget/Docs"
        >
          APIs
        </a>
        <a
          className="btn btn-outline-primary"
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
