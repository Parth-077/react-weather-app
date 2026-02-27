import styled from "styled-components";

const SearchBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin: 30px 0;

  & input {
    padding: 18px 24px;
    font-size: 16px;
    border: none;
    outline: none;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    font-weight: 500;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &::placeholder {
      color: #999;
    }

    &:focus {
      background: white;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
  }

  & button {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    font-size: 16px;
    padding: 18px 24px;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 50px;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(245, 87, 108, 0.5);
    }

    &:active {
      transform: translateY(-1px);
    }
  }
`;

const ChooseCityLabel = styled.p`
  color: white;
  margin: 20px 0;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

const WelcomeWeatherLogo = styled.img`
  width: 180px;
  height: 180px;
  margin: 20px auto;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
  }
`;

const CityComponent = (props) => {
  const { updateCity, fetchWeather } = props;
  return (
    <>
      <WelcomeWeatherLogo src={"/react-weather-app/icons/perfect-day.svg"} />
      <ChooseCityLabel>Discover weather in any city worldwide</ChooseCityLabel>
      <SearchBox onSubmit={fetchWeather}>
        <input
          onChange={(e) => updateCity(e.target.value)}
          placeholder="Enter city name..."
        />
        <button type={"submit"}>🔍 Search Weather</button>
      </SearchBox>
    </>
  );
};

export default CityComponent;
