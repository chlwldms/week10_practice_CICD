import { RestaurantNotFoundError } from "../errors.js";
import {
  addMission,
  getMission,
  getAllRestaurantMissions,
} from "../repositories/restaurantMission.repository.js";
import {
  responseFromMission,
  responseFromRestaurantMissions,
} from "../dtos/restaurantMission.dto.js";

export const createMission = async (data) => {
  const newMission = await addMission({
    restaurantName: data.restaurantName,
    price: data.price,
    point: data.point,
    status: data.status || "active",
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
  });

  if (newMission === null) {
    throw new RestaurantNotFoundError("존재하지 않는 식당입니다.", data);
  }

  const mission = await getMission(newMission);

  return responseFromMission(mission);
};

export const listRestaurantMissions = async (restaurantId, cursor) => {
  const missions = await getAllRestaurantMissions(restaurantId, cursor);
  return responseFromRestaurantMissions(missions);
};
