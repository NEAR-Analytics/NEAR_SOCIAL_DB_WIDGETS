const { tab, changeTab } = props;

const TagWrapper = styled.div`
  display: flex;
  align-items:center;
  padding-bottom: 16px;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 500;
  margin-top: 55px;
`;

const Box = styled.div`
    opacity: ${(p) => (p.chosed ? "1" : "0.6")};
    margin-right: 70px;
    cursor: pointer;
`;

const SeperatorLine = styled.div`
    width: 100%;
    height: 2px;
    background:#002C35;
`;

const BoxLine = styled.div`
    height: 4px;
    width: 100%;
    background: ${(p) => (p.chosed ? "#00FFD1" : "transparent")} ;
    position:relative;
    top:19px
`;

return (
  <div>
    <TagWrapper>
      {["Templates", "Components"].map((tabNew) => {
        return (
          <div>
            <Box
              chosed={tab === tabNew}
              onClick={() => {
                changeTab(tabNew);
              }}
            >
              {tabNew}

              {<BoxLine chosed={tab === tabNew}></BoxLine>}
            </Box>
          </div>
        );
      })}
    </TagWrapper>

    <SeperatorLine></SeperatorLine>
  </div>
);
