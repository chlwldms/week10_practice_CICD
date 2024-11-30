import { prisma } from "../db.config.js";

export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });

  if (user) {
    return null;
  }

  const created = await prisma.user.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true, // id 값 전달
      foodCategoryId: true, // id 값 전달
      foodCategory: true, // foodCategory로 join된 FoodCategory model을 join을 통해 함께 조회
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

export const updateUserInformation = async (userId, data) => {
  const updateUser = await prisma.user.update({
    where: { id: userId },
    data: {
      nickname: data.nickname,
      gender: data.gender,
      birth: new Date(data.birth),
      address: data.address,
      phoneNumber: data.phoneNumber,
    },
  });

  return updateUser.id;
};

export const getUserInformation = async (userId) => {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  return user;
};
