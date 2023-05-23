const path = props.path || "*/thing/**";
const blockHeight = props.blockHeight || "final";

const value = Social.get(path, blockHeight);

function convertToPaths(obj, parentPath, currentDepth, maxDepth, lengthLimit) {
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

    if (currentDepth === maxDepth && path.split("/").length === lengthLimit) {
      paths.push(path);
    }

    if (currentDepth < maxDepth && typeof obj[key] === "object") {
      var nestedPaths = convertToPaths(
        obj[key],
        path,
        currentDepth + 1,
        maxDepth,
        lengthLimit
      );
      paths = paths.concat(nestedPaths);
    }
  }

  return paths;
}
const parts = path.split("/");
if (parts[0] !== "*") {
  value = {
    [parts[0]]: { thing: value },
  };
}
const paths = convertToPaths(value, "", 0, 2, 3);

const renderThing = (key) => {
  return (
    <Widget
      src="efiz.near/widget/Every.Thing.View"
      props={{ path: key, blockHeight }}
    />
  );
};
// TODO: Infinite Scroll
return (
  <div>
    {paths.map((it) => {
      return <div>{renderThing(it)}</div>;
    })}
  </div>
);
