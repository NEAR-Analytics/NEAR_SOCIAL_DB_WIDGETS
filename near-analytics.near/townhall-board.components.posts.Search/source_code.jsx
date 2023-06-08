/* INCLUDE: "common.jsx" */
const nearNFDevsContractAccountId =
  props.nearNFDevsContractAccountId ||
  (context.widgetSrc ?? "near-analytics.near").split("/", 1)[0];

const nearNFDevsWidgetsAccountId =
  props.nearNFDevsWidgetsAccountId ||
  (context.widgetSrc ?? "near-analytics.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearNFDevsContractAccountId: props.nearNFDevsContractAccountId,
    nearNFDevsWidgetsAccountId: props.nearNFDevsWidgetsAccountId,
    referral: props.referral,
  };

  return (
    <Widget
      src={`${nearNFDevsWidgetsAccountId}/widget/townhall-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };

  if (props.nearNFDevsContractAccountId) {
    linkProps.nearNFDevsContractAccountId = props.nearNFDevsContractAccountId;
  }

  if (props.nearNFDevsWidgetsAccountId) {
    linkProps.nearNFDevsWidgetsAccountId = props.nearNFDevsWidgetsAccountId;
  }

  if (props.referral) {
    linkProps.referral = props.referral;
  }

  const linkPropsQuery = Object.entries(linkProps)
    .filter(([_key, nullable]) => (nullable ?? null) !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `/#/${nearNFDevsWidgetsAccountId}/widget/townhall-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

//////////////////////////////////////////////////////////////////////
///STOPWORDS//////////////////////////////////////////////////////////
const stopWords = [
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "and",
  "any",
  "are",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "can",
  "cannot",
  "could",
  "did",
  "does",
  "doing",
  "down",
  "during",
  "each",
  "etc",
  "few",
  "for",
  "from",
  "further",
  "had",
  "has",
  "have",
  "having",
  "her",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "into",
  "its",
  "itself",
  "just",
  "more",
  "most",
  "myself",
  "nor",
  "not",
  "now",
  "off",
  "once",
  "only",
  "other",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "she",
  "should",
  "some",
  "still",
  "such",
  "than",
  "that",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "too",
  "under",
  "until",
  "very",
  "was",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "will",
  "with",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
  "www",
  "http",
  "com",
];

const stopWordsDictionary = {};
for (let i = 0; i < stopWords.length; i++) {
  stopWordsDictionary[stopWords[i]] = true;
}

function isStopWord(word) {
  return stopWordsDictionary.hasOwnProperty(word.toLowerCase());
}
//////////////////////////////////////////////////////////////////////
///SYNONYMS///////////////////////////////////////////////////////////
const synonyms = {
  ether: "ethereum",
  eth: "ethereum",
  either: "ethereum",
  app: "application",
  cryptocyrrency: "crypto",
  developerdao: "devdao",
  dev: "develop",
  doc: "document",
  lib: "librari",
  saw: "see",
  seen: "see",
  tweet: "twitter",
  paid: "pai",
  src: "sourc",
};
