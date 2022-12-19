export default function Widget({ message: string, bgColor: string }) {
  return (
    <div
      style={{
        height: "2rem",
        width: "5rem",
        backgroundColor: bgColor ?? "#a795cf",
      }}
    >
      Message is: {message}
    </div>
  );
}
