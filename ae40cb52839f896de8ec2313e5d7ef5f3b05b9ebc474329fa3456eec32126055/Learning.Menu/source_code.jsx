const { labels, widgets, onclick } = props;

let elems = [];
for (const i = 0; i < labels.length; i++) {
  const wsrc = widgets[i];

  elems.push(
    <>
      <li
        role="button"
        class="list-group-item"
        onClick={() => {
          onclick(wsrc);
        }}
      >
        {labels[i]}
      </li>
    </>
  );
}

return (
  <>
    <ul class="list-group">{elems}</ul>
  </>
);
