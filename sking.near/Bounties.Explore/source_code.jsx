// Config
const WIDGET_AUTHOR = "sking.near";
const WHITELISTED_ACCOUNTS = ["sking.near", "samora.near"];
const UIKingWidgetAuthor = "sking.near";
const currentUserId = "sking.near";
const MAIN_DB_KEY = `${WIDGET_AUTHOR}-bounties-vALPHA`;

// State

State.init({
  filters: {
    status: "open",
    experienceLevel: ["beginner", "intermediate", "advanced"],
    skills: [],
  },
});

// SocialDB calls

const bountiesIndex = Social.index(MAIN_DB_KEY, "bounty", {
  order: "desc",
  length: 20, // TODO: IDK what is the limit before it breaks, need to implement pagination
});

const result =
  bountiesIndex &&
  bountiesIndex.reduce((res, { accountId, blockHeight, value }) => {
    // if (!WHITELISTED_ACCOUNTS.includes(accountId)) {
    //   return res;
    // }
    // format data
    const bounty = Social.getr(
      `${accountId}/${MAIN_DB_KEY}.Bounties/${value}`,
      blockHeight
    );
    const skills = JSON.parse(bounty.skills);
    const data = {
      ...bounty,
      skills: skills,
      blockHeight,
      author: accountId,
      createdAt: value,
    };
    // filter by status
    if (
      state.filters.status !== "all" &&
      data.status !== state.filters.status
    ) {
      return res;
    }
    // filter by experience level
    if (
      !state.filters.experienceLevel.includes(data.experienceLevel) &&
      state.filters.experienceLevel.length !== 3
    ) {
      return res;
    }
    // filter by skills
    if (
      state.filters.skills.length > 0 &&
      !state.filters.skills.every((skill) => skills.includes(skill))
    ) {
      return res;
    }
    res.push(data);
    return res;
  }, []);

// console.log("OUT", result);

// Styles
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -10;
  background: linear-gradient(0deg, #a8c0ff, #3f2b96);
  background-size: cover;
  background-position: center center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  max-width: 100%;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  overflow: hidden;
  background: #fff;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SidebarWrapper = styled.div`
  flex: 1;
  width: 100%;
  min-height: 100%;

  @media (min-width: 768px) {
    max-width: 300px;
  }
`;

const BountiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  width: 100%;
  min-height: 100%;
`;

// Renderer
return (
  <>
    <Widget src={`${WIDGET_AUTHOR}/widget/Bounties.Components.Background`} />
    <Widget
      src={`${WIDGET_AUTHOR}/widget/Bounties.Components.Header`}
      props={{
        widgetAuthor: WIDGET_AUTHOR,
      }}
    />
    <Wrapper>
      <SidebarWrapper>
        <Widget
          src={`${WIDGET_AUTHOR}/widget/Bounties.Components.Sidebar`}
          props={{
            widgetAuthor: WIDGET_AUTHOR,
            onFilterChange: (key, value) => {
              State.update({
                ...state,
                filters: {
                  ...state.filters,
                  [key]: value,
                },
              });
            },
            filters: state.filters,
          }}
        />
      </SidebarWrapper>
      <BountiesWrapper>
        {result && result.length === 0 && (
          <p style={{ textAlign: "center" }}>No bounties found</p>
        )}
        {result &&
          result.map((bounty) => (
            <Widget
              src={`${WIDGET_AUTHOR}/widget/Bounties.Components.Card`}
              props={{
                widgetAuthor: WIDGET_AUTHOR,
                title: bounty.title,
                status: bounty.status,
                creator: bounty.author,
                createdAt: bounty.createdAt,
                deadline: bounty.deadline,
                description: bounty.description,
                bounty: bounty.reward,
                skills: bounty.skills,
                experienceLevel: bounty.experienceLevel,
                proposals: [
                  {
                    authorId: "achraf.near",
                    createdAt: 1683227928,
                    description: "I will do it",
                    status: "Waiting",
                  },
                  {
                    authorId: "sking.near",
                    createdAt: 1683227928,
                    description: "I will do it",
                    status: "Waiting",
                  },
                ],
              }}
            />
          ))}
      </BountiesWrapper>
    </Wrapper>
  </>
);
