let appName = "avtr";
let ownerId = "zavodil.near";
let userId = context.accountId;

let options;

const defaultOptions = {
  svgBackground: "white",
  background: "magenta",
  clothing: "graphicShirt",
  clothingColor: "black",
  hairColor: "blonde",
  skin: "pale",
  top: "dreads01",
  accessories: "round",
  clothingGraphic: "pizza",
  clothingGraphicsColor: "red",
  eyes: "default",
  eyebrows: "defaultNatural",
  mouth: "default",
  facialHair: "moustacheMagnum",
  facialHairColor: "auburn",
  hatColor: "heather",
  accessoriesColor: "black",
  avatarLoaded: false,
  pathLoaded: false,
};

options = props.options ?? defaultOptions;
options.style = "circle";

let paths = props.paths;

let paths_valid =
  Object.keys(paths.components ?? {}).length > 0 &&
  Object.keys(paths.colors ?? {}).length > 0;

console.log("preloaded paths", paths_valid);

if (!paths_valid && !options.pathLoaded) {
  const _paths = Social.get(`${ownerId}/${appName}/**`, "final");
  if (_paths) {
    paths = _paths;
    options.pathLoaded = true;
  }
}

if (!paths) {
  return "Loading";
}

console.log(paths);

const colors = paths.colors;
const components = paths.components;

const imgAvatar = styled.img`
 @media (max-width: 576px) {
    margin-bottom: 1rem
  }
`;

let getColor = (type, option) => {
  return colors[option].src;
};

let getChildOrDefault = (obj, type, option) => {
  if (typeof obj[type][option] != "undefined") {
    return obj[type][option];
  } else if (["facialHair", "accessories"].includes(type) && option == null) {
    return () => "";
  } else {
    console.log(type, obj, obj[type]);
    return obj[type].default || obj[type][Object.keys(obj[type])[0]];
  }
};

let getTopType = (option) => {
  if (option === "bigHair") {
    return [components.top.bigHair.src, false, 0];
  } else if (option === "bob") {
    return [components.top.bob.src, false, 0];
  } else if (option === "bun") {
    return [components.top.bun.src, false, 1];
  } else if (option === "curly") {
    return [components.top.curly.src, false, 0];
  } else if (option === "curvy") {
    return [components.top.curvy.src, false, 0];
  } else if (option === "dreads") {
    return [components.top.dreads.src, false, 0];
  } else if (option === "frida") {
    return [components.top.frida.src, false, 0];
  } else if (option === "fro") {
    return [components.top.fro.src, false, 0];
  } else if (option === "froAndBand") {
    return [components.top.froAndBand.src, false, 0];
  } else if (option === "miaWallace") {
    return [components.top.miaWallace.src, false, 0];
  } else if (option === "longButNotTooLong") {
    return [components.top.longButNotTooLong.src, false, 0];
  } else if (option === "shavedSides") {
    return [components.top.shavedSides.src, false, 0];
  } else if (option === "straight01") {
    return [components.top.straight01.src, false, 0];
  } else if (option === "straight02") {
    return [components.top.straight02.src, false, 0];
  } else if (option === "straightAndStrand") {
    return [components.top.straightAndStrand.src, false, 0];
  } else if (option === "dreads01") {
    return [components.top.dreads01.src, false, 1];
  } else if (option === "dreads02") {
    return [components.top.dreads02.src, false, 1];
  } else if (option === "frizzle") {
    return [components.top.frizzle.src, false, 1];
  } else if (option === "shaggy") {
    return [components.top.shaggy.src, false, 2];
  } else if (option === "shaggyMullet") {
    return [components.top.shaggyMullet.src, false, 0];
  } else if (option === "shortCurly") {
    return [components.top.shortCurly.src, false, 1];
  } else if (option === "shortFlat") {
    return [components.top.shortFlat.src, false, 1];
  } else if (option === "shortRound") {
    return [components.top.shortRound.src, false, 1];
  } else if (option === "shortWaved") {
    return [components.top.shortWaved.src, false, 1];
  } else if (option === "sides") {
    return [components.top.sides.src, false, 1];
  } else if (option === "theCaesar") {
    return [components.top.theCaesar.src, false, 1];
  } else if (option === "theCaesarAndSidePart") {
    return [components.top.theCaesarAndSidePart.src, false, 1];
  } else if (option === "hat") {
    return [components.top.hat.src, true, 0];
  } else if (option === "winterHat01") {
    return [components.top.winterHat01.src, true, 2];
  } else if (option === "winterHat02") {
    return [components.top.winterHat02.src, true, 2];
  } else if (option === "winterHat03") {
    return [components.top.winterHat03.src, true, 2];
  } else if (option === "winterHat04") {
    return [components.top.winterHat04.src, true, 2];
  } else if (option === "hijab") {
    return [components.top.hijab.src, true, 1];
  } else if (option === "turban") {
    return [components.top.turban.src, true, 1];
  } else if (option === "eyepatch") {
    return [components.top.eyepatch.src, false, 1];
  } else {
    return [components.top.shortWaved.src, false, 1];
  }
};

