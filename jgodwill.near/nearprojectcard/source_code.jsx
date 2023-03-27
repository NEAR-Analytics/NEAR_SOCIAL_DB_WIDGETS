// truncate text and add an ellipsis if needed
const truncateText = (text, characters) => {
  if (!text) return "";
  return `${text.substring(0, characters)}${
    text.length > characters ? "..." : ""
  }`;
};

return (
  <div className={styles.container}>
    <div className={styles.projectTitle}>
      <div className={styles.projectIconWrapper}>
        <img
          src={
            props.projectData.Icon ||
            "https://images.pexels.com/photos/10175905/pexels-photo-10175905.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          }
          alt="Project Icon"
        />
      </div>
      <div className={styles.projectInfo}>
        <span className={styles.projectName}>
          {props.projectData.ProjectName || "Project Name"}
        </span>
        <span className={styles.projectCategory}>
          {truncateText(props.projectData.Category, 20) || "Category"}
        </span>
      </div>
    </div>
    <span className={styles.projectSubtitle}>
      {truncateText(props.projectData.Subtitle, 60)}
    </span>
    <div className={styles.projectLinks}>Icons</div>
  </div>
);
