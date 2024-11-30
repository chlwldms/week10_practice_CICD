import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/userMission.dto.js";
import {
  createUserMission,
  listUserCompletedMissions,
} from "../services/userMission.service.js";

export const handleJoinMission = async (req, res, next) => {
  /*
    #swagger.summary = '사용자 미션 도전 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "number" },
              missionId: { type: "number" },
              status: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "사용자 미션 추가 성공 응답",
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
                  description: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "유효하지 않은 미션 입력",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M301" },
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
      description: "이미 도전 중인 미션인 경우",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M101" },
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
  console.log("미션 도전을 요청했습니다!");

  const userMission = await createUserMission(bodyToUserMission(req.body));
  res.status(StatusCodes.OK).success({ result: userMission });
};

export const handleUserMissionProgress = async (req, res, next) => {
  /*
      #swagger.summary = '미션 진행상황 변경 API';
  
      #swagger.parameters['limit'] = {
        in: 'query',
        description: '조회할 리뷰 수',
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
                          nickname: { type: "string" },
                          price: { type: "number" },
                          point: { type: "number" },
                          description: { type: "string" },
                          status: {type: "string"},
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
        description: "존재하지 않는 사용자 혹은 미션 입력",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "UM301" },
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
        description: "활성화되지 않은 미션",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "UM001" },
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

  const mission = await listUserCompletedMissions(
    parseInt(req.params.userId),
    parseInt(req.params.missionId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(mission);
};
