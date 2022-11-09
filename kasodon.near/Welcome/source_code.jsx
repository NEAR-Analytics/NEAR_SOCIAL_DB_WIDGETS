return (
  <>
    <div className="row mb-3">
      <h2>Welcome to Near Social!</h2>
      {context.accountId && (
        <div>
          <Widget src="mob.near/widget/ProfileOnboarding" />
          <Widget
            src="mob.near/widget/Profile"
            props={{ accountId: context.accountId }}
          />
        </div>
      )}
    </div>

    <div className="row mb-3">
      <h4>Get involved</h4>
      <div className="mb-3">
        <Widget
          src="mob.near/widget/Profile"
          props={{ accountId: "self.social.near" }}
        />
      </div>
      <div className="mb-1">
        Learn more:{" "}
        <a href="https://thewiki.near.page/near.social">
          https://thewiki.near.page/near.social
        </a>
      </div>
      <div className="mb-1">
        Questions? Join telegram group:{" "}
        <a href="https://t.me/NearSocial">https://t.me/NearSocial</a>
      </div>
      <div className="mb-1">
        Explore data: <a href="#/mob.near/widget/Explorer">Explorer</a>
      </div>
      <div className="mb-1">
        Explore all widgets:{" "}
        <a href="#/mob.near/widget/AllWidgets">AllWidgets</a>
      </div>
      <div className="mb-1">
        Recently updated widgets:{" "}
        <a href="#/mob.near/widget/LastWidgets">LastWidgets</a>
      </div>
      <div className="mb-1">
        Edit your homepage:{" "}
        <a href="#/mob.near/widget/HomepageEditor">HomepageEditor</a>
      </div>
      <div className="mb-1">
        <a href="#/mob.near/widget/Memes">Memes mEmEs MeMeS</a>
      </div>
    </div>
    <div className="row mb-3">
      <div>
        <h4>Recently joined</h4>
        <Widget src="mob.near/widget/LastProfilesImages" />
      </div>
    </div>
    {context.accountId &&
      Object.keys(Social.keys(`${context.accountId}/widget/*`) || {}).length >
        0 && (
        <div className="row mb-3">
          <h4>Your widgets</h4>
          <Widget src="mob.near/widget/Widgets" />
        </div>
      )}
  </>
);
