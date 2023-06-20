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

const applySynonym = (word) => {
  if (synonyms.hasOwnProperty(word.toLowerCase())) {
    return synonyms[word];
  }
  return word;
};
//////////////////////////////////////////////////////////////////////
///STEMMING///////////////////////////////////////////////////////////
const step2list = {
  ational: "ate",
  tional: "tion",
  enci: "ence",
  anci: "ance",
  izer: "ize",
  bli: "ble",
  alli: "al",
  entli: "ent",
  eli: "e",
  ousli: "ous",
  ization: "ize",
  ation: "ate",
  ator: "ate",
  alism: "al",
  iveness: "ive",
  fulness: "ful",
  ousness: "ous",
  aliti: "al",
  iviti: "ive",
  biliti: "ble",
  logi: "log",
};

/** @type {Record<string, string>} */
const step3list = {
  icate: "ic",
  ative: "",
  alize: "al",
  iciti: "ic",
  ical: "ic",
  ful: "",
  ness: "",
};

const gt0 = /^([^aeiou][^aeiouy]*)?([aeiouy][aeiou]*)([^aeiou][^aeiouy]*)/;
const eq1 =
  /^([^aeiou][^aeiouy]*)?([aeiouy][aeiou]*)([^aeiou][^aeiouy]*)([aeiouy][aeiou]*)?$/;
const gt1 =
  /^([^aeiou][^aeiouy]*)?(([aeiouy][aeiou]*)([^aeiou][^aeiouy]*)){2,}/;
const vowelInStem = /^([^aeiou][^aeiouy]*)?[aeiouy]/;
const consonantLike = /^([^aeiou][^aeiouy]*)[aeiouy][^aeiouwxy]$/;

// Exception expressions.
const sfxLl = /ll$/;
const sfxE = /^(.+?)e$/;
const sfxY = /^(.+?)y$/;
const sfxIon = /^(.+?(s|t))(ion)$/;
const sfxEdOrIng = /^(.+?)(ed|ing)$/;
const sfxAtOrBlOrIz = /(at|bl|iz)$/;
const sfxEED = /^(.+?)eed$/;
const sfxS = /^.+?[^s]s$/;
const sfxSsesOrIes = /^.+?(ss|i)es$/;
const sfxMultiConsonantLike = /([^aeiouylsz])\1$/;
const step2 =
  /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
const step3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
const step4 =
  /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;

/**
 * Get the stem from a given value.
 *
 * @param {string} value
 *   Value to stem.
 * @returns {string}
 *   Stem for `value`
 */
// eslint-disable-next-line complexity
function stemmer(value) {
  let result = value.toLowerCase();

  // Exit early.
  if (result.length < 3) {
    return result;
  }

  /** @type {boolean} */
  let firstCharacterWasLowerCaseY = false;

  // Detect initial `y`, make sure it never matches.
  if (
    result.codePointAt(0) === 121 // Lowercase Y
  ) {
    firstCharacterWasLowerCaseY = true;
    result = "Y" + result.slice(1);
  }

  // Step 1a.
  if (sfxSsesOrIes.test(result)) {
    // Remove last two characters.
    result = result.slice(0, -2);
  } else if (sfxS.test(result)) {
    // Remove last character.
    result = result.slice(0, -1);
  }

  /** @type {RegExpMatchArray|null} */
  let match;

  // Step 1b.
  if ((match = sfxEED.exec(result))) {
    if (gt0.test(match[1])) {
      // Remove last character.
      result = result.slice(0, -1);
    }
  } else if ((match = sfxEdOrIng.exec(result)) && vowelInStem.test(match[1])) {
    result = match[1];

    if (sfxAtOrBlOrIz.test(result)) {
      // Append `e`.
      result += "e";
    } else if (sfxMultiConsonantLike.test(result)) {
      // Remove last character.
      result = result.slice(0, -1);
    } else if (consonantLike.test(result)) {
      // Append `e`.
      result += "e";
    }
  }

  // Step 1c.
  if ((match = sfxY.exec(result)) && vowelInStem.test(match[1])) {
    // Remove suffixing `y` and append `i`.
    result = match[1] + "i";
  }

  // Step 2.
  if ((match = step2.exec(result)) && gt0.test(match[1])) {
    result = match[1] + step2list[match[2]];
  }

  // Step 3.
  if ((match = step3.exec(result)) && gt0.test(match[1])) {
    result = match[1] + step3list[match[2]];
  }

  // Step 4.
  if ((match = step4.exec(result))) {
    if (gt1.test(match[1])) {
      result = match[1];
    }
  } else if ((match = sfxIon.exec(result)) && gt1.test(match[1])) {
    result = match[1];
  }

  // Step 5.
  if (
    (match = sfxE.exec(result)) &&
    (gt1.test(match[1]) ||
      (eq1.test(match[1]) && !consonantLike.test(match[1])))
  ) {
    result = match[1];
  }

  if (sfxLl.test(result) && gt1.test(result)) {
    result = result.slice(0, -1);
  }

  // Turn initial `Y` back to `y`.
  if (firstCharacterWasLowerCaseY) {
    result = "y" + result.slice(1);
  }

  return result;
}

