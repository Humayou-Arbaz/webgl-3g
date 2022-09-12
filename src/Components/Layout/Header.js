export default function Header(){
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      padding: "0px",
      backgroundColor: "#00000080",
      position: "fixed",
      top: "0px",
      width: "100vw",
      zIndex: "1000"
    }}>
      <div style={{
        width: "200px",
        height: "1em",
        // padding: "0.5em",
        marginTop: "-1.5em",
        marginLeft: "1em",
        // paddingLeft: "0.5em",
        flex: 1,
      }}>
        <span style={{fontSize:"2em"}}>L</span>
        <span style={{fontSize:"1.5em"}}>ogo</span>
      </div>
      <div style={{fontSize: "0.5em", flex: "1", display: "inline-flex", padding: "1em"}}>
        <div style={{padding: "1em"}}>Menus</div>
        <div style={{padding: "1em"}}>Menus</div>
        <div style={{padding: "1em"}}>Menus</div>
      </div>
    </div>
  );
}



// <div style={{flex: "1", display: "inline-flex", padding: "1em"}}>Menu</div>
// <div style={{flex: "1", display: "inline-flex", padding: "1em"}}>Menu</div>
// <div style={{flex: "1", display: "inline-flex", padding: "1em"}}>Menu</div>
// <div style={{flex: "1", display: "inline-flex", padding: "1em"}}>Menu</div>
