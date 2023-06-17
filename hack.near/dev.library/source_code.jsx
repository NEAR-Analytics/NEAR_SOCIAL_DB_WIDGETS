const ownerId = "build.sputnik-dao.near";
const curatedComps = [
  {
    category: "Buttons",
    id: "buttons",
    icon: "bi-egg",
    components: [
      {
        accountId: "mob.near",
        widgetName: "CopyButton",
      },
      {
        accountId: "mob.near",
        widgetName: "CommentButton",
      },
      {
        accountId: "rubycop.near",
        widgetName: "NftVotingButton",
      },
      {
        accountId: "mob.near",
        widgetName: "LikeButton",
      },
      {
        accountId: "mob.near",
        widgetName: "LikeButton.Faces",
      },
      {
        accountId: "mob.near",
        widgetName: "FollowButton",
      },
      {
        accountId: "mob.near",
        widgetName: "NotificationButton",
      },
      {
        accountId: "mob.near",
        widgetName: "PokeButton",
      },
      {
        accountId: "peechz.near",
        widgetName: "TwitterFollowButton",
      },
    ],
  },
  {
    category: "Search",
    icon: "bi-search",
    id: "search",
    components: [
      {
        accountId: "mob.near",
        widgetName: "ComponentSearch",
      },
      {
        accountId: "mob.near",
        widgetName: "ComponentSearch.Item",
      },
      {
        accountId: "manzanal.near",
        widgetName: "SerchComponent",
      },
    ],
  },
  {
    category: "Time and Date",
    id: "time",
    icon: "bi-calendar",
    components: [
      {
        accountId: "mob.near",
        widgetName: "TimeAgo",
      },
    ],
  },
  {
    category: "Compose",
    id: "compose",
    icon: "bi-envelope-paper",
    components: [
      {
        accountId: "mob.near",
        widgetName: "Common.Compose",
      },
    ],
  },
  {
    category: "Markdown",
    id: "markdown",
    icon: "bi-markdown",
    components: [{ accountId: "mob.near", widgetName: "MarkdownEditorDemo" }],
  },
  {
    category: "Metadata",
    id: "metadata",
    icon: "bi-box-seam",
    components: [{ accountId: "mob.near", widgetName: "MetadataEditor" }],
  },
  {
    category: "Widget Tools",
    id: "tools",
    icon: "bi-tools",
    components: [
      { accountId: "mob.near", widgetName: "Explorer" },
      { accountId: "mob.near", widgetName: "WidgetHistory" },
      { accountId: "mob.near", widgetName: "WidgetSource" },
    ],
  },
];
const filterTag = props.commonComponentTag ?? "dev";
const debug = props.debug ?? false;

const searchComponents = () => {
  return (
    <div class="mb-4">
      <div className="mb-2">
        <Widget
          src="mob.near/widget/ComponentSearch"
          props={{
            debug: debug,
            filterTag: filterTag,
            placeholder: "🔍 Search for common components",
            limit: 24,
            onChange: ({ result }) => {
              State.update({ components: result });
            },
          }}
        />
      </div>
      {state.components && (
        <div className="mb-2">
          {state.components.map((comp, i) => (
            <div class="mb-2" key={i}>
              <Widget
                src="mob.near/widget/WidgetMetadata"
                props={{
                  accountId: comp.accountId,
                  widgetName: comp.widgetName,
                  expanded: false,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const renderCategory = (categoryId) => {
  if (!categoryId || categoryId === "") return <></>;
  const item = curatedComps.find((i) => i.id == categoryId);
  return (
    <div class="mt-3">
      <div class="text fs-5 text-muted mb-1" id={item.id}>
        {item.category}
      </div>
      <div class="border border-2 mb-4 rounded"></div>
      <div class="container">
        <div className="row ">
          {item.components.map((comp, i) => (
            <div class="col-6 mb-2">
              <Widget
                key={i}
                src="mob.near/widget/WidgetMetadata"
                props={{
                  accountId: comp.accountId,
                  widgetName: comp.widgetName,
                  expanded: false,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
State.init({
  tab: "home",
  id: "",
});

const renderHome = () => {
  return (
    <>
      {searchComponents()}
      <div class="mt-2">
        <h4>Gallery</h4>
        <p class="text text-muted ">
          A curated list of common components grouped by categories.
        </p>
        <div className="mb-3">
          {curatedComps && (
            <div className="mb-6">
              {curatedComps.map((cat, i) => renderCategory(cat.id))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const onSelect = (selection) => {
  State.update({ tab: selection.tab, id: selection.id ? selection.id : "" });
};

const renderContent = {
  home: renderHome(),
  searchComponents: searchComponents(),
  category: renderCategory(state.id),
}[state.tab];

return (
  <>
    <div class="row">
      <div class="col-md-3">
        <Widget
          src={`manzanal.near/widget/CommonComponentsLibrary.Navbar`}
          props={{
            tab: state.tab,
            onSelect,
            navItems: curatedComps.map((i) => ({
              category: i.category,
              icon: i.icon,
              id: i.id,
            })),
          }}
        />
        <hr className="border-2" />
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ authors: ["manzanal.near"], dep: true }}
        />
      </div>
      <div class="col-md-9">
        {" "}
        <h2>Components Library</h2>
        <p class="text text-muted">
          Building blocks for Near Social applications.
        </p>
        {renderContent}
      </div>
    </div>
  </>
);
