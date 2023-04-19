const iframeCode = `
  <script src="https://cdn.jsdelivr.net/npm/libsodium@0.7.11/dist/modules/libsodium.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/libsodium-wrappers@0.7.11/dist/modules/libsodium-wrappers.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/near-api-js@2.0.4/dist/near-api-js.min.js" integrity="sha256-KOzR3jJG5npydkwoDZHaUyNi0xKa+qUEYItBetrLiPY=" crossorigin="anonymous"></script>

  <script>
    async function getBlockHash() {
      const connection = await nearApi.connect({
        networkId: "mainnet",
        keyStore: new nearApi.keyStores.InMemoryKeyStore(),
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
      });
      const block = await connection.connection.provider.block({ finality: "final" });
      return block.header.hash;
    }

    function getKey(accountId) {
      return localStorage.getItem("near-api-js:keystore:" + accountId + ":mainnet");
    }

    function sendRequest(url, body, headers) {}

    window.addEventListener("message", ({data}) => {});

    sodium.ready.then(async function() {
      const sk = nearApi.utils.PublicKey.fromString(key.secretKey).data;
      const pk = key.publicKey.data;
      const blockHash = await getBlockHash();
      const body = { win_reason: "devet hiljada" };
      const signed = sodium.crypto_sign_detached(`petarvujovic.near\n${ sodium.to_hex(pk)}\n${ blockHash } \n${ JSON.stringify(body) } `, sk);
      const signature = sodium.to_hex(signed);
      const result = await fetch("http://localhost:3000/encrypt/contribut3.near", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Near-Public-Key": sodium.to_hex(pk),
          "X-Near-Account-Id": "petarvujovic.near",
          "X-Near-Signature": signature,
          "X-Near-Block-Hash": blockHash,
          "Origin": "https://google.com",
        },
        body: JSON.stringify(body),
      });
      const json = await result.json();
      console.log({ json });
      encryptSecretForAccount("petarvujovic.near", "Hello World").then((encrypted) => {
        tryDecrypt(key.secretKey, encrypted).then((decrypted) => {
          console.log({ decrypted });
        });
      });
    });
  </script>
`;
