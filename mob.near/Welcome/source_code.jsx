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
      <div>
        <h4>Get involved</h4>
        <div className="mb-2">
          <a
            className="btn btn-outline-secondary"
            href="https://thewiki.near.page/PastPresentAndFutureOfNearSocial"
          >
            What's Near Social?
          </a>
          <a
            className="btn btn-outline-secondary"
            href="https://thewiki.near.page/near.social_docs"
          >
            Documentation
          </a>
        </div>
        <div>
          <a
            className="btn btn-outline-secondary"
            href="#/mob.near/widget/ProfilePage?accountId=self.social.near"
          >
            <i className="bi bi-person-circle"></i>
          </a>
          <a
            className="btn btn-outline-secondary"
            href="https://t.me/NearSocial"
          >
            <i className="bi bi-telegram"></i>
          </a>
          <a
            className="btn btn-outline-secondary"
            href="https://github.com/NearSocial"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            className="btn btn-outline-secondary"
            href="https://twitter.com/NearSocial_"
          >
            <i className="bi bi-twitter"></i>
          </a>
          <a
            className="btn btn-outline-secondary"
            href="https://thewiki.near.page/near.social"
          >
            <i className="bi bi-wikipedia"></i>
          </a>
        </div>
      </div>
    </div>
    <div className="row mb-3">
      <div>
        <h4>Applications</h4>
        <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "app" }} />
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
