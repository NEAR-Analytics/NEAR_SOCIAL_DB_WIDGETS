const cards = props.cards;

return (
  <div className="row card-group py-3">
    {cards.map((card) => {
      return (
        <>
          {
            //<Widget src="" props={}/>
          }
          {
            // Example
            //
            //
            //
            // <div
            //   className="col-sm-12 col-lg-6 col-2xl-4 gy-3"
            //     key={element.articleId}
            // >
            //   <div className="card h-100">
            //     <div className="card-body">
            //       <div className="row d-flex justify-content-center">
            //         <h5 className="card-title text-center pb-2 border-bottom">
            //           {article.articleId}
            //         </h5>
            //         <div className="col flex-grow-1">
            //           <Widget
            //             src="mob.near/widget/Profile.ShortInlineBlock"
            //             props={{ accountId: article.author, tooltip: true }}
            //           />
            //         </div>
            //         <div className="col flex-grow-0">
            //           <p className="card-subtitle text-muted text-end">
            //             {getDateLastEdit(article.timeCreate).date}
            //           </p>
            //           <p className="card-subtitle text-muted text-end">
            //             {getDateLastEdit(article.timeCreate).time}
            //           </p>
            //         </div>
            //       </div>
            //       <div
            //         className="mt-3 alert alert-secondary"
            //         style={{ backgroundColor: "white" }}
            //       >
            //         <div>
            //           Last edit by
            //           <a
            //             href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${article.lastEditor}`}
            //             style={{ textDecoration: "underline" }}
            //           >
            //             {article.lastEditor}
            //           </a>
            //           <br />
            //           Edited on {getDateLastEdit(article.timeLastEdit).date}
            //           <br />
            //           Edit versions: {article.version}
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            //</div>
          }
        </>
      );
    })}
  </div>
);
