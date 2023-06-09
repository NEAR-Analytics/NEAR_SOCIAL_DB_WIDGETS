const Wrapper = styled.div`
.ScrollAreaRoot {
  width: 200px;
  height: 225px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 10px var(--blackA7);
  background-color: white;
  --scrollbar-size: 10px;
}

.ScrollAreaViewport {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.ScrollAreaScrollbar {
  display: flex;
  /* ensures no selection */
  user-select: none;
  /* disable browser handling of all panning and zooming gestures on touch devices */
  touch-action: none;
  padding: 2px;
  background: var(--blackA6);
  transition: background 160ms ease-out;
}
.ScrollAreaScrollbar:hover {
  background: var(--blackA8);
}
.ScrollAreaScrollbar[data-orientation='vertical'] {
  width: var(--scrollbar-size);
}
.ScrollAreaScrollbar[data-orientation='horizontal'] {
  flex-direction: column;
  height: var(--scrollbar-size);
}

.ScrollAreaThumb {
  flex: 1;
  background: var(--mauve10);
  border-radius: var(--scrollbar-size);
  position: relative;
}
/* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
.ScrollAreaThumb::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  min-width: 44px;
  min-height: 44px;
}

.ScrollAreaCorner {
  background: var(--blackA8);
}

.Text {
  color: var(--violet11);
  font-size: 15px;
  line-height: 18px;
  font-weight: 500;
}

.Tag {
  color: var(--mauve12);
  font-size: 13px;
  line-height: 18px;
  margin-top: 10px;
  border-top: 1px solid var(--mauve6);
  padding-top: 10px;
}
`;

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

return (
  <Wrapper>
    <ScrollArea.Root className="ScrollAreaRoot">
      <ScrollArea.Viewport className="ScrollAreaViewport">
        <div style={{ padding: "15px 20px" }}>
          <div className="Text">Tags</div>
          {TAGS.map((tag) => (
            <div className="Tag" key={tag}>
              {tag}
            </div>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
  </Wrapper>
);
