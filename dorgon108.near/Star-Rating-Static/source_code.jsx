const startRatingStatic = (ratingValue, val) => {
  return (
    <label key={ratingValue}>
      <img
        name="rating"
        // onMouseEnter={() => setRating(ratingValue)}
        // onMouseOut={() => setRating(null)}
        onClick={() => {
          console.log("clicked");
          setRating(ratingValue);
        }}
        style={starStyle}
        src={ratingValue <= val ? brightStarImage : darkStarImage}
      />
    </label>
  );
};

return [...Array(5)].map((star, i) => {
  const ratingValue = i + 1;
  return startRatingStatic(ratingValue, props.value);
});
