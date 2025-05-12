function downloadPDF() {
    const link = document.createElement('a');
    link.href = 'https://businesswales.gov.wales/sites/maingel2/files/documents/Atomic%20Habits%20-%20James%20Clear%202018_0.pdf'; // Replace with the actual path to your PDF file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
