import { prisma } from "../db.config.js";
import {
  InvalidMissionPointError,
  RestaurantNotFoundError,
} from "../errors.js";

export const addMission = async (data) => {
  console.log("repository에서 받은 데이터:", data);

  const restaurant = await prisma.restaurant.findFirst({
    where: { restaurantName: data.restaurantName },
  });

  console.log("restaurant data: ", restaurant);

  if (!restaurant) return null;

  if (data.point < data.price / 20 || data.point > data.price / 5) {
    throw new InvalidMissionPointError(
      "가격에 비해 포인트가 너무 적거나 많습니다.",
      data
    );
  }

  const created = await prisma.mission.create({
    data: {
      restaurant: { connect: { id: restaurant.id } },
      price: data.price,
      point: data.point,
      status: data.status,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
    },
  });

  return created.id;
};

export const getMission = async (missionId) => {
  const mission = await prisma.mission.findFirst({ where: { id: missionId } });

  const restaurantName = await prisma.restaurant.findFirst({
    select: { restaurantName: true },
    where: { id: mission.restaurantId },
  });

  return { mission, restaurantName: restaurantName.restaurantName };
};

export const getAllRestaurantMissions = async (restaurantId, cursor) => {
  const restaurant = await prisma.mission.findFirst({
    where: { id: restaurantId },
  });

  if (!restaurant)
    throw new RestaurantNotFoundError(
      "존재하지 않는 식당입니다.",
      restaurantId
    );

  const missions = await prisma.mission.findMany({
    select: {
      id: true,
      restaurant: {
        select: { restaurantName: true },
      },
      price: true,
      point: true,
      status: true,
      description: true,
      startDate: true,
      endDate: true,
    },
    where: { restaurantId: restaurantId, id: { gt: cursor } },
    orderBy: { startDate: "asc" },
    take: 3,
  });

  return missions;
};
