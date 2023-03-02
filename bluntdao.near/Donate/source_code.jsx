const donate = () => {
  Near.call(
    "blunt.sputnik-dao.near",
    "donate",
    {},
    "30000000000000",
    "500000000000000000000000"
  );
};

return (
  <div>
    <div>
      <img
        className="Funny stuff"
        height="300px"
        src="https://ipfs.io/ipfs/QmNa2AdhuMEyhuoa4uUd7JhoxUKDivBFeqaxKK4b5AkexK"
        alt="BluntDAO Donate"
      />
    </div>
    <button onClick={donate}>Donate 0.5 NEAR to Blunt Treausrey</button>
  </div>
);