let getShape = (type, option) => {
  return getChildOrDefault(components, type, option).src;
};

let createAvataaar = (options) => {
  var _a;
  let noseType = components.nose.default.src;
  let skinType = components.skin.default.src;
  let skinColor = getColor("skin", options.skin);
  let [topType, topTypeIsHat, topTypeZIndex] = getTopType(options.top);
  let facialHairType = getShape("facialHair", options.facialHair);
  let facialHairColor = getColor("hair", options.facialHairColor);
  let clotheType = getShape("clothing", options.clothing);

  let clothingGraphic = getShape("clothingGraphic", options.clothingGraphic);

  let clotheColor = getColor("palette", options.clothingColor);
  let clothingGraphicsColor = getColor(
    "palette",
    options.clothingGraphicsColor
  );

  let eyeType = getShape("eyes", options.eyes);
  let eyebrowType = getShape("eyebrows", options.eyebrows);
  let mouthType = getShape("mouth", options.mouth);
  let accessoriesType = getShape("accessories", options.accessories);
  let accessoriesColor = getColor("palette", options.accessoriesColor);
  let hatColor = getColor("palette", options.hatColor);
  let hairColor = getColor("hair", options.hairColor);

  const group = (content, x, y) => {
    return content.length > 0
      ? `<g transform="translate(${x}, ${y})">${content}</g>`
      : "";
  };

  const top = group(
    topType
      .replace("%TOP_COLOR_1%", hatColor)
      .replace("%TOP_COLOR_2%", hairColor),
    7,
    0
  );

  let content = `
      ${group(skinType.replace("%SKIN_COLOR%", skinColor), 40, 36)}
      ${group(
        clotheType
          .replace("%CLOTHING_COLOR_1%", clotheColor)
          .replace("%CLOTHING_GRAPHICS%", clothingGraphic)
          .replaceAll("%CLOTHING_GRAPHICS_COLOR%", clothingGraphicsColor),
        8,
        170
      )}
      ${group(mouthType, 86, 134)}
      ${group(noseType, 112, 122)}
      ${group(eyeType, 84, 90)}
      ${group(eyebrowType, 84, 82)}
      ${0 === topTypeZIndex ? top : ""}
      ${
        facialHairType
          ? group(
              facialHairType.replace("%FACIALHAIR_COLOR_1%", facialHairColor),
              56,
              72
            )
          : ""
      }
      ${1 === topTypeZIndex ? top : ""}
      ${
        accessoriesType
          ? group(
              accessoriesType.replace(
                "%ACCESSORIES_COLOR_1%",
                accessoriesColor
              ),
              69,
              85
            )
          : ""
      }
      ${2 === topTypeZIndex ? top : ""}
    `;

  if (options.style === "circle") {
    // Create random id for the mask, solves bug in rerendering and cutting of half of the image on Firefox
    let mask_id = Math.random().toString(36).substring(7);
    content = `
        ${
          options.svgBackground
            ? `<path fill="${
                options.svgBackground == true
                  ? "#fff"
                  : colors[options.svgBackground].src
              }" d="M0 0h280v280H0z"/>`
            : ""
        }
        <path d="M260 160c0 66.274-53.726 120-120 120S20 226.274 20 160 73.726 40 140 40s120 53.726 120 120z" fill="${
          (_a = options.background) !== null && _a !== undefined // !== void 0
            ? colors[_a].src
            : colors.blue01.src
        }"/>
        <mask id="${mask_id}" maskUnits="userSpaceOnUse" x="8" y="0" width="264" height="280">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M272 0H8v160h12c0 66.274 53.726 120 120 120s120-53.726 120-120h12V0z" fill="#fff"/>
        </mask>
        <g mask="url(#${mask_id})">
          ${content}
        </g>
      `;
  } else if (options.svgBackground) {
    content = `
      <path fill="${
        options.svgBackground == true ? "#fff" : options.svgBackground
      }" d="M0 0h280v280H0z"/>
      ${content}
    `;
  }
  options.background = undefined;
  return `
    <svg ${options.width ? `width="${options.width}"` : ""} ${
    options.height ? `height="${options.height}"` : ""
  } viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${content}
    </svg>
  `;
};

var svg = createAvataaar(options);
svg = svg.replace(/\n/g, "").replace(/\s{2,}/g, " ");

// console.log("svg", svg);

const buff = new Buffer(svg);
const base64data = buff.toString("base64");

return (
  <imgAvatar
    class="img-fluid"
    src={`data:image/svg+xml;base64,${base64data}`}
    alt=""
  />
);
