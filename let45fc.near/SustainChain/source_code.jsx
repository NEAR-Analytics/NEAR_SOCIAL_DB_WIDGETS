const contract = "0xfc238caf851b86137ce56d6f71ec85fc638f0560";

const abiObj = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "", type: "address" },
    ],
    name: "AdminAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "", type: "address" },
    ],
    name: "AdminRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "Log",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "addr", type: "address" },
            ],
            internalType: "struct SupplyChain.Department",
            name: "handler",
            type: "tuple",
          },
          { internalType: "uint256", name: "parent", type: "uint256" },
          {
            internalType: "enum SupplyChain.PackageSnapshotStatus",
            name: "status",
            type: "uint8",
          },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "uint256", name: "created", type: "uint256" },
          { internalType: "bool", name: "exists", type: "bool" },
        ],
        indexed: false,
        internalType: "struct SupplyChain.PackageSnapshot",
        name: "snapshot",
        type: "tuple",
      },
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "PackageSnapshotAdded",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "parent", type: "uint256" },
      {
        internalType: "enum SupplyChain.PackageSnapshotStatus",
        name: "status",
        type: "uint8",
      },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "description", type: "string" },
    ],
    name: "addPackageSnapshot",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "admins",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "makeMeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "makeMeUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "snapshotNumber",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "snapshots",
    outputs: [
      {
        components: [
          { internalType: "address", name: "addr", type: "address" },
        ],
        internalType: "struct SupplyChain.Department",
        name: "handler",
        type: "tuple",
      },
      { internalType: "uint256", name: "parent", type: "uint256" },
      {
        internalType: "enum SupplyChain.PackageSnapshotStatus",
        name: "status",
        type: "uint8",
      },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "uint256", name: "created", type: "uint256" },
      { internalType: "bool", name: "exists", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const iface = new ethers.utils.Interface(abiObj);

const sender = Ethers.send("eth_requestAccounts", [])[0];

const getAdmins = () => {
  const encodedData = iface.encodeFunctionData("admins", [sender]);

  return Ethers.provider()
    .call({
      to: contract,
      data: encodedData,
    })
    .then((result) => {
      return iface.decodeFunctionResult("admins", result)[0];
    });
};

const hexNumberDateToHuman = (hexNumber) => {
  const date = new Date(parseInt(hexNumber, 16) * 1000);
  return date
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/\//g, ".");
};

const getSnapshot = (id) => {
  const encodedData = iface.encodeFunctionData("snapshots", [id]);

  return Ethers.provider()
    .call({
      to: contract,
      data: encodedData,
    })
    .then((result) => {
      const decoded = iface.decodeFunctionResult("snapshots", result);

      const name = decoded.name;
      const description = decoded.description;
      const date = hexNumberDateToHuman(decoded.created);

      return { name, description, date };
    });
};

State.init({
  isLogged: !!sender,
  packageId: 1,
  packageInfo: null,
});

function getBranchById(branches, id) {
  const branch = branches.find((branch) => branch.id === id);

  if (branch) {
    return branch.snapshots;
  }

  return null;
}

function getGql(id) {
  console.log("getGql id", id);
  const response = fetch(
    "https://api.thegraph.com/subgraphs/name/holidayman/ssc-testnet",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          branches(where: {head_: {handler: "0xd36aadb538870b8299246e3787cf1a1deb32e1da"}}) {
          id
            head {
              id
            }
            snapshots {
              id
              name
              description
              created
              handler
              status
              parent {
                id
              }
            }
          }
        }`,
      }),
    }
  );
  if (!response) {
    return null;
  }
  return getBranchById(response.body.data.branches, id);
}

const requestHandler = (request, response, Utils) => {
  switch (request.type) {
    case "is-logged":
      isLoggedHandler(request, response, Utils);
      break;
    case "is-admin":
      isAdminHandler(request, response, Utils);
      break;
    case "get-wallet-address":
      getWalletAddressHandler(request, response, Utils);
      break;
    case "set-print-input":
      setPrintInputHandler(request, response, Utils);
      break;
    case "make-me-admin":
      makeMeAdminHandler(request, response, Utils);
      break;
    case "make-me-user":
      makeMeUserHandler(request, response, Utils);
      break;
    case "create-package":
      createPackageHandler(request, response, Utils);
      break;
    case "create-report":
      createReportHandler(request, response, Utils);
      break;
    case "accept-package":
      acceptPackageHandler(request, response, Utils);
      break;
    case "get-gql-branch":
      getGqlBranchHandler(request, response, Utils);
      break;
  }
};

const getGqlBranchHandler = (request, response, Utils) => {
  console.log("[BOS] get-gql");
  const gqlBranch = getGql(request.payload);
  response(request).send(gqlBranch);
};

const isLoggedHandler = (request, response, Utils) => {
  console.log("[BOS] sender", sender);
  response(request).send(!!sender);
};

const isAdminHandler = (request, response, Utils) => {
  console.log("[BOS] get-admins");
  getAdmins().then((isAdmin) => {
    response(request).send(isAdmin);
  });
};

const getWalletAddressHandler = (request, response, Utils) => {
  console.log("[BOS] get-wallet-address");
  response(request).send(sender);
};

const setPrintInputHandler = (request, response, Utils) => {
  console.log("[BOS] set-print-input");
  State.update({ packageId: request.payload, packageInfo: null });
  response(request).send(true);
};

const makeMeAdminHandler = (request, response, Utils) => {
  console.log("[BOS] make-me-admin");
  const suschain = new ethers.Contract(
    contract,
    abiObj,
    Ethers.provider().getSigner()
  );

  suschain
    .makeMeAdmin()
    .then((result) => {
      console.log("[BOS] make-me-admin result", result);
      response(request).send(true);
    })
    .catch((err) => {
      console.log("[BOS] make-me-admin error", err);
      response(request).send(false);
    });
};

const makeMeUserHandler = (request, response, Utils) => {
  console.log("[BOS] make-me-user");
  const suschain = new ethers.Contract(
    contract,
    abiObj,
    Ethers.provider().getSigner()
  );

  suschain
    .makeMeUser()
    .then((result) => {
      console.log("[BOS] make-me-user result", result);
      response(request).send(true);
    })
    .catch((err) => {
      console.log("[BOS] make-me-user error", err);
      response(request).send(false);
    });
};

const createPackageHandler = (request, response, Utils) => {
  console.log("[BOS] create-package");
  const suschain = new ethers.Contract(
    contract,
    abiObj,
    Ethers.provider().getSigner()
  );

  const { parent, status, name, description } = request.payload;

  suschain
    .addPackageSnapshot(parent, status, name, description)
    .then((result) => {
      result.wait().then((result) => {
        const newSnapshotId = parseInt(result.events[0].args[1]._hex, 16);
        response(request).send({
          ok: true,
          newSnapshotId,
        });
      });
    })
    .catch((err) => {
      console.log("[BOS] create-package error", err);
      response(request).send({ ok: false });
    });
};

const createReportHandler = (request, response, Utils) => {
  console.log("[BOS] create-report");
  const suschain = new ethers.Contract(
    contract,
    abiObj,
    Ethers.provider().getSigner()
  );

  const { parent, reportDescription } = request.payload;

  suschain
    .addPackageSnapshot(parent, 3, "Reported", reportDescription)
    .then((result) => {
      response(request).send(true);
    })
    .catch((err) => {
      console.log("[BOS] create-report error", err);
      response(request).send(false);
    });
};

const acceptPackageHandler = (request, response, Utils) => {
  console.log("[BOS] accept-package");
  const suschain = new ethers.Contract(
    contract,
    abiObj,
    Ethers.provider().getSigner()
  );

  const parent = request.payload;

  suschain
    .addPackageSnapshot(parent, 4, "", "")
    .then((result) => {
      response(request).send(true);
    })
    .catch((err) => {
      console.log("[BOS] accept-package error", err);
      response(request).send(false);
    });
};

const externalAppUrl = "https://sustain-chain.vercel.app/";

const handlePackageIdInput = (e) => {
  State.update({ packageId: e.target.value, packageInfo: null });
};

const handleGetPackageInfo = () => {
  if (state.packageId) {
    getSnapshot(state.packageId).then((result) => {
      State.update({ packageInfo: result });
    });
  }
};

return (
  <>
    {!sender && (
      <Web3Connect
        className="LidoStakeFormSubmitContainer"
        connectLabel="Connect with Web3"
      />
    )}
    <div className="container mb-3">
      <div className="row">
        <div className="col-md-8">
          <div className="form-group">
            <label htmlFor="printIdInput" className="text-danger">
              Input package id
            </label>
            <input
              id="printIdInput"
              type="text"
              placeholder="Package ID"
              value={state.packageId}
              onChange={handlePackageIdInput}
            />
          </div>
        </div>
        <div className="col md-4 d-flex align-items-end">
          {state.packageInfo === null ? (
            <button
              onClick={handleGetPackageInfo}
              className="btn btn-danger me-2"
            >
              ⬇️ Get package info
            </button>
          ) : (
            <a
              href={`${externalAppUrl}create-package/qr-code-creation?id=${state.packageId}&name=${state.packageInfo.name}&description=${state.packageInfo.description}&date=${state.packageInfo.date}`}
              target="_blank"
              className="btn btn-danger me-2"
            >
              🖨 Print package
            </a>
          )}
          <a
            href={externalAppUrl + "scan-package/qr-code-scanning"}
            target="_blank"
            className="btn btn-dark"
          >
            🔎 Scan package
          </a>
        </div>
      </div>
    </div>
    <Widget
      src="wendersonpires.near/widget/NearSocialBridgeCore"
      props={{
        externalAppUrl,
        path: props.path,
        initialViewHeight: 1240,
        initialPayload: {
          packageId: 0,
        },
        requestHandler,
      }}
    />
  </>
);
