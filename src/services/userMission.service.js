import { MissionNotFoundError, DuplicateUserMissionError } from "../errors.js";
import {
  addUserMission,
  getUserCompletedMissions,
  getUserMission,
  updateUserCompletedMissions,
} from "../repositories/userMission.repository.js";
import {
  responseFromUserMission,
  responseFromCompletedMissions,
} from "../dtos/userMission.dto.js";

export const createUserMission = async (data) => {
  const newUserMission = await addUserMission({
    userId: data.userId,
    missionId: data.missionId,
    status: data.status,
  });

  if (newUserMission === 0) {
    throw new MissionNotFoundError("존재하지 않는 미션입니다.", data);
  }

  if (newUserMission === -1) {
    throw new DuplicateUserMissionError("이미 도전 중인 미션입니다.", data);
  }

  const user_mission = await getUserMission(newUserMission);

  return responseFromUserMission(user_mission);
};

export const listUserCompletedMissions = async (userId, missionId, cursor) => {
  const userMissions = await updateUserCompletedMissions(userId, missionId);

  const userCompletedMissions = await getUserCompletedMissions(
    userMissions.userId,
    userMissions.missionId,
    cursor
  );

  return responseFromCompletedMissions(userCompletedMissions);
};
