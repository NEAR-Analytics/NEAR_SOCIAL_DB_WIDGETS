if (!context.accountId) {
  return "";
}

State.init({
  image: {},
  text: "",
});

function extractMentions(text) {
  const mentionRegex =
    /@((?:(?:[a-z\d]+[-_])*[a-z\d]+\.)*(?:[a-z\d]+[-_])*[a-z\d]+)/gi;
  mentionRegex.lastIndex = 0;
  const accountIds = new Set();
  for (const match of text.matchAll(mentionRegex)) {
    if (
      !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
      !/[/\w`]/.test(match.input.charAt(match.index + match[0].length)) &&
      match[1].length >= 2 &&
      match[1].length <= 64
    ) {
      accountIds.add(match[1].toLowerCase());
    }
  }
  return [...accountIds];
}

function extractTagNotifications(text, item) {
  return extractMentions(text || "")
    .filter((accountId) => accountId !== context.accountId)
    .map((accountId) => ({
      key: accountId,
      value: {
        type: "mention",
        item,
      },
    }));
}

function composeData() {
  const data = {
    post: {
      main: JSON.stringify({
        type: "md",
        text: state.text,
        image: state.image.cid ? { ipfs_cid: state.image.cid } : undefined,
      }),
    },
    index: {
      post: JSON.stringify({
        key: "main",
        value: {
          type: "md",
        },
      }),
    },
  };

  const notifications = extractTagNotifications(state.text, {
    type: "social",
    path: `${context.accountId}/post/main`,
  });

  if (notifications.length) {
    data.index.notify = JSON.stringify(
      notifications.length > 1 ? notifications : notifications[0]
    );
  }

  return data;
}

function onCommit() {
  console.log("committed!");
}

const Wrapper = styled.div`
  position: relative;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  pointer-events: none;
  position: absolute;
  top: 24px;
  left: 24px;

  img {
    object-fit: cover;
    border-radius: 40px;
    width: 100%;
  }
`;

const Textarea = styled.div`
  display: grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  align-items: stretch;
  
  &::after,
  textarea {
    width: 100%;
    min-width: 1em;
    height: unset;
    min-height: 130px;
    font: inherit;
    padding: 24px 24px 24px 88px;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
    grid-area: 1 / 1;
    overflow: hidden;
    outline: none;
  }
  
  &::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: end;
  gap: 12px;
  padding: 0 24px 24px 24px;

  .commit-post-button {
    background: #0091FF;
    color: #fff;
    border-radius: 6px;
    height: 40px;
    padding: 0 35px;
    font-weight: 600;
    font-size: 14px;
    border: none;
    cursor: pointer;
    transition: background 200ms, opacity 200ms;

    &:hover,
    &:focus {
      background: #076fbf;
      outline: none;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .upload-image-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F1F3F5;
    color: #006ADC;
    border-radius: 6px;
    height: 40px;
    min-width: 40px;
    font-size: 0;
    border: none;
    cursor: pointer;
    transition: background 200ms, opacity 200ms;

    &::before {
      font-size: 16px;
    }

    &:hover,
    &:focus {
      background: #d7dbde;
      outline: none;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    span {
      margin-left: 12px;
    }
  }

  .d-inline-block {
    display: flex !important;
    gap: 12px;
    margin: 0 !important;

    .overflow-hidden {
      width: 40px !important;
      height: 40px !important;
    }
  }
`;

console.log(composeData());

return (
  <Wrapper>
    <Avatar>
      <img src="https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreibhm4kokjpetrr7ztaixyanzbn5djvj4h4ryjshsfh2hgpi3v7uqu" />
    </Avatar>

    <Textarea data-value={state.text}>
      <textarea
        placeholder="What's happening?"
        onInput={(event) => State.update({ text: event.target.value })}
      ></textarea>
    </Textarea>

    <Actions>
      <IpfsImageUpload
        image={state.image}
        className="upload-image-button bi bi-image"
      />

      <CommitButton
        disabled={!state.text}
        force
        data={composeData}
        onCommit={onCommit}
        className="commit-post-button"
      >
        Post
      </CommitButton>
    </Actions>
  </Wrapper>
);
