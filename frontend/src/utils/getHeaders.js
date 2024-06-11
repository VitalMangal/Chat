export default () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log(userData, 'userData');
  if (userData) {
    const { token } = userData;
    return { Authorization: `Bearer ${token}` };
  }

  return null;
};
