export default function Widget({
  message,
  bgColor,
}: {
  message: string,
  bgColor: string,
}) {
  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: bgColor ?? "#a795cf",
      }}
    >
      Message is: {message}
    </div>
  );
}
