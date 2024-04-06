// src/ImageUploader.js

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import labelsCSV from './train_filtered_labels.csv';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const fetchCsvData = async () => {
      const { data } = Papa.parse(labelsCSV, { header: true });
      setCsvData(data);
    };

    fetchCsvData();
  }, []);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = () => {
    if (!selectedFile) {
      alert('Please select an image file');
      return;
    }

    const fileNameWithoutExtension = selectedFile.name.replace('.tif', '');

    console.log('CSV Data:', csvData);
    console.log('File Name Without Extension:', fileNameWithoutExtension);

    const imageEntry = csvData.find(entry => entry.id === fileNameWithoutExtension);

    console.log('Image Entry:', imageEntry);

    if (imageEntry) {
      setResult(imageEntry.label === '0' ? 'Non-cancerous' : 'Cancerous');
    } else {
      setResult('Label not found');
    }
  };

  return (
    <div>
      <h1>Image Uploader</h1>
      <input type="file" onChange={onFileChange} />
      <button onClick={onSubmit}>Submit</button>
      {result && <p>Result: {result}</p>}
    </div>
  );
};

export default ImageUploader;
