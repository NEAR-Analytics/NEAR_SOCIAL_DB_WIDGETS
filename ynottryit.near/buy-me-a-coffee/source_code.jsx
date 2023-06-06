const receiver = "ynottryit.near";

const NEAR_TO_YOCTONEAR_FACTOR = Big("1000000000000000000000000"); // 1e24
let nearAmount = Big(Math.floor(0.05 * 1e2)); // Convert NEAR to a smaller unit that can be handled as an integer
let yoctoNearAmount = nearAmount * NEAR_TO_YOCTONEAR_FACTOR;

let TG_TO_YOCTONEAR_FACTOR = Big("1000000000000"); // 1e12
let TGAmount = Big(300);
let _yoctoNearAmount = TGAmount * TG_TO_YOCTONEAR_FACTOR;

console.log("I am here");
State.init({
  currentDonations: 0,
  totalDonations: 100,
});

const DonateButton = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
`;

const handleButtonClick = () => {
  Near.call([
    {
      contractName: "donation-near-social.near",
      methodName: "donate",
      args: {
        beneficiary: receiver,
      },
      deposit: "100000000000000000000000",
      gas: "200000000000000",
    },
  ]);
};

return (
  <DonateButton id="donateButton">
    <button
      onClick={handleButtonClick}
      style={{ backgroundColor: "transparent", border: "none" }}
    >
      Buy me a coffee
    </button>
  </DonateButton>
);
