const LENS_API_URL = props.testnet
  ? "https://api-mumbai.lens.dev"
  : "https://api.lens.dev";

const ALLOWED_NETWORKS = {
  testnet: {
    id: 80001,
    hex: "0x13881",
  },
  mainnet: {
    id: 137,
    hex: "0x89",
  },
};

const DEFAULT_PROFILE = props.testnet ? "lensprotocol.test" : "lensprotocol";

State.init({
  isConnected: false,
  followed: false,
  profile: null,
  sdk: null,
});

const Box = styled.div`
  position:relative;
  max-width:400px;
  box-sizing:border-box;
  background-color:#181818;
  overflow:hidden;
  border-radius:15px;
  margin:0 auto;
  color:#fff;
  text-align:center;
`;

const BoxCover = styled.div`
  z-index:3;
  position:relative;
  min-height:150px;
  background-color:#fafafa;
  background-size:cover;
  background-position:center;
`;

const BoxProfilePicture = styled.div`
  position:absolute;
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
  width:150px;
  height:150px;
  max-width:150px;
  max-height:150px;
  border-radius:100%;
  overflow:hidden;
  background-color: #181818;
  padding: 7px;
  box-sizing:border-box;
  transform:translateY(50%);
  transition: all .2s;
`;

const ProfilePicture = styled.div`
  position:absolute;
  width:90%;
  height:90%;
  border-radius:100%;
  background-position:center;
  background-size:cover;
  background-color:#fafafa;
`;

const BoxContent = styled.div`
  padding:5rem 1.5rem 1.5rem;
  box-sizing:border-box;
`;

const Overlay = styled.div`
  position:absolute;
  z-index:4;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,.9);
  display:flex;
  align-items:center;
  justify-content:center;
  backdrop-filter: blur(3px);

  button {
    background-color:#843FE9;
    color:#fff;
    font-weight:bold;
    border:0;

    &:hover, &:active {
      background-color:#7D3CDC!important;
    }
  }
`;

const BoxStats = styled.div`
  display:flex;
  justify-content:space-evenly;

  h4 {
    font-size:1rem;
    width:100%;
    text-align:center;
  }
`;

const FollowButton = styled.button`
    margin-top:1rem;
    border:0;
    border-radius:5px;
    padding: .3rem;
    width:100%;
    max-width:100px;
    font-size:.9rem;
    font-weight:bold;
    color:#fff;
    background-color:#7D3CDC;
`;

// Loading styles
const BoxLoading = styled.div`
  position:relative;
  max-width:400px;
  width:100%;
  box-sizing:border-box;
  background-color:rgba(0,0,0,.05);
  overflow:hidden;
  border-radius:15px;
  margin:0 auto;
  color:#fff;
  text-align:center;
`;

const BoxCoverLoading = styled.div`
  z-index:3;
  position:relative;
  min-height:150px;
  width:100%;
  background-color:rgba(0,0,0,.05);
  background-size:cover;
  background-position:center;
`;

const BoxProfilePictureLoading = styled.div`
  position:absolute;
  width:100%;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
  width:100%;
  height:150px;
  max-width:150px;
  max-height:150px;
  border-radius:100%;
  overflow:hidden;
  background-color: #fff;
  padding: 7px;
  box-sizing:border-box;
  transform:translateY(50%);
  transition: all .2s;

  img {
    border-radius:100%;
  }
`;

const BoxContentLoading = styled.div`
  padding:6rem 1.5rem 1.5rem;
  box-sizing:border-box;

  p {
    color:transparent;
    background-color:rgba(0,0,0,.05);
    border-radius:5px;
  }

  h1 {
    color:transparent;
    background-color:rgba(0,0,0,.05);
    border-radius:5px;
  }

`;

const BoxStatsLoading = styled.div`
  display:flex;
  justify-content:space-evenly;

  p {
    color:transparent;
    background-color:rgba(0,0,0,.05);
    border-radius:5px;
  }

  h4 {
    color:transparent;
    background-color:rgba(0,0,0,.05);
    border-radius:5px;
  }
`;

// Get if user follows a profile or not
function isFollowedByMe() {
  state.sdk.isFollowedByMe(state.profile.id).then((payload) => {
    console.log(state.sdk.authenticated);
    let followedStatus =
      payload.status == 200 && payload.body.data.profile.isFollowedByMe;
    State.update({ followed: followedStatus });
  });
}

// Get profile information by Lens handle
function getProfileByHandle(handle) {
  state.sdk.getProfileByHandle(handle).then((payload) => {
    if (payload.body.data.profile) {
      if (payload.body.data.profile.ownedBy.toLowerCase() != state.account) {
        State.update({ profile: payload.body.data.profile });
      }
    } else {
      getProfileByHandle(DEFAULT_PROFILE);
    }
  });
}

// Get profile information by Ethereum address
function getProfileByEthereumAddress(ethereumAddress) {
  state.sdk.getProfileByEthereumAddress(ethereumAddress).then((payload) => {
    let items = payload.body.data.profiles.items;

    if (items.length > 0) {
      getProfileByHandle(items[0].handle);
    } else {
      getProfileByHandle(DEFAULT_PROFILE);
    }
  });
}

