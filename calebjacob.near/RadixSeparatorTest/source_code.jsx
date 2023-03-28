const Wrapper = styled.div`
.SeparatorRoot {
  background-color: var(--violet6);
}
.SeparatorRoot[data-orientation='horizontal'] {
  height: 1px;
  width: 100%;
}
.SeparatorRoot[data-orientation='vertical'] {
  height: 100%;
  width: 1px;
}

.Text {
  color: black;
  font-size: 15px;
  line-height: 20px;
}`;

return (
  <Wrapper>
    <div style={{ width: "100%", maxWidth: 300, margin: "0 15px" }}>
      <div className="Text" style={{ fontWeight: 500 }}>
        Radix Primitives
      </div>
      <div className="Text">An open-source UI component library.</div>
      <Separator.Root className="SeparatorRoot" style={{ margin: "15px 0" }} />
      <div style={{ display: "flex", height: 20, alignItems: "center" }}>
        <div className="Text">Blog</div>
        <Separator.Root
          className="SeparatorRoot"
          decorative
          orientation="vertical"
          style={{ margin: "0 15px" }}
        />
        <div className="Text">Docs</div>
        <Separator.Root
          className="SeparatorRoot"
          decorative
          orientation="vertical"
          style={{ margin: "0 15px" }}
        />
        <div className="Text">Source</div>
      </div>
    </div>
  </Wrapper>
);
