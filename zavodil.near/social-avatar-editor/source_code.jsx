let appName = "avtr";
let ownerId = "zavodil.near";
let userId = context.accountId;
let contractId = "avtr.near";

const MIN_DEPOSIT = "200000000000000000000000";

if (!userId) {
  return "Please login to generate a Social Avatar";
}

const defaultState = {
  svgBackground: "white",
  background: "black",
  clothing: "graphicShirt",
  clothingColor: "black",
  hairColor: "blonde",
  skin: "pale",
  top: "dreads01",
  accessories: "round",
  clothingGraphic: "skrullOutline",
  clothingGraphicsColor: "red",
  eyes: "default",
  eyebrows: "defaultNatural",
  mouth: "default",
  facialHair: "moustacheMagnum",
  facialHairColor: "auburn",
  hatColor: "heather",
  accessoriesColor: "black",
  avatarLoaded: false,
  paths: null,
};

initState(defaultState);

if (!state.paths) {
  const paths = Social.get(`*/${appName}/**`, "final");

  if (paths) {
    State.update({ paths });
  }

  return "Loading";
}

const whiteList = Object.keys(state.paths[ownerId][appName]["whitelist"]);

let paths = state.paths[ownerId][appName];

whiteList.forEach((accountId) => {
  Object.keys(state.paths[accountId][appName].components ?? {}).forEach(
    (type) => {
      Object.entries(state.paths[accountId][appName].components[type]).forEach(
        (item) => {
          if (item[1].price > 0) {
            item[1].account_id = accountId;
          }
          paths.components[type][item[0]] = item[1];
        }
      );
    }
  );
});

const colors = paths.colors;
const colorsCategories = paths.colors_categories;
const components = paths.components;

if (userId && !state.avatarLoaded) {
  const avatar = Social.get(`${userId}/${appName}/avatar/*`, "final");
  if (avatar) {
    console.log("My avatar", avatar);

    initState({ ...defaultState, ...avatar, ...{ avatarLoaded: true } });
  }
}

let options = {
  background: state.background,
  clothing: state.clothing,
  clothingColor: state.clothingColor,
  hairColor: state.hairColor,
  skin: state.skin,
  top: state.top,
  accessories: state.accessories,
  clothingGraphic: state.clothingGraphic,
  clothingGraphicsColor: state.clothingGraphicsColor,
  eyes: state.eyes,
  eyebrows: state.eyebrows,
  mouth: state.mouth,
  facialHair: state.facialHair,
  facialHairColor: state.facialHairColor,
  hatColor: state.hatColor,
  accessoriesColor: state.accessoriesColor,
  svgBackground: state.svgBackground,
};

let getPrice = (options) => {
  let categories = [
    "clothing",
    "accessories",
    "top",
    "clothingGraphic",
    "eyes",
    "eyebrows",
    "mouth",
    "facialHair",
  ];

  return categories.reduce(
    (sum, category) =>
      new Big(sum)
        .plus(components[category][options[category]].price ?? 0)
        .toString(),
    "0"
  );
};

const YoctoToNear = (amountYocto) =>
  new Big(amountYocto).div(new Big(10).pow(24)).toString();

let depositYocto = getPrice(options);
let depositNear = YoctoToNear(depositYocto);

let itemsMenu = (collection, name) => {
  //console.log("itemsMenu", name, collection);
  let items = Object.keys(collection).map((item) => (
    <option value={item} selected={state[name] == item}>
      {collection[item].name.charAt(0).toUpperCase() +
        collection[item].name.slice(1)}
      {(collection[item].price ?? 0) > 0
        ? ` [${YoctoToNear(collection[item].price)} NEAR]`
        : ""}
    </option>
  ));
  return (
    <select
      class="form-select"
      onChange={(e) => State.update({ [name]: e.target.value })}
    >
      {items}
    </select>
  );
};

let colorsMenu = (collection, name) => {
  let items = Object.keys(collection).map((item) => {
    let color = colors[item];
    return (
      <option value={item} selected={state[name] == item}>
        {color.name.charAt(0).toUpperCase() + color.name.slice(1)}
      </option>
    );
  });
  return (
    <select
      class="form-select"
      onChange={(e) => State.update({ [name]: e.target.value })}
    >
      {items}
    </select>
  );
};

