// TODO - add fixed with of the main button

State.init({ emoji: "👍 Like" });

const clickHandler = () => {
  console.log("Click");
};

return (
  <div>
    <button onClick={clickHandler}>{state.emoji}</button>
    <button onClick={() => State.update({ emoji: "❤️" })}>❤️</button>
    <button onClick={() => State.update({ emoji: "👀" })}>👀</button>
    <button onClick={() => State.update({ emoji: "🙏" })}>🙏</button>
    <button onClick={() => State.update({ emoji: "😁" })}>😁</button>
    <button onClick={() => State.update({ emoji: "👎" })}>👎</button>
    <button onClick={() => State.update({ emoji: "🚀" })}>🚀</button>
    <button onClick={() => State.update({ emoji: "💯" })}>💯</button>
    <button onClick={() => State.update({ emoji: "👍" })}>👍</button>
  </div>
);
