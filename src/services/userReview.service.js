import { getAllUserReviews } from "../repositories/userReview.repository.js";
import { responseFromUserReviews } from "../dtos/userReview.dto.js";

export const listUserReviews = async (storeId, cursor) => {
  const reviews = await getAllUserReviews(storeId, cursor);
  return responseFromUserReviews(reviews);
};
