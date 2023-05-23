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

const EditModal = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;
const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

let items = Social.get(`${accountId}/testWidget/**`);

const myState = State.init({
  key: "",
  value: "",
  allItems: items,
  editKey: "",
  editValue: "",
  isModalOpen: false,
});

if (myState.allItems === null) {
  State.update(
    {
      allItems: items,
    },
    [items]
  );
}

//Add items to the SocialDb
function addItem() {
  let currItems = myState.allItems;
  //If key has space
  let key = myState.key.replace(/ /g, "-");
  currItems[key] = myStatevalue;

  State.update({
    key: "",
    value: "",
    allItems: currItems,
  });
}

function removeItemFromState(key) {
  // const newObjState = myState.allItems;
  // newObjState[key] = null;

  State.update({
    allItems: { ...myState.allItems, [key]: null },
  });
  console.log("newObjState", myState.allItems);
}

function uploadData() {
  Social.set({
    testWidget: myState.allItems,
  });
}

function openModal(item) {
  State.update({
    editKey: item[0],
    editValue: item[1],
    isModalOpen: true,
  });
}

function changeItemInState() {
  const newItems = { ...myState.allItems };
  newItems[myState.editKey] = myState.editValue;
  console.log("newItems", newItems);

  State.update({
    allItems: newItems,
    editKey: "",
    editValue: "",
  });
}
return (
  <DashboardWrapper>
    <EditModal isOpen={myState.isModalOpen}>
      <p>You are editing {myState.editKey}</p>
      <label for="new-value">Value: </label>
      <input
        type="number"
        id="new-value"
        value={myState.editValue}
        onChange={(e) => State.update({ editValue: e.target.value })}
      />
      <button onClick={() => changeItemInState()}>Submit</button>
    </EditModal>
    <h1>Existing Items</h1>
    <ItemsListWrapper>
      {myState.allItems &&
        Object.entries(myState.allItems).map(
          (item, index) =>
            item[1] !== null && (
              <SingleItem>
                <p>
                  {item[0]} : {item[1]}
                </p>
                <RemoveItemBtn onClick={() => removeItemFromState(item[0])}>
                  +
                </RemoveItemBtn>
                <svg
                  onClick={() => openModal(item)}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
                </svg>
              </SingleItem>
            )
        )}
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
        value={myStatevalue}
        onChange={(e) => State.update({ value: e.target.value })}
      />
      <div>
        <button onClick={addItem}>Add item</button>
        <CommitButton data={{ testWidget: myState.allItems }}>
          Upload data
        </CommitButton>
        <button onClick={() => uploadData()}>Upload data</button>
      </div>
    </FormWrapper>
  </DashboardWrapper>
);
