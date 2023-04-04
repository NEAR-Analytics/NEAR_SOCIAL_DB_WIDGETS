const Toggle = styled.div`
    border-radius: 16px;
    border: 0.8px solid #D7E0E4;
    background-color: ${
      props.disabled
        ? "#E5E6E9"
        : props.active === props.key
        ? "#ceff1a"
        : "#ffffff"
    };
    font-weight: 500;
    font-family: "Aeonik Fono", Arial;
    font-size: 1.125rem;
    color: #0c2246;
    line-height: 18px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 16px;
    padding-bottom: 32px;
    column-gap: 8px;
    width: 210px;
    height: 90px;
    &:hover {
    cursor: pointer;
    }
  `;
const Title = styled.span`
    letter-spacing: 1px;
    margin-left: 1px;
    margin-right: 6px;
  `;
const Icon = styled.img`
    width: 40px;
    height: 40px;
    margin-left: 24px;
    object-fit: cover;
  `;
return (
  <Toggle
    className={props.className || ""}
    onClick={() => props.onClickTab(props.key)}
  >
    <Title>{props.name || "Stake"}</Title>
    <i class={`bi ${props.icon || "bi-arrow-bar-up"}`}></i>
  </Toggle>
);
