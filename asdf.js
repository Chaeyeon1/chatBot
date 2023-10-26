const scriptName = "stock_bot";
const apiKey = "a22f4aba6dd1e4ee7fb809a6c32b3c04"; // OpenWeatherMap API 키를 여기에 입력
const lang = "kr"; //언어
const units = "metric"; //섭씨
const { Jsoup: Jsoup } = org.jsoup;
const _cmdArr = ["명령어", "날씨", "질문"];

function getWeather(city) {
  const lat = 0; // 위도
  const lon = 0; // 경도

  if (city == "부산") {
    lat = 35.1796;
    lon = 129.0756;
  } else if (city == "광양") {
    lat = 35.1796;
    lon = 129.0756;
  } else if (city == "순천") {
    lat = 35.1796;
    lon = 129.0756;
  } else if (city == "광주") {
    lat = 35.1796;
    lon = 129.0756;
  } else if (city == "서울") {
    lat = 37.5665;
    lon = 126.978;
  } else {
    return "제공하지 않는 도시입니다.";
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${apiKey}`;

  try {
    const response = org.jsoup.Jsoup.connect(url)
      .ignoreContentType(true)
      .execute();
    const data = JSON.parse(response.body());

    if (data.cod === 200) {
      const temperature = data.main.temp;
      const feelsLike = data.main.feels_like;
      const tempMin = data.main.temp_min;
      const tempMax = data.main.temp_max;

      const description = data.weather[0].description;
      return `현재 ${city}의 날씨가 나와야하지만 개발상  ${data.name}의 날씨: ${description}, 온도: ${temperature}°C, 체감 온도 : ${feelsLike}°C, 최소 온도 : ${tempMin}°C, 최고 온도 : ${tempMax}°C`;
    } else {
      return `날씨 정보를 가져오는 데 실패했습니다.`;
    }
  } catch (error) {
    return `날씨 정보를 가져오는 동안 오류가 발생했습니다.`;
  }
}

function getWeatherFromNaver(msg) {
  var data = Jsoup.connect(
    "https://m.search.naver.com/search.naver?&query=날씨+" + msg
  ).get();

  let retMsg = "";
  data = data.select(".weather_info")[0];

  let _today = data.select("._today");

  // 현재 온도
  try {
    let cur_temp = _today.select(".temperature_text strong").text().slice(5);
    // 어제와 온도차이
    let diff_temp = data.select(".temperature_info .temperature").text();
    let diff_stat = data.select(".temperature_info .blind").text();

    // 체감
    let v1 = _today.select(".summary_list .sort .desc")[0].text();
    // 습도
    let v2 = _today.select(".summary_list .sort .desc")[1].text();
    // 풍속
    let v3 = _today.select(".summary_list .sort .desc")[2].text();

    retMsg +=
      "현재 " + msg + "의 온도는 " + cur_temp + "이며 어제보다 " + diff_temp;

    retMsg += "\n\n현재온도 : " + cur_temp;
    retMsg += "\n체감온도 : " + v1;
    retMsg += "\n습도 : " + v2;
    retMsg += "\n풍속 : " + v3;
  } catch (e) {
    retMsg = e;
    Log.e(e);
  }

  return retMsg;
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
  if (msg.startsWith("/")) {
    // const city = msg.substr(4);
    // const weatherInfo = getWeather(city);
    // replier.reply(weatherInfo);

    let cmd = msg.slice(1);
    var cmdArr = cmd.split(" ");
    if (_cmdArr.includes(cmdArr[0])) {
      let param = cmdArr[0];

      if (param == "날씨") {
        let area = msg.substr(cmdArr[0].length + 1).trim();

        if (isNaN(area)) {
          repMsg = getWeatherFromNaver(area);
          replier.reply(repMsg);
        }
      }
    }
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
  } else if (msg.includes("확마")) {
    replier.reply(msg + "하면 어쩔 건데?!");
  } else if (msg.startsWith("/추가 ")) {
    const money = msg.substr(4);
    replier.reply(postData(money));
  }
}

function postData(money) {
  const data = {
    money: money,
  };

  try {
    const url = "https://chat-bot-sigma-orcin.vercel.app/api";
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
      fetchData();
      return "요청 성공, 서버 응답 데이터:" + responseData;
    } else {
      return "요청 실패:" + response.statusMessage();
    }
  } catch (error) {
    return "에러:" + error;
  }
}
