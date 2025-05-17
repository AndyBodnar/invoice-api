module.exports = function generateInvoiceHTML({ client, invoice }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; }
        .section { margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <h1>Invoice</h1>
      <div class="section">
        <strong>Client:</strong> ${client.name}<br>
        <strong>Email:</strong> ${client.email}<br>
        <strong>Phone:</strong> ${client.phone}
      </div>
      <div class="section">
        <strong>Amount:</strong> $${invoice.amount}<br>
        <strong>Status:</strong> ${invoice.status}<br>
        <strong>Due Date:</strong> ${new Date(invoice.dueDate).toDateString()}
      </div>
      <div class="section">
        <em>Thank you for your business.</em>
      </div>
    </body>
    </html>
  `;
};
