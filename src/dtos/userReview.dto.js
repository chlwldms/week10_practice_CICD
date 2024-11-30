export const responseFromUserReviews = (reviews) => {
  const transformedReviews = reviews.map((review) => ({
    id: review.id,
    score: review.score,
    review: review.review,
    restaurantName: review.restaurant.restaurantName,
    nickname: review.user.nickname,
  }));

  return {
    data: transformedReviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};
