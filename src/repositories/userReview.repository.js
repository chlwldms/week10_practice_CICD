import { UserNotFoundError } from "../errors.js";
import { prisma } from "../db.config.js";

export const getAllUserReviews = async (userId, cursor) => {
  const user = await prisma.mission.findFirst({
    where: { id: userId },
  });

  if (!user) throw new UserNotFoundError("존재하지 않는 사용자입니다.", userId);

  const reviews = await prisma.userReview.findMany({
    select: {
      id: true,
      score: true,
      review: true,
      restaurant: {
        select: { restaurantName: true },
      },
      user: {
        select: { nickname: true },
      },
    },
    where: { userId: userId, id: { gt: cursor } },
    orderBy: { createdAt: "asc" },
    take: 5,
  });

  return reviews;
};
