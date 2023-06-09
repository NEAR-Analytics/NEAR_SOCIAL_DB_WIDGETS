const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = `.toast-notification {
  position: absolute;
  margin-top: -30px;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
}

.toast-notification.success {
  background-color: green;
}

.toast-notification.error {
  background-color: red;
}

.toast-notification.show {
  opacity: 1;
}`;

if (!cssFont || !css) return "";
if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;
return (
  <Theme>
    <div className={`toast-notification ${props.state.type} show`}>
      <p>{props.state.message}</p>
      <p></p>
    </div>
  </Theme>
);
