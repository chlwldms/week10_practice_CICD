import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/restaurantMission.dto.js";
import {
  createMission,
  listRestaurantMissions,
} from "../services/restaurantMission.service.js";

// 가게 미션 추가
export const handleCreateMission = async (req, res, next) => {
  /*
    #swagger.summary = '가게 미션 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              restaurantName: { type: "string" },
              price: { type: "number" },
              point: { type: "number" },
              description: {type: "string"},
              startDate: { type: "string", format: "date" },
              endDate: { type: "string", format: "date" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 추가 성공 응답",
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
                  status: { type: "string" },
                  description: { type: "string" },
                  startDate: { type: "string", format: "date" },
                  endDate: { type: "string", format: "date" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "유효하지 않은 포인트 값 입력",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
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
      description: "레스토랑이 존재하지 않음",
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
  console.log("미션 생성을 요청했습니다!");
  console.log("Controller에서 받은 body:", req.body);

  const mission = await createMission(bodyToMission(req.body));
  res.status(StatusCodes.OK).success(mission);
};

// 가게 리뷰 조회
export const handleCheckRestaurantMissions = async (req, res, next) => {
  /*
    #swagger.summary = '특정 식당 미션 목록 API';

    #swagger.parameters['limit'] = {
        in: 'query',
        description: '조회할 미션 수',
        required: false,
        type: 'integer',
        default: 3
    }
    #swagger.responses[200] = {
      description: "식당 미션 목록 조회 성공 응답",
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
                        restaurantName: { type: "string" },
                        price: { type: "number" },
                        point: { type: "number" },
                        status: {type: "string"},
                        description: {type: "string"},
                        startDate: { type: "string", format: "date" },
                        endDate: { type: "string", format: "date" }
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
      description: "존재하지 않는 식당 입력",
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
  const missions = await listRestaurantMissions(
    parseInt(req.params.restaurantId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};
