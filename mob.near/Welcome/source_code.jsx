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
        <h4>Applications</h4>
        <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "app" }} />
      </div>
    </div>
    <div className="row mb-3">
      <div>
        <h4>People</h4>
        <div className="mb-2">
          <Widget
            src="mob.near/widget/ProfileSearch"
            props={{
              limit: 10,
              onChange: ({ result }) => State.update({ profiles: result }),
            }}
          />
        </div>
        {state.profiles && state.profiles.length > 0 && (
          <div className="mb-2">
            {state.profiles.map((profile, i) => (
              <div key={i} className="mb-1">
                <Widget
                  src="mob.near/widget/Profile"
                  props={{ accountId: profile.accountId }}
                />
              </div>
            ))}
            <hr />
          </div>
        )}

        <Widget src="mob.near/widget/LastProfilesImages" />
      </div>
    </div>
    <div className="row mb-3">
      <div>
        <h4>Get involved</h4>
        <div className="mb-2 d-flex gap-2 flex-wrap">
          <a
            className="btn btn-outline-primary"
            href="https://thewiki.near.page/PastPresentAndFutureOfNearSocial"
          >
            What's Near Social?
          </a>
          <a
            className="btn btn-outline-primary"
            href="https://thewiki.near.page/near.social_docs"
          >
            Documentation
          </a>
        </div>
        <div className="mb-2 d-flex gap-2 flex-wrap">
          <a
            className="btn btn-outline-secondary border-0"
            href="#/mob.near/widget/ProfilePage?accountId=self.social.near"
          >
            <i className="bi bi-person-circle"></i>
          </a>
          <a
            className="btn btn-outline-secondary border-0"
            href="https://t.me/NearSocial"
          >
            <i className="bi bi-telegram"></i>
          </a>
          <a
            className="btn btn-outline-secondary border-0"
            href="https://github.com/NearSocial"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            className="btn btn-outline-secondary border-0"
            href="https://twitter.com/NearSocial_"
          >
            <i className="bi bi-twitter"></i>
          </a>
          <a
            className="btn btn-outline-secondary border-0"
            href="https://thewiki.near.page/near.social"
          >
            <i className="bi bi-wikipedia"></i>
          </a>
        </div>
      </div>
    </div>

    <div className="row mb-3">
      <div className="col-md-8">
        <h4>Follow activity</h4>
        <Widget src="mob.near/widget/FollowFeed" />
      </div>
      <div className="col-md-4">
        <h4>Poke activity</h4>
        <Widget src="mob.near/widget/PokeFeed" />
      </div>
    </div>
  </>
);
