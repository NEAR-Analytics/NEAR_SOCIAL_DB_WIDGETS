const path = props.path || "*/thing/**";
const blockHeight = props.blockHeight || "final";

const value = Social.get(path, blockHeight);

function convertToPaths(obj, parentPath) {
  parentPath = parentPath || "";
  var paths = [];

  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var path = parentPath;
    if (path !== "") {
      path += "/";
    }
    path += key;

    paths.push(path);

    if (typeof obj[key] === "object") {
      var nestedPaths = convertToPaths(obj[key], path);
      paths = paths.concat(nestedPaths);
    }
  }

  return paths;
}

const paths = convertToPaths(value);

const renderThing = (key) => {
  console.log(key);

  return (
    <Widget
      src="efiz.near/widget/Every.Thing.View"
      props={{ path: key, blockHeight }}
    />
  );
};

// <Widget src="efiz.near/widget/Every.Thing.Create" />
// TODO: Infinite Scroll
return (
  <div>
    {paths.map((it) => {
      return <div>{renderThing(it)}</div>;
    })}
  </div>
);
