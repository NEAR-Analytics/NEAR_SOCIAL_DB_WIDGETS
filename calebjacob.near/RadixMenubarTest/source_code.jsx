const Wrapper = styled.div`
/* reset */
button,
p {
  all: unset;
}

.NavigationMenuRoot {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 1;
}

.NavigationMenuList {
  display: flex;
  justify-content: center;
  background-color: white;
  padding: 4px;
  border-radius: 6px;
  list-style: none;
  box-shadow: 0 2px 10px var(--blackA7);
  margin: 0;
}

.NavigationMenuTrigger,
.NavigationMenuLink {
  padding: 8px 12px;
  outline: none;
  user-select: none;
  font-weight: 500;
  line-height: 1;
  border-radius: 4px;
  font-size: 15px;
  color: var(--violet11);
}
.NavigationMenuTrigger:focus,
.NavigationMenuLink:focus {
  box-shadow: 0 0 0 2px var(--violet7);
}
.NavigationMenuTrigger:hover,
.NavigationMenuLink:hover {
  background-color: var(--violet3);
}

.NavigationMenuTrigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
}

.NavigationMenuLink {
  display: block;
  text-decoration: none;
  font-size: 15px;
  line-height: 1;
}

.NavigationMenuContent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation-duration: 250ms;
  animation-timing-function: ease;
}
.NavigationMenuContent[data-motion='from-start'] {
  animation-name: enterFromLeft;
}
.NavigationMenuContent[data-motion='from-end'] {
  animation-name: enterFromRight;
}
.NavigationMenuContent[data-motion='to-start'] {
  animation-name: exitToLeft;
}
.NavigationMenuContent[data-motion='to-end'] {
  animation-name: exitToRight;
}
@media only screen and (min-width: 600px) {
  .NavigationMenuContent {
    width: auto;
  }
}

.NavigationMenuIndicator {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 10px;
  top: 100%;
  overflow: hidden;
  z-index: 1;
  transition: width, transform 250ms ease;
}
.NavigationMenuIndicator[data-state='visible'] {
  animation: fadeIn 200ms ease;
}
.NavigationMenuIndicator[data-state='hidden'] {
  animation: fadeOut 200ms ease;
}

.NavigationMenuViewport {
  position: relative;
  transform-origin: top center;
  margin-top: 10px;
  width: 100%;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  height: var(--radix-navigation-menu-viewport-height);
  transition: width, height, 300ms ease;
}
.NavigationMenuViewport[data-state='open'] {
  animation: scaleIn 200ms ease;
}
.NavigationMenuViewport[data-state='closed'] {
  animation: scaleOut 200ms ease;
}
@media only screen and (min-width: 600px) {
  .NavigationMenuViewport {
    width: var(--radix-navigation-menu-viewport-width);
  }
}

.List {
  display: grid;
  padding: 22px;
  margin: 0;
  column-gap: 10px;
  list-style: none;
}
@media only screen and (min-width: 600px) {
  .List.one {
    width: 500px;
    grid-template-columns: 0.75fr 1fr;
  }
  .List.two {
    width: 600px;
    grid-auto-flow: column;
    grid-template-rows: repeat(3, 1fr);
  }
}

.ListItemLink {
  display: block;
  outline: none;
  text-decoration: none;
  user-select: none;
  padding: 12px;
  border-radius: 6px;
  font-size: 15px;
  line-height: 1;
}
.ListItemLink:focus {
  box-shadow: 0 0 0 2px var(--violet7);
}
.ListItemLink:hover {
  background-color: var(--mauve3);
}

.ListItemHeading {
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 5px;
  color: var(--violet12);
}

.ListItemText {
  color: var(--mauve11);
  line-height: 1.4;
  font-weight: initial;
}

.Callout {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--purple9) 0%, var(--indigo9) 100%);
  border-radius: 6px;
  padding: 25px;
  text-decoration: none;
  outline: none;
  user-select: none;
}
.Callout:focus {
  box-shadow: 0 0 0 2px var(--violet7);
}

.CalloutHeading {
  color: white;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 16px;
  margin-bottom: 7px;
}

.CalloutText {
  color: var(--mauve4);
  font-size: 14px;
  line-height: 1.3;
}

.ViewportPosition {
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 100%;
  left: 0;
  perspective: 2000px;
}

.CaretDown {
  position: relative;
  color: var(--violet10);
  top: 1px;
  transition: transform 250ms ease;
}
[data-state='open'] > .CaretDown {
  transform: rotate(-180deg);
}

.Arrow {
  position: relative;
  top: 70%;
  background-color: white;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  border-top-left-radius: 2px;
}

@keyframes enterFromRight {
  from {
    opacity: 0;
    transform: translateX(200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes enterFromLeft {
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes exitToRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(200px);
  }
}

@keyframes exitToLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-200px);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: rotateX(-30deg) scale(0.9);
  }
  to {
    opacity: 1;
    transform: rotateX(0deg) scale(1);
  }
}

@keyframes scaleOut {
  from {
    opacity: 1;
    transform: rotateX(0deg) scale(1);
  }
  to {
    opacity: 0;
    transform: rotateX(-10deg) scale(0.95);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}`;

return (
  <Wrapper>
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Learn
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one">
              <li style={{ gridRow: "span 3" }}>
                <NavigationMenu.Link asChild>
                  <a className="Callout" href="/">
                    <svg
                      aria-hidden
                      width="38"
                      height="38"
                      viewBox="0 0 25 25"
                      fill="white"
                    >
                      <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                      <path d="M12 0H4V8H12V0Z"></path>
                      <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                    </svg>
                    <div className="CalloutHeading">Radix Primitives</div>
                    <p className="CalloutText">
                      Unstyled, accessible components for React.
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>

              <li>
                <NavigationMenu.Link
                  href="https://stitches.dev/"
                  className="ListItemLink"
                >
                  <div className="ListItemHeading">Stitches</div>
                  <p className="ListItemText">
                    CSS-in-JS with best-in-class developer experience.
                  </p>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link
                  href="https://stitches.dev/"
                  className="ListItemLink"
                >
                  <div className="ListItemHeading">Stitches 123</div>
                  <p className="ListItemText">
                    CSS-in-JS with best-in-class developer experience.
                  </p>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Overview
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              <li>
                <NavigationMenu.Link
                  href="https://stitches.dev/"
                  className="ListItemLink"
                >
                  <div className="ListItemHeading">Stitches</div>
                  <p className="ListItemText">
                    CSS-in-JS with best-in-class developer experience.
                  </p>
                </NavigationMenu.Link>
              </li>

              <li>
                <NavigationMenu.Link
                  href="https://stitches.dev/"
                  className="ListItemLink"
                >
                  <div className="ListItemHeading">Stitches 123</div>
                  <p className="ListItemText">
                    CSS-in-JS with best-in-class developer experience.
                  </p>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link
            className="NavigationMenuLink"
            href="https://github.com/radix-ui"
          >
            Github
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  </Wrapper>
);
