const Wrapper = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #687076;

  > * {
    margin-bottom: 12px;
  }

  p {
    white-space: pre-line;
  }

  a {
    color: #006ADC !important;
    outline: none;
    font-weight: 600;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  img {
    display: block;
    max-width: 100%;
    max-height: 20em;
  }
`;

const renderMention =
  props.renderMention ??
  ((accountId) => (
    <Widget
      key={accountId}
      src="calebjacob.near/widget/AccountProfileInline"
      props={{
        accountId,
      }}
    />
  ));

return (
  <Wrapper>
    <Markdown text={props.text} onMention={renderMention} />
  </Wrapper>
);
