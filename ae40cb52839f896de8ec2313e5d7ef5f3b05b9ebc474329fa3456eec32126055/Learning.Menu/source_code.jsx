const { labels, widgets, onclick } = props;

let elems = [];
for (const i = 0; i < labels.length; i++) {
  elems.push(
    <>
      <a href={`#/${widgets[i]}`}>
        <li
          role="button"
          class="list-group-item"
          onClick={() => {
            onclick(wsrc);
          }}
        >
          {labels[i]}
        </li>
      </a>
    </>
  );
}

return (
  <>
    <ul class="list-group">{elems}</ul>
  </>
);
