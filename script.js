document.getElementById('upload').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file || !file.type.includes('pdf')) return;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(1);

  const canvas = document.getElementById('pdfCanvas');
  const context = canvas.getContext('2d');
  const viewport = page.getViewport({ scale: 1.5 });

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: context, viewport }).promise;

  // Simulate a red translucent overlay rectangle
  context.fillStyle = 'rgba(255, 0, 0, 0.2)';
  context.fillRect(50, 50, 150, 100);
});
