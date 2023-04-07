const data = fetch(
  "https://api.exm.dev/read/4CbuDUBSiWTKmzq8e5NNFnwqR2Pt5wsuIOXHyvhHzBw",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

console.log(data);

if (data !== null && data.ok === false) {
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
            <h3>{data.profiles.nickname}</h3>
            <p>{data.profiles.address}</p>
          </div>
          <div class="p-2">
            <p>{data.read.profiles.bio}</p>
          </div>
          <div class="p-2">
            Avatar
            <p>{data.profiles.avatar}</p>
          </div>
          <div class="p-2">
            Websites
            <p>{data.profiles.websites}</p>
          </div>
          <div class="p-2">
            Socials
            <p>{data.profiles.socials}</p>
          </div>
          <div class="p-2">
            Admin
            <p>{data.profiles.admin}</p>
          </div>
          <div class="p-2">
            Signature Message
            <p>{data.profiles.sig_message}</p>
          </div>
          <div class="p-2">
            Molecule
            <p>{data.ar_molecule}</p>
          </div>
          <div class="p-2">
            Volume
            <p>{data.signatures}</p>
          </div>
          <div class="p-2">
            Supported Socials
            <p>{data.supported_socials}</p>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
}
