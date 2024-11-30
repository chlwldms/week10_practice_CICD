import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/restaurantReview.dto.js";
import {
  createReview,
  listStoreReviews,
} from "../services/restaurantReview.service.js";

export const handleWriteReview = async (req, res, next) => {
  /*
    #swagger.summary = '가게 리뷰 츄가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              restaurantName: { type: "string" },
              score: { type: "number" },
              review: { type: "string" },
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "리뷰 정상 작성 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  restaurantName: { type: "string" },
                  score: { type: "number" },
                  review: { type: "string" },
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "score 값 입력 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "RV001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "식당 데이터를 찾을 수 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R301" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("리뷰 작성을 요청했습니다!");
  console.log("Controller에서 받은 body:", req.body);

  const review = await createReview(bodyToUser(req.body, req.params.userId));
  res.status(StatusCodes.OK).success(review);
};

export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: {type: "string", example: "SUCCESS"},
              error: {type: "object", nullable: true, example: null},
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {type: "number"},
                        store: {type: "object", properties: {restaurantId: {type: "number"}, restaurantNname: {type: "string"}}},
                        user: {type: "object", properties: {id: {type: "number"}, email: {type: "string"}, name: {type: "string"}}},
                        content: {type: "string"}
                      }
                    }
                  },
                  pagination: {type: "object", properties: {cursor: {type: "number", nullable: true}}}
                }
              }
            } 
          }
        }
      }
    };
  
  */
  const reviews = await listStoreReviews(
    parseInt(req.params.restaurantId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};
