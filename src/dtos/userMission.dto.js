export const bodyToUserMission = (data) => {
  console.log("DTO에서 받은 데이터:", data);
  return {
    userId: data.userId,
    missionId: data.missionId,
    status: data.status,
  };
};

export const responseFromUserMission = (data) => {
  const { userMission, restaurantName, description } = data;

  return {
    restaurantName: restaurantName,
    status: userMission.status,
    description: description,
  };
};

export const responseFromCompletedMissions = (missions) => {
  const transformedUserMissions = missions.map((userMission) => ({
    id: userMission.id,
    nickname: userMission.user.nickname,
    price: userMission.mission.price,
    point: userMission.mission.point,
    description: userMission.mission.description,
    status: userMission.status,
  }));
  return {
    data: transformedUserMissions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};
