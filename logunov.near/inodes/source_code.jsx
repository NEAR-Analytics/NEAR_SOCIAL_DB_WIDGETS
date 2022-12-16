const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const data = Social.get(`${accountId}/scribbles/inode/0`, "final");

if (!data) {
  return "Initialize storage";
}

const widgets = data ? Object.entries(data) : [];
const wrappedWidgets = [];
const maxIndex = -1;
for (let i = 0; i < widgets.length; ++i) {
  const index = widgets[i][0];
  maxIndex = Math.max(maxIndex, index);
  const src = widgets[i][1];
  wrappedWidgets.push(
    <tr border="1">
      <td>{index}</td>
      <td>
        <a href={`#/${src}`}>
          <i>{src}</i>
        </a>
      </td>
    </tr>
  );
}

State.init({ file: null });

function readURL(input) {
  //   var reader = new FileReader();
  console.log(globalThis);
  console.log(input);
  //   reader.onload = function (e) {
  //     $("#blah").attr("src", e.target.result).width(150).height(200);
  //   };
  console.log("Hey!");
  //   reader.readAsDataURL(input.files[0]);
}

return (
  <div>
    {console.log(readURL)}
    <div>{JSON.stringify(state.file)}</div>
    <input
      type="file"
      onChange={(e) => readURL(e)}
      //   onChange={(e) => State.update({ file: e.target.value })}
    />
    <img id="blah" src="#" alt="your image" />
    <input type="submit" value="Submit" />
  </div>
);
