const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884125 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882276 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884276 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
      fill="white"
    />
  </svg>
);

const iconsDefault = {
  "4691937a7508860f876c9c0a2a617e7d9e945d4b.factory.bridge.near":
    "https://assets.ref.finance/images/woo-wtrue.png",
  "wrap.near": "https://assets.ref.finance/images/w-NEAR-no-border.png",
  NEAR: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTcuNSIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siLz4KPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTcuNSIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC42MDc4IDEyLjUwMjlWMjMuNjE5M0wxNi4yOTIgMTkuMzcyMUwxNi44NjA0IDE5Ljg3MDZMMTIuMDkzOCAyNi41ODQ0QzEwLjMyMjggMjguMjA5MiA3LjE5NzI3IDI3LjEwOTkgNy4xOTcyNyAyNC44NjIyVjExLjEzNzFDNy4xOTcyNyA4LjgxMjI4IDEwLjUwNTggNy43NTMzNCAxMi4yMTMzIDkuNTMxNkwyNS4zODY3IDIzLjI1MDRWMTIuNTkwMkwyMC4yNzEgMTYuMzgxMkwxOS43MDI1IDE1Ljg4MjdMMjMuNzU2NyA5LjYxNTZDMjUuNDQ4OSA3LjgwNDQyIDI4Ljc5NzMgOC44NTM3NiAyOC43OTczIDExLjE5NTNWMjQuNjE2M0MyOC43OTczIDI2Ljk0MTEgMjUuNDg4OCAyOCAyMy43ODEyIDI2LjIyMThMMTAuNjA3OCAxMi41MDI5WiIgZmlsbD0iIzBGMUQyNyIvPgo8L3N2Zz4K",

  "6b175474e89094c44da98b954eedeac495271d0f.factory.bridge.near":
    "https://assets.ref.finance/images/4943.png",
  "berryclub.ek.near": "https://assets.ref.finance/images/banana.png",
  "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near":
    "https://assets.ref.finance/images/825.png",
  "1f9840a85d5af5bf1d1762f925bdaddc4201f984.factory.bridge.near":
    "https://assets.ref.finance/images/7083.png",
  "514910771af9ca656af840dff83e8264ecf986ca.factory.bridge.near":
    "https://assets.ref.finance/images/1975.png",
  "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near":
    "https://assets.ref.finance/images/3408.png",
  "2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near":
    "https://assets.ref.finance/images/3717.png",
  "7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.factory.bridge.near":
    "https://assets.ref.finance/images/7278.png",
  "a0b73e1ff0b80914ab6fe0444e65848c4c34450b.factory.bridge.near":
    "https://assets.ref.finance/images/3635.png",
  "50d1c9771902476076ecfc8b2a83ad6b9355a4c9.factory.bridge.near":
    "https://assets.ref.finance/images/4195.png",
  "4fabb145d64652a948d72533023f6e7a623c7c53.factory.bridge.near":
    "https://assets.ref.finance/images/4687.png",
  "6f259637dcd74c767781e37bc6133cd6a68aa161.factory.bridge.near":
    "https://assets.ref.finance/images/2502.png",
  "6b3595068778dd592e39a122f4f5a5cf09c90fe2.factory.bridge.near":
    "https://assets.ref.finance/images/6758.png",
  "c011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f.factory.bridge.near":
    "https://assets.ref.finance/images/2586.png",
  "c944e90c64b2c07662a292be6244bdf05cda44a7.factory.bridge.near":
    "https://assets.ref.finance/images/6719.png",
  "9f8f72aa9304c8b593d555f12ef6589cc3a579a2.factory.bridge.near":
    "https://assets.ref.finance/images/1518.png",
  "0bc529c00c6401aef6d220be8c6ea1667f6ad93e.factory.bridge.near":
    "https://assets.ref.finance/images/5864.png",
  "c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.factory.bridge.near":
    "https://assets.ref.finance/images/2396.png",
  "0316eb71485b0ab14103307bf65a021042c6d380.factory.bridge.near":
    "https://assets.ref.finance/images/6941.png",
  "111111111117dc0aa78b770fa6a738034120c302.factory.bridge.near":
    "https://assets.ref.finance/images/8104.png",
  "f5cfbc74057c610c8ef151a439252680ac68c6dc.factory.bridge.near":
    "https://assets.ref.finance/images/55sGoBm.png",
  "de30da39c46104798bb5aa3fe8b9e0e1f348163f.factory.bridge.near":
    "https://assets.ref.finance/images/10052.png",
  "a4ef4b0b23c1fc81d3f9ecf93510e64f58a4a016.factory.bridge.near":
    "https://assets.ref.finance/images/4222.png",
  "token.cheddar.near": "https://assets.ref.finance/images/cheddar.png",
  "farm.berryclub.ek.near": "https://assets.ref.finance/images/cucumber.png",
  "d9c2d319cd7e6177336b0a9c93c21cb48d84fb54.factory.bridge.near":
    "https://assets.ref.finance/images/HAPI.png",
};

