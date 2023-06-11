import React, {useState} from 'react';
export default function ResponsArea () {
    const [weather, setWeather] = useState(null);
    const [temp, setTemp] = useState(null);

    return (
        
        <div className="responsArea">
            天気はここに表示されます。
            
        </div>
        
    );
}