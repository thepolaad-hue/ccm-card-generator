
// This assumes jsPDF and html2canvas are loaded from a CDN and available on the window object.
declare const html2canvas: any;
declare const jspdf: any;

export const generatePdf = async (elementId: string): Promise<void> => {
  const input = document.getElementById(elementId);
  if (!input) {
    console.error(`Element with id ${elementId} not found.`);
    alert("Could not find content to generate PDF.");
    return;
  }

  try {
    const canvas = await html2canvas(input, {
        scale: 2, // Increase scale for better resolution
        useCORS: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    // A4 dimensions in 'pt' units: 595.28 x 841.89
    const pdf = new jspdf.jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    const ratio = canvasWidth / canvasHeight;
    const imgWidth = pdfWidth - 40; // with some margin
    const imgHeight = imgWidth / ratio;

    let heightLeft = imgHeight;
    let position = 20; // top margin

    pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
    heightLeft -= (pdfHeight - 40);

    while (heightLeft > 0) {
        position = -heightLeft + 20;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 40);
    }
    
    pdf.save('ccm-cards.pdf');
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("An error occurred while generating the PDF. Please check the console.");
  }
};
