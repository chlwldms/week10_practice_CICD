import { prisma } from "../db.config.js";
import { InvalidReviewScoreError } from "../errors.js";

export const addReview = async (data) => {
  const restaurant = await prisma.restaurant.findFirst({
    where: { restaurantName: data.restaurantName },
  });
  if (!restaurant) return null;

  if (data.score < 1 || data.score > 5) {
    throw new InvalidReviewScoreError("입력 가능한 별점은 1-5점 입니다.", data);
  }

  const created = await prisma.userReview.create({
    data: {
      restaurant: { connect: { id: restaurant.id } },
      user: { connect: { id: Number(data.userId) } },
      score: data.score,
      review: data.review,
    },
  });

  return created.id;
};

export const getReview = async (reviewId) => {
  const reviews = await prisma.userReview.findMany({
    where: { id: reviewId },
  });
  const restaurant_name = await prisma.restaurant.findFirst({
    select: { restaurantName: true },
    where: { id: reviews.restaurantId },
  });

  return { reviews, restaurantName: restaurant_name.restaurantName };
};

export const getAllStoreReviews = async (restaurantId, cursor) => {
  const reviews = await prisma.userReview.findMany({
    select: {
      id: true,
      score: true,
      review: true,
      restaurant: true,
      user: true,
    },
    where: { restaurantId: restaurantId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};
