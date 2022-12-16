let brightStarImage =
  "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-1024.png";

let darkStarImage =
  "https://cdn0.iconfinder.com/data/icons/typicons-2/24/star-512.png";

let starStyle = {
  width: "8vw",
};

const startRatingStatic = (ratingValue, val) => {
  console.log(ratingValue);
  return (
    <label>
      <img
        name="rating"
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

return (
  <div>
    <h2>Average Rating </h2>
    {[...Array(5)].map((star, i) => {
      const ratingValue = i + 1;
      return startRatingStatic(ratingValue, props.value || 0);
    })}
  </div>
);
