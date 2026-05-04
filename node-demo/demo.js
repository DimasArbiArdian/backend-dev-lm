const fs = require('fs');
const filePath = './message.txt';

const createFile = (content) => {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      console.log("File already exists.");
      return;
    }

    fs.writeFile(filePath, content, (err) => {
      if (err) return console.error(err);
      console.log("File created!");
    });
  });
};

const deleteFile = () => {
  fs.unlink(filePath, (err) => {
    if (err) return console.error("File not found.");
    console.log("File successfully deleted!");
  });
};

// Choose one:
createFile("Halo from Node.js 🚀");
// deleteFile();