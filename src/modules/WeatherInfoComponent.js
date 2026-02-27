import styled from "styled-components";
import {WeatherIcons} from "../App";

export const WeatherInfoIcons = {
    sunset: "/react-weather-app/icons/temp.svg",
    sunrise: "/react-weather-app/icons/temp.svg",
    humidity: "/react-weather-app/icons/humidity.svg",
    wind: "/react-weather-app/icons/wind.svg",
    pressure: "/react-weather-app/icons/pressure.svg",
};

const Location = styled.h2`
  margin: 10px 0;
  text-transform: capitalize;
  font-size: 32px;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const TempDisplay = styled.div`
  font-size: 72px;
  font-weight: 700;
  color: white;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  margin: 20px 0;
  animation: scaleIn 0.5s ease-out;

  @keyframes scaleIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const Condition = styled.p`
  margin: 10px 0;
  text-transform: capitalize;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-align: center;
`;

const WeatherInfoLabel = styled.h3`
  margin: 30px 0 20px;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 2px;
`;

const WeatherIcon = styled.img`
  width: 140px;
  height: 140px;
  margin: 20px auto;
  filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3));
  animation: rotate 20s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const MainWeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;

const WeatherInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  width: 100%;
  margin-top: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
  }
`;

const InfoIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  filter: brightness(0) invert(1);
`;

const InfoValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 5px;
`;

const InfoLabel = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1px;
`;

const WeatherInfoComponent = (props) => {
    const {name, value} = props;
    return (
        <InfoContainer>
            <InfoIcon src={WeatherInfoIcons[name]}/>
            <InfoValue>{value}</InfoValue>
            <InfoLabel>{name}</InfoLabel>
        </InfoContainer>
    );
};

const WeatherComponent = (props) => {
    const {weather} = props;
    const isDay = weather?.weather[0].icon?.includes('d')
    const getTime = (timeStamp) => {
        const date = new Date(timeStamp * 1000);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    return (
        <>
            <MainWeatherContainer>
                <WeatherIcon src={WeatherIcons[weather?.weather[0].icon]}/>
                <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>
                <TempDisplay>{`${Math.floor(weather?.main?.temp - 273)}°C`}</TempDisplay>
                <Condition>{weather?.weather[0].description}</Condition>
            </MainWeatherContainer>

            <WeatherInfoLabel>Weather Details</WeatherInfoLabel>
            <WeatherInfoContainer>
                <WeatherInfoComponent 
                    name={isDay ? "sunset" : "sunrise"}
                    value={getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}
                />
                <WeatherInfoComponent 
                    name={"humidity"} 
                    value={`${weather?.main?.humidity}%`}
                />
                <WeatherInfoComponent 
                    name={"wind"} 
                    value={`${weather?.wind?.speed} m/s`}
                />
                <WeatherInfoComponent 
                    name={"pressure"} 
                    value={`${weather?.main?.pressure} hPa`}
                />
            </WeatherInfoContainer>
        </>
    );
};

export default WeatherComponent;
