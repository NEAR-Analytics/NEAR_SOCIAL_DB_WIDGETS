let appName = "avtr";
let ownerId = "zavodil.near";
let userId = context.accountId;
let contractId = "avtr.near";

const MIN_DEPOSIT = "300000000000000000000000";

if (!userId) {
  return "Please login to generate a Social Avatar";
}

let randomInteger = (max) => {
  return Math.floor(Math.random() * max);
};

let setRandomColors = (
  paths,
  collection,
  color_category,
  used_colors,
  options
) => {
  collection.forEach((color) => {
    while (true) {
      let _color = Object.keys(paths.colors_categories[color_category] ?? {})[
        randomInteger(
          Object.keys(paths.colors_categories[color_category] ?? {}).length
        )
      ];
      if (_color && !used_colors.includes(_color)) {
        options[color] = _color;
        used_colors.push(_color);
        break;
      }
    }
  });
  return { used_colors, options };
};

const RandomAvatar = (paths) => {
  let palette_colors = [
    "svgBackground",
    "background",
    "clothingColor",
    "clothingGraphicsColor",
    "heather",
    "accessoriesColor",
    "hatColor",
  ];
  let hair_colors = ["hairColor", "facialHairColor"];
  let skin_colors = ["skin"];
  let components = [
    "clothing",
    "skin",
    "top",
    "accessories",
    "clothingGraphic",
    "eyes",
    "eyebrows",
    "mouth",
    "facialHair",
  ];

  let data = {
    options: {},
    used_colors: [],
  };

  components.forEach((component) => {
    data.options[component] = Object.keys(paths.components[component])[
      randomInteger(Object.keys(paths.components[component]).length)
    ];
  });

  data = setRandomColors(
    paths,
    palette_colors,
    "palette",
    data.used_colors,
    data.options
  );
  data = setRandomColors(
    paths,
    hair_colors,
    "hair",
    data.used_colors,
    data.options
  );
  data = setRandomColors(
    paths,
    skin_colors,
    "skin",
    data.used_colors,
    data.options
  );

  console.log("random", data.options);

  return data.options;
};

const defaultState = {
  options: {},
  avatarLoaded: false,
  paths: null,
};

initState(defaultState);

