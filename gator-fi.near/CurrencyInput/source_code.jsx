State.init({
  dialogVisible: false,
  filterInput: "",
  token: null,
  modelValue: "",
});

const token = props.token || state.token;
const setToken = props.setToken || ((x) => State.update({ token: x }));
const modelValue = props.modelValue || state.modelValue;
const setModelValue =
  props.setModelValue || ((x) => State.update({ modelValue: x }));
const autoFocus = props.autoFocus;

const tokenListJson = fetch(
  `https://gist.githubusercontent.com/kizzx2/af1f39667c46a07ae83acf25d3791912/raw/c7244e14940cbf6e0977f95e36fe36d981cf3214/ref-list.json`
).body;
if (!tokenListJson) return "";

const tokenList = JSON.parse(tokenListJson);

const filteredTokenList = tokenList.tokens.filter(
  (x) =>
    x.name.toLowerCase().includes(state.filterInput.toLowerCase()) ||
    x.symbol.toLowerCase().includes(state.filterInput.toLowerCase())
);

function handleTokenSelect(x) {
  State.update({ dialogVisible: false });
  setToken(x);
}

const Styled = styled.div`
.currency-input {
  background: #f7f8fa;
  display: flex;
  border-radius: 16px;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 18px;
}

.currency-input:hover {
    outline: 1px solid lightgray;
}

.currency-input .currency-button-container {
    border-radius: 16px;
    min-width: 120px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 12px;
    padding-right: 12px;
}

.currency-input .currency-button-container:hover {
    background: rgb(206, 208, 217);
}

.currency-input .currency-button-container img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}

.currency-input .currency-button-container .pi.pi-chevron-down {
    font-size: 12px;
    margin-left: 8px;
}

.currency-input input {
    width: 100%;
    flex: 1;
    text-align: right;
    border: none;
    text-align: right;
    background-color: transparent;
    font-size: 28px;
}

.currency-input input:focus, .currency-input input:active {
    outline: none;
}

.currency-input input[type='number'] {
    -moz-appearance: textfield;
}

.currency-input input::-webkit-inner-spin-button,
.currency-input input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.DialogOverlay {
  background: rgba(0 0 0 / 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
}

.DialogContent {
  min-width: 300px;
  background: white;
  padding: 30px;
  border-radius: 4px;
}

.DialogContent .token-search-input-container input {
	width: 100%;
	border: 1px solid lightgray;
	border-radius: 16px;
	padding: 16px;
}

.DialogContent .token-search-input-container input:hover,
.DialogContent .token-search-input-container input:focus {
	border: 1px solid gray;
	outline: none;
}

.DialogContent .token-list {
	height: 480px;
	padding: 0;
}

.DialogContent .token-list .token-list-row {
	display: flex;
	padding-left: 24px;
	padding-right: 24px;
}

.DialogContent .token-list .token-list-row.token-list-row-disabled {
	opacity: 0.5;
}

.DialogContent .token-list .token-list-row:not(.token-list-row-disabled) {
	cursor: pointer;
}

.DialogContent .token-list .token-list-row:not(.token-list-row-disabled):hover {
	background-color: #edeef2;
}

.DialogContent .token-list .token-list-row .token-list-row-img-container {
	width: 24px;
	height: 24px;
	margin-right: 16px;
	margin-top: 16px;
	margin-bottom: 16px;
}

.DialogContent .token-list .token-list-row .token-list-row-img-container img {
	width: 100%;
}

.DialogContent .token-list .token-list-row .token-list-row-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.DialogContent .token-list .token-list-row .token-list-row-info .token-list-row-name {
	color: #6e727d;
}
`;

return (
  <Styled>
    <Dialog.Root
      open={state.dialogVisible}
      onOpenChange={(x) => State.update({ dialogVisible: x })}
    >
      <div className="currency-input">
        <Dialog.Trigger>
          <div class="currency-button-container">
            {token && (
              <>
                <img src={token.logoURI} alt={token.name} />
                {token.symbol}
              </>
            )}
            {!token && <>Select a token</>}
            <i class="pi pi-chevron-down" />
          </div>
        </Dialog.Trigger>
        <input
          placeholder="0.0"
          v-model="modelValue"
          value={modelValue}
          onInput={(e) => setModelValue(e.target.value)}
          type="number"
          min="0.0"
          autoFocus={autoFocus}
        />
      </div>

      <Dialog.Overlay className="DialogOverlay">
        <Dialog.Content className="DialogContent">
          <Dialog.Title>
            <div style={{ width: "100%" }}>
              <h4 class="text-grey-darken-2 mb-3">Select a Token</h4>
              <div class="token-search-input-container">
                <input
                  placeholder="Token Name"
                  autofocus
                  onInput={(e) => State.update({ filterInput: e.target.value })}
                />
              </div>
            </div>
          </Dialog.Title>
          <ul class="token-list">
            {filteredTokenList.map((token) => (
              <li
                class="token-list-row"
                key={token.address}
                onClick={() => handleTokenSelect(token)}
              >
                <div class="token-list-row-img-container">
                  <img src={token.logoURI} />
                </div>
                <div class="token-list-row-info">
                  <div class="token-list-row-symbol">{token.symbol}</div>
                  <div class="token-list-row-name">{token.name}</div>
                </div>
              </li>
            ))}
          </ul>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  </Styled>
);
