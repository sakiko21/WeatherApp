import React, {useState} from 'react';

export default function WeatherApp () {
  //現在の天気
    const [weather, setWeather] = useState(null);
    //週間天気
    const [weeklyWeather, setWeeklyWeather] = useState([]);
  //結果のモーダルを表示するかどうかのstate
    const [modalVisible, setModalVisible] = useState(false);
    //緯度経度をstateにセット
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    //現在地を取得して天気を表示
    const getWeatherData = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          // 緯度・経度をstateにセット
          setLatitude(latitude);
          setLongitude(longitude);

          // 取得した位置情報を使って現在の天気情報を取得する処理を追加する。以下はサンプルコード。
          //https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
          const apiKey = 'c1ff7c67be648bd689da3b8f8a859d62';
          let part = 'daily';
          fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=${part}&appid=${apiKey}`)
          .then(response => response.json())
          .then(data => {
            // APIからのレスポンスデータを利用する処理
            setWeather(data);
          })
          .catch(error => {
            // エラーハンドリング
            console.error('APIの呼び出し中にエラーが発生しました:', error);
          });
          fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
          .then(response => response.json())
          .then(data => {
            setWeeklyWeather(data.list); // APIから取得した週間天気データを保存します。
        })
        },
        (error) => {
          console.error("位置情報の取得中にエラーが発生しました:", error);
        },
        
      );
    };


  return (
    <div className="WeatherApp">
      <h1>天気予報アプリ</h1>
      <p>天気予報を表示します。</p>
      {/* ボタンをクリックしたら現在地の天気を表示する */}
      <button onClick={() => {
                            getWeatherData();
                            setModalVisible(true);
                        }}
                        >現在地を取得して天気を表示</button>
      {modalVisible && (
      <div className="responsWrapper">
        <div className="currentWeather">
          <p>現在の緯度と経度<br/>※表示されるまで数秒お待ちください</p>
          <p>現在地の緯度:{latitude}</p>
          <p>現在地の経度:{longitude}</p>
          {weather && <p>現在の天気：{weather.current.weather[0].main}</p>}  
        </div>
        <div className="weaklyWeather">
          <p>3時間ごとの天気</p>
          {weeklyWeather
          .filter((forecast) =>{
            const hour = (new Date(forecast.dt * 1000).getUTCHours() + 9) % 24;
            return [0, 3, 6, 9, 12, 15, 18, 21].includes(hour);
          }) 
          .map((forecast, index) => (
            <div>
              <h3>{new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
              <p>時間: {(new Date(forecast.dt * 1000).getUTCHours() + 9) % 24}時</p>
              <p>天気: {forecast.weather[0].main}</p>
            </div>
          ))}
      </div>
      </div>
      )}
      
    </div>
  );
}