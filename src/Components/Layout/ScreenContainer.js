export default function ScreenContainer({
  children,
  background,
  font,
  sticky,
  style,
  visible
}) {
  return <div
    style={{
      backgroundColor: background||"#ff000000",
      alignItems: "flex-start",
      justifyContent: "space-around",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      color: font||"lightgray",
      position: "fixed" || "",
      paddingTop: "4em",

      ...style,
    }}
  >
    <div style={{
      opacity: visible ? "1" : "0",
      transition: "opacity 0.5s ease-out",
    }}>
      {children||"nothing"}
    </div>
  </div>
}
