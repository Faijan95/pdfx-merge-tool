const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const mergePDFs = require("./merge");

const app = express();   

const upload = multer({ dest: "uploads/" });

const port = 3000;


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "template", "index.html"));
});

// merge route
app.post("/merge", upload.array("pdfsFiles"), async (req, res) => {
  try {
    const mergedPath = await mergePDFs(req.files);

    const fileData = fs.readFileSync(mergedPath);

    res.setHeader("Content-Type", "application/pdf");
    res.send(fileData);

  } catch (err) {
    console.error(err);
    res.send("Error ❌");
  }
});


app.listen(port, () => {
  console.log("Server running on http://localhost:3000");
});