const DashboardWrapper = styled.div`
margin: 50px auto;
max-width: 90%; 

`;
const FormWrapper = styled.div`
display: flex;
flex-flow: column;
`;

const ItemsListWrapper = styled.div`

`;
const SingleItem = styled.div`
position: relative;
display: flex;
p {
  margin-right: 20px;
}

`;

const RemoveItemBtn = styled.div`
  position: relative;
  color: red;
  margin-top: 2px;
  width: 22px;
  height: 22px;
  font-size: 22px;
  transform: rotate(45deg);
  cursor: pointer;
 
`;
const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

let items = Social.get(`${accountId}/testWidget/**`);
if (items !== null || items !== undefined) {
  items;
}

const myState = State.init({
  key: "",
  value: "",
  allItems: items ? items : {},
});

function addItem() {
  let currItems = myState.allItems;
  let key = myState.key.replace(/ /g, "-");
  console.log("KEY", key);
  currItems[key] = myState.value;
  State.update({
    key: "",
    value: "",
    allItems: currItems,
  });
  console.log("State final", myState);
}

function removeItemFromState(key) {
  let currItems = myState.allItems;
  delete currItems[key];
  State.update({
    allItems: currItems,
  });
}

return (
  <DashboardWrapper>
    <h1>Existing Items</h1>
    <ItemsListWrapper>
      {Object.entries(myState.allItems).map((item, index) => (
        <SingleItem>
          <p>
            {item[0]} : {item[1]}
          </p>
          <RemoveItemBtn onClick={() => removeItemFromState(item[0])}>
            +
          </RemoveItemBtn>
        </SingleItem>
      ))}
    </ItemsListWrapper>

    <FormWrapper>
      <h1>Add new item: </h1>
      <label for="key">Key: </label>
      <input
        type="text"
        onChange={(e) => State.update({ key: e.target.value })}
        value={myState.key}
        id="key"
      />
      <label for="value">Value: </label>
      <input
        type="number"
        id="value"
        value={myState.value}
        onChange={(e) => State.update({ value: e.target.value })}
      />
      <div>
        <button onClick={addItem}>Add item</button>
        <CommitButton data={{ testWidget: myState.allItems }}>
          Upload data
        </CommitButton>
      </div>
    </FormWrapper>
  </DashboardWrapper>
);
