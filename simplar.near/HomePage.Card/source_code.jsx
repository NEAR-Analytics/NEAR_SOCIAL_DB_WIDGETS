const title = props.title;
const img = props.img;
const text = props.text;

const styles = {
  img: {
    minWidth: "100%",
    height: "auto"
  },
  
  imgContainer: {
    maxHeight: "8rem",
    overflow: "hidden"
  }
}

return <>
  <div class="card mb-4">
    <div class="img-container" style={styles.imgContainer}>
      <img class="card-img-top" src={img} style={styles.img} alt="Card image" />
    </div>
    <div class="card-body">
      <h5 class="card-title">{title}</h5>
      <p class="card-text"> {text} </p>
    </div>
  </div>
</>