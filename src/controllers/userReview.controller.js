import { StatusCodes } from "http-status-codes";
import { listUserReviews } from "../services/userReview.service.js";

export const handleListUserReviews = async (req, res, next) => {
  /*
    #swagger.summary = '특정 사용자 리뷰 작성 목록 API';
    
    #swagger.parameters['limit'] = {
        in: 'query',
        description: '조회할 리뷰 수',
        required: false,
        type: 'integer',
        default: 3
    }

    #swagger.responses[200] = {
      description: "사용자 리뷰 조회 성공 응답",
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
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        score: { type: "number" },
                        review: { type: "string" },
                        restaurantName: { type: "string" },
                        nickname: { type: "string" },
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "존재하지 않는 사용자 입력",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U301" },
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
  const reviews = await listUserReviews(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};
