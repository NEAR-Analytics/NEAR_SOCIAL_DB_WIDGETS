// SimpleStart is a homepage for NEAR Social
// designed for ease of use
const myData = Social.get("self.social.near/profile/**", "final") || "testing";

// PROBLEM: this isn't working... how to display my data?
console.log(myData);
console.log(context.accountId);

return (
  <>
    <div className="row mb-3">
      <h2>Welcome to NEAR Social!</h2>
      <p>
        This is the <b>SimpleStart</b> homepage
      </p>
      <p>
        This page is a view -- it is a curated list of widgets which might be
        helpful for you. It is aimed at newbies and devs who want to dive in and
        explore NEAR Social without getting too lost.
      </p>
      <p>
        Each section of this page is made up of individual widgets, which
        present data from the chain. The page itself is a widget that you can
        modify. See the widget source
        <a href="https://near.social/#/erik.near/widget/SimpleStart">here</a>,
        the widget it was forked from{" "}
        <a href="https://near.social/#/mob.near/widget/Welcome">here</a> or
        learn more in{" "}
        <a href="https://thewiki.near.page/near.social_widgets">the wiki</a>.
      </p>

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
      <h4>My Widgets</h4>
      <Widget src="erik.near/widget/MyWidgets" />
    </div>

    <div className="row mb-3">
      <Widget src="mob.near/widget/Applications" />
    </div>
    <div className="row mb-3">
      <Widget src="erik.near/widget/AllWidgetsWithSearch" />
    </div>
    <div className="row mb-3">
      <Widget src="mob.near/widget/People" />
    </div>
    <div className="row mb-3">
      <h4>Debugging Data</h4>
      {myData || "not working yet"}
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
