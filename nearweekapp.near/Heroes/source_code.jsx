const contract = "bounties.heroes.near";
const rootUser = "nearweekapp.near";

const bounties = Near.view(contract, "get_bounties", {
  from_index: 0,
  limit: 100,
});

//console.log(bounties);

const res = bounties
  ? bounties
      .slice(0)
      .reverse()
      .map((bounty) => {
        return (
          <Widget
            src={`${rootUser}/widget/Heroes.BountyLine`}
            props={{
              contract: contract,
              bounty: bounty[1],
              id: bounty[0],
              rootUser: rootUser,
            }}
          />
        );
      })
  : null;

return (
  <div>
    <ul
      class="nav nav-pills nav-fill gap-2 p-1 small bg-black rounded-1 shadow-sm"
      id="pillNav2"
      role="tablist"
    >
      <li class="nav-item mt-1 ml-0" role="presentation">
        <img
          src="https://heroes.build/static/media/logo.7de66d6754f94a9f383e.png"
          height="28"
        />{" "}
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active rounded-1 text-warning bg-dark"
          id="home-tab2"
          data-bs-toggle="tab"
          type="button"
          role="tab"
          aria-selected="true"
        >
          All Bounties
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link rounded-1 text-white bg-dark"
          id="profile-tab2"
          data-bs-toggle="tab"
          type="button"
          role="tab"
          aria-selected="false"
        >
          My Bounties (coming soon)
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link rounded-1 text-white bg-dark"
          id="contact-tab2"
          data-bs-toggle="tab"
          type="button"
          role="tab"
          aria-selected="false"
        >
          For inverstors (coming soon)
        </button>
      </li>
    </ul>
    {res !== null ? <div class="mt-3">{res}</div> : <div>Loading ...</div>}
  </div>
);
