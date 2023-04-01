const owner = Ethers.send("eth_requestAccounts", [])[0];
if (!owner) return "Please connect your Ethereum account on Polygon.";

const lensContract = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";

const lensAbi = fetch(
  "https://raw.githubusercontent.com/dabit3/lens-protocol-frontend/main/abi/lenshub.json"
);

const iface = new ethers.utils.Interface(lensAbi.data.profile);

if (state.lensProfile === undefined) {
  const profile = fetch("https://api.lens.dev/data/profile");
  if (!profile) return;
  State.update({ lensProfile: JSON.parse(data.profile) });
}

const getOwner = () => {
  return !state.owner
    ? ""
    : state.owner.substring(0, 6) +
        "..." +
        state.owner.substring(state.owner.length - 4, state.owner.length);
};

const fetchProfile = () => {
  try {
    const data = client.query(profileByAddress, {
      address: owner,
    });
  } catch (err) {
    console.log("error fetching profile... ", err);
  }
};

return (
  <div>
    <div class="OpticalHeader">
      <h3>Optical ~ Work in Progress</h3>
      <h5>Lens on the bOS!</h5>
    </div>
    <div class="LensProfileContainer">
      {state.owner && (
        <div class="LensProfileTestingContainer">
          <div class="LensProfileTestingName">
            <p>Account: {owner}</p>
            <p>{profile.name || profile.handle}</p>
            <p>{profile.bio}</p>
          </div>
        </div>
      )}
    </div>
  </div>
);
