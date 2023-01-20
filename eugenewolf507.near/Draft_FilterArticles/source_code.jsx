const clickHandler = () => {
  const wikiTestData = Social.get("*/wikiTest/**", "final");
  const articles = wikiTestData.acc();
  console.log(wikiTestData);
  //   const accountsSocialDB = Object.keys(wikiTestData);
  //   console.log(accountsSocialDB);
};

return (
  <div>
    <button onClick={clickHandler}>Console.log</button>
  </div>
);
