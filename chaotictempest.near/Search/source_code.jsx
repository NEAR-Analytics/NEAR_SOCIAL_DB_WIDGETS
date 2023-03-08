const SEARCH_API_KEY = props.searchApiKey ?? "57ad1944e94432510f067a6e3d13f022";
const APPLICATION_ID = props.appId ?? "B6PI9UKKJT";
const INDEX = props.index ?? "test_near-social-feed";
const API_URL =
  props.apiUrl ??
  `https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/${INDEX}/query?`;
const INITIAL_PAGE = props.initialPage ?? 0;
const facets = props.facets ?? [
  "All",
  "Users",
  "Apps",
  "Components",
  "Posts",
  "Comments",
];

const componentsUrl = `/#/calebjacob.near/widget/ComponentsPage`;
const peopleUrl = `/#/calebjacob.near/widget/PeoplePage`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 48px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Search = styled.div``;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #11181c;
  margin: 0;
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
  align-items: stretch;
  gap: 12px;
`;

const Item = styled.div``;

const resetSearcheHits = () => {
  State.update({
    currentPage: 0,
    search: undefined,
    paginate: undefined,
    facet: undefined,
  });
};

const writeStateTerm = (term) => {
  State.update({
    term,
  });

  if (term === "") {
    resetSearcheHits();
  }
};

const profiles = (records) => {
  const profiles = [];
  for (const record of records ?? []) {
    profiles.push({
      accountId: record.author,
    });
  }
  return profiles;
};

const posts = (content, postType) => {
  const posts = [];
  for (const post of content || []) {
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
    });
  }
  return posts;
};

const components = (records) => {
  const components = [];
  for (const component of records || []) {
    const idParts = component.objectID.split("/");
    const widgetName = idParts[idParts.length - 1];
    const accountId = component.author;
    components.push({
      accountId,
      widgetName,
    });
  }
  return components;
};

const categorizeSearchHits = (rawResp) => {
  const results = {};
  for (const result of rawResp.hits) {
    const { categories: categories_raw } = result;
    if (categories_raw.length > 1) {
      categories_raw.sort();
    }

    const categories = categories_raw.join(", ");
    results[categories] = results[categories] || [];
    results[categories].push(result);
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

const fetchSearchHits = (query, { pageNumber, filters, optionalFilters }) => {
  let body = {
    query,
    page: pageNumber ?? 0,
    filters: filters ?? searchFilters(state.facet),
    optionalFilters: optionalFilters ?? [
      "categories:profile<score=3>",
      "categories:widget<score=2>",
      "categories:post<score=1>",
      "categories:comment<score=0>",
    ],
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

const updateSearchHits = debounce(({ term, pageNumber, filters }) => {
  fetchSearchHits(term, { pageNumber, filters }).then((resp) => {
    const { results, hitsTotal, hitsPerPage } = categorizeSearchHits(resp.body);
    State.update({
      search: {
        profiles: profiles(results["profile"]),
        components: components(results["widget"]),
        postsAndComments: posts(results["post"], "post").concat(
          posts(results["comment, post"], "comment")
        ),
      },
      paginate: {
        hitsTotal,
        hitsPerPage,
      },
    });
  });
});

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
  Comments: "comment",
};

const searchFilters = (facet) => {
  const category = FACET_TO_CATEGORY[facet];
  let filters = category ? `categories:${category}` : undefined;
  return filters;
};

const onFacetClick = (facet) => {
  if (facet === state.facet) {
    console.log("Clicked the same facet");
    return;
  }

  State.update({
    facet,
  });

  updateSearchHits({
    term: state.term,
    filters: searchFilters(facet),
  });
};

return (
  <Wrapper>
    <Header>
      <H1>Search</H1>
      <H2>Explore and find everything on the Blockchain Operating System</H2>
    </Header>

    <Search>
      <Widget
        src="chaotictempest.near/widget/SearchPill"
        props={{
          onChange: onSearchChange,
          term: props.term,
        }}
      />
    </Search>

    {state.search && (
      <Widget
        src="chaotictempest.near/widget/Facets"
        props={{
          facets,
          onFacetClick,
          defaultFacet: facets[0],
        }}
      />
    )}

    {state.search?.profiles.length > 0 && (
      <Group>
        <GroupHeader>
          <H3>People</H3>
          <Text as="a" href={peopleUrl} small>
            View All
          </Text>
        </GroupHeader>

        <Items>
          {state.search.profiles.map((profile, i) => (
            <Item key={profile.accountId}>
              <Widget
                src="calebjacob.near/widget/AccountProfileCard"
                props={{
                  accountId: profile.accountId,
                }}
              />
            </Item>
          ))}
        </Items>
      </Group>
    )}

    {state.search?.components.length > 0 && (
      <Group>
        <GroupHeader>
          <H3>Components</H3>
          <Text as="a" href={componentsUrl} small>
            View All
          </Text>
        </GroupHeader>

        <Items>
          {state.search.components.map((component, i) => (
            <Item key={component.accountId + component.widgetName}>
              <Widget
                src="calebjacob.near/widget/ComponentCard"
                props={{
                  src: `${component.accountId}/widget/${component.widgetName}`,
                }}
              />
            </Item>
          ))}
        </Items>
      </Group>
    )}

    {state.search?.postsAndComments.length > 0 && (
      <Group>
        <GroupHeader>
          <H3>Posts and Comments</H3>
        </GroupHeader>

        <Items>
          {state.search.postsAndComments.map((post, i) => (
            <Item
              key={`${post.accountId}/${post.postType}/${post.blockHeight}`}
            >
              <Widget
                src="chaotictempest.near/widget/SearchPost"
                props={{
                  accountId: post.accountId,
                  blockHeight: post.blockHeight,
                  content: post.postContent,
                }}
              />
            </Item>
          ))}
        </Items>
      </Group>
    )}

    {state.paginate &&
      state.paginate.hitsTotal > state.paginate.hitsPerPage && (
        <Widget
          src="chaotictempest.near/widget/Paginate"
          props={{
            totalCount: state.paginate.hitsTotal,
            pageSize: state.paginate.hitsPerPage,
            onPageChange,
          }}
        />
      )}

    {props.debug && (
      <div>
        <p>Debug Data:</p>
        <pre>{JSON.stringify(state, undefined, 2)}</pre>
      </div>
    )}
  </Wrapper>
);
