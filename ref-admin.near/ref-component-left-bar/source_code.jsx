const { counts, filters, updateFilters } = props;

State.init({
  showItems: { Chain: true, Infrastructure: true, Dapps: true, NFT: true },
});

const updateTag = (tag) => {
  if (!updateFilters) return;
  let newFilters;
  let index = filters.indexOf(tag);
  if (index === -1) {
    newFilters = [...filters, tag];
  } else {
    newFilters = filters.slice(0, index).concat(filters.slice(index + 1));
  }
  updateFilters(newFilters);
};

let defaultItems = {
  Chain: [
    {
      name: "NEAR",
      chosen: true,
    },
    {
      name: "Ethereum",
      chosen: false,
    },
    {
      name: "Arbitrum",
      chosen: false,
    },
  ],
  Infrastructure: [
    {
      name: "Wallets",
      chosen: false,
    },
    {
      name: "Explorers",
      chosen: false,
    },
    {
      name: "Bridges",
      count: 0,
      chosen: false,
    },
    {
      name: "Expolorers",
      chosen: false,
    },
  ],
  Dapps: [
    {
      name: "Defi",
      chosen: false,
    },
    {
      name: "Liquid staking",
      chosen: false,
    },
    {
      name: "Dex",
      chosen: false,
    },
    {
      name: "Lending",
      chosen: false,
    },
    {
      name: "Derivatives",
      chosen: false,
    },
    {
      name: "Insurance",
      chosen: false,
    },
    {
      name: "Stablecoins",
      chosen: false,
    },
    {
      name: "Yield Aggregators",
      chosen: false,
    },
    {
      name: "Launch Pad",
      chosen: false,
    },
  ],
  NFT: [
    {
      name: "NFT marketplace",
      chosen: false,
    },
    {
      name: "Collectibles",
      chosen: false,
    },
  ],
};

const CheckIcon = (
  <svg
    width="9"
    height="7"
    viewBox="0 0 9 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 2.5L3.5 5L7.5 1"
      stroke="#00FFD1"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

const CheckBase = styled.div`
    width: 13px;
    height: 13px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
        display:flex;
    align-items: center;
    justify-content: center;
    border: ${(p) => (p.checked ? "1px solid #00FFD1" : "")};
`;

const Wrapper = styled.div`
    width: 170px;
    padding-right: 15px;
    color: white;
    font-size: 15px;
    flex-shrink:0;
    margin-right: 30px;
`;

const FirstClassNav = styled.div`

    display:flex;
    align-items: center;
    justify-content: space-between;
    cursor:pointer;
    padding-top: 23px;

`;

const SecondClassNav = styled.div`
    display:flex;
    align-items: center;
    
    cursor:pointer;
    padding-top 15px;

`;

const FlexWrapper = styled.div`

    display:flex;
    align-items: center;

`;

const CountWrapper = styled.div`
    width: 16px;
    height: 16px;
    margin-right: 8px;
    display:flex;
    align-items: center;
    justify-content: center;
    background: #00FFD1;
    border-radius: 10px;
    font-weight: 700;
    font-size: 12px;
    color: #101011;
`;

const Arrow = (
  <svg
    width="12"
    height="6"
    viewBox="0 0 12 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.198688 5.70431C0.501742 6.05295 1.04222 6.10005 1.40589 5.80952L6 2.13929L10.5941 5.80952C10.9578 6.10005 11.4983 6.05295 11.8013 5.70431C12.1044 5.35567 12.0552 4.83752 11.6916 4.54699L6 0L0.308434 4.54699C-0.0552309 4.83752 -0.104366 5.35567 0.198688 5.70431Z"
      fill="currentColor"
    />
  </svg>
);

const ArrowWrapper = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    color:white;
    opacity: ${(p) => (p.show ? 1 : 0.5)};
    transform: ${(p) => (p.show ? "" : "rotate(180deg)")}

`;

console.log(state.showItems);

return (
  <Wrapper>
    {Object.entries(defaultItems).map(([key, value]) => {
      const count = counts[key] || 0;

      return (
        <div>
          <FirstClassNav
            onClick={() => {
              State.update({
                showItems: {
                  ...state.showItems,
                  [key]: !state.showItems[key],
                },
              });
            }}
          >
            <div>{key}</div>

            <FlexWrapper>
              {count > 0 && (
                <CountWrapper>
                  {" "}
                  <span>{count}</span>{" "}
                </CountWrapper>
              )}

              <ArrowWrapper show={!!state.showItems[key]}>{Arrow}</ArrowWrapper>
            </FlexWrapper>
          </FirstClassNav>
          {!!state.showItems[key] &&
            value.map((v) => {
              const chosen = filters.includes(v.name);
              return (
                <SecondClassNav
                  onClick={() => {
                    updateTag(v.name);
                  }}
                >
                  <CheckBase checked={!!chosen}>
                    {!!chosen && CheckIcon}
                  </CheckBase>

                  <div
                    style={{
                      opacity: 0.5,
                      marginLeft: "9px",
                    }}
                  >
                    {v.name}
                  </div>
                </SecondClassNav>
              );
            })}
        </div>
      );
    })}
  </Wrapper>
);