//////////////////////////////////////////////////////////////////////
///SPELLCHECK/////////////////////////////////////////////////////////
function levenshteinDistance(s, t, threshold) {
  const BIG_NUMBER = 10000;
  if (s == null || t == null) {
    return BIG_NUMBER;
  }
  if (threshold < 0) {
    return BIG_NUMBER;
  }
  let n = s.length;
  let m = t.length;
  if (Math.abs(n - m) >= threshold) {
    return BIG_NUMBER;
  }

  // if one string is empty, the edit distance is necessarily the length of the other
  if (n == 0) {
    return m <= threshold ? m : BIG_NUMBER;
  } else if (m == 0) {
    return n <= threshold ? n : BIG_NUMBER;
  }

  if (n > m) {
    // swap the two strings to consume less memory
    let temp = s;
    s = t;
    t = temp;
    let tempSize = n;
    n = m;
    m = tempSize;
  }

  let p = Array.from({ length: n + 1 }, () => 0); // 'previous' cost array, horizontally
  let d = Array.from({ length: n + 1 }, () => 0); // cost array, horizontally
  let _d; // placeholder to assist in swapping p and d

  // fill in starting table values
  const boundary = Math.min(n, threshold) + 1;
  for (let i = 0; i < boundary; i++) {
    p[i] = i;
  }
  // these fills ensure that the value above the rightmost entry of our
  // stripe will be ignored in following loop iterations
  for (let i = boundary; i < p.length; i++) {
    p[i] = BIG_NUMBER;
  }
  for (let i = 0; i < d.length; i++) {
    d[i] = BIG_NUMBER;
  }

  // iterates through t
  for (let j = 1; j <= m; j++) {
    const t_j = t.charAt(j - 1); // jth character of t
    d[0] = j;

    // compute stripe indices, constrain to array size
    const min = Math.max(1, j - threshold);
    const max = j > BIG_NUMBER - threshold ? n : Math.min(n, j + threshold);

    // the stripe may lead off of the table if s and t are of different sizes
    if (min > max) {
      return BIG_NUMBER;
    }

    // ignore entry left of leftmost
    if (min > 1) {
      d[min - 1] = BIG_NUMBER;
    }

    // iterates through [min, max] in s
    for (let i = min; i <= max; i++) {
      if (s.charAt(i - 1) == t_j) {
        // diagonally left and up
        d[i] = p[i - 1];
      } else {
        // 1 + minimum of cell to the left, to the top, diagonally left and up
        d[i] = 1 + Math.min(Math.min(d[i - 1], p[i]), p[i - 1]);
      }
    }

    // copy current distance counts to 'previous row' distance counts
    _d = p;
    p = d;
    d = _d;
  }
  // we don't need to check for threshold here because we did it inside the loop
  return p[n] <= threshold ? p[n] : BIG_NUMBER;
}
