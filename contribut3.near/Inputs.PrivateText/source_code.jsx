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
      const key = localStorage.getItem("near-api-js:keystore:" + accountId + ":mainnet");
      const keyPair = new nearApi.utils.KeyPairEd25519(key);
      const secretKey = nearApi.utils.PublicKey.fromString(keyPair.secretKey).data;
      const publicKey = keyPair.publicKey.data;
      return { secretKey, publicKey };
    }

    function signMessage(message, secretKey) {
      const signed = sodium.crypto_sign_detached(message, secretKey);
      return sodium.to_hex(signed);
    }

    async function sendRequest(url, body, accountId) {
      const key = getKey(accountId);
      const blockHash = await getBlockHash();
      const message = accountId + "\n" + sodium.to_hex(key.publicKey) + "\n" + blockHash + "\n" + JSON.stringify(body);
      const signature = signMessage(message, key.secretKey);
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Near-Public-Key": sodium.to_hex(key.publicKey),
          "X-Near-Account-Id": accountId,
          "X-Near-Block-Hash": blockHash,
          "X-Near-Signature": signature,
        },
        body: JSON.stringify(body),
      });
      return await result.json();
    }

    window.addEventListener("message", ({ data }) => {
      sodium.ready.then(async function() {
        const { accountId, body, url } = data;
        const result = await sendRequest(url, body, accountId);
        window.top.postMessage(result, "*");
      });
    });

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
