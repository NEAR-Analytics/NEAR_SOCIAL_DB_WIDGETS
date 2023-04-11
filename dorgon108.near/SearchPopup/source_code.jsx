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

function logConditionals() {
  console.log("showSearchBar:", showSearchBar);
  console.log("state.search:", state.search);
  console.log("paginate?", state.paginate?.hitsTotal === 0);
  console.log("state.search?.profiles:", state.search?.profiles.length > 0);
  console.log("state.search?", state.search?.components.length > 0);
  console.log(
    "state.search?.postsAndComment",
    state.search?.postsAndComments.length > 0
  );
  console.log(
    "showPagination && state.paginate && state.paginate.hitsTotal > state.paginate.hitsPerPage:",
    showPagination &&
      state.paginate &&
      state.paginate.hitsTotal > state.paginate.hitsPerPage
  );
  console.log("!disableInsightsFun:", !disableInsightsFun);
  console.log("child state is:", state.search);
}
return (
  <props.wrapper>
    {showSearchBar && (
      <props.search>
        <Widget
          src="chaotictempest.near/widget/SearchPill"
          props={{
            onChange: onSearchChange,
            term: termVal,
          }}
        />
      </props.search>
    )}

    {state.search && (
      <props.facets>
        <props.Widget
          src="chaotictempest.near/widget/Facets"
          props={{
            facets: facetsVal,
            onFacetClick: onFacetClickFun,
            defaultFacet: defaultFacetVal,
          }}
        />
      </props.facets>
    )}

    {logConditionals()}

    {state.paginate?.hitsTotal == 0 && (
      <props.h2>No matches were found for "{state.term}".</props.h2>
    )}

    {state.search?.profiles.length > 0 && (
      <props.group>
        <props.groupheader>
          <props.h3>People</props.h3>
          <props.text as="a" href={peopleUrl} small>
            View All
          </props.text>
        </props.groupheader>

        <props.items>
          {state.search.profiles.map((profile, i) => (
            <props.item key={profile.accountId}>
              <props.Widget
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
            </props.item>
          ))}
        </props.items>
      </props.group>
    )}

    {state.search?.components.length > 0 && (
      <props.group>
        <props.groupheader>
          <props.h3>Components</props.h3>
          <props.text as="a" href={componentsUrl} small>
            View All
          </props.text>
        </props.groupheader>

        <props.items>
          {state.search.components.map((component, i) => (
            <props.item key={component.accountId + component.widgetName}>
              <props.Widget
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
            </props.item>
          ))}
        </props.items>
      </props.group>
    )}

    {state.search?.postsAndComments.length > 0 && (
      <props.group>
        <props.groupheader>
          <props.h3>Posts and Comments</props.h3>
        </props.groupheader>

        <props.items>
          {state.search.postsAndComments.map((post, i) => (
            <props.item
              key={`${post.accountId}/${post.postType}/${post.blockHeight}`}
            >
              <props.Widget
                src="chaotictempest.near/widget/SearchPost"
                props={{
                  accountId: post.accountId,
                  blockHeight: post.blockHeight,
                  content: post.postContent,
                }}
              />
            </props.item>
          ))}
        </props.items>
      </props.group>
    )}

    {showPagination &&
      state.paginate &&
      state.paginate.hitsTotal > state.paginate.hitsPerPage && (
        <props.Widget
          src="chaotictempest.near/widget/Paginate"
          props={{
            totalCount: state.paginate.hitsTotal,
            pageSize: state.paginate.hitsPerPage,
            onPageChange: onPageChangeFun,
          }}
        >
          Hi
        </props.Widget>
      )}

    {!disableInsightsFun && (
      <props.Widget
        src="chaotictempest.near/widget/Insights"
        props={{
          event: state.event,
          searchApiKey: SEARCH_API_KEY,
          appId: APPLICATION_ID,
          index: INDEX,
        }}
      />
    )}
  </props.wrapper>
);
