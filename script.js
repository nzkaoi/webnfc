const readButton = document.getElementById("readButton");
const readLog = document.getElementById("readLog");

readButton.addEventListener("click", () => {
  const ndef = new NDEFReader();
  ndef.scan().then(() => {
    console.log("Scan started successfully.");
    ndef.onreadingerror = (event) => {
      console.log("Error! Cannot read data from the NFC tag. Try a different one?");
    };
    ndef.onreading = (event) => {
      console.log("NDEF message read.");
      console.log(event);
      console.log(event.message);
      console.log(event.message.records);
    };
  }).catch(error => {
    console.log(`Error! Scan failed to start: ${error}.`);
  });
});