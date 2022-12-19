export default function LinkTest() {
  return (
    <div className="flex flex-row gap-2">
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
      <a
        onClick={() => {
          window.location.href = "https://www.google.com";
        }}
      >
        Google Same Tab
      </a>
    </div>
  );
}
