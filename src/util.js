export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const currency = '₦';

export const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
