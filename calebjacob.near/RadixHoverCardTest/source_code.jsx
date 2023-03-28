const Wrapper = styled.div`
/* reset */
a {
  all: unset;
}

@keyframes showCard {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.HoverCardContent {
  border-radius: 6px;
  padding: 20px;
  width: 300px;
  background-color: white;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation: showCard 200ms;
  will-change: transform, opacity;
}

.HoverCardArrow {
  fill: white;
}

.ImageTrigger {
  cursor: pointer;
  border-radius: 100%;
  display: inline-block;
}
.ImageTrigger:focus {
  box-shadow: 0 0 0 2px white;
}

.Image {
  display: block;
  border-radius: 100%;
}
.Image.normal {
  width: 45px;
  height: 45px;
}
.Image.large {
  width: 60px;
  height: 60px;
}

.Text {
  margin: 0;
  color: var(--mauve12);
  font-size: 15px;
  line-height: 1.5;
}
.Text.faded {
  color: var(--mauve10);
}
.Text.bold {
  font-weight: 500;
}

`;

return (
  <Wrapper>
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <a
          className="ImageTrigger"
          href="https://twitter.com/radix_ui"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            className="Image normal"
            src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
            alt="Radix UI"
          />
        </a>
      </HoverCard.Trigger>

      <HoverCard.Content className="HoverCardContent" sideOffset={5}>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <img
            className="Image large"
            src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
            alt="Radix UI"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <div>
              <div className="Text bold">Radix</div>
              <div className="Text faded">@radix_ui</div>
            </div>
            <div className="Text">
              Components, icons, colors, and templates for building
              high-quality, accessible UI. Free and open-source.
            </div>
            <div style={{ display: "flex", gap: 15 }}>
              <div style={{ display: "flex", gap: 5 }}>
                <div className="Text bold">0</div>{" "}
                <div className="Text faded">Following</div>
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                <div className="Text bold">2,900</div>{" "}
                <div className="Text faded">Followers</div>
              </div>
            </div>
          </div>
        </div>

        <HoverCard.Arrow className="HoverCardArrow" />
      </HoverCard.Content>
    </HoverCard.Root>
  </Wrapper>
);
