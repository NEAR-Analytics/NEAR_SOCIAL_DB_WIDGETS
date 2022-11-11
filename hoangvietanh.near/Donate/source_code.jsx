const donate = () => {
  Near.call(
    "hoangvietanh.near",
    "donate",
    {},
    "30000000000000",
    "1000000000000000000000000"
  );
};

return (
  <div>
    <div>
      <img
        className="Funny stuff"
        src="https://ipfs.io/ipfs/bafkreieflmjt25nmhquoq3ismslbpjdatqnkcvjkg3bwl5dy5fxemm7mra"
        alt="Hoangvietanh"
      />
    </div>
    <button onClick={donate}>Donate 1 NEAR to hoangvietanh.near</button>
  </div>
);
