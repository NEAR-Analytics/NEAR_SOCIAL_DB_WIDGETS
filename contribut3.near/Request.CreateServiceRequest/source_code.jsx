const ownerId = "contribut3.near";

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;

  img {
    vertical-align: top;
  }
`;

const Name = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  color: #101828;
`;

const AccountId = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1em;
  color: #7e868c;
`;

const ImageCircle = styled.img`
  background: #fafafa;
  border-radius: 8px;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  display: inline-block;
  width: 1em;
  height: 1em;
`;

const createProjectLine = (accountId, name, image) => {
  const fullName = name ?? accountId;
  const url =
    (image.ipfs_cid
      ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
      : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";
  const imageSrc = `https://i.near.social/thumbnail/${url}`;

  return (
    <LineContainer>
      <ImageContainer title={`${fullName} @${accountId}`}>
        <ImageCircle src={imageSrc} alt="profile image" />
      </ImageContainer>
      <Name>{name}</Name>
      <AccountId>@{accountId}</AccountId>
    </LineContainer>
  );
};

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 60%;
  gap: 1em;
`;

const FormHeader = styled.h3`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 0.5em;
  border-bottom: 1px solid #eceef0;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.25em;
  color: #000000;
  width: 100%;
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 3em;
  padding-bottom: 3em;
`;

const Header = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 2em;
  line-height: 1.4em;
  text-align: center;
  color: #000000;
`;

const SubHeader = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 0.95em;
  line-height: 1.25em;
  text-align: center;
  color: #101828;
`;

const ProgressBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.375em;
  width: 100%;
  height: 0.5em;
  padding: 0;
  margin: 0;

  div {
    flex-grow: 1;
    height: 100%;
    width: 50%;
    background: #00ec97;
  }

  &.half {
    div:last-child {
      background: #eceef0;
    }
  }
`;

const CancelButton = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: .75em 1em;
  gap: .5em;
  background: #ffffff;
  border: 1px solid #eceef0;
  border-radius: 50px;
  font-style: normal;
  font-weight: 600;
  font-size: .95em;
  line-height: 1em;
  text-align: center;
  color: #101828;
