import React, { useState, useEffect } from 'react';
import { fetchDataFromDummyJsonUsers } from '../../service/apis';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import YourSVGLogo from '../../assets/images/peppng.png'; // Update the path as needed

export const JsonPdf = () => {
  const [data, setData] = useState(null);
  const [pdfPreviewSrc, setPdfPreviewSrc] = useState('');

  useEffect(() => {
    fetchDataFromDummyJsonUsers().then((res) => {
      setData(res['users']);
    });
  }, []);

  const convertSvgToDataUri = async (svgElement) => {
    try {
      const pngDataUri = await toPng(svgElement);
      return pngDataUri;
    } catch (error) {
      console.error('Error converting SVG to data URI:', error);
      return null;
    }
  };

  const generatePdf = () => {
    const doc = new jsPDF();

    // Convert the React image to a data URI
    const img = new Image();
    img.src = YourSVGLogo;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);
    const logoDataUri = canvas.toDataURL('image/png');

    if (data && data.length) {
      const white = [255, 255, 255];

      const sections = [
        'High Achievers',
        'The Gab',
        'The Grinders',
        'Inspiring Minds',
        'Innovators',
      ];
      let sectionIndex = 0;

      const newData = data.map((element) => {
        element.section = sections[sectionIndex];
        sectionIndex = (sectionIndex + 1) % sections.length;
        return element;
      });

      // Define startYPositions and sectionSpacing
      const sectionSpacing = 20;
      // Set the font style to bold just for the specific text
      doc.setFont('helvetica', 'bold'); // Set font family and style to bold
      doc.text('PEP Profile Report', 10, 10); // Render the bold text

      sections.forEach((section, index) => {
        const usersInSection = newData.filter(
          (user) => user.section === section
        );
        const tableData = usersInSection.map((user) => [
          `${user.firstName} ${user.lastName}`,
          `${user.email}`,
          `${user.university}`,
          `${user.hair.color} ${user.hair.type}`,
        ]);

        if (tableData.length > 0) {
          const startY =
            index === 0 ? 40 : doc.autoTable.previous.finalY + sectionSpacing;
          doc.setFont('helvetica', 'normal'); // Set font family and style to bold
          doc.text(section, 10, startY - 10); // Add section heading
          doc.autoTable({
            head: [['Names', 'email', 'university', 'hair']],
            body: tableData, // Table body data
            startY,
            margin: { top: 10, left: 10, right: 10, bottom: 10 },
            alternateRowStyles: { fillColor: white },
            styles: {
              cellPadding: { top: 2, right: 2, bottom: 2, left: 2 },
            },
            headStyles: {
              fillColor: [238, 240, 245],
              textColor: [0, 0, 0],
            },
            bodyStyles: {
              fillColor: white,
            },
          });
        }
      }); // <-- Closing parenthesis for forEach loop
    }

    return doc;
  };

  const downloadPDF = () => {
    const pdf = generatePdf();
    pdf.save('table.pdf');
  };

  const updatePDF = () => {
    const pdf = generatePdf();

    // Convert PDF content to Data URI
    const pdfDataUri = pdf.output('datauristring');
    // Update the PDF preview source
    setPdfPreviewSrc(pdfDataUri);
  };

  return (
    <div>
      <div className="flex flex-row gap-[12px] items-center">
        <button
          className="border border-slate-300 rounded p-2 m-2 text-[14px] font-[400] hover:bg-slate-300"
          onClick={updatePDF}
        >
          Update PDF View
        </button>
        <button
          className="border border-slate-300 rounded p-2 m-2 text-[14px] font-[400] hover:bg-slate-300"
          onClick={downloadPDF}
        >
          Print PDF
        </button>
      </div>
      {/* Use react-pdf to render the PDF content */}
      {/* Display PDF preview in an iframe */}
      {pdfPreviewSrc && (
        <iframe
          title="PDF Preview"
          src={pdfPreviewSrc}
          width="100%"
          height="500px"
        />
      )}
    </div>
  );
};
