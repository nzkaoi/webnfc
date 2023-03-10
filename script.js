const readButton = document.getElementById("readButton");
const readLog = document.getElementById("readLog");

readButton.addEventListener("click", async () => {
    readLog.textContent = await "clicked read button";
    try {
      console.log('new ndefreader');
      const reader = new NDEFReader();
      console.log('scanning');
      await reader.scan();
      readLog.textContent = "scan started";
  
      reader.addEventListener("error", () => {
        console.log("Error");
      });
  
      reader.addEventListener("reading", ({ message, serialNumber }) => {
        console.log(`> Serial Number: ${serialNumber}`);
        console.log(message);
        console.log(message.record);
        const record = message.records[0];
        const { data, encoding, recordType } = record;
        if (recordType === "text") {
          const textDecoder = new TextDecoder(encoding);
          const text = textDecoder.decode(data);
          readLog.textContent = text;
        }
      });
    } catch (error) {
      readLog.textContent = error;
    }
  });