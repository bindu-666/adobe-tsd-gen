const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun } = require('docx');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/save-result', (req, res) => {
  const { resultData } = req.body;

  if (!resultData) {
    return res.status(400).json({ error: 'No resultData provided' });
  }

  // Split the resultData into lines based on numbered points
  const lines = resultData.split(/(?=\d+\.\s)/);

  // Create a paragraph for each line
  const paragraphs = lines.map(line => {
    // Match text wrapped in ** for bold formatting
    const parts = line.split(/(\*\*.*?\*\*)/).map(part => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return new TextRun({
          text: part.replace(/\*\*/g, '').trim(),
          bold: true,
          size: 28
        });
      } else {
        return new TextRun({
          text: part.trim(),
          size: 28
        });
      }
    });

    return new Paragraph({
      children: parts
    });
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  const timestamp = Date.now();
  const fileName = `results_${timestamp}.docx`;

  // Update the filePath to save in the desired directory
  const saveDirectory = 'C:\\Users\\hkokkiri\\OneDrive - Adobe\\Desktop\\generations';
  const filePath = path.join(saveDirectory, fileName);

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.error('Error writing to file', err);
        return res.status(500).json({ error: 'Failed to save data' });
      }

      res.json({ message: 'Data saved successfully', filePath });
    });
  }).catch((err) => {
    console.error('Error generating document', err);
    res.status(500).json({ error: 'Failed to generate document' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
