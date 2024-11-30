export class DuplicateUserEmailError extends Error {
  errorCode = "U101";

  constructor(reason, data) {
    // 오류 값을 담는 생성자
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class UserNotFoundError extends Error {
  errorCode = "U301";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class RestaurantNotFoundError extends Error {
  errorCode = "R301";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class InvalidReviewScoreError extends Error {
  errorCode = "RV001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class InvalidMissionPointError extends Error {
  errorCode = "M001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MissionNotFoundError extends Error {
  errorCode = "M301";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class DuplicateUserMissionError extends Error {
  errorCode = "M101";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class UserOrMissionNotFoundError extends Error {
  errorCode = "UM301";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class InvalidInactiveMissionError extends Error {
  errorCode = "UM001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
