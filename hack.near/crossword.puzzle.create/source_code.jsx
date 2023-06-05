const createPuzzle = () =>
  Near.call("crossword.puzzle.near", "new_puzzle", {
    answer_pk: "",
    dimensions,
    answers: "",
  });

return (
  <>
    <button onClick={createPuzzle}>Create Puzzle</button>
  </>
);
