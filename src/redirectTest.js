import axios from "axios";

async function testNaverOAuthRedirect() {
  try {
    const loginResponse = await axios
      .get("http://localhost:3000/oauth2/login/naver", {
        maxRedirects: 0,
        validateStatus: null,
      })
      .catch((error) => error.response);

    // 2. 콜백 엔드포인트 테스트
    const callbackResponse = await axios
      .get("http://localhost:3000/oauth2/callback/naver", {
        maxRedirects: 0,
        validateStatus: null,
      })
      .catch((error) => error.response);

    return {
      login: {
        statusCode: loginResponse.status,
        location: loginResponse.headers.location,
      },
      callback: {
        statusCode: callbackResponse.status,
        failureRedirect: "/oauth2/login/naver",
        successRedirect: "/",
      },
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

// 네이버 로그인만 테스트 실행
testNaverOAuthRedirect()
  .then((result) => {
    console.log("네이버 OAuth 리다이렉트 테스트 결과:");
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((error) => console.error("테스트 실패:", error));
