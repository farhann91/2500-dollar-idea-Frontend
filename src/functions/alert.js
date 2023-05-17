export const showAlert = (msg, alertType) => {
  const id = Math.random();
  return { msg, alertType, id };
};
