import { prisma } from "../db.config.js";
import {
  UserOrMissionNotFoundError,
  InvalidInactiveMissionError,
} from "../errors.js";

export const addUserMission = async (data) => {
  const mission = await prisma.mission.findFirst({
    where: { id: data.missionId },
  });

  if (!mission) return 0;

  const existing = await prisma.userMission.findFirst({
    where: {
      userId: data.userId,
      missionId: data.missionId,
    },
  });

  if (
    (existing && existing.status === "inactive") ||
    existing?.status === "in_progress"
  )
    return -1;

  const created = await prisma.userMission.create({
    data: {
      user: { connect: { id: data.userId } },
      mission: { connect: { id: mission.id } },
      status: data.status,
    },
  });

  return created.id;
};

export const getUserMission = async (userMissionId) => {
  const userMission = await prisma.userMission.findFirst({
    where: { id: userMissionId },
  });

  if (!userMission) return null;

  const restaurantName = await prisma.restaurant.findFirst({
    select: {
      restaurantName: true,
    },
    where: { id: userMission.restaurantId },
  });

  const description = await prisma.mission.findFirst({
    select: {
      description: true,
    },
    where: { id: userMission.missionId },
  });

  return {
    userMission,
    restaurantName: restaurantName.restaurantName,
    description: description.description,
  };
};

export const updateUserCompletedMissions = async (userId, missionId) => {
  const userMissions = await prisma.userMission.findFirst({
    where: { userId: userId, missionId: missionId },
  });

  if (!userMissions)
    throw new UserOrMissionNotFoundError(
      "사용자 혹은 미션의 데이터를 찾을 수 없습니다.",
      { userId: userId, missionId: missionId }
    );

  if (userMissions.status == "inactive")
    throw new InvalidInactiveMissionError(
      "아직 활성화되지 않은 미션입니다.",
      missionId
    );

  if (userMissions.status === "in_progress") {
    await prisma.userMission.update({
      where: { id: userMissions.id },
      data: { status: "completed" },
    });
  }

  return userMissions;
};

export const getUserCompletedMissions = async (userId, missionId, cursor) => {
  const user = await prisma.userMission.findFirst({
    where: { id: missionId },
  });

  if (!user)
    throw new UserOrMissionNotFoundError(
      "존재하지 않는 사용자입니다.",
      missionId
    );

  const completedMissions = await prisma.userMission.findMany({
    select: {
      id: true,
      user: {
        select: { nickname: true },
      },
      mission: {
        select: {
          price: true,
          point: true,
          description: true,
        },
      },
      status: true,
    },
    where: {
      userId: userId,
      status: "completed",
      id: { gt: cursor },
    },
    orderBy: { id: "asc" },
    take: 3,
  });

  return completedMissions;
};
