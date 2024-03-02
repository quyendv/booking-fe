export function splitNumber(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function convertPriceToString(price: number): string {
  if (price >= 1e6) {
    return (price / 1e6).toFixed(2) + 'M';
  } else if (price >= 1e3) {
    return (price / 1e3).toFixed(2) + 'K';
  } else {
    return price.toString();
  }
}
