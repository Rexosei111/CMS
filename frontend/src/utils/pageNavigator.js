export const getUserTypeBasePath = (userInfo) => {
  let userType = "";
  if (userInfo?.front_desk === true) {
    userType = "front_desk";
  } else if (userType?.director === true) {
    userType = "director";
  } else if (userType?.officer === true) {
    userType = "officer";
  }
  console.log(userType);
  const basePaths = {
    front_desk: "/f",
    director: "/d",
    officer: "/o",
  };
  return basePaths[userType];
};
