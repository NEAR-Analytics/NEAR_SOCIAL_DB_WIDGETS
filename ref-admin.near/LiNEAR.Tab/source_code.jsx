const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #142427;
  border-radius: 8px;
  padding: 6px;
  margin:20px 30px 0 30px;
`;

const TabItem = styled.div`
flex-grow:1;
   display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-o;
`;

const tabName = props.tabName || "stake";
return (
  <TabContainer>
    <TabItem
      style={{
        background: tabName === "stake" ? "#273C41" : "transparent",
        color: tabName === "stake" ? "#fff" : "#7E96A8",
      }}
      onClick={() => props.updateTabName("stake")}
    >
      Stake
    </TabItem>
    <TabItem
      style={{
        background: tabName === "unstake" ? "#273C41" : "transparent",
        color: tabName === "unstake" ? "#fff" : "#7E96A8",
      }}
      onClick={() => props.updateTabName("unstake")}
    >
      Unstake
    </TabItem>
  </TabContainer>
);
