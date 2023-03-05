function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearDevGovGigsContractAccountId: "devgovgigs.near",
    nearDevGovGigsWidgetsAccountId: "devgovgigs.near",
    referral: props.referral,
  };
  return (
    <Widget
      src={`devgovgigs.near/widget/gigs-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function fuzzySearch(items, keyword) {
  if (keyword === "") {
    return items;
  }

  // All common words to be removed from the filter
  const exclude = [
    "a",
    "an",
    "the",
    "and",
    "or",
    "not",
    "is",
    "are",
    "was",
    "were",
  ];

  // turns all keywords to lowercase and splits it up into a list of all the words. Will thene xclude all the common words from above.
  const keywords = keyword
    .toLowerCase()
    .split(" ")
    .filter((keyword) => !exclude.includes(keyword));

  // Filter the items by searching for each keyword in the name or description fields
  const filteredItems = items.filter((item) => {
    const name = item.snapshot.name || "";
    const description = item.snapshot.description || "";

    // Check if any of the keywords match the name or description
    return keywords.some((keyword) => {
      return (
        name.toLowerCase().includes(keyword) ||
        description.toLowerCase().includes(keyword)
      );
    });
  });

  return filteredItems;
}

const posts = Near.view("devgovgigs.near", "get_posts");

const loader = (
  <div className="loader" key={"loader"}>
    <span
      className="spinner-grow spinner-grow-sm me-1"
      role="status"
      aria-hidden="true"
    />
    Loading ...
  </div>
);

if (posts === null) {
  return loader;
}

State.init({
  postIds: fuzzySearch(posts, ""),
  searchTerm: "",
});

const DivContainer = styled.div`
  border: 3px solid #fff;
    padding: 20px;
    float: left;
    width:100%;
`;

const DivChild1 = styled.div`
  width: 75%;
    float: left;
    padding: 20px;
;`;

const DivChild2 = styled.div`
  width: 25%;
    float: left;
    padding: 20px;
;`;

return (
  <div>
    <DivContainer>
      <DivChild1>
        <input onChange={(e) => State.update({ searchTerm: e.target.value })} />
      </DivChild1>
      <DivChild2>
        <button
          onClick={(e) =>
            State.update({ postIds: fuzzySearch(posts, state.searchTerm) })
          }
        >
          {" "}
          Search
        </button>
      </DivChild2>
    </DivContainer>
    {state.postIds
      ? state.postIds.map((item) => {
          return widget(
            `components.posts.Post`,
            {
              id: item.id,
              expandable: true,
              defaultExpanded: false,
            },
            item.id
          );
        })
      : ""}
  </div>
);
