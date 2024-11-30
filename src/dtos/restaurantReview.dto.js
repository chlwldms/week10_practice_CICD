export const bodyToUser = (data, userId) => {
  console.log("DTO에서 받은 데이터:", data);
  return {
    userId: userId,
    restaurantName: data.restaurantName,
    score: data.score,
    review: data.review,
  };
};

export const responseFromUser = (data) => {
  const { reviews, restaurantName } = data;
  return {
    restaurantName: restaurantName,
    score: reviews[0].score,
    review: reviews[0].review,
  };
};

export const responseFromReviews = (reviews) => {
  

  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};