// Get profile information depending on the available props
function getProfile() {
  return props.handle
    ? getProfileByHandle(props.handle)
    : getProfileByEthereumAddress(props.ethereumAddress);
}

if (!!state.sdk && !state.profile) {
  getProfile();
}

// Authenticates user in Lens API
function authenticateLens() {
  state.sdk.authenticateLens(
    state.account,
    () => Ethers.provider().getSigner(),
    isFollowedByMe
  );
}

// Follows a profile
function followProfile() {
  state.sdk.followProfile(state.profile.id).then((payload) => {
    State.update({ followed: true });
  });
}

function unfollowProfile() {
  state.sdk.unfollowProfile(state.profile.id).then((payload) => {
    State.update({ followed: !(payload.status == 200) });
  });
}

if (
  props.requireLogin &&
  !!state.profile &&
  state.isConnected &&
  !state.sdk.authenticated
) {
  authenticateLens();
}

// Toggles between following or unfollowing a profile
function toggleFollowedProfile() {
  if (!!state.followed && state.followed) {
    unfollowProfile();
  } else {
    followProfile();
  }
}

// Init
if (state.account === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ account: accounts[0] });
    let provider = Ethers.provider();

    if (!!provider) {
      provider.getNetwork().then((network) => {
        if (network.chainId != getAllowedNetwork().id) {
          State.update({ isConnected: false });
          switchNetwork();
        } else {
          State.update({ isConnected: true });
        }
      });
    }
  }
}

function switchNetwork() {
  try {
    Ethers.send("wallet_switchEthereumChain", [
      { chainId: getAllowedNetwork().hex },
    ]).then((data) => {
      State.update({ isConnected: true });
    });
  } catch (err) {}
}

function getAllowedNetwork() {
  return props.testnet ? ALLOWED_NETWORKS.testnet : ALLOWED_NETWORKS.mainnet;
}

// Displays an overlay if login is required
function getConnectionOverlay() {
  if (!props.requireLogin || !!state.isConnected) return;

  return (
    <>
      <Overlay>
        <Web3Connect connectLabel="Connect wallet"></Web3Connect>
      </Overlay>
    </>
  );
}

// Displays follow button if the user is required to log in
function getFollowButton() {
  if (!props.requireLogin) return;

  return (
    <FollowButton onClick={toggleFollowedProfile}>
      {state.followed ? "Unfollow" : "Follow"}
    </FollowButton>
  );
}

function getProfileSkeleton() {
  return (
    <BoxLoading>
      <BoxCoverLoading>
        <BoxProfilePictureLoading></BoxProfilePictureLoading>
      </BoxCoverLoading>
      <BoxContentLoading>
        <h1>Lens Protocol</h1>
        <p>@lensprotocol</p>
        <p>The social layer of web3</p>
        <br />
        <BoxStatsLoading>
          <h4>Followers</h4>
          <h4>Comments</h4>
          <h4>Posts</h4>
        </BoxStatsLoading>
      </BoxContentLoading>
    </BoxLoading>
  );
}

// Displays cover image if the user has set one
function renderProfile() {
  const coverStyles = {
    "background-image":
      "url(" +
      (!!state.profile.coverPicture
        ? state.profile.coverPicture.original.url.replace(
            "ipfs://",
            "https://ipfs.io/ipfs/"
          )
        : "") +
      ")",
  };

  const profilePicStyles = {
    "background-image":
      "url(" +
      (!!state.profile.picture
        ? state.profile.picture.original.url.replace(
            "ipfs://",
            "https://ipfs.io/ipfs/"
          )
        : "") +
      ")",
  };

  return !state.profile ? (
    getProfileSkeleton()
  ) : (
    <>
      <Box>
        {getConnectionOverlay()}
        <BoxCover style={coverStyles}>
          <BoxProfilePicture>
            <ProfilePicture style={profilePicStyles} />
          </BoxProfilePicture>
        </BoxCover>
        <BoxContent>
          <h1>{state.profile.name}</h1>
          <p>@{state.profile.handle}</p>
          <p>{state.profile.bio}</p>
          <br />
          <BoxStats>
            <h4>
              Followers
              <br />
              {state.profile.stats.totalFollowers}
            </h4>
            <h4>
              Comments
              <br />
              {state.profile.stats.totalComments}
            </h4>
            <h4>
              Posts
              <br />
              {state.profile.stats.totalPosts}
            </h4>
          </BoxStats>
          {!!state.account &&
          !!state.profile &&
          state.account.toLowerCase() != state.profile.ownedBy.toLowerCase()
            ? getFollowButton()
            : ""}
        </BoxContent>
      </Box>
    </>
  );
}

return (
  <div>
    <Widget
      src="mattb.near/widget/LensSDK"
      props={{
        onLoad: (sdk) => State.update({ sdk: sdk }),
        onRefresh: (sdk) => State.update({ sdk: sdk }),
        loaded: !!state.sdk,
        testnet: props.testnet ?? false,
      }}
    />
    {!state.sdk ? "Loading..." : renderProfile()}
  </div>
);
