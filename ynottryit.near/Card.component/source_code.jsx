const cardStyles = {
  container: {
    display: "flex",
    height: 100,
    width: 400,
    boxShadow: "0 0 2px 1px #3457D5",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
  profilePicture: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3457D5",
    color: "white",
    height: 20,
    width: 20,
    borderRadius: "50%",
    padding: 10,
    fontWeight: "bold",
  },
  bio: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: "bold",
  },
};
return (
  <>
    <div style={cardStyles.container}>
      <span style={cardStyles.profilePicture}>R</span>
      <div style={cardStyles.bio}>
        <p style={cardStyles.userName}>Rick Sanchez</p>
        <p>I'm sorry ser, but your opinion means very little to me.</p>
      </div>
    </div>
  </>
);
