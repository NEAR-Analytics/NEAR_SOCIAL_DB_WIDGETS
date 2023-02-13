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
  } else if (word.startsWith(termWord)) {
    score += 0.5;
  } else if (word.endsWith(termWord)) {
    score += 0.33;
  } else if (word.includes(termWord)) {
    score += 0.2;
  }

  if (termWord === word) {
    score += 1;
  } else if (termWord.startsWith(word)) {
    score += 0.5;
  } else if (termWord.endsWith(word)) {
    score += 0.33;
  } else if (termWord.includes(word)) {
    score += 0.2;
  }

  if (word.length === termWord.length) {
    score += 0.05;
  }

  if (word.length > termWord.length) {
    score += 0.025;
  }

  if (word.length < termWord.length) {
    score -= 0.025;
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

const { GRID_PAD, BORDER_RADIUS_DEFAULT, BORDER_DEFAULT, FONT_SIZE_DEFAULT } =
  props.__engine.Constants;

const Searchbar = styled.input`
  width: auto;
  outline: none;

  border: ${BORDER_DEFAULT};
  font-size: ${FONT_SIZE_DEFAULT};
  border-radius: ${BORDER_RADIUS_DEFAULT};
  padding: ${GRID_PAD};
  margin-bottom: ${GRID_PAD};
  z-index: 1;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #999;
  }
`;

return (
  <div style={{ position: 'relative' }}>
    <input
      onChange={(e) => {
        const term = e.target.value;
        State.update({ term });
      }}
      placeholder={props.placeholder || 'Search...'}
      style={{
        width: '100%',
        outline: 'none',
        border: BORDER_DEFAULT,
        fontSize: FONT_SIZE_DEFAULT,
        borderRadius: BORDER_RADIUS_DEFAULT,
        padding: GRID_PAD,
        marginBottom: GRID_PAD,
        zIndex: 1,
      }}
    />
  </div>
);
