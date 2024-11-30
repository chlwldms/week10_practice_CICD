export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    name: body.name,
    nickname: body.nickname,
    email: body.email,
    gender: body.gender,
    birth,
    address: body.address || "",
    phone_number: body.phone_number,
    preferences: body.preferences,
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name // join된 entity를 거쳐 조회하도록!
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};

export const responseFromUserInformation = (user) => {
  return {
    name: user.name,
    nickname: user.nickname,
    email: user.email,
    gender: user.gender,
    birth: user.birth,
    address: user.address,
    phoneNumber: user.phoneNumber,
  };
};
