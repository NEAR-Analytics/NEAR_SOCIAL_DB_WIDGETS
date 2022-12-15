const peopleYouMayKnow = () => {
  return (
    <>
      <Widget src="roshaan.near/widget/PeopleYouMayKnow" />
    </>
  );
};

const searchFriends = () => {
  return (
    <div className="row mb-3">
      <Widget src="mob.near/widget/People" />
    </div>
  );
};

const playGameToFindFriends = () => {
  return <p className="row mb-3">Coming Soon!</p>;
};

return (
  <>
    <Widget
      src="roshaan.near/widget/tabs"
      props={{
        tab1: searchFriends,
        tab2: peopleYouMayKnow,
        tab3: playGameToFindFriends,
      }}
    />
  </>
);
