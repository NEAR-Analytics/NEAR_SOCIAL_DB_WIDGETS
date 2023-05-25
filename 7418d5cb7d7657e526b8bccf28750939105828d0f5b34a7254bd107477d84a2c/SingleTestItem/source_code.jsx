const accountId = context.accountId;

function getCurrentURL() {
  return window.location.href;
}

const currUrl = getCurrentURL();

console.log("currUrl", currUrl);

let item = Social.get(`${accountId}/testPersons/0/**`);
console.log("ITem", item);
return (
  <div>
    <h4>{item.name}</h4>
    <h6>{item.profession}</h6>
    <h6>{item.description}</h6>
  </div>
);
