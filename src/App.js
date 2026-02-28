import { useState } from 'react';
import { Cloud, Sun, Wind, Droplets, Navigation, Search, Thermometer, CloudRain, CloudDrizzle, CloudSnow } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (searchCity) => {
    if (!searchCity) return;
    
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=fe4feefa8543e06d4f3c66d92c61b69c`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("City not found. Please try again.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const getWeatherIcon = (iconCode) => {
    const code = iconCode?.substring(0, 2);
    switch(code) {
      case '01': return <Sun size={120} className="text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.4)]" />;
      case '02': return <Cloud size={120} className="text-gray-300 drop-shadow-[0_0_30px_rgba(200,200,200,0.4)]" />;
      case '03':
      case '04': return <Cloud size={120} className="text-gray-400 drop-shadow-[0_0_30px_rgba(150,150,150,0.4)]" />;
      case '09': return <CloudDrizzle size={120} className="text-blue-400 drop-shadow-[0_0_30px_rgba(96,165,250,0.4)]" />;
      case '10': return <CloudRain size={120} className="text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]" />;
      case '11': return <CloudRain size={120} className="text-purple-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]" />;
      case '13': return <CloudSnow size={120} className="text-cyan-300 drop-shadow-[0_0_30px_rgba(103,232,249,0.4)]" />;
      default: return <Sun size={120} className="text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.4)]" />;
    }
  };

  const getTime = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 font-sans transition-colors duration-500 ${weather ? 'bg-[#0a0a0a] text-white selection:bg-cyan-500' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      {/* Dynamic Background Gradient - only show when weather is displayed */}
      {weather && (
        <div className="fixed inset-0 overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 blur-[120px] rounded-full" />
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <AnimatePresence mode="wait">
          {weather ? (
            <motion.div
              key="weather"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search city..." 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all text-lg text-white"
                />
              </form>

              {/* Main Hero Card */}
              <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">{weather.name}</h1>
                    <p className="text-gray-400 flex items-center gap-1 mt-1">
                      <Navigation size={14} /> {weather.sys.country}
                    </p>
                  </div>
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/30">
                    Live
                  </span>
                </div>

                <div className="mt-10 flex flex-col items-center">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  >
                    {getWeatherIcon(weather.weather[0].icon)}
                  </motion.div>
                  <h2 className="text-8xl font-black mt-4 ml-4 tracking-tighter">
                    {Math.floor(weather.main.temp - 273)}°
                  </h2>
                  <p className="text-xl font-medium text-gray-300 mt-2 capitalize">{weather.weather[0].description}</p>
                </div>

                <div className="flex justify-between mt-10 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Thermometer size={18} className="text-cyan-400" />
                    <span>H: {Math.floor(weather.main.temp_max - 273)}° L: {Math.floor(weather.main.temp_min - 273)}°</span>
                  </div>
                </div>
              </div>

              {/* Bento Grid Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 flex flex-col items-center justify-center gap-2">
                  <Droplets className="text-blue-400" />
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Humidity</span>
                  <span className="text-xl font-bold">{weather.main.humidity}%</span>
                </div>
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 flex flex-col items-center justify-center gap-2">
                  <Wind className="text-purple-400" />
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Wind Speed</span>
                  <span className="text-xl font-bold">{weather.wind.speed} m/s</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
                <h3 className="font-bold mb-4">Additional Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-2xl">
                    <span className="text-gray-400">Feels Like</span>
                    <span className="font-bold">{Math.floor(weather.main.feels_like - 273)}°C</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-2xl">
                    <span className="text-gray-400">Pressure</span>
                    <span className="font-bold">{weather.main.pressure} hPa</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-2xl">
                    <span className="text-gray-400">{weather.weather[0].icon.includes('d') ? 'Sunset' : 'Sunrise'}</span>
                    <span className="font-bold">{getTime(weather.sys[weather.weather[0].icon.includes('d') ? 'sunset' : 'sunrise'])}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-[2.5rem] p-12 shadow-2xl text-center"
            >
              {/* Header with icon */}
              <div className="flex items-center justify-center gap-3 mb-12">
                <div className="text-4xl">☀️</div>
                <h1 className="text-4xl font-bold text-gray-900">Weather Finder</h1>
              </div>

              {/* Cloud Icon */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="mb-12"
              >
                <div className="relative w-48 h-32 mx-auto">
                  <div className="absolute top-8 left-8 w-32 h-24 bg-gradient-to-b from-blue-400 to-blue-200 rounded-full shadow-lg"></div>
                  <div className="absolute top-4 right-8 w-28 h-28 bg-gradient-to-b from-blue-400 to-blue-200 rounded-full shadow-lg"></div>
                  <div className="absolute top-12 left-4 w-40 h-20 bg-gradient-to-b from-blue-300 to-white rounded-full shadow-lg"></div>
                </div>
              </motion.div>

              {/* Description */}
              <p className="text-gray-600 text-lg mb-8 font-medium">Discover weather in any city worldwide</p>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Enter city name..." 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-3xl py-4 px-6 outline-none focus:border-pink-300 focus:bg-white transition-all text-lg text-gray-700 placeholder-gray-400"
                />
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white font-semibold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 text-lg"
                >
                  <Search size={20} />
                  Search Weather
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WeatherApp;