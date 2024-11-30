import {
  responseFromUser,
  responseFromUserInformation,
} from "../dtos/user.dto.js";
import { DuplicateUserEmailError } from "../errors.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  updateUserInformation,
  getUserInformation,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    name: data.name,
    nickname: data.nickname,
    email: data.email,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    phone_number: data.phone_number,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const listUserInformation = async (userId, data) => {
  const userInformationId = await updateUserInformation(userId, data);

  const userModifiedInformation = await getUserInformation(userInformationId);

  return responseFromUserInformation(userModifiedInformation);
};
