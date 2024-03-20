import React from "react";
import ReactDOM from "react-dom";
const App = () => {
  const handleClick = async () => {
    const items = await miro.board.getSelection();
    if (items.length === 0) alert("selecione ao menos uma nota");
    const filteredNotes = filterStickerNote(items);
    console.log(filteredNotes);
    filteredNotes.map(async (note: any) => {
      note.content = note.content.replaceAll("<p>", "").replaceAll("</p>", " ");
      await sendStickToMonday(note);
    });
  };

  const sendStickToMonday = async (stick: any) => {
    let query = `mutation { create_item (board_id: 6295312864, item_name: "${stick.content}") { id }}`;

    fetch("https://api.monday.com/v2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI1MTc1Njk4MSwiYWFpIjoxMSwidWlkIjo0MTU3NjY4NCwiaWFkIjoiMjAyMy0wNC0xOVQxNzoxMToxOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTA0NTk2ODMsInJnbiI6InVzZTEifQ.RweR-anhMj2xN2HTk9dPIRzYIEuFTGrWAyAP0f9q9v8",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(JSON.stringify(res, null, 2)));
  };

  const filterStickerNote = (items: any) => {
    return items.filter((item: any) => item.type === "sticky_note");
  };

  return (
    <div className="main">
      <button
        className="button button-primary"
        type="button"
        onClick={handleClick}
      >
        Send notes to{" "}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Monday_logo.svg/1280px-Monday_logo.svg.png"
          width={80}
          alt=""
        />
      </button>
    </div>
  );
};

// Render App
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