`;

State.init({
  projectId: null,
  projects: [],
  projectsIsFetched: false,
  tags: [],
  title: "",
  description: "",
  requestType: null,
  requestTypes: [],
  paymentType: null,
  paymentTypes: [],
  paymentSource: null,
  paymentSources: [],
  budget: 0,
  deadline: null,
});

if (!state.projectsIsFetched) {
  Near.asyncView(ownerId, "get_payment_types", {}, "final", false).then(
    (paymentTypes) =>
      State.update({
        paymentTypes: paymentTypes.map((value) => ({ value, text: value })),
      })
  );
  Near.asyncView(ownerId, "get_payment_sources", {}, "final", false).then(
    (paymentSources) =>
      State.update({
        paymentSources: paymentSources.map((value) => ({ value, text: value })),
      })
  );
  Near.asyncView(ownerId, "get_request_types", {}, "final", false).then(
    (requestTypes) =>
      State.update({
        requestTypes: requestTypes.map((value) => ({ value, text: value })),
      })
  );
  Near.asyncView(
    ownerId,
    "get_admin_projects",
    { account_id: context.accountId },
    "final",
    false
  ).then((projects) => {
    Near.asyncView(
      "social.near",
      "get",
      { keys: projects.map((accountId) => `${accountId}/profile/**`) },
      "final",
      false
    ).then((data) =>
      State.update({
        projects: projects.map((accountId) => ({
          // text: <Widget
          //   src={`${ownerId}/widget/Project.Line`}
          //   props={{ accountId, size: "1em" }}
          // />,
          text: createProjectLine(
            accountId,
            data[accountId].profile.name,
            data[accountId].profile.image
          ),
          value: accountId,
        })),
        projectsIsFetched: true,
      })
    );
  });
}

return (
  <Container>
    {/*<ProgressBar className={state.step === "step1" ? "half" : ""}><div /><div /></ProgressBar>*/}
    <div>
      <Header>Create new contribution request</Header>
      <SubHeader>
        Use this form to post your business needs and match with reputable
        contributors and service providers with ease
      </SubHeader>
    </div>
    <Form>
      <FormHeader>Request details</FormHeader>
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Request as *",
          value: state.projectId,
          options: state.projects,
          onChange: (projectId) => State.update({ projectId }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Title",
          placeholder: "Looking for Rust developer to create smart contracts",
          value: state.title,
          onChange: (title) => State.update({ title }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.TextArea`}
        props={{
          label: "Description",
          placeholder:
            "Crypto ipsum bitcoin ethereum dogecoin litecoin. Holo stacks fantom kava flow algorand. Gala dogecoin gala XRP binance flow. Algorand polygon bancor arweave avalanche. Holo kadena telcoin kusama BitTorrent flow holo velas horizen. TerraUSD helium filecoin terra shiba-inu. Serum algorand horizen kava flow maker telcoin algorand enjin. Dai bitcoin.",
          value: state.description,
          onChange: (description) => State.update({ description }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.MultiSelect`}
        props={{
          label: "Tags",
          placeholder: "DeFi, Gaming...",
          options: [
            { text: "Wallets", value: "wallets" },
            { text: "Games", value: "games" },
          ],
          value: state.tags,
          onChange: (tags) => State.update({ tags }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Request type *",
          options: state.requestTypes,
          value: state.requestType,
          onChange: (requestType) => State.update({ requestType }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Payment type *",
          options: state.paymentTypes,
          value: state.paymentType,
          onChange: (paymentType) => State.update({ paymentType }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Payment source *",
          options: state.paymentSources,
          value: state.paymentSource,
          onChange: (paymentSource) => State.update({ paymentSource }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Number`}
        props={{
          label: "Budget *",
          placeholder: 1500,
          value: state.budget,
          onChange: (budget) => State.update({ bugdet }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Date`}
        props={{
          label: "Deadline *",
          value: state.deadline,
          onChange: (deadline) => State.update({ deadline }),
        }}
      />
      <FormFooter>
        <CancelButton href={`/${ownerId}/widget/Index`}>Cancel</CancelButton>
        <Widget
          src={`${ownerId}/widget/Buttons.Green`}
          props={{
            onClick: () => {
              Near.call([
                {
                  contractName: "social.near",
                  methodName: "set",
                  args: {
                    data: {
                      [state.accountId]: {
                        profile: {
                          name: state.name,
                          tagline: state.tagline,
                          description: state.description,
                          tags: state.tags.map(
                            (acc, { name }) =>
                              Object.assign(acc, { [name]: "" }),
                            {}
                          ),
                          linktree: {
                            ...state.socials,
                            website: state.website,
                          },
                          category: state.category,
                          team: state.team,
                          stage: state.dev,
                        },
                      },
                    },
                  },
                },
                {
                  contractName: ownerId,
                  methodName: "add_project",
                  args: { account_id: state.accountId },
                },
                {
                  contractName: ownerId,
                  methodName: "edit_project",
                  args: {
                    account_id: state.accountId,
                    project: {
                      application: {
                        integration: state.integration,
                        geo: state.geo,
                      },
                    },
                  },
                },
              ]);
            },
            text: (
              <>
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.875 16.5V12.75M2.875 5.25V1.5M1 3.375H4.75M1 14.625H4.75M9.25 2.25L7.94937 5.63165C7.73786 6.18157 7.6321 6.45653 7.46765 6.68781C7.32189 6.8928 7.1428 7.07189 6.93781 7.21765C6.70653 7.3821 6.43157 7.48786 5.88165 7.69937L2.5 9L5.88165 10.3006C6.43157 10.5121 6.70653 10.6179 6.93781 10.7824C7.1428 10.9281 7.32189 11.1072 7.46765 11.3122C7.6321 11.5435 7.73786 11.8184 7.94937 12.3684L9.25 15.75L10.5506 12.3684C10.7621 11.8184 10.8679 11.5435 11.0324 11.3122C11.1781 11.1072 11.3572 10.9281 11.5622 10.7824C11.7935 10.6179 12.0684 10.5121 12.6184 10.3006L16 9L12.6184 7.69937C12.0684 7.48786 11.7935 7.3821 11.5622 7.21765C11.3572 7.07189 11.1781 6.8928 11.0324 6.68781C10.8679 6.45653 10.7621 6.18157 10.5506 5.63165L9.25 2.25Z"
                    stroke="#11181C"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Create project
              </>
            ),
          }}
        />
      </FormFooter>
    </Form>
  </Container>
);
