return (
  <div className="container mb-4 text-sm-start text-md-start text-lg-start text-center">
    <div style={{ borderRadius: "12px" }} className="row py-2 mb-2">
      <div style={{}} className="col-12">
        <h2
          style={{
            fontFamily: "Tahoma, sans-serif",
            fontWeight: "bolder",
            margin: "0",
            color: "#414449",
          }}
        >
          Welcome to{" "}
          <span style={{ color: "#25A18E" }}>
            <i>NEAR</i>
          </span>{" "}
          Social!
        </h2>
      </div>
    </div>
    <div
      style={{ borderRadius: "12px", fontFamily: "Tahoma, sans-serif" }}
      className="row py-2"
    >
      <div className="col-12 font-weight-bold mb-3">
        {context.accountId && (
          <div>
            <a
              href={`#/mob.near/widget/ProfilePage?accountId=${context.accountId}`}
              style={{
                background: "#3D7EFF",
                color: "#FEFFFE",
                fontWeight: "bold",
              }}
              className="btn mx-2 text-capitalize"
            >
              View Profile
            </a>
          </div>
        )}
      </div>
      <div className="col-12 font-weight-bold">
        {context.accountId && (
          <div>
            <a
              href={`#/mob.near/widget/ProfilePage?accountId=self.social.near`}
              style={{
                background: "transperent",
                border: "2px solid #3D7EFF",
                color: "#3D7EFF",
                fontWeight: "bold",
                textDecoration: "none",
              }}
              className="btn btn mx-2 text-capitalize"
            >
              Get Involved
            </a>
          </div>
        )}
      </div>
    </div>
    <div
      style={{ fontFamily: "Tahoma, sans-serif", fontWeight: "bold" }}
      className="row gy-4 mt-4"
    >
      <div className="col-12">
        <a
          style={{
            textDecoration: "none",
            color: "#FAF8D4",
            background: "#11151C",
            padding: "10px 22px",
            borderRadius: "8px",
          }}
          href="https://thewiki.near.page/near.social"
        >
          Learn More &rarr;
        </a>
      </div>
      <div className="col-12">
        <a
          style={{
            textDecoration: "none",
            color: "#FAF8D4",
            background: "#11151C",
            padding: "10px 22px",
            borderRadius: "8px",
          }}
          href="https://t.me/NearSocial"
        >
          Ask Questions &rarr;
        </a>
      </div>
      <div className="col-12">
        <a
          style={{
            textDecoration: "none",
            color: "#FAF8D4",
            background: "#11151C",
            padding: "10px 22px",
            borderRadius: "8px",
          }}
          href="#/mob.near/widget/Explorer"
        >
          Explore All Data &rarr;
        </a>
      </div>
      <div className="col-12">
        <a
          style={{
            textDecoration: "none",
            color: "#FAF8D4",
            background: "#11151C",
            padding: "10px 22px",
            borderRadius: "8px",
          }}
          href="#/mob.near/widget/AllWidgets"
        >
          Explore All widgets &rarr;
        </a>
      </div>
      <div className="col-12">
        <a
          style={{
            textDecoration: "none",
            color: "#FAF8D4",
            background: "#11151C",
            padding: "10px 22px",
            borderRadius: "8px",
          }}
          href="#/mob.near/widget/LastWidgets"
        >
          Last Updated widgets &rarr;
        </a>
      </div>
      <div className="col-12">
        <a
          style={{
            textDecoration: "none",
            color: "#FAF8D4",
            background: "#11151C",
            padding: "10px 22px",
            borderRadius: "8px",
          }}
          href="#/mob.near/widget/HomepageEditor"
        >
          Edit This Homepage &rarr;
        </a>
      </div>
      <div className="col-12">
        <a
          style={{
            textDecoration: "none",
            color: "#FAF8D4",
            background: "#11151C",
            padding: "10px 22px",
            borderRadius: "8px",
          }}
          href="#/mob.near/widget/Memes"
        >
          View All Memes &rarr;
        </a>
      </div>
    </div>
    <div className="mb-4">
      {context.accountId && (
        <div>
          <Widget src="mob.near/widget/ProfileOnboarding" />
          <Widget
            src="kasodon.near/widget/Profile"
            props={{ accountId: context.accountId }}
          />
        </div>
      )}
    </div>
    <div className="row mb-3">
      <div>
        <h4
          style={{ fontFamily: "Tahoma, sans-serif", fontWeight: "bold" }}
          className="text-capitalize fw-bold"
        >
          Recently joined
        </h4>
        <Widget src="mob.near/widget/LastProfilesImages" />
      </div>
    </div>
    {context.accountId &&
      Object.keys(Social.keys(`${context.accountId}/widget/*`) || {}).length >
        0 && (
        <div className="row mb-3">
          <h4 style={{ fontFamily: "Tahoma, sans-serif", fontWeight: "bold" }}>
            Your widgets
          </h4>
          <Widget src="mob.near/widget/Widgets" />
        </div>
      )}
  </div>
);
