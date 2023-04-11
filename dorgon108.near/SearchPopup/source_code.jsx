const SEARCH_API_KEY = props.searchApiKey ?? "0e42c01107b8f555a41bcc0fa7f2a4df";
const APPLICATION_ID = props.appId ?? "B6PI9UKKJT";
const INDEX = props.index ?? "prod_near-social-feed";
const API_URL =
  props.apiUrl ??
  `https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/${INDEX}/query?`;
const INITIAL_PAGE = props.initialPage ?? 0;
const facets = props.facets ?? ["All", "Users", "Apps", "Components", "Posts"];

const showHeader = props.showHeader ?? true;
const showSearchBar = props.showSearchBar ?? true;
const showPagination = props.showPagination ?? true;
const userId = props.accountId ?? context.accountId;

const componentsUrl = `/#/calebjacob.near/widget/ComponentsPage`;
const peopleUrl = `/#/calebjacob.near/widget/PeoplePage`;
// Styling Specifications
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

const onSearchChange = ({ term }) => {
  console.log("search change");
  props.writeStateTerm(term);
  props.updateSearchHits({ term, pageNumber: INITIAL_PAGE });
};

const onSearchChangeFun = onSearchChange;
const termVal = props.term;
const facetsVal = props.facets;
const onFacetClickFun = props.onFacetClick;
const defaultFacetVal = props.facets[0];
const onSearchResultClickFun = props.onSearchResultClick;
const onPageChangeFun = props.onPageChange;
const disableInsightsFun = props.disableInsights;

return (
  <Wrapper>
    {showSearchBar && (
      <Search>
        <Widget
          src="chaotictempest.near/widget/SearchPill"
          props={{
            onChange: onSearchChange,
            term: termVal,
          }}
        />
      </Search>
    )}

    {state.search && (
      <Facets>
        <Widget
          src="chaotictempest.near/widget/Facets"
          props={{
            facets: facetsVal,
            onFacetClick: onFacetClickFun,
            defaultFacet: defaultFacetVal,
          }}
        />
      </Facets>
    )}

    {state.paginate?.hitsTotal == 0 && (
      <H2>No matches were found for "{state.term}".</H2>
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
                src="chaotictempest.near/widget/AccountProfileCard"
                props={{
                  accountId: profile.accountId,
                  onClick: () =>
                    onSearchResultClickFun({
                      searchPosition: profile.searchPosition,
                      objectID: `${profile.accountId}/profile`,
                      eventName: "Clicked Profile After Search",
                    }),
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
                src="chaotictempest.near/widget/ComponentCard"
                props={{
                  src: `${component.accountId}/widget/${component.widgetName}`,
                  onClick: () =>
                    onSearchResultClickFun({
                      searchPosition: component.searchPosition,
                      objectID: `${component.accountId}/widget/${component.widgetName}`,
                      eventName: "Clicked Component After Search",
                    }),
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

    {showPagination &&
      state.paginate &&
      state.paginate.hitsTotal > state.paginate.hitsPerPage && (
        <Widget
          src="chaotictempest.near/widget/Paginate"
          props={{
            totalCount: state.paginate.hitsTotal,
            pageSize: state.paginate.hitsPerPage,
            onPageChange: onPageChangeFun,
          }}
        />
      )}

    {!disableInsightsFun && (
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
);
