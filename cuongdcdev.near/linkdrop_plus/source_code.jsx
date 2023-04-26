const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "U need to login first or create new NEAR account here:https://shard.dog/go";
}

const dropInfo = Social.getr(`${accountId}/keypomConfig`);

State.init({
  amount: "0.05",
  drops: "5",
  img: dropInfo.img ?? null,
  desc: dropInfo.desc ?? "",
  publicKeys: [],
  privKeys: [],
});

if (Storage.privateGet("key_list")) {
  let obj = Storage.privateGet("key_list");
  console.log("get from storage", obj);
  State.update({
    publicKeys: obj.publicKeys,
    privKeys: obj.privKeys,
  });
}

const keypomContract = "v2.keypom.near";
const gatewayUrl = "https://near.org/cuongdcdev.near/widget/linkdrop-viewer";

const Yocto2Near = (amount) =>
  new Big(amount).div(new Big(10).pow(24)).toString();

const Near2Yocto = (amount) =>
  new Big(amount).times(new Big(10).pow(24)).toFixed().toString();

const createDrop = () => {
  asyncFetch("https://keypom-generate-keypair.vercel.app/" + state.drops).then(
    (res) => {
      let keyPairs = JSON.parse(res.body);
      console.log("keypairs:", keyPairs);
      let pubKeys = [];
      let privKeys = [];
      keyPairs.forEach((e) => {
        pubKeys.push(e.pub);
        privKeys.push(e.priv);
      });

      let obj = {
        publicKeys: pubKeys,
        privKeys: privKeys,
      };
      State.update(obj);

      Storage.privateSet("key_list", obj);

      console.log(
        "public keys:",
        state.publicKeys,
        "priv keys:",
        state.privKeys
      );

      Near.call([
        {
          contractName: keypomContract,
          methodName: "create_drop",
          gas: "100000000000000",

          args: {
            public_keys: state.publicKeys,
            deposit_per_use: Near2Yocto(state.amount ?? "0.05"),
          },
          deposit: Near2Yocto(state.publicKeys.length * state.amount + 0.3),
        },
      ]);
    }
  );
};

const onChangeValue = (t, v) => {
  State.update({
    [t]: v,
  });
  console.log(t + " : ", v);
};

const getListLink = () => {
  let links = "";
  state.privKeys.map((e, i) => {
    let data = JSON.stringify({ u: accountId, k: e });
    //base64 encoded
    let link =
      gatewayUrl + "?k=" + Buffer.from(data, "utf-8").toString("base64");
    links += link + "   \n   ";
  });

  return links;
};

const saveDropInfo = () => {
  let obj = {
    img: state.img.cid,
    desc: state.desc,
  };
  console.log(obj);
};

return (
  <div className="mb-3 container row">
    <div className="container">
      <h2>Set Linkdrop Info</h2>
      <div className="config-drop">
        Set Linkdrop Image
        <br />
        <IpfsImageUpload image={state.img} />
        <div className="mt-2">
          {state.img && (
            <img
              style={{ maxWidth: 500 }}
              src={`https://ipfs.near.social/ipfs/${
                state.img.cid ?? state.img
              }`}
              alt="uploaded"
            />
          )}
        </div>
        Linkdrop Description (markdown supported)
        <br />
        <textarea
          className="form-control"
          rows="10"
          onChange={(e) => onChangeValue("desc", e.target.value)}
          value={state.desc}
        />
        <Markdown className="mt-3" text={state.desc} />
        <CommitButton
          className="btn btn-info"
          data={{
            keypomConfig: {
              img: state.img.cid ?? state.img,
              desc: state.desc,
            },
          }}
        >
          Save linkdrop info
        </CommitButton>
      </div>
    </div>

    <div className="container mt-5 border-top border-3">
      <h2 className="mt-3">Create new linkdrops</h2>
      <div className="input-field">
        Linkdrop amount:
        <input
          type="number"
          min="1"
          max="50"
          defaultValue="5"
          onChange={(e) => onChangeValue("drops", e.target.value)}
        />
        NEAR per Drop:
        <input
          type="number"
          min="0"
          step="0.01"
          defaultValue="0.05"
          onChange={(e) => onChangeValue("amount", e.target.value)}
        />
        <button
          className="btn btn-lg btn-primary mt-3"
          onClick={(e) => createDrop()}
        >
          Create
        </button>
      </div>
    </div>

    <div className="result-field mt-5 border-top border-3 ">
      <h2 className="mt-3">Results</h2>
      {state.publicKeys.length > 0 && (
        <>
          <button
            className="btn btn-sm btn-dark"
            onClick={() => clipboard.writeText(JSON.stringify(getListLink()))}
          >
            Copy all {state.publicKeys.length} linkdrop to Clipboard
          </button>
        </>
      )}
      <br />
      <small>Make sure to save these links to use later!</small>

      <div className="link-list">
        {state.privKeys.length > 0 &&
          state.privKeys.map((e, i) => {
            // let link =
            //   "https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/" +
            //   e;
            let data = JSON.stringify({ u: accountId, k: e });

            //base64 encoded
            let link =
              gatewayUrl +
              "?k=" +
              Buffer.from(data, "utf-8").toString("base64");

            return (
              <>
                <div class="input-group mb-3">
                  <a
                    class="btn btn-outline-secondary"
                    target="_blank"
                    href={link}
                  >
                    {" "}
                    Drop #{i + 1}
                  </a>{" "}
                  <br />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    onClick={(e) => clipboard.writeText(link)}
                  >
                    Copy
                  </button>
                </div>
              </>
            );
          })}
      </div>
    </div>
  </div>
);
