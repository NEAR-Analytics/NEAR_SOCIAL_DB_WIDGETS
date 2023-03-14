const { labels, widgets, mainApp, disabled } = props;

const disabledClass = disabled ? "disabled" : "";

let elems = [];
for (const i = 0; i < labels.length; i++) {
  elems.push(
    <>
      <a
        class={`btn ${disabledClass} border-0`}
        href={`https://near.social/#/${mainApp}?currentWidget=${widgets[i]}`}
      >
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
