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
  // Convert the keyword to lowercase and split into individual words

  const keywords = keyword.toLowerCase().split(" ");

  // Filter the items by searching for each keyword in the name or description fields
  const filteredItems = items.filter((item) => {
    console.log("item", item);
    // const name = item.snapshot.name.toLowerCase();
    // const description = item.snapshot.description.toLowerCase();

    // // Check if any of the keywords match the name or description
    // return keywords.some((keyword) => {
    //   return name.includes(keyword) || description.includes(keyword);
    // });
  });

  return filteredItems;
}

const posts = Near.view("devgovgigs.near", "get_posts");

if (posts === null) {
  return "";
}

// const test_filter = fuzzySearch(posts, "Lorem ipsum dolor sit amet");

// console.log(test_filter);

State.init({
  searchTerm: "Testing!",
});

const postId = 4;

return (
  <div>
    {state.searchTerm}
    {widget(
      `components.posts.Post`,
      {
        id: postId,
        expandable: true,
        defaultExpanded: false,
      },
      postId
    )}
    <input
      onChange={(e) => {
        State.update({ searchTerm: e.target.value });
      }}
    />
  </div>
);
