const fields = Object.entries(props.fields || {}).map(([key, weight]) => {
  return { key, weight };
});

if (!state) {
  const items = props.items || [];
  State.init({ all: items, filtered: [], term: '' });
  return props.__engine.loading();
}

function scoreItem(item) {
  const term = state.term.toLowerCase();

  const itemFields = fields.map((field) => {
    return item[field.key];
  });

  const itemScores = itemFields.map((field) => {
    if (!field) {
      return 0;
    }

    return field
      .toLowerCase()
      .split(/[ ,\w]+/giu)
      .map((word) => {
        const index = word.indexOf(term);
        if (index === -1) {
          return 0;
        }

        return 1 / (index + 1);
      })
      .map((score) => {
        return score * (field.weight || 1);
      })
      .reduce((a, b) => a + b, 0);
  });

  return itemScores.reduce((a, b) => a + b, 0);
}

function buildSubset(item) {
  fields.reduce((acc, field) => {
    const value = item[field.key];

    if (!value) {
      return acc;
    }

    acc[field.key] = value;
    return acc;
  }, {});
}

const items = state.all.map((item) => {
  const subset = buildSubset(item);
  const score = scoreItem(subset);

  return {
    item,
    score,
    subset,
  };
});

const hasChanged = JSON.stringify(items) !== JSON.stringify(state.items);
if (hasChanged) {
  props.onSearch(items);
  State.update({ items });
  console.log('searching', { items });
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
