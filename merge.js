const PDFMerger = require('pdf-merger-js').default;
const fs = require("fs");

const mergePDFs = async (files) => {
  const merger = new PDFMerger();

  for (let file of files) {
    console.log("Adding:", file.path);
    await merger.add(file.path);   
  }

  const outputPath = `merged-${Date.now()}.pdf`;  

  await merger.save(outputPath);

  
  files.forEach(file => fs.unlinkSync(file.path));

  return outputPath;
};

module.exports = mergePDFs;
