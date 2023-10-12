const scriptName = "stock_bot";
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // OpenWeatherMap API 키를 여기에 입력

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a22f4aba6dd1e4ee7fb809a6c32b3c04&units=metric`;

  try {
    const response = org.jsoup.Jsoup.connect(url)
      .ignoreContentType(true)
      .execute();
    const data = JSON.parse(response.body());

    if (data.cod === 200) {
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      return `현재 ${city}의 날씨: ${description}, 온도: ${temperature}°C`;
    } else {
      return `날씨 정보를 가져오는 데 실패했습니다.`;
    }
  } catch (error) {
    return `날씨 정보를 가져오는 동안 오류가 발생했습니다.`;
  }
}

function response(
  room,
  msg,
  sender,
  isGroupChat,
  replier,
  imageDB,
  packageName
) {
  if (msg === "") {
    replier.reply("메시지를 입력하세요.");
  } else if (msg.startsWith("/날씨 ")) {
    const city = msg.substr(4);
    const weatherInfo = getWeather(city);
    replier.reply(weatherInfo);
  } else if (msg.includes("시현이는")) {
    replier.reply(msg + " 바보");
  } else if (msg.includes("수연이는")) {
    replier.reply(msg + " 핑크 돼지");
  } else if (msg.includes("꺼져")) {
    replier.reply("너나 꺼져");
  } else if (msg.includes("ㅎㅇ")) {
    replier.reply("금쪽이 하이");
  } else if (msg.includes("ㅅㅂ")) {
    replier.reply(msg + " 욕썼냐?");
  } else if (msg.includes("ㄹㅇㅋㅋ")) {
    replier.reply(sender + " 싸없새자식");
  } else if (msg.includes("돼지")) {
    replier.reply(msg + "는 너");
  } else if (msg.includes("송충이")) {
    replier.reply(msg + " 송충이 그만말해라 더럽다.");
  } else if (msg.startsWith("/추가 ")) {
    const money = msg.substr(4);
    postData(money);
  }
}

function postData(msg) {
  const data = {
    money: msg,
  };

  try {
    const url = "/api";
    const method = "POST";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(data);

    const response = org.jsoup.Jsoup.connect(url)
      .method(method)
      .requestBody(body)
      .header("Content-Type", headers["Content-Type"])
      .ignoreContentType(true)
      .execute();

    if (response.statusCode() === 200) {
      const responseData = JSON.parse(response.body());
      console.log("POST 요청 성공, 서버 응답 데이터:", responseData);
      fetchData();
    } else {
      console.error("POST 요청 실패:", response.statusMessage());
    }
  } catch (error) {
    console.error("에러:", error);
  }
}
