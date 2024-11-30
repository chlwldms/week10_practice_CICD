import { RestaurantNotFoundError } from "../errors.js";
import {
  addReview,
  getReview,
  getAllStoreReviews,
} from "../repositories/restaurantReview.repository.js";
import {
  responseFromUser,
  responseFromReviews,
} from "../dtos/restaurantReview.dto.js";

export const createReview = async (data) => {
  console.log("Service에서 받은 데이터:", data);
  const newReview = await addReview({
    userId: data.userId,
    restaurantName: data.restaurantName,
    score: data.score,
    review: data.review,
  });

  if (newReview === null) {
    throw new RestaurantNotFoundError("존재하지 않는 식당입니다.", data);
  }

  const review = await getReview(newReview);

  return responseFromUser(review);
};

export const listStoreReviews = async (restaurantId, cursor) => {
  const reviews = await getAllStoreReviews(restaurantId, cursor);
  return responseFromReviews(reviews);
};
