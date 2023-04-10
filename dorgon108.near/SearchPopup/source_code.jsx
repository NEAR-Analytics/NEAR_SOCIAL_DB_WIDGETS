// Constants
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
// Update context to include the user account id
const userId = props.accountId ?? context.accountId;

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

return (
  <Wrapper>
    {props.showSearchBar && (
      <Search>
        <Widget
          src="chaotictempest.near/widget/SearchPill"
          props={{
            onChange: props.onSearchChange,
            term: props.term,
          }}
        />
      </Search>
    )}

    {state.search && (
      <Facets>
        <Widget
          src="chaotictempest.near/widget/Facets"
          props={{
            facets: props.facets,
            onFacetClick: props.onFacetClick,
            defaultFacet: props.facets[0],
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
          <Text as="a" href={props.peopleUrl} small>
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
                    props.onSearchResultClick({
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
          <Text as="a" href={props.componentsUrl} small>
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
                    props.onSearchResultClick({
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

    {props.showPagination &&
      state.paginate &&
      state.paginate.hitsTotal > state.paginate.hitsPerPage && (
        <Widget
          src="chaotictempest.near/widget/Paginate"
          props={{
            totalCount: state.paginate.hitsTotal,
            pageSize: state.paginate.hitsPerPage,
            onPageChange: props.onPageChange,
          }}
        />
      )}

    {!props.disableInsights && (
      <Widget
        src="chaotictempest.near/widget/Insights"
        props={{
          event: props.state.event,
          searchApiKey: SEARCH_API_KEY,
          appId: APPLICATION_ID,
          index: INDEX,
        }}
      />
    )}
    <div>{props.dog}</div>
  </Wrapper>
);
