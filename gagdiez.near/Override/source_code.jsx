const myAcc = "gagdiez.near";

const redirectMap = {};
redirectMap[`${myAcc}/widget/Bye`] = { code: 'return "🔥"' };

return (
  <>
    <Widget
      src={`${myAcc}/widget/Composer`}
      props={{ name: "Anna" }}
      config={{ redirectMap }}
    />
  </>
);
