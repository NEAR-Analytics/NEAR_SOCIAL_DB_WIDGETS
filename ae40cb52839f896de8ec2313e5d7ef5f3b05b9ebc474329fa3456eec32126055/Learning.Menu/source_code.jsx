const { labels, widgets, onclick } = props;

let elems = [];
for (const i = 0; i < labels.length; i++) {
  const wsrc = widgets[i];

  elems.push(
    <>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          console.log(`clicked ${wsrc}`);
          onclick(wsrc);
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
