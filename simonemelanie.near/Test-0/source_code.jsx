<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Near Social</title>
  </head>
  <body>
    <div id="container"></div>
    <script src="https://cdn.jsdelivr.net/npm/@near/ft-contract-metadata-distributor"></script>
    <script src="https://cdn.jsdelivr.net/npm/@near/ft-contract-standard"></script>
    <script src="https://cdn.jsdelivr.net/npm/near-api-js"></script>
    <script src="https://cdn.jsdelivr.net/npm/regenerator-runtime"></script>
    <script src="https://unpkg.com/@babel/polyfill"></script>
    <script>
      const endpoint = 'https://api.near.org/graphql';
      const query = `
        query($accountId: String!, $fromIndex: Int!, $limit: Int!) {
          transactions(
            accountId: $accountId,
            actions: ["TRANSFER"],
            receiverIn: ["near"],
            fromIndex: $fromIndex,
            limit: $limit,
          ) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            nodes {
              action
              blockTimestamp
              args
              hash
              receipt {
                receiverId
              }
            }
          }
        }`;

      const variables = {
        accountId: 'near',
        fromIndex: 0,
        limit: 5,
      };

      async function fetchGraphQL(query, variables) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        });
        const responseBody = await response.json();
        if (responseBody.errors) {
          throw new Error(responseBody.errors.map((e) => e.message).join(', '));
        }
        return responseBody.data;
      }

      async function loadPosts() {
        try {
          const data = await fetchGraphQL(query, variables);
          const transactions = data.transactions.nodes;
          const posts = transactions.map((transaction) => {
            const { args, blockTimestamp } = transaction;
            const [receiverId, tokenAmount] = args;
            return {
              title: `${receiverId} received ${tokenAmount} tokens`,
              date: new Date(blockTimestamp / 1000000).toLocaleString(),
              likes: Math.floor(Math.random() * 100),
              comments: Math.floor(Math.random() * 20),
              imageURL: 'https://picsum.photos/200/300?random=' + Math.random(),
            };
          });
          displayImages(posts);
        } catch (error) {
          console.error(error);
        }
      }

  function displayImages(posts) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    posts.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.className = 'post';
      const titleElement = document.createElement('h2');
      titleElement.innerHTML = post.title;
      const dateElement = document.createElement('p');
      dateElement.innerHTML = post.date;
      const imageElement = document.createElement('img');
      imageElement.src = post.imageURL;
      const likesElement = document.createElement('p');
      likesElement.innerHTML = `${post.likes} likes`;
      const commentsElement = document.createElement('p');
      commentsElement.innerHTML = `${post.comments} comments`;

      postElement.appendChild(titleElement);
      postElement.appendChild(dateElement);
      postElement.appendChild(imageElement);
      postElement.appendChild(likesElement);
      postElement.appendChild(commentsElement);
      container.appendChild(postElement);
    });
  }

         
