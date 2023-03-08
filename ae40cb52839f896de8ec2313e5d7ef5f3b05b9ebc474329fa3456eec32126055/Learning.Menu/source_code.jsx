const { labels, widgets, onclick } = props;

let elems = [];
for (let i = 0; i < labels.length; i++) {
  elems.push(
    <>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onclick(widgets[i]);
          console.log("clicked");
        }}
      >
        <li class="list-group-item"> {labels[i]} </li>{" "}
      </a>
    </>
  );
}

return (
  <>
    <ul class="list-group">{elems}</ul>
  </>
);
