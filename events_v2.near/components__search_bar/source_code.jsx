if (!state) {
  const fields = Object.entries(props.fields || {}).map(([key, weight]) => {
    return { key, weight };
  });
  State.init({ all: props.items || [], filtered: [], term: '', fields });
  return props.__engine.loading();
}

function scoreWord(word, termWord, weight) {
  let score = 0;

  if (word === termWord) {
    score = 1;
  } else if (word.startsWith(termWord)) {
    score = 0.8;
  } else if (word.endsWith(termWord)) {
    score = 0.6;
  } else if (word.includes(termWord)) {
    score = 0.4;
  }

  return score * weight;
}

function scoreItem(item) {
  const term = state.term.toLowerCase();

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
  margin: 8px;
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