if (!state.paths) {
  const paths = Social.get(`*/${appName}/**`, "final");

  if (paths) {
    State.update({
      paths,
      options: RandomAvatar(paths[ownerId][appName]),
    });
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

const colors = paths.colors;
const colorsCategories = paths.colors_categories;
const components = paths.components;
let getPrice = (options) => {
  return categories.reduce(
    (sum, category) =>
      new Big(sum)
        .plus(components[category][options[category]].price ?? 0)
        .toString(),
    "0"
  );
};

let getPaidComponents = (options) => {
  return categories
    .filter((category) =>
      new Big(components[category][options[category]].price).gt(0)
    )
    .map((category) => components[category][options[category]]);
};

const YoctoToNear = (amountYocto) =>
  new Big(amountYocto).div(new Big(10).pow(24)).toString();

let depositYocto = getPrice(state.options);
let depositNear = YoctoToNear(depositYocto);

let paidComponents = getPaidComponents(state.options);

let nextItem = (collection, name) => {
  let keys = Object.keys(collection);
  for (let index = 0; index < keys.length; index++) {
    let item = keys[index];

    if (item == state.options[name]) {
      state.options[name] = keys[index == keys.length - 1 ? 0 : index + 1];
      State.update({
        options: state.options,
      });
      break;
    }
  }
};

let itemsMenu = (collection, name) => {
  //console.log("itemsMenu", name, collection);
  let items = Object.keys(collection).map((item) => (
    <option value={item} selected={state.options[name] == item}>
      {collection[item].name.charAt(0).toUpperCase() +
        collection[item].name.slice(1)}
      {(collection[item].price ?? 0) > 0
        ? ` [${YoctoToNear(collection[item].price)} NEAR]`
        : ""}
    </option>
  ));

  return (
    <div class="input-group mb-3">
      <select
        class="form-select"
        onChange={(e) => {
          let options = state.options;
          if (name == "clothing" && e.target.value != "graphicShirt") {
            options["clothingGraphic"] = "none";
          }
          options[name] = e.target.value;
          State.update({ options });
        }}
      >
        {items}
      </select>
      <button
        class="btn btn-outline-secondary p-2"
        type="button"
        onClick={() => nextItem(collection, name)}
      >
        {">"}
      </button>
    </div>
  );
};

let nextColor = (collection, name) => {
  let keys = Object.keys(collection);
  for (let index = 0; index < keys.length; index++) {
    let item = keys[index];

    let color = colors[item] ?? "";

    if (color && item == state.options[name]) {
      state.options[name] = keys[index == keys.length - 1 ? 0 : index + 1];
      State.update({
        options: state.options,
      });
      break;
    }
  }
};

let colorsMenu = (collection, name) => {
  //console.log("colorsMenu", name, collection);
  let items = [];
  Object.keys(collection).forEach((item) => {
    let color = colors[item] ?? "";
    if (color) {
      items.push(
        <option value={item} selected={state.options[name] == item}>
          {color.name.charAt(0).toUpperCase() + color.name.slice(1)}
        </option>
      );
    }
  });
  return (
    <div class="input-group mb-3">
      <select
        class="form-select"
        onChange={(e) => {
          state.options[name] = e.target.value;
          State.update({ options: state.options });
        }}
      >
        {items}
      </select>
      <button
        class="btn btn-outline-secondary p-2"
        type="button"
        onClick={() => nextColor(collection, name)}
      >
        {">"}
      </button>
    </div>
  );
};

let Mint = () => {
  const gas = 200000000000000;
  const deposit = new Big(depositYocto).plus(MIN_DEPOSIT).toFixed(0);

  let data = [];
  Object.entries(state.options).forEach((item) => {
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

const AvatarDiv = styled.div`
 @media (max-width: 576px) {  
  min-width: 345px;
  min-height: 345px;
  margin-bottom: 1rem;
}
`;

return (
  <>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 col-s-12 text-center">
          <div>
            <AvatarDiv>
              <Widget
                src={`${ownerId}/widget/social-avatar-image`}
                props={{ paths, options: state.options }}
              />
            </AvatarDiv>
          </div>
          <div class="d-block d-sm-none">
            <button
              class="btn btn-outline-primary pt-1 mb-2"
              onClick={() =>
                State.update({
                  options: RandomAvatar(state.paths[ownerId][appName]),
                })
              }
            >
              Random
            </button>
          </div>
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
                {colorsMenu(colorsCategories.skin, "skin")}
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
              <OverlayTrigger
                placement="left"
                overlay={
                  <Tooltip>
                    Choose "Graphic Shirt" for extra graphic options
                  </Tooltip>
                }
              >
                <div class="col">
                  <div>Clothing</div>
                  {itemsMenu(components.clothing, "clothing")}
                </div>
              </OverlayTrigger>

              <div class="col">
                <div>Clothing color</div>
                {colorsMenu(colorsCategories.palette, "clothingColor")}
              </div>
            </div>

            {state.options.clothing === "graphicShirt" && (
              <div class="row mt-2">
                <div class="col">
                  <div>Clothing Graphic</div>
                  {itemsMenu(components.clothingGraphic, "clothingGraphic")}
                </div>

                <div class="col">
                  <div>Graphic color</div>
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
            <button
              class="btn btn-outline-primary"
              onClick={() =>
                State.update({
                  options: RandomAvatar(state.paths[ownerId][appName]),
                })
              }
            >
              Random
            </button>
            <button onClick={Mint}>Mint an NFT</button>
          </div>
          {depositNear > 0 && (
            <div class="pt-2">
              Components cost: {depositNear} NEAR. NFT storage: 0.3 NEAR
            </div>
          )}
          {depositNear == "0" && (
            <div class="pt-2">
              You will be asked to attach 0.3 NEAR for NFT storage
            </div>
          )}
          {paidComponents.length > 0 && (
            <div>
              <ul class="list-group pt-2">
                <h4>Paid components:</h4>
                {paidComponents.map((component) => (
                  <li class="list-group-item">
                    <strong>
                      {component.name.charAt(0).toUpperCase() +
                        component.name.slice(1)}
                    </strong>
                    {YoctoToNear(component.price)} NEAR
                    {component.details ? (
                      <div>{component.details}</div>
                    ) : (
                      <span></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
    <div class="border border-3 p-3 mb-4">
      <Widget src={`${ownerId}/widget/owned-social-avatars`} />
    </div>
    <div class="row pt-2 pb-5 text-center">
      <div class="col">
        <a
          href="/#/zavodil.near/widget/all-social-avatars"
          class="btn btn-outline-success"
        >
          All Social Avatars
        </a>
      </div>
    </div>
  </>
);
