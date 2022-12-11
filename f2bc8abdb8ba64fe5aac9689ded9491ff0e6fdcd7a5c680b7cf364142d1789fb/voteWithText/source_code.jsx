State.init({ vote: "" });

let thisUserVote = 0;
function userHaveVoted() {
  //TODO validate this to return boolean and if it's true set value to thisUserVote
  return false;
}

return (
  <div>
    <textarea
      value={state.vote}
      onChange={(e) => State.update({ vote: e.target.value })}
    />
    {userHaveVoted() ? (
      <p
        className="text-primary"
        style={{ textAlign: "center", fontWeight: "500" }}
      >
        Voted
      </p>
    ) : (
      <>{/*TODO replace with commit button*/}</>
    )}
  </div>
);
