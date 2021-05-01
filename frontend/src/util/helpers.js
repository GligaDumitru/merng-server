export const findUserInArray = (arr, username) => {
  return arr.some((el) => el.username === username);
};
