import React, {useState} from 'react';

export default function WeatherApp () {
    const [weather, setWeather] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    //
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

          // 取得した位置情報を使って天気情報を取得する処理を追加する。以下はサンプルコード。
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
        },
        (error) => {
          console.error("位置情報の取得中にエラーが発生しました:", error);
        }
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
        <div>
          <p>現在の緯度と経度<br/>※表示されるまで数秒お待ちください</p>
          <p>現在地の緯度:{latitude}</p>
          <p>現在地の経度:{longitude}</p>
          {weather && <p>天気：{weather.current.weather[0].main}</p>}  
        </div>
        
      </div>
      )}
      
    </div>
  );
}