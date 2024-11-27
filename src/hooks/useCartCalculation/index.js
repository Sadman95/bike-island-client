import { TAX_RATE } from 'constants';

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

export const useCartCalculation = (cart) => {
  const rows = cart.map((item) => createRow(item.productTitle, item.quantity, item.productPrice));

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return {
    rows,
    invoiceSubtotal,
    invoiceTaxes,
    invoiceTotal,
  };
};
