return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
    }}
  >
    <h1 style={{ marginBottom: "10px" }}>
      <a
        href="https://marmaj.org/gaming/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        Marma J Gaming
      </a>
    </h1>
    <p
      style={{
        marginBottom: "20px",
        fontSize: "1.3em",
        fontWeight: "bold",
      }}
    >
      EARN TO PLAY Games
    </p>
    <p
      style={{
        marginBottom: "20px",
        width: "100%",
        textAlign: "justify",
      }}
    >
      Explore the crypto-based gaming world of Pixel Dapps where you can
      collaborate artistically with friends, gather your pets for a battle,
      outfit your hero to explore dungeons and take part in raids, and gather an
      army to position yourself as the master tactician.
    </p>
    {/* ... The rest of the content ... */}
    <div style={{ marginBottom: "20px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Pixel Party</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() =>
              window.open("https://pixelparty.marmaj.org/", "_blank")
            }
          >
            PLAY
          </button>
          <button
            onClick={() =>
              window.open("https://testnet.pixelparty.marmaj.org/", "_blank")
            }
            style={{ marginLeft: "10px" }}
          >
            TEST
          </button>
        </div>
      </div>
    </div>
    <div style={{ marginBottom: "20px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Pixel Pets</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() =>
              window.open("https://pd.marmaj.org/pixelpets", "_blank")
            }
          >
            PLAY
          </button>
          <button
            onClick={() =>
              window.open(
                "https://pd-testnet.marmaj.org/pixelpets/testnet.html",
                "_blank"
              )
            }
            style={{ marginLeft: "10px" }}
          >
            TEST
          </button>
        </div>
      </div>
    </div>
    <div style={{ marginBottom: "20px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Crypto Heroes</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() =>
              window.open("https://pd.marmaj.org/cryptoheroes", "_blank")
            }
          >
            PLAY
          </button>
          <button
            onClick={() =>
              window.open(
                "https://pd-testnet.marmaj.org/cryptoheroes/testnet.html",
                "_blank"
              )
            }
            style={{ marginLeft: "10px" }}
          >
            TEST
          </button>
        </div>
      </div>
    </div>
    <div style={{ marginBottom: "20px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Chain Team Tactics</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() =>
              window.open("https://pd.marmaj.org/chainteam", "_blank")
            }
          >
            PLAY
          </button>
          <button
            onClick={() =>
              window.open(
                "https://pd-testnet.marmaj.org/chainteam/testnet.html",
                "_blank"
              )
            }
            style={{ marginLeft: "10px" }}
          >
            TEST
          </button>
        </div>
      </div>
    </div>
  </div>
);
