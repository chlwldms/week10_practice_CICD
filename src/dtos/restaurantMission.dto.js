export const bodyToMission = (data) => {
  console.log("DTO에서 받은 데이터:", data);

  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  return {
    restaurantName: data.restaurantName,
    price: data.price,
    point: data.point,
    status: data.status || "active",
    description: data.description,
    startDate: startDate,
    endDate: endDate,
  };
};

export const responseFromMission = (data) => {
  const { mission, restaurantName } = data;

  return {
    restaurantName: restaurantName,
    status: mission.status,
    description: mission.description,
    startDate: mission.startDate,
    endDate: mission.endDate,
  };
};

export const responseFromRestaurantMissions = (missions) => {
  const transformedMissions = missions.map((mission) => ({
    id: mission.id,
    restaurantName: mission.restaurant.restaurantName,
    price: mission.price,
    point: mission.point,
    status: mission.status,
    description: mission.description,
    startDate: mission.startDate,
    endDate: mission.endDate,
  }));

  return {
    data: transformedMissions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};
