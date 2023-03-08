const { labels, links, onClick } = props;

let elems = [];
for (let i = 0; i < labels.length; i++) {
  elems.push(
    <>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick(links[i]);
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
