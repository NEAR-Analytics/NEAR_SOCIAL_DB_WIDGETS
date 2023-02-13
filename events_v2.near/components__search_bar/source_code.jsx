if (!state) {
  const fields = Object.entries(props.fields || {}).map(([key, weight]) => {
    return { key, weight };
  });
  State.init({ all: props.items || [], filtered: [], term: '', fields });
  return props.__engine.loading();
}

function scoreWord(word, termWord, weight) {
  let score = 1;

  if (word === termWord) {
    score += 1;
    console.log('words match', word, { score });
  } else if (word.startsWith(termWord)) {
    score += 0.5;
    console.log('word starts with term', word, termWord, { score });
  } else if (word.endsWith(termWord)) {
    score += 0.33;
    console.log('word ends with term', word, termWord, { score });
  } else if (word.includes(termWord)) {
    score += 0.2;
    console.log('word includes term', word, termWord, word.indexOf(termWord), {
      score,
    });
  }

  if (termWord === word) {
    score += 1;
    console.log('term words match', termWord, { score });
  } else if (termWord.startsWith(word)) {
    score += 0.5;
    console.log('term word starts with word', termWord, word, { score });
  } else if (termWord.endsWith(word)) {
    score += 0.33;
    console.log('term word ends with word', termWord, word, { score });
  } else if (termWord.includes(word)) {
    score += 0.2;
    console.log(
      'term word includes word',
      termWord,
      word,
      termWord.indexOf(word),
      { score }
    );
  }

  if (word.length === termWord.length) {
    score += 0.05;
    console.log('words are same length', word.length, { score });
  }

  return score * weight;
}

function scoreItem(item) {
  const term = state.term.toLowerCase().trim();
  if (term === '') {
    return 1;
  }

  const termWords = term.split(/[,\-_\s]+/giu);

  const itemScores = state.fields.map((field) => {
    const fieldValue = item[field.key];

    if (!fieldValue) {
      return 0;
    }

    return fieldValue
      .toLowerCase()
      .split(/[,\-_\s]+/giu)
      .map((word) => {
        return termWords.reduce((acc, termWord) => {
          return acc + scoreWord(word, termWord, field.weight);
        }, 0);
      })
      .reduce((a, b) => a + b, 0);
  });

  return itemScores.reduce((a, b) => a + b, 0);
}

function buildSubset(item) {
  return state.fields.reduce((acc, field) => {
    const value = item[field.key];

    if (!value) {
      return acc;
    }

    acc[field.key] = value;
    return acc;
  }, {});
}

const items = state.all
  .map((item) => {
    const subset = buildSubset(item);
    const score = scoreItem(subset);

    return {
      item,
      score,
      subset,
    };
  })
  .sort((a, b) => {
    return b.score - a.score;
  })
  .filter((item) => {
    return item.score > 0;
  });

const hasChanged = JSON.stringify(items) !== JSON.stringify(state.items);

if (hasChanged) {
  props.onSearch(items);
  State.update({ items });
}

const Searchbar = styled.input`
  width: auto;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0;
  outline: none;
  font-size: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  z-index: 1;

  &:focus {
    outline: none;
    border-color: #333;
  }

  &::placeholder {
    color: #999;
  }
`;

return (
  <div style={{ position: 'relative' }}>
    <Searchbar
      onChange={(e) => {
        const term = e.target.value;
        State.update({ term });
      }}
      placeholder="Search for events"
    />
  </div>
);
