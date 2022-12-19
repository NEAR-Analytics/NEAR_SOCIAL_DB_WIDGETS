export default function LinkTest() {
  return (
    <a
      onClick={() => {
        window.top.postMessage(
          { action: "link", target: "www.google.com" },
          "*"
        );
      }}
    >
      Google
    </a>
  );
}
