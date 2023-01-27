const { filteredArticles, getDateLastEdit } = props;
return (
  <ol>
    {filteredArticles &&
      filteredArticles.map((article, index) => (
        <li key={article.articleId}>
          <a href="" onClick={(e) => handleArticle(e, article)}>
            {article.articleId}{" "}
            <small>
              (author: {article.author}
              {getDateLastEdit(article.timeLastEdit)})
            </small>
          </a>
        </li>
      ))}
  </ol>
);