const { show, handleClose, handleSelect } = props;

const SearchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <circle
      cx="7.19239"
      cy="7.19238"
      r="5.08579"
      transform="rotate(-45 7.19239 7.19238)"
      stroke="#73818B"
      stroke-width="2"
    />
    <path
      d="M10.7891 10.7886L14.3853 14.3848"
      stroke="#73818B"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);
const REF_FI_CONTRACT = "v2.ref-finance.near";

const name = "asadsa";

const getTokenMeta = (token_id) => {
  return Near.view(token_id, "ft_metadata");
};

const globalWhiteList = Near.view(REF_FI_CONTRACT, "get_whitelisted_tokens");

if (!globalWhiteList) return <div />;

const getTokensMeta = async () => {
  if (!globalWhiteList) return {};
  const metaList = globalWhiteList.map((token) => {
    const metadata = getTokenMeta(token);

    return {
      ...metadata,
      id: token,
      icon: iconsDefault[token] || metadata.icon,
    };
  });

  if (metaList)
    return metaList.reduce(
      (acc, cur, i) => {
        return {
          ...acc,
          [globalWhiteList[i]]: {
            ...cur,
          },
        };
      },
      {
        NEAR: {
          id: "NEAR",
          name: "NEAR",
          icon: iconsDefault["NEAR"],
          symbol: "NEAR",
          decimals: 24,
        },
      }
    );
};

const tokensMeta = getTokensMeta();

State.init({
  searchBy: "",
});

const inputOnChange = (e) => {
  const value = e.target.value;
  State.update({
    searchBy: value,
  });
};

const filterFunc = (tokenMeta) => {
  return (
    state.searchBy === "" ||
    tokenMeta.symbol.toLowerCase().includes(state.searchBy.toLowerCase())
  );
};

const TokenLine = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 0px 8px 16px;
    cusort:pointer;
    :hover {
        background: rgb(23,41,46)
    }
`;

const ListContainer = styled.div`
    
    height: 500px;
    overflow: auto;
    ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    border-radius: 3px;
    }

    ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    }

    ::-webkit-scrollbar-thumb {
    background: #2F4D63;
    border-radius: 2px;
    }
`;

const Input = styled.input`
    
    appearance: none;
    outline: none;
    width: 100%;
    background: none;
    border: none;
    color: rgb(115, 129, 139);
    padding: 8px 0px 8px 4px;

    ::placeholder{
        color:#7e8a93
    }
`;

const ModalContainer = styled.div`
    width: 325px;
    border-radius: 12px;
    background: rgb(27, 45, 52);
    color: white;
    padding-top:16px;
    z-index: 999;
    position:fixed;
        top: 15vh;
    left: 50%;
    transform: translateX(-50%);
    padding-bottom: 8px;

    
`;

const Wrapper = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    z-index:99;
    
`;

if (!show) return <div />;

return (
  <>
    <Wrapper
      onClick={() => {
        handleClose();
      }}
    ></Wrapper>
    <ModalContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        class="mx-3"
      >
        <span>Select Token</span>

        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            handleClose();
          }}
        >
          {closeIcon}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #2E4449",
          borderRadius: "12px",
          paddingLeft: "8px",
          marginTop: "8px",
        }}
        class="mx-3"
      >
        {SearchIcon}
        <Input
          class="search-token-input"
          placeholder="Search token..."
          onChange={inputOnChange}
          value={state.searchBy}
        />
      </div>

      <ListContainer>
        {["NEAR", ...globalWhiteList]
          .filter((token_id) => !!filterFunc(tokensMeta[token_id]))
          .map((token_id) => {
            return (
              <TokenLine
                onClick={(e) => {
                  // e.preventDefault();

                  handleSelect(tokensMeta[token_id]);
                  handleClose();
                }}
              >
                <img
                  style={{
                    borderRadius: "100%",
                    height: "36px",
                    width: "36px",
                    marginRight: "4px",
                  }}
                  src={tokensMeta[token_id].icon || iconsDefault[token_id]}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span>{tokensMeta[token_id].symbol}</span>
                  <span
                    style={{
                      color: "#7E8A93",
                      fontSize: "10px",
                    }}
                  >
                    {tokensMeta[token_id].name}
                  </span>
                </div>
              </TokenLine>
            );
          })}
      </ListContainer>
    </ModalContainer>
  </>
);
