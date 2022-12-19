export default function LinkTest() {
  return (
    <a
      onClick={() => {
        window.top.postMessage(
          { action: "link", target: "https://www.google.com" },
          "*"
        );
      }}
    >
      Google
    </a>
  );
}
