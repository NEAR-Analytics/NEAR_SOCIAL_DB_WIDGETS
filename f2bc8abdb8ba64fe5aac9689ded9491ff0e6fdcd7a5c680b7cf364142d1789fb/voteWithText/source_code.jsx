let haveVoted = props.haveVoted;

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
      <>
        <textarea
          value={state.vote}
          onChange={(e) => State.update({ vote: e.target.value })}
        />
        {/*TODO replace with commit button*/}
      </>
    )}
  </div>
);
