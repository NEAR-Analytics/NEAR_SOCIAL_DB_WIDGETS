const DashboardWrapper = styled.div`
    margin: 50px auto;
    width: 90%;
    max-width: 600px; 
`;

const Header = styled.div`

`;
const AddItemForm = styled.div`
    margin: 50px auto;
    width: 90%;
    max-width: 600px; 
  
`;

const AddUserForm = styled.div`
    margin: 50px auto;
    width: 90%;
    max-width: 600px; 
     
`;

const UserButtonWrapper = styled.div`
  width: 100%;
  height: 80px;
  display: block;
   button {
      margin: 20px 10px 40px;
      float: right;
    }

`;

const AdminsList = styled.div`
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

const EditModalWrapper = styled.div`
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    align-items: flex-start;
    max-width: 600px;
    justify-content: center;
    padding-top: 10%;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    z-index: 100;

`;
const EditModal = styled.div`
    padding: 20px 60px;
    background: #fff;
    max-width: 400px;
    width: 50%;
    
`;

const CloseModal = styled.div`
    position: absolute;
    top: 5%;
    left: 80%;
    color: red;
    margin-top: 2px;
    width: 40px;
    height: 40px;
    font-size: 40px;
    transform: rotate(45deg);
    cursor: pointer;
  `;

const ButtonWapper = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
    button {
        margin-left: 20px;
    }
`;

//Styles ENDED

const accountId = context.accountId;

const contr_id = "widget-progress-table.near";

function chekcIsUserAdmin() {
  return Near.view(contr_id, "is_account_admin", {
    account_id: accountId,
  });
}

function getItems() {
  return Near.view(contr_id, "get_data", `{}`);
}

function getAdmins() {
  return Near.view(contr_id, "get_all_admins", `{}`);
}
if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const myState = State.init({
  key: "",
  value: "",
  linkValue: "",
  allItems: getItems(),
  editKey: "",
  editValue: "",
  editLink: "",
  isModalOpen: false,
  itemFormActive: false,
  userInput: "",
  admins: getAdmins(),
});

if (myState.allItems === null) {
  State.update(
    {
      allItems: getItems(),
      admins: getAdmins(),
    },
    [items]
  );
}

//Add items to the local state
// function addItem() {
//   let currItems = myState.allItems;
//   //If key has space
//   let key = myState.key.replace(/ /g, "-");
//   currItems[key] = { value: myState.value, link: myState.linkValue };

//   State.update({
//     key: "",
//     value: "",
//     linkValue: "",
//     allItems: currItems,
//   });
// }
function addItem() {
  let key = myState.key.replace(/ /g, "-");

  Near.call(contr_id, "set_data", {
    key: key,
    value: parseInt(myState.value),
    link: myState.linkValue,
  });
  State.update({
    key: "",
    value: "",
    linkValue: "",
    allItems: currItems,
  });
}

//Remove item from local state
function removeItemFromState(key) {
  return Near.call(contr_id, "remove_user_item", { key: key });
}

//Open modal for editing item from local state
function openModal(item) {
  State.update({
    editKey: item[0],
    editValue: item[1].value,
    editLink: item[1].link,
    isModalOpen: true,
  });
}

//Edit single item in local state
function changeItemInState() {
  // const newItems = { ...myState.allItems };
  // newItems[myState.editKey] = {
  //   value: myState.editValue,
  //   link: "",
  // };

  Near.call(contr_id, "change_data", {
    key: myState.editKey,
    value: parseInt(myState.editValue),
    link: myState.editLink,
  });
  State.update({
    allItems: newItems,
    editKey: "",
    editValue: "",
    isModalOpen: false,
  });
}
const formatAccountId = (accountId) => {
  if (!accountId.includes(".")) {
    return `${accountId.substring(0, 6)}...${accountId.substring(
      accountId.length - 4,
      accountId.length
    )}`;
  }
  return accountId;
};

//Function related to admin logic
function addAdmin() {
  Near.call(contr_id, "add_whitelisted_account", {
    account: myState.userInput,
    is_admin: true,
  });
  myState.update({
    userInput: "",
  });
}

function removeAdmin() {
  Near.call(contr_id, "remove_admin", {
    accountId: myState.userInput,
  });
  myState.update({
    userInput: "",
  });
}

if (!chekcIsUserAdmin()) {
  return <h1>You dont have permision</h1>;
}
return (
  <DashboardWrapper>
    <Header>
      <button onClick={() => State.update({ itemFormActive: true })}>
        Add New Item
      </button>
      <button onClick={() => State.update({ itemFormActive: false })}>
        Add New Admin
      </button>
    </Header>
    {state.itemFormActive && (
      <AddItemForm>
        <EditModalWrapper isOpen={myState.isModalOpen}>
          <CloseModal onClick={() => State.update({ isModalOpen: false })}>
            +
          </CloseModal>
          <EditModal>
            <p>
              You are editing <strong>{myState.editKey}</strong>
            </p>
            <label for="new-value">Value: </label>
            <input
              type="number"
              id="new-value"
              value={myState.editValue}
              onChange={(e) => State.update({ editValue: e.target.value })}
            />
            <label for="new-link-value">Value: </label>
            <input
              type="text"
              id="new-link-value"
              value={myState.editLink}
              onChange={(e) => State.update({ editLink: e.target.value })}
            />
            <ButtonWapper>
              <button onClick={() => changeItemInState()}>Submit</button>
            </ButtonWapper>
          </EditModal>
        </EditModalWrapper>
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
          <ButtonWapper>
            <button onClick={addItem}>Add item</button>
          </ButtonWapper>
        </FormWrapper>

        <ListTitle>Existing Items</ListTitle>
        <ItemsListWrapper>
          {myState.allItems &&
            Object.entries(myState.allItems)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map((item, index) => (
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
      </AddItemForm>
    )}
    {!state.itemFormActive && (
      <AddUserForm>
        <label for="userInput">Insert Account ID </label>
        <input
          type="text"
          onChange={(e) => State.update({ userInput: e.target.value })}
          value={myState.userInput}
          id="userInput"
        />
        <UserButtonWrapper>
          <button class="btn btn-success" onClick={addAdmin}>
            Add User
          </button>
          <button class="btn btn-danger" onClick={removeAdmin}>
            Remove User
          </button>
        </UserButtonWrapper>

        <AdminsList>
          <h2> Admins: </h2>
          <ul>
            {Object.keys(myState.admins).map((item) => (
              <li>{formatAccountId(item)}</li>
            ))}
          </ul>
        </AdminsList>
      </AddUserForm>
    )}
  </DashboardWrapper>
);
