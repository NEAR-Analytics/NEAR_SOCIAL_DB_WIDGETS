const data = fetch(
  "https://api.exm.dev/read/4CbuDUBSiWTKmzq8e5NNFnwqR2Pt5wsuIOXHyvhHzBw"
);

console.log(data);

const profiles = data.profiles;

console.log("Profiles data:", profiles);

const firstProfile = profiles[0];
const firstProfileNickname = firstProfile.nickname;
const firstProfileBio = firstProfile.bio;

if (data !== null) {
  return (
    <div className="text-bg-light rounded-4 p-3 mb-3">
      <p>ERROR: NO DATA</p>
    </div>
  );
} else {
  return (
    <div className="text-bg-light rounded-4 p-3 mb-3">
      {data !== null ? (
        <div>
          <div class="p-2">
            <h2>Profiles Data</h2>
            <h3>{firstProfileNickname}</h3>
            <p>{profiles.address}</p>
          </div>
          <div class="p-2">
            <p>{profiles.bio}</p>
          </div>
          <div class="p-2">
            Avatar
            <p>{profiles.avatar}</p>
          </div>
          <div class="p-2">
            Websites
            <p>{profiles.websites}</p>
          </div>
          <div class="p-2">
            Socials
            <p>{profiles.socials}</p>
          </div>
          /*
          <div class="p-2">
            Admin
            <p>{admin}</p>
          </div>
          <div class="p-2">
            Signature Message
            <p>{sig_message}</p>
          </div>
          <div class="p-2">
            Molecule
            <p>{ar_molecule}</p>
          </div>
          <div class="p-2">
            Volume
            <p>{signatures}</p>
          </div>
          <div class="p-2">
            Supported Socials
            <p>{supported_socials}</p>
          </div>
          */
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
}
