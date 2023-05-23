const widgetList = props.widgetList || [];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Item = styled.div``;

if (widgetList.length == 0) { return "Please define widgets for the community" }

return (
  <Wrapper>
    <Items>
      {
        widgetList.map(widgetSrc => 
          <Item> <Widget src={widgetSrc} /> </Item>
        )
      }
    </Items>
  </Wrapper>
);