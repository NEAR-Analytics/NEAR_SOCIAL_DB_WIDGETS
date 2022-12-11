let haveVoted = props.haveVoted;

console.log(haveVoted);

State.init({ vote: "" });

return (
  <div>
    {haveVoted ? (
      <p
        className="text-primary"
        style={{ textAlign: "center", fontWeight: "500" }}
      >
        You have already voted
      </p>
    ) : (
      <div>
        <textarea
          value={state.vote}
          onChange={(e) => State.update({ vote: e.target.value })}
        />
        {/*TODO replace with commit button*/}
      </div>
    )}
  </div>
);
