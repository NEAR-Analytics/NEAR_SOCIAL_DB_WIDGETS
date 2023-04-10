/*

TUTORIAL

Build your own decentralized frontend!

First, we have to get the accountId for the challenge.

Notice how it checks props, and if that is null or undefined,
it returns user's accountId from the page context.

This helps anyone build experiences on the page.

*/

const accountId = props.accountId ?? context.accountId;

/*

We're also using a tag property to filter widgets on the page.

You can change the default tag from "guide" to anything.

*/

const tag = props.tag ?? "guide";

/*

Defining variables is fun and easy!

This pageUrl helps buttons and links work across gateways.

*/

const pageUrl = "/#/edit/hack.near/widget/ForkThis";

/*

Review the following code section if you are interested in tag filtering.

- initializes the keys variable to a string consisting of accountId (if it exists) or "*" and "/widget/*". This value is used later to fetch widget data.
- checks if a tag value exists. If it does, the code fetches tagged widgets based on accountId and tag.
- maps over the widget data to create an array of keys, consisting of the accountId, widgetName, and blockHeight of each widget.
- fetches the data associated with the keys from the previous step. If the data is not found, the function returns "Loading...". If the data is found, the processData function is called to sort the widget data based on block height.
- maps over the sorted widget data to create a list of widgets to render. Each widget is wrapped in an <a> tag with a URL corresponding to the widget's accountId and widgetName. The renderTag and renderItem functions are used to render each tag and widget.
- checks if the data has changed since the last time it was fetched. If it has, the State.update function is called to update the state with the new data and processed widget items.

No need to make any changes here.

*/

let keys = `${accountId ?? "*"}/widget/*`;

if (tag) {
  const taggedWidgets = Social.keys(
    `${accountId ?? "*"}/widget/*/metadata/tags/${tag}`,
    "final"
  );

  if (taggedWidgets === null) {
    return "Loading tags";
  }

  keys = Object.entries(taggedWidgets)
    .map((kv) => Object.keys(kv[1].widget).map((w) => `${kv[0]}/widget/${w}`))
    .flat();

  if (!keys.length) {
    return `No widgets found with tag #${tag}`;
  }
}

const data = Social.keys(keys, "final", {
  return_type: "BlockHeight",
});

if (data === null) {
  return "Loading...";
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      return Object.entries(account[1].widget).map((kv) => ({
        accountId,
        widgetName: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

const renderTag = (tag, tagBadge) => (
  <a href={makeLink(accountId, tag)}>{tagBadge}</a>
);

const renderItem = (a) => {
  return (
    <a
      href={`#/${a.accountId}/widget/${a.widgetName}`}
      className="text-decoration-none"
      key={JSON.stringify(a)}
    >
      <Widget
        src="mob.near/widget/WidgetImage"
        props={{
          tooltip: true,
          accountId: a.accountId,
          widgetName: a.widgetName,
        }}
      />
    </a>
  );
};

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

/*

Here are a few styled components for you.

These allow using CSS in your JavaScript!

Learn more: https://styled-components.com

*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 48px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #11181c;
  margin: 0;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181c;
  }

  &[href] {
    display: inline-flex;
    gap: 0.25rem;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  height: 32px;
  background: #fbfcfd;
  border: 1px solid #d7dbdf;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #11181c !important;
  margin: 0;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }

  span {
    color: #687076 !important;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Item = styled.div``;

/*

Last, but certainly not least, is the display.

Feel free to make any edits you like!

Adjust your featured section by updating the widget paths.

*/

return (
  <Wrapper>
    <Header>
      <H1>All Guides</H1>
      <Text>
        These particular widgets are tagged with: <b>#guide</b>
      </Text>
      <div className="d-flex flex-wrap gap-1 my-3">
        {state.allItems
          .slice(0, props.limit ? parseInt(props.limit) : 999)
          .map(renderItem)}
      </div>
      <Button href={pageUrl}>
        Getting Started: Fork this Page Demo Widget
      </Button>
    </Header>

    <Text>
      <h3>Featured Tutorials</h3>
      <p>Below are walkthroughs of the page building experience.</p>
    </Text>

    <Items>
      <Item>
        <Widget
          src="adminalpha.near/widget/ComponentCard"
          props={{ src: "hack.near/widget/StartHere" }}
        />
      </Item>
      <Item>
        <Widget
          src="adminalpha.near/widget/ComponentCard"
          props={{ src: "hack.near/widget/Customization" }}
        />
      </Item>
      <Item>
        <Widget
          src="adminalpha.near/widget/ComponentCard"
          props={{ src: "hack.near/widget/SocialPosts" }}
        />
      </Item>
    </Items>
  </Wrapper>
);
