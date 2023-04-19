const postsQuery = `
  query IndexerQuery($offset: Int) {
    roshaan_near_alphaindexer_posts(order_by: {block_height: desc}, offset: $offset, limit: ${LIMIT}) {
      content
    }
  }
`;

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const response = await fetch(
    "https://query-api-hasura-vcqilefdcq-uc.a.run.app/v1/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-role": "roshaan_near",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    }
  );

  if (!response.ok) {
    return null;
  }

  const responseJson = await response.json();
  return responseJson;
}

// Retrieve the latest images from Near Social and display them in a widget
async function displayImages() {
  try {
    const response = await fetchGraphQL(postsQuery, "IndexerQuery", {
      offset: 0,
    });
    if (response === null) {
      return;
    }

    const posts = response.data.roshaan_near_alphaindexer_posts;
    const images = posts
      .map((post) => {
        const content = JSON.parse(post.content);
        if (content.type === "image") {
          return content.src;
        }
      })
      .filter((image) => image !== undefined);
    const container = document.getElementById("image-widget-container");
    images.forEach((image) => {
      const img = document.createElement("img");
      img.src = "https://near.social/images/" + image;
      container.appendChild(img);
    });
  } catch (error) {
    return;
  }
}

displayImages();
