const { labels, widgets, onclick } = props;

let elems = [];
for (const i = 0; i < labels.length; i++) {
  const wsrc = widgets[i];

  elems.push(
    <>
      <a
        href="#"
        onClick={(e) => {
          console.log(`clicked ${wsrc}`);
          onclick(wrsc);
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
