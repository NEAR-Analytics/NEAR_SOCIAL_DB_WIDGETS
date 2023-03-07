let page = (
  <div>
    <h1 style={{ paddingTop: "25px", paddingBottom: "0px" }}>
      Top Trending Words On Near Social
      <small class="text-muted">in the last 7 days</small>
    </h1>
    <p>
      <b>Data refreshes every 24 hours</b> || Powered by
      <a href="https://flipsidecrypto.xyz/edit/queries/560bedac-81df-447d-8e8a-33bfddbbaeaa">
        Flipside
      </a>
      ,
      <a href="https://replit.com/@OOlajide/weekly-trending-words#main.py">
        Replit
      </a>
      &
      <a href="https://cloudinary.com/documentation/django_image_and_video_upload">
        Cloudinary
      </a>
      (CDN image host)
    </p>
    <img src="https://res.cloudinary.com/dplzsiucm/image/upload/trending.png"></img>
  </div>
);

return (
  <div>
    <div>{page}</div>
  </div>
);
