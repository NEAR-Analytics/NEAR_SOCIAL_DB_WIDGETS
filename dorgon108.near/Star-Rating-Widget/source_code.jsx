let brightStarImage =
  "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-1024.png";

let darkStarImage =
  "https://cdn0.iconfinder.com/data/icons/typicons-2/24/star-512.png";

let starStyle = {
  width: "8vw",
};

State.init({
  rating: 0,
});

const startRating = (ratingValue) => {
  return (
    <label key={ratingValue}>
      <img
        name="rating"
        // onMouseEnter={() => setRating(ratingValue)}
        // onMouseOut={() => setRating(null)}
        onClick={() => {
          console.log("clicked");
          State.update({ rating: ratingValue });
        }}
        style={starStyle}
        src={ratingValue <= state.rating ? brightStarImage : darkStarImage}
      />
    </label>
  );
};
return (
  <div>
    {[...Array(5)].map((star, i) => {
      const ratingValue = i + 1;
      return startRating(ratingValue);
      console.log(rating);
    })}
  </div>
);
