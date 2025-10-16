export const formatDateVNPay = (date = new Date()) => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  );
};

export const formatCurrency = (amount: number, locale = "vi-VN", currency = "VND") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}