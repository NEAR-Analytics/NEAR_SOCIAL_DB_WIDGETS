/*

TUTORIAL

Build your own decentralized frontend!

Step 1: Fork this widget [done]

Step 2: Review code and follow INSTRUCTIONS

Step 3: Complete exercises and save!

Feel free to rename this widget and edit any of the metadata.

We're using a tag property to filter widgets on the page.

INSTRUCTIONS

--> Change the default tag from "guide" to anything!

`Render Preview` to check if any widgets have your tag.

Here are some you can use: #dev, #page, #app

*/

const tag = props.tag ?? "guide";

/*

Review the following code if you are interested in tag filtering.

- maps over widget data to create an array of keys,
(consisting of accountId, widgetName, and blockHeight)
- calls processData function to sort widgets by blockHeight
- maps over sorted widget data to create a list of items to render
- renderTag / renderItem functions are used for each tag / widget

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

const Button = styled.a`
  display: block;
  width: 100%;
  padding: 8px;
  height: 32px;
  background: #FBFCFD;
  border: 1px solid #D7DBDF;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #11181C !important;
  margin: 0;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
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

INSTRUCTIONS

1. Update <Text> with the <b>#tag</b> you input above.

2. Edit <Button href="URL" > with your own link.

3. Adjust featured section by updating the widget paths.

    --> Choose your favorite widgets!

Don't forget to save!

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
      <Button href="/#/edit/hack.near/widget/ForkThis" target="_blank">
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
          props={{ src: "hack.near/widget/ForkThis" }}
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
