/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];
const nearDevGovGigsWidgetsAccountId =
  props.nearDevGovGigsWidgetsAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearDevGovGigsContractAccountId: props.nearDevGovGigsContractAccountId,
    nearDevGovGigsWidgetsAccountId: props.nearDevGovGigsWidgetsAccountId,
    referral: props.referral,
  };
  return (
    <Widget
      src={`${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };
  if (props.nearDevGovGigsContractAccountId) {
    linkProps.nearDevGovGigsContractAccountId =
      props.nearDevGovGigsContractAccountId;
  }
  if (props.nearDevGovGigsWidgetsAccountId) {
    linkProps.nearDevGovGigsWidgetsAccountId =
      props.nearDevGovGigsWidgetsAccountId;
  }
  if (props.referral) {
    linkProps.referral = props.referral;
  }
  const linkPropsQuery = Object.entries(linkProps)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `#/${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

const onSearchLabel = props.onSearchLabel;
const selectedLabels = props.searchQuery?.label
  ? [{ name: props.searchQuery.label }]
  : [];
const onSearchAuthor = props.onSearchAuthor;
const selectedAuthors = props.searchQuery?.author
  ? [{ name: props.searchQuery.author }]
  : [];

const labels = Near.view(nearDevGovGigsContractAccountId, "get_all_labels");
if (!labels) {
  return <div>Loading ...</div>;
}
const wrappedLabels = labels.map((label) => ({ name: label }));

const authors = Near.view(nearDevGovGigsContractAccountId, "get_all_authors");
if (!authors) {
  return <div>Loading ...</div>;
}
const wrappedAuthors = authors.map((author) => ({ name: author }));

const onChange = (selectedLabels) => {
  onSearchLabel(selectedLabels[0]?.name);
};

const onChangeAuthor = (selectedAuthors) => {
  onSearchAuthor(selectedAuthors[0]?.name);
};

return (
  <>
    <Typeahead
      clearButton
      id="basic-typeahead-single"
      labelKey="name"
      onChange={onChange}
      options={wrappedLabels}
      placeholder="Search by tag"
      selected={selectedLabels}
    />
    <Typeahead
      clearButton
      id="basic-typeahead-single"
      labelKey="name"
      onChange={onChangeAuthor}
      options={wrappedAuthors}
      placeholder="Search by author"
      selected={selectedAuthors}
    />
  </>
);
