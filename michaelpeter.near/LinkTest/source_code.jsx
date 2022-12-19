export default function LinkTest() {
  return (
    <a
      onClick={() => {
        window.top.postMessage(
          JSON.stringify({ action: "link", target: "www.google.com" }),
          "*"
        );
      }}
    >
      Google
    </a>
  );
}
