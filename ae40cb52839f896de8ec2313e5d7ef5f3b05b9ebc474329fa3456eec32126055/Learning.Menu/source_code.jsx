const { labels, widgets, mainApp } = props;

let elems = [];
for (const i = 0; i < labels.length; i++) {
  elems.push(
    <>
      <a href={`https://near.social/#/${mainApp}?currentPage=${widgets[i]}`}>
        <li
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
