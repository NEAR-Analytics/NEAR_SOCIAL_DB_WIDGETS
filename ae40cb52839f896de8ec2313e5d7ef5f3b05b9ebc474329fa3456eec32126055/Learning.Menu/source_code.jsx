const { labels, widgets } = props;

const onclick = (src) => {
  console.log(src);
};

let elems = [];
for (const i = 0; i < labels.length; i++) {
  const wsrc = widgets[i];

  elems.push(
    <>
      <a
        href="javascript:void(0);"
        onClick={() => {
          onclick(wsrc);
        }}
      >
        <li class="list-group-item">{labels[i]}</li>
      </a>
    </>
  );
}

return (
  <>
    <ul class="list-group">{elems}</ul>
  </>
);
