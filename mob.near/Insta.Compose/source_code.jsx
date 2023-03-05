State.init({
  loading: false,
});

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

const filesOnChange = (files) => {
  if (files?.length > 0) {
    State.update({
      loading: true,
    });
    const body = files[0];
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    })
      .then((res) => {
        const content = {
          type: "insta",
          image: { ipfs_cid: res.body.cid },
        };
        const data = {
          post: {
            insta: JSON.stringify(content),
          },
          index: {
            post: JSON.stringify({
              key: "insta",
              value: {
                type: "insta",
              },
            }),
          },
        };
        State.update({
          uploaded: true,
        });
        Social.set(data, {
          force: true,
          onCommit: () => {
            setTimeout(() => {
              State.update({
                uploaded: false,
              });
            }, 3500);
          },
        });
      })
      .finally(() => {
        State.update({
          loading: false,
        });
      });
  } else {
    State.update({
      img: null,
    });
  }
};

const Wrapper = styled.div`
  @media (min-width: 576px) {
    max-width: 288px;
  }
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const loader = (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

return (
  <Wrapper className="text-bg-light ratio ratio-1x1">
    <Files
      multiple={false}
      accepts={["image/*"]}
      minFileSize={1}
      clickable
      onChange={filesOnChange}
      className="btn"
    >
      {state.uploaded ? (
        <div>
          {loader}
          Posting
        </div>
      ) : state.loading ? (
        <div>{loader} Uploading</div>
      ) : (
        <div>
          <i className="bi bi-cloud-arrow-up" />
          Upload a photo
        </div>
      )}
    </Files>
  </Wrapper>
);
