import SandpackWidget from "/social-widgets/michaelpeter.near/SandpackWidget";

export default function Widget() {
  return (
    <div style={{ display: "flex", flexDirection: "row", rowGap: "1rem" }}>
      <span>Nested:</span>
      <SandpackWidget />
    </div>
  );
}
