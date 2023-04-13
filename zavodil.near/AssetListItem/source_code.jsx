const debug = props.debug ?? false;
const selected = props.selected ?? false;

const css = `
* {
    font-family: 'Inter custom',sans-serif;
}
.asset-item-debug-container{
    background-color: rgb(255, 255, 255);
    width: 100%;
    height: 56px;
    overflow: hidden;
    flex: 1 1 0%;
    position: relative;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
}
.asset-item-container {
    height: 56px;
    width: 100%;
    padding: 4px 20px;
    display: grid;
    grid-template-columns: auto minmax(auto, 1fr) auto minmax(0px, 72px);
    gap: 16px;
    opacity: 1;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
}
.asset-item-container .icon-container {
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
}
.asset-item-container .icon-container .icon {
    opacity: 1;
    position: relative;
    display: flex;
}
.asset-item-container .icon-container .icon img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: radial-gradient(white 60%, rgba(255, 255, 255, 0) calc(70% + 1px));
    box-shadow: white 0px 0px 1px;
}
.asset-item-container .name-container {
    opacity: 1;
    display: grid;
    grid-auto-rows: auto;
}
.asset-item-container .name-container .name-block {
    width: 100%;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
}
.asset-item-container .name-container .name-block .name{
   box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.asset-item-container .name-container .name-block .name-spacer{
    margin-left: 0.3em;
}
.asset-item-container .name-container .ticker-block {
   box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 300;
    font-size: 12px;
    color: rgb(152, 161, 192);
}
.asset-item-container .asset-item-spacer-container{
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
}
.asset-item-container .asset-item-spacer-container .asset-item-spacer{
    width: fit-content;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
}
.asset-item-container .asset-item-balance-container{
    width: fit-content;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
}
.asset-item-container .asset-item-balance-container .asset-item-balance{
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 5rem;
    text-overflow: ellipsis;
}
.asset-item-container.selected{
    pointer-events: none;
    opacity: 0.4;
}
.asset-item-container.active{
    cursor:pointer;
}
.asset-item-container .selected-icon{
    height: 20px;
    width: 20px;
    margin-left: 4px;
    color: rgb(251, 17, 142);
}
`;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}`,
  });
}

const Theme = state.theme;

const tokenId = props.tokenId;
const network = props.network ?? "NEAR";

const onLoad = (assetData) => {
  State.update({ assetData });
};

const assetOnClick = () => {
  if (!selected && props.onClick) {
    props.onClick();
  }
};

const assetData = state.assetData;
return (
  <>
    {!assetData && tokenId && (
      <Widget
        src="zavodil.near/widget/TokenData"
        props={{
          tokenId,
          onLoad,
        }}
      />
    )}

    {assetData && (
      <Theme>
        <div class={debug ? "asset-item-debug-container" : ""}>
          <div
            class={`asset-item-container ${selected ? "selected" : "active"}`}
            onClick={assetOnClick}
          >
            <div class="icon-container">
              <div class="icon">
                <img
                  alt={`${assetData.metadata.name} logo`}
                  src={assetData.metadata.icon}
                />
              </div>
            </div>

            <div class="name-container">
              <div class="name-block">
                <div class="name">{assetData.metadata.name}</div>
                <div class="name-spacer"></div>
              </div>
              <div class="ticker-block">{assetData.metadata.symbol}</div>
            </div>

            <div class="asset-item-spacer-container">
              <div class="asset-item-spacer"></div>
            </div>

            <div class="asset-item-balance-container">
              <div class="asset-item-balance">{assetData.balance_hr}</div>
              {selected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="selected-icon"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
          </div>
        </div>
      </Theme>
    )}
    {debug && <>{JSON.stringify(assetData)}</>}
  </>
);
