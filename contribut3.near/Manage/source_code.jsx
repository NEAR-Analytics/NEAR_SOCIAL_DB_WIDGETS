const ownerId = "contribut3.near";

const availableContent = ["projects", "requests", "proposals", "contracts", "applications"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "projects";
  }

  return content;
};

const Header = styled.div`
  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 2em;
    color: #101828;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.5em;
    color: #475467;
  }
`;

const header = (
  <Header>
    <h1>Manage projects and contributors</h1>
    <p>
      Create, edit and manage all of your projects, organizations and requests
    </p>
  </Header>
);

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "entities",
      content: getContent(props.content),
      search: props.search,
      update: props.update,
      buttons: [
        {
          id: "proposals",
          text: "My Proposals",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 7.5L13.3333 5M13.3333 5L15.8333 2.5M13.3333 5L18.3333 5M13.3333 17.5V16.5C13.3333 15.0999 13.3333 14.3998 13.0608 13.865C12.8211 13.3946 12.4387 13.0122 11.9683 12.7725C11.4335 12.5 10.7334 12.5 9.33329 12.5H5.66663C4.26649 12.5 3.56643 12.5 3.03165 12.7725C2.56124 13.0122 2.17879 13.3946 1.93911 13.865C1.66663 14.3998 1.66663 15.0999 1.66663 16.5V17.5M10.4166 6.25C10.4166 7.86083 9.11079 9.16667 7.49996 9.16667C5.88913 9.16667 4.58329 7.86083 4.58329 6.25C4.58329 4.63917 5.88913 3.33333 7.49996 3.33333C9.11079 3.33333 10.4166 4.63917 10.4166 6.25Z"
                stroke="#667085"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
        },
        {
          id: "projects",
          text: "My Projects",
          icon: (
            <svg
              width="20"
              height="21"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.4 16.1389C23.4 15.6687 23.1997 15.2208 22.8483 14.8928C22.4974 14.5652 22.0241 14.3834 21.5333 14.3834H19.0667L19.0667 13.8049C19.0637 12.9232 18.687 12.0813 18.0238 11.4623C17.361 10.8437 16.4651 10.4972 15.5333 10.4945H13.2333V8.56113H16.2833C16.7741 8.56113 17.2474 8.37929 17.5983 8.05173C17.9497 7.72374 18.15 7.27581 18.15 6.80558V2.91669C18.15 2.44646 17.9497 1.99853 17.5983 1.67053C17.2474 1.34297 16.7741 1.16113 16.2833 1.16113H7.11667C6.62588 1.16113 6.15265 1.34297 5.8017 1.67053C5.45027 1.99853 5.25 2.44646 5.25 2.91669V6.80558C5.25 7.27581 5.45027 7.72374 5.8017 8.05173C6.15265 8.37929 6.62588 8.56113 7.11667 8.56113H11.1667V10.4945L8.86609 10.4945C7.93431 10.4972 7.03899 10.8437 6.37622 11.4623C5.71299 12.0813 5.33627 12.9238 5.33333 13.8056V14.3834H2.86667C2.37588 14.3834 1.90265 14.5652 1.55169 14.8928C1.20027 15.2208 1 15.6687 1 16.1389L1 20.8056C1 21.2758 1.20027 21.7237 1.55169 22.0517C1.90265 22.3793 2.37588 22.5611 2.86667 22.5611H9.86667C10.3575 22.5611 10.8307 22.3793 11.1816 22.0517C11.5331 21.7237 11.7333 21.2758 11.7333 20.8056V16.1389C11.7333 15.6687 11.5331 15.2208 11.1816 14.8928C10.8307 14.5652 10.3575 14.3834 9.86667 14.3834H7.4V13.8056C7.4 13.4507 7.55093 13.1073 7.82462 12.8518C8.09878 12.596 8.4734 12.45 8.86667 12.45L15.5333 12.45C15.9266 12.45 16.3012 12.596 16.5754 12.8518C16.8491 13.1073 17 13.4507 17 13.8056V14.3834H14.5333C14.0425 14.3834 13.5693 14.5652 13.2184 14.8928C12.8669 15.2208 12.6667 15.6687 12.6667 16.1389V20.8056C12.6667 21.2758 12.8669 21.7237 13.2184 22.0517C13.5693 22.3793 14.0425 22.5611 14.5333 22.5611H21.5333C22.0241 22.5611 22.4974 22.3793 22.8483 22.0517C23.1997 21.7237 23.4 21.2758 23.4 20.8056V16.1389ZM14.7333 16.3389H21.3333V20.6056H14.7333V16.3389ZM7.31667 3.11669L16.0833 3.11669V6.60558H7.31667V3.11669ZM3.06667 16.3389H9.66667L9.66667 20.6056H3.06667L3.06667 16.3389Z"
                fill="#667085"
              />
            </svg>
          ),
        },
        {
          id: "requests",
          text: "Requests",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.16877 2.5816C7.64262 2.5816 7.13802 2.80739 6.76598 3.2093C6.39394 3.61121 6.18493 4.15631 6.18493 4.72469V8.68117C6.18493 8.81234 6.1367 8.93813 6.05084 9.03088C5.96499 9.12363 5.84854 9.17573 5.72712 9.17573H2.06466C1.53851 9.17573 1.03392 9.40152 0.661875 9.80343C0.289833 10.2053 0.0808229 10.7504 0.0808229 11.3188V15.2753C0.0808229 15.5567 0.132136 15.8354 0.231834 16.0954C0.331531 16.3554 0.477659 16.5917 0.661875 16.7907C0.846091 16.9897 1.06479 17.1476 1.30548 17.2553C1.54617 17.363 1.80414 17.4184 2.06466 17.4184H11.8312C12.0918 17.4184 12.3497 17.363 12.5904 17.2553C12.8311 17.1476 13.0498 16.9897 13.234 16.7907C13.4182 16.5917 13.5644 16.3554 13.6641 16.0954C13.7638 15.8354 13.8151 15.5567 13.8151 15.2753V11.3188C13.8151 11.1877 13.8633 11.0619 13.9492 10.9691C14.035 10.8764 14.1515 10.8243 14.2729 10.8243H17.9353C18.4615 10.8243 18.9661 10.5985 19.3381 10.1966C19.7102 9.79466 19.9192 9.24956 19.9192 8.68117V4.72469C19.9192 4.15631 19.7102 3.61121 19.3381 3.2093C18.9661 2.80739 18.4615 2.5816 17.9353 2.5816H8.16877ZM17.9353 9.17573H13.8151V4.23014H17.9353C18.0568 4.23014 18.1732 4.28224 18.2591 4.37499C18.3449 4.46774 18.3932 4.59353 18.3932 4.72469V8.68117C18.3932 8.81234 18.3449 8.93813 18.2591 9.03088C18.1732 9.12363 18.0568 9.17573 17.9353 9.17573ZM12.289 9.17573H7.71096V4.72469C7.71096 4.59353 7.75919 4.46774 7.84505 4.37499C7.9309 4.28224 8.04735 4.23014 8.16877 4.23014H12.289V9.17573ZM6.18493 10.8243V15.7699H2.06466C1.94324 15.7699 1.82679 15.7178 1.74094 15.625C1.65508 15.5323 1.60685 15.4065 1.60685 15.2753V11.3188C1.60685 11.1877 1.65508 11.0619 1.74094 10.9691C1.82679 10.8764 1.94324 10.8243 2.06466 10.8243H6.18493ZM7.71096 10.8243H12.289V15.2753C12.289 15.4065 12.2408 15.5323 12.155 15.625C12.0691 15.7178 11.9527 15.7699 11.8312 15.7699H7.71096V10.8243Z"
                fill="#667085"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.70694 3.15358C7.09365 2.73582 7.61935 2.5 8.16877 2.5H17.9353C18.4848 2.5 19.0105 2.73582 19.3972 3.15358C19.7837 3.57115 20 4.13638 20 4.72469V8.68117C20 9.26949 19.7837 9.83472 19.3972 10.2523C19.0105 10.67 18.4848 10.9059 17.9353 10.9059H14.2729C14.1747 10.9059 14.0794 10.9479 14.0082 11.0248C13.9368 11.1019 13.8959 11.2076 13.8959 11.3188V15.2753C13.8959 15.5667 13.8428 15.8554 13.7394 16.1249C13.6361 16.3944 13.4845 16.6396 13.2931 16.8464C13.1016 17.0532 12.874 17.2176 12.6232 17.3299C12.3723 17.4421 12.1032 17.5 11.8312 17.5H2.06466C1.79274 17.5 1.52362 17.4421 1.27273 17.3299C1.02186 17.2176 0.794275 17.0532 0.602827 16.8464C0.411389 16.6396 0.259798 16.3944 0.156461 16.1249C0.0531272 15.8554 0 15.5667 0 15.2753V11.3188C0 10.7305 0.216288 10.1653 0.602827 9.74771C0.989538 9.32996 1.51525 9.09413 2.06466 9.09413H5.72712C5.82527 9.09413 5.92061 9.05206 5.99179 8.97516C6.06315 8.89807 6.10411 8.79241 6.10411 8.68117V4.72469C6.10411 4.13638 6.3204 3.57115 6.70694 3.15358ZM8.16877 2.6632C7.66589 2.6632 7.1824 2.87896 6.82503 3.26502C6.46749 3.65127 6.26575 4.17624 6.26575 4.72469V8.68117C6.26575 8.83227 6.21024 8.97819 6.10989 9.0866C6.00937 9.19519 5.87181 9.25734 5.72712 9.25734H2.06466C1.56178 9.25734 1.07829 9.47309 0.720923 9.85915C0.363379 10.2454 0.161646 10.7704 0.161646 11.3188V15.2753C0.161646 15.5468 0.211146 15.8154 0.307206 16.066C0.403263 16.3165 0.543928 16.5438 0.720923 16.735C0.897907 16.9262 1.10772 17.0775 1.33823 17.1807C1.56871 17.2838 1.81554 17.3368 2.06466 17.3368H11.8312C12.0804 17.3368 12.3272 17.2838 12.5577 17.1807C12.7882 17.0775 12.998 16.9262 13.175 16.735C13.352 16.5438 13.4926 16.3165 13.5887 16.066C13.6847 15.8154 13.7342 15.5468 13.7342 15.2753V11.3188C13.7342 11.1677 13.7898 11.0218 13.8901 10.9134C13.9906 10.8048 14.1282 10.7427 14.2729 10.7427H17.9353C18.4382 10.7427 18.9217 10.5269 19.2791 10.1408C19.6366 9.7546 19.8384 9.22963 19.8384 8.68117V4.72469C19.8384 4.17624 19.6366 3.65127 19.2791 3.26502C18.9217 2.87896 18.4382 2.6632 17.9353 2.6632H8.16877ZM8.16877 4.31174C8.07062 4.31174 7.97528 4.35381 7.9041 4.43071C7.83274 4.50779 7.79178 4.61346 7.79178 4.72469V9.09413H12.2082V4.31174H8.16877ZM7.786 4.31927C7.88653 4.21067 8.02408 4.14853 8.16877 4.14853H12.3699V9.25734H7.63014V4.72469C7.63014 4.5736 7.68565 4.42768 7.786 4.31927ZM13.7342 4.14853H17.9353C18.08 4.14853 18.2176 4.21067 18.3181 4.31927C18.4185 4.42768 18.474 4.5736 18.474 4.72469V8.68117C18.474 8.83227 18.4185 8.97819 18.3181 9.0866C18.2176 9.19519 18.08 9.25734 17.9353 9.25734H13.7342V4.14853ZM13.8959 4.31174V9.09413H17.9353C18.0335 9.09413 18.1288 9.05206 18.2 8.97516C18.2714 8.89807 18.3123 8.79241 18.3123 8.68117V4.72469C18.3123 4.61346 18.2714 4.50779 18.2 4.43071C18.1288 4.35381 18.0335 4.31174 17.9353 4.31174H13.8959ZM2.06466 10.9059C1.96651 10.9059 1.87117 10.9479 1.79999 11.0248C1.72863 11.1019 1.68767 11.2076 1.68767 11.3188V15.2753C1.68767 15.3865 1.72863 15.4922 1.79999 15.5693C1.87117 15.6462 1.96651 15.6883 2.06466 15.6883H6.10411V10.9059H2.06466ZM1.68189 10.9134C1.78242 10.8048 1.91997 10.7427 2.06466 10.7427H6.26575V15.8515H2.06466C1.91997 15.8515 1.78242 15.7893 1.68189 15.6807C1.58154 15.5723 1.52603 15.4264 1.52603 15.2753V11.3188C1.52603 11.1677 1.58154 11.0218 1.68189 10.9134ZM7.63014 10.7427H12.3699V15.2753C12.3699 15.4264 12.3144 15.5723 12.214 15.6807C12.1135 15.7893 11.9759 15.8515 11.8312 15.8515H7.63014V10.7427ZM7.79178 10.9059V15.6883H11.8312C11.9294 15.6883 12.0247 15.6462 12.0959 15.5693C12.1673 15.4922 12.2082 15.3865 12.2082 15.2753V10.9059H7.79178Z"
                fill="#667085"
              />
            </svg>
          ),
        },
      ],
    }}
  />
);

const content = {
  projects: (
    <Widget
      src={`${ownerId}/widget/AdminList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  proposals: (
    <Widget
      src={`${ownerId}/widget/ProposalsList`}
      props={{
        search: props.search,
        update: props.update,
        accountId: context.accountId,
      }}
    />
  ),
  requests: (
    <Widget
      src={`${ownerId}/widget/NeedList`}
      props={{
        search: props.search,
        update: props.update,
        accountId: context.accountId,
        isAdmin: true,
      }}
    />
  ),
}[getContent(props.content)];

return (
  <div>
    <div className="mb-3 px-3">
      <div className="d-flex flex-row justify-content-between mb-3">
        {header}
      </div>
      <div className="d-flex flex-row justify-content-between">
        {contentSelector}
        <Widget
          src={`${ownerId}/widget/SearchInput`}
          props={{ search: props.search, update: props.update }}
        />
      </div>
    </div>
    <div className="px-3 pt-3">
      {context.accountId
        ? content
        : "You need to be logged in to view this page!"}
    </div>
  </div>
);
