import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { fetchDataFromDummyJsonUsers } from '../../service/apis';

// Define the styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    display: 'flex',
  },
  section: {
    display: 'flex',
    margin: 10,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

// Create the MyDocument component
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {data &&
          data.map((entry, index) => (
            <Text key={index}>{entry.firstName}</Text>
          ))}
      </View>
    </Page>
  </Document>
);

export const JsonPdf = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDataFromDummyJsonUsers().then((res) => {
      setData(res['users']);
    });
  }, []);

  const downloadPDF = () => {
    const pdfContent = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            {data &&
              data.map((entry, index) => (
                <Text key={index}>{entry.firstName}</Text>
              ))}
          </View>
        </Page>
      </Document>
    );

    const pdfBlob = new Blob([JSON.stringify(pdfContent)], {
      type: 'application/pdf',
    });

    const blobUrl = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'generated_pdf.pdf';
    a.click();
  };

  return (
    <div>
      <div>
        <button onClick={downloadPDF}>Print PDF</button>
        <MyDocument data={data} />
      </div>
    </div>
  );
};