let Mint = () => {
  const gas = 300000000000000;
  const deposit = new Big(depositYocto).plus(MIN_DEPOSIT).toFixed(0); //10000000000000000000000;

  let data = [];
  Object.entries(options).forEach((item) => {
    data.push([
      components[item[0]][item[1]].account_id ?? ownerId,
      item[0],
      item[1],
    ]);
  });

  Near.call(
    contractId,
    "nft_mint",
    {
      receiver_id: userId,
      data,
    },
    gas,
    deposit
  );
};

return (
  <>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 col-s-12 text-center" style={style}>
          <Widget
            src={`${ownerId}/widget/social-avatar-image`}
            props={{ paths, options }}
          />
        </div>

        <div class="col-md-6 col-s-12">
          <div class="text-center">
            <h4>Set your Near.Social Avatar</h4>
          </div>

          <div class="container-fluid">
            <div class="row mt">
              <div class="col">
                <div>Eyes</div>
                {itemsMenu(components.eyes, "eyes")}
              </div>

              <div class="col">
                <div>Eyebrows</div>
                {itemsMenu(components.eyebrows, "eyebrows")}
              </div>

              <div class="col">
                <div>Mouth</div>
                {itemsMenu(components.mouth, "mouth")}
              </div>
            </div>

            <div class="row mt-2">
              <div class="col">
                <div>Top</div>
                {itemsMenu(components.top, "top")}
              </div>

              <div class="col">
                <div>Top color</div>
                {colorsMenu(colorsCategories.palette, "hatColor")}
              </div>
            </div>

            <div class="row mt-2">
              <div class="col">
                <div>Hair color</div>
                {colorsMenu(colorsCategories.hair, "hairColor")}
              </div>

              <div class="col">
                <div>Skin color</div>
                {colorsMenu(colors.skin, "skin")}
              </div>
            </div>

            <div class="row mt-2">
              <div class="col">
                <div>Accessories</div>
                {itemsMenu(components.accessories, "accessories")}
              </div>

              <div class="col">
                <div>Accessories color</div>
                {colorsMenu(colorsCategories.palette, "accessoriesColor")}
              </div>
            </div>

            <div class="row mt-2">
              <div class="col">
                <div>Facial Hair</div>
                {itemsMenu(components.facialHair, "facialHair")}
              </div>

              <div class="col">
                <div>Facial Hair color</div>
                {colorsMenu(colorsCategories.hair, "facialHairColor")}
              </div>
            </div>

            <div class="row mt-2">
              <div class="col">
                <div>Clothing</div>
                {itemsMenu(components.clothing, "clothing")}
              </div>

              <div class="col">
                <div>Clothing color</div>
                {colorsMenu(colorsCategories.palette, "clothingColor")}
              </div>
            </div>

            {state.clothing === "graphicShirt" && (
              <div class="row mt-2">
                <div class="col">
                  <div>Clothing Graphic</div>
                  {itemsMenu(components.clothingGraphic, "clothingGraphic")}
                </div>

                <div class="col">
                  <div>Clothing Graphic color</div>
                  {colorsMenu(
                    colorsCategories.palette,
                    "clothingGraphicsColor"
                  )}
                </div>
              </div>
            )}

            <div class="row mt-2">
              <div class="col">
                <div>Cirle color</div>
                {colorsMenu(colorsCategories.palette, "background")}
              </div>
              <div class="col">
                <div>Background color</div>
                {colorsMenu(colorsCategories.palette, "svgBackground")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-4">
      <div class="row mt-3">
        <div class="col text-center">
          <div>
            <button onClick={Mint}>Mint an NFT</button>
          </div>
          {depositNear > 0 && (
            <div class="pt-2">Total cost: {depositNear} NEAR</div>
          )}
        </div>
      </div>
    </div>
    <div class="border border-3 p-3 mb-4">
      <Widget src={`${ownerId}/widget/owned-social-avatars`} />
    </div>
  </>
);
