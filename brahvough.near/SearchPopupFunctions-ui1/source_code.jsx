const SEARCH_API_KEY = props.searchApiKey ?? "0e42c01107b8f555a41bcc0fa7f2a4df";
const APPLICATION_ID = props.appId ?? "B6PI9UKKJT";
const INDEX = props.index ?? "prod_near-social-feed";
const API_URL =
  props.apiUrl ??
  `https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/${INDEX}/query?`;
const INITIAL_PAGE = props.initialPage ?? 0;
const facets = props.facets ?? ["All", "Users", "Apps", "Posts"];

const showHeader = props.showHeader ?? true;
const showSearchBar = props.showSearchBar ?? true;
const showPagination = props.showPagination ?? true;
const userId = props.accountId ?? context.accountId;

State.init({
  currentPage: 0,
  selectedTab: "All",
});

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const componentsUrl = `/#/calebjacob.near/widget/ComponentsPage`;
const peopleUrl = `/#/calebjacob.near/widget/PeoplePage`;

// Styling Specifications

const typeAheadContainer = {
  width: "513px",
  height: "458px",
  zIndex: "3",
  backgroundColor: "black",
  borderRadius: "10px",
  transform: "translateX(50px)",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  justifyContent: "left",
  alignItems: "left",
  paddingLeft: "0px",
  paddingRight: "0px",
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 600px;
  margin: 0 auto;
  padding-left: 0px;
  padding-right: 0px;
  width: 100%;
`;

const Header = styled.div`

  display: inline-block;
  gap: 12px;
`;

const Facets = styled.div`
  overflow: auto;
  
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #11181c;
  margin: 0;

`;

const FixedTabs = styled.div`
    display: inline-block;
    text-align: left;
    top:16px;
    left:16px;
  `;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #687076;
  margin: 0;

`;

const H3 = styled.h3`
  color: #687076;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-transform: uppercase;
  margin: 0;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
      margin:16px;

`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
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
    color: #006adc;
    outline: none;
    font-weight: 600;

    &:hover,
    &:focus {
      color: #006adc;
      text-decoration: underline;
    }
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Tabs = styled.div`
  display: inline-block;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1200px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin-left: -12px;
    margin-right: -12px;

    > * {
      flex: 1;
    }
  }
`;

const Button = styled.button`
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-weight: 600;
    color: #9799f8;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
            text-align:right


    &:hover {
      color: #9799f8;
    }
  `;

const FixedFooter = styled.div`
    padding: 1rem;
    text-align: right;
    border-top: 1px solid rgba(96, 109, 122, 0.4);
    bottom: 0;
    left: 16px;
    right: 16px;
    text-align:right
    height:56px;
    width: 100%
`;

const TabsButton = styled.a`
  display: inline-block;
  align-items: left;
  justify-content: left;
  height: 100%;
  font-weight: 600;
  font-size: 12px;
  padding: 10px 18px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: left;
  text-decoration: none !important;

  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";x
    display: ${(p) => (p.selected ? "block" : "none")};
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;

const ScrollableContent = styled.div`
    overflow-y: auto;
    flex-grow: 1;
    width:100%;
    height:350px
  `;

const Item = styled.div``;

//*********SEARCH FUNCTIONS ******** */

// Reset Search Results
const resetSearcheHits = () => {
  State.update({
    currentPage: 0,
    search: undefined,
    paginate: undefined,
    facet: undefined,
  });
};

// updates search params as the user enters in a search value
const writeStateTerm = (term) => {
  State.update({
    term,
  });

  if (term === "") {
    resetSearcheHits();
  }
};

// creates an array of profiles
const profiles = (records) => {
  const profiles = [];
  for (const [i, record] of records ?? []) {
    profiles.push({
      accountId: record.author,
      searchPosition: i,
    });
  }
  return profiles;
};

// creates an array of objects that provide the details of the loaded posts
const posts = (content, postType) => {
  const posts = [];
  for (const [i, post] of content || []) {
    const accountId = post.author;
    const blockHeight = post.objectID.split("/").slice(-1)[0];
    const postContent = {
      type: "md",
      text: post.content,
    };
    const headerStyling =
      postType === "post"
        ? "border rounded-4 p-3 pb-1"
        : "pt-3 border-top pb-2";

    posts.push({
      accountId,
      blockHeight,
      postContent,
      postType,
      headerStyling,
      searchPosition: i,
    });
  }
  return posts;
};

// creates an array of components
const components = (records) => {
  const components = [];
  for (const [i, component] of records || []) {
    const idParts = component.objectID.split("/");
    const widgetName = idParts[idParts.length - 1];
    const accountId = component.author;
    components.push({
      accountId,
      widgetName,
      searchPosition: i,
    });
  }
  return components;
};

const categorizeSearchHits = (rawResp) => {
  const results = {};
  for (const [i, result] of rawResp.hits?.entries()) {
    const { categories: categories_raw } = result;
    if (categories_raw.length > 1) {
      categories_raw.sort();
    }

    const categories = categories_raw.join(", ");
    results[categories] = results[categories] || [];
    results[categories].push([i + 1, result]);
  }
  return {
    results,
    hitsTotal: rawResp.nbHits,
    hitsPerPage: rawResp.hitsPerPage,
  };
};

const debounce = (callable, timeout) => {
  return (args) => {
    clearTimeout(state.timer);
    State.update({
      timer: setTimeout(() => callable(args), timeout ?? 50),
    });
  };
};

const fetchSearchHits = (query, { pageNumber, configs, optionalFilters }) => {
  configs = configs ?? configsPerFacet(state.facet);
  let body = {
    query,
    page: pageNumber ?? 0,
    hitsPerPage: rawResp.hitsPerPage,
    optionalFilters: optionalFilters ?? [
      "categories:profile<score=3>",
      "categories:widget<score=2>",
      "categories:post<score=1>",
      "categories:comment<score=0>",
    ],
    clickAnalytics: true,
    ...configs,
  };
  return asyncFetch(API_URL, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "X-Algolia-Api-Key": SEARCH_API_KEY,
      "X-Algolia-Application-Id": APPLICATION_ID,
    },
    method: "POST",
  });
};

const updateSearchHits = debounce(({ term, pageNumber, configs }) => {
  fetchSearchHits(term, { pageNumber, configs }).then((resp) => {
    const { results, hitsTotal, hitsPerPage } = categorizeSearchHits(resp.body);
    const totalCount =
      profiles(results["profile"]).length +
      components(results["widget"]).length +
      posts(results["post"], "post").concat(
        posts(results["comment, post"], "comment")
      ).length;
    State.update({
      search: {
        profiles: profiles(results["profile"]),
        components: components(results["widget"]),
        postsAndComments: posts(results["post"], "post").concat(
          posts(results["comment, post"], "comment")
        ),
        totalCount: totalCount,
      },
      currentPage: 0,
      paginate: {
        hitsTotal,
        hitsPerPage,
      },
      queryID: resp.body.queryID,
    });
  });
}, 300);

const onSearchChange = ({ term }) => {
  writeStateTerm(term);
  updateSearchHits({ term, pageNumber: INITIAL_PAGE });
};

const onPageChange = (pageNumber) => {
  const algoliaPageNumber = pageNumber - 1;
  if (algoliaPageNumber === state.currentPage) {
    console.log(`Selected the same page number as before: ${pageNumber}`);
    return;
  }
  // Need to clear out old search data otherwise we'll get multiple entries
  // from the previous pages as well. Seems to be cache issue on near.social.
  State.update({
    search: undefined,
    currentPage: algoliaPageNumber,
  });
  updateSearchHits({ term: state.term, pageNumber: algoliaPageNumber });
};

const FACET_TO_CATEGORY = {
  Users: "profile",
  Apps: "app",
  Components: "widget",
  Posts: "post",
};

const searchFilters = (facet) => {
  const category = FACET_TO_CATEGORY[facet];
  let filters = category ? `categories:${category}` : undefined;
  if (category === "post") {
    filters = `(${filters} OR categories:comment)`;
  }
  if (category === "app") {
    filters = `(${filters} OR tags:app)`;
  }
  if (filters) {
    filters = `${filters} AND `;
  }
  filters = `${filters}NOT author:hypefairy.near AND NOT _tags:hidden`;

  return filters;
};

const restrictSearchable = (facet) => {
  const category = FACET_TO_CATEGORY[facet];
  let restrictSearchableAttrs = undefined;
  if (category === "post") {
    // Only the content should be searchable when the posts facet is selected.
    restrictSearchableAttrs = ["content"];
  }
  return restrictSearchableAttrs;
};

const configsPerFacet = (facet) => {
  return {
    filters: searchFilters(facet),
    restrictSearchableAttributes: restrictSearchable(facet),
  };
};
const onFacetClick = (facet) => {
  if (facet === state.selectedTab) {
    return;
  }

  State.update({
    selectedTab: facet,
  });

  displayResultsByFacet(facet);
};
const onSearchResultClick = ({ searchPosition, objectID, eventName }) => {
  const position =
    searchPosition + state.currentPage * state.paginate.hitsPerPage;
  const event = {
    type: "clickedObjectIDsAfterSearch",
    data: {
      eventName,
      userToken: userId.replace(".", "+"),
      queryID: state.queryID,
      objectIDs: [objectID],
      positions: [position],
      timestamp: Date.now(),
    },
  };

  // Deferred due to State.update causing multiple clicks to be needed
  // before the browser redirect to the page the user clicks on.
  setTimeout(() => {
    // This will trigger the Insights widget:
    State.update({ event });
  }, 50);
};

const topTwoAccounts = () => {
  const twoEl = state.search.profiles.slice(0, 2) ?? [];

  return twoEl.map((profile, i) => (
    <Item key={profile.accountId}>
      <Widget
        src="dorgon108.near/widget/AccountProfileCard"
        props={{
          accountId: profile.accountId,
          onClick: () =>
            onSearchResultClick({
              searchPosition: profile.searchPosition,
              objectID: `${profile.accountId}/profile`,
              eventName: "Clicked Profile After Search",
            }),
        }}
      />
    </Item>
  ));
};

const topTwoComponents = () => {
  const topTwoComponentsArray = [
    state.search.components[0],
    state.search.components[1],
  ];

  return topTwoComponentsArray.map((component, i) => (
    <Item key={component.accountId + component.widgetName}>
      <Widget
        src="dorgon108.near/widget/ComponentCard"
        props={{
          src: `${component.accountId}/widget/${component.widgetName}`,
          onClick: () =>
            onSearchResultClick({
              searchPosition: component.searchPosition,
              objectID: `${component.accountId}/widget/${component.widgetName}`,
              eventName: "Clicked Component After Search",
            }),
        }}
      />
    </Item>
  ));
};

const topTwoComments = () => {
  const twoCommentsArray = [
    state.search.postsAndComments[0],
    state.search.postsAndComments[1],
  ];

  return twoCommentsArray.map((post, i) => (
    <Item key={`${post.accountId}/${post.postType}/${post.blockHeight}`}>
      {console.log("the content is", JSON.stringify(post.postContent))}
      <Widget
        src="dorgon108.near/widget/SearchPost"
        props={{
          accountId: post.accountId,
          blockHeight: post.blockHeight,
          content: post.postContent,
          term: props.term,
        }}
      />
    </Item>
  ));
};

const displayResultsByFacet = (selectedTab) => {
  switch (selectedTab) {
    case "Users":
      return state.search?.profiles.length > 0 ? (
        <Group>
          <GroupHeader>
            <H3>
              Users
              <span
                style={{
                  marginLeft: "10px",
                }}
              >
                {` ${state.search?.profiles.length ?? 0}`}
              </span>{" "}
            </H3>
          </GroupHeader>

          <Items>{topTwoAccounts()}</Items>
        </Group>
      ) : (
        <div>No Users Found</div>
      );
    case "Apps":
    // return Apps results
    case "Components":
      return state.search?.components.length > 0 ? (
        <Group>
          <GroupHeader>
            <H3>
              Components{" "}
              <span
                style={{
                  marginLeft: "10px",
                }}
              >
                {` ${state.search?.components.length ?? 0}`}
              </span>{" "}
            </H3>
          </GroupHeader>

          <Items>{topTwoComponents()}</Items>
        </Group>
      ) : (
        <div>No Components Found</div>
      );
    case "Posts":
      return state.search?.postsAndComments.length > 0 ? (
        <Group style={{ marginTop: "20px" }}>
          <GroupHeader>
            <H3>
              Posts and Comments
              <span
                style={{
                  marginLeft: "10px",
                }}
              >
                {` ${state.search?.postsAndComments.length ?? 0}`}
              </span>{" "}
            </H3>
          </GroupHeader>

          <Items>{topTwoComments()}</Items>
        </Group>
      ) : (
        <div>No Users Found</div>
      );
    case "All":
      return (
        <>
          {state.search?.profiles.length > 0 && (
            <Group>
              <GroupHeader>
                <H3>
                  Users
                  <span
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    {` ${state.search?.profiles.length ?? 0}`}
                  </span>{" "}
                </H3>
              </GroupHeader>
              <Items>{topTwoAccounts()}</Items>
            </Group>
          )}
          {state.search?.components.length > 0 && (
            <Group>
              <GroupHeader>
                <H3>
                  Components{" "}
                  <span
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    {` ${state.search?.components.length ?? 0}`}
                  </span>{" "}
                </H3>
              </GroupHeader>
              <Items>{topTwoComponents()}</Items>
            </Group>
          )}
          {state.search?.postsAndComments.length > 0 && (
            <Group style={{ marginTop: "20px" }}>
              <GroupHeader>
                <H3>
                  Posts and Comments
                  <span
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    {` ${state.search?.postsAndComments.length ?? 0}`}
                  </span>{" "}
                </H3>
              </GroupHeader>
              <Items>{topTwoComments()}</Items>
            </Group>
          )}
        </>
      );
  }
};

if (props.term !== state.lastSyncedTerm) {
  State.update({
    lastSyncedTerm: props.term,
  });
  onSearchChange({ term: props.term });
}

return (
  <div style={typeAheadContainer}>
    <Wrapper>
      {state.search && (
        <FixedTabs>
          <Widget
            src="dorgon108.near/widget/Facets"
            props={{
              facets,
              onFacetClick,
              defaultFacet: facets[0],
            }}
          />
        </FixedTabs>
      )}
      <ScrollableContent>
        {state.paginate?.hitsTotal == 0 && (
          <H2>No matches were found for "{state.term}".</H2>
        )}
        {console.log("the result is", state.selectedTab)}
        {displayResultsByFacet(state.selectedTab)}
      </ScrollableContent>

      <FixedFooter>
        <a
          href={`https://alpha.near.org/chaotictempest.near/widget/Search?term=${props.term}`}
        >
          <Button
            onClick={() => {
              console.log("redirect you");
            }}
          >
            {console.log("the count", state.search?.totalCount)}
            {state.search?.totalCount
              ? ` See ${state.search?.totalCount} Results`
              : null}
          </Button>
        </a>
      </FixedFooter>
      {!props.disableInsights && (
        <Widget
          src="chaotictempest.near/widget/Insights"
          props={{
            event: state.event,
            searchApiKey: SEARCH_API_KEY,
            appId: APPLICATION_ID,
            index: INDEX,
          }}
        />
      )}
    </Wrapper>
  </div>
);
