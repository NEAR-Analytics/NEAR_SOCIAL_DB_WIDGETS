const DashboardWrapper = styled.div`
margin: 50px auto;
max-width: 90%; 

`;

const ListTitle = styled.h2`
  margin: 20px 0;
`;
const FormWrapper = styled.div`
display: flex;
flex-flow: column;
margin-bottom: 40px;
`;

const ItemsListWrapper = styled.div`
display: block;
  padding-left: 20px;

`;
const SingleItem = styled.div`
position: relative;
display: flex;
opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
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

const EditSvg = styled.svg`
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
  linkValue: "",
  allItems: items ? items : {},
  editKey: "",
  editValue: "",
  isModalOpen: false,
});

console.log(myState);
if (myState.allItems === null) {
  State.update(
    {
      allItems: items,
    },
    [items]
  );
}

//Add items to the local state
function addItem() {
  let currItems = myState.allItems;
  //If key has space
  let key = myState.key.replace(/ /g, "-");
  currItems[key] = { value: myState.value, link: myState.linkValue };

  State.update({
    key: "",
    value: "",
    linkValue: "",
    allItems: currItems,
  });
}

//Remove item from local state
function removeItemFromState(key) {
  State.update({
    allItems: { ...myState.allItems, [key]: null },
  });
  console.log("newObjState", myState.allItems);
}

//Upload data on chain
function uploadData() {
  Social.set({
    testWidget: myState.allItems,
  });
}

//Open modal for editing item from local state
function openModal(item) {
  State.update({
    editKey: item[0],
    editValue: item[1].value,
    isModalOpen: true,
  });
}

//Edit single item in local state
function changeItemInState() {
  const newItems = { ...myState.allItems };
  newItems[myState.editKey] = {
    value: myState.editValue,
    link: "",
  };

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
    <FormWrapper>
      <ListTitle>Add new item: </ListTitle>
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
      <label for="link">Link: </label>
      <input
        type="text"
        id="link"
        value={myState.linkValue}
        onChange={(e) => State.update({ linkValue: e.target.value })}
      />
      <div>
        <button onClick={addItem}>Add item</button>
        <CommitButton
          data={{ testWidget: myState.allItems }}
          onCommit={onCommit}
        >
          Upload data
        </CommitButton>
        {
          // <button onClick={() => uploadData()}>Upload data</button>
        }
      </div>
    </FormWrapper>

    <ListTitle>Existing Items</ListTitle>
    <ItemsListWrapper>
      {myState.allItems &&
        Object.entries(myState.allItems).map((item, index) => (
          <SingleItem isActive={item[1] !== null}>
            <p>
              {item[0]} : {item[1].value}
            </p>
            {item[1] !== null && (
              <RemoveItemBtn onClick={() => removeItemFromState(item[0])}>
                +
              </RemoveItemBtn>
            )}

            <EditSvg
              onClick={() => openModal(item)}
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
            </EditSvg>
          </SingleItem>
        ))}
    </ItemsListWrapper>
  </DashboardWrapper>
);
