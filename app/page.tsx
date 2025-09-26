"use client";

import React from "react";
import {
  Box,
  TextInput,
  Button,
  Text,
  Title,
  Card,
  Divider,
} from "@mantine/core";
import { IconSun, IconCloud, IconCloudRain } from "@tabler/icons-react";
import { useWeatherStore } from "@/store/weatherStore";
import { ForecastData, getCurrentWeather, getForecast } from "@/services/weather";

export default function HomePage() {
  const { city, setCity, currentWeather, setCurrentWeather, error, setError } =
    useWeatherStore();

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "sun":
        return <IconSun size={24} />;
      case "cloud":
        return <IconCloud size={24} />;
      case "rain":
        return <IconCloudRain size={24} />;
      default:
        return null;
    }
  };

  const handleSearch = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    try {
      setError("");
      const current = await getCurrentWeather(city);
      const forecast = await getForecast(city);

      const dailyMap: Record<string, ForecastData[]> = {};
      forecast.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyMap[date]) dailyMap[date] = [];
        dailyMap[date].push(item);
      });

      const dailyForecast = Object.entries(dailyMap)
        .slice(0, 7)
        .map(([date, items]) => {
          const temps = items.map((i) => i.temp);
          const tempHigh = Math.max(...temps);
          const tempLow = Math.min(...temps);
          const mainIcon = items[0].description.toLowerCase().includes("sun")
            ? "sun"
            : items[0].description.toLowerCase().includes("cloud")
            ? "cloud"
            : "rain";

          return {
            day: new Date(date).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            tempHigh: `${Math.round(tempHigh)}°`,
            tempLow: `${Math.round(tempLow)}°`,
            icon: mainIcon,
          };
        });

const todayDate = new Date();
const hourlyForecast = forecast
  .filter((item) => {
    const itemDate = new Date(item.dt_txt);
    return (
      itemDate.getDate() === todayDate.getDate() &&
      itemDate.getMonth() === todayDate.getMonth() &&
      itemDate.getFullYear() === todayDate.getFullYear()
    );
  })
  .map((item) => ({
    time: new Date(item.dt_txt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: `${Math.round(item.temp)}°`,
    icon: item.description.toLowerCase().includes("sun")
      ? "sun"
      : item.description.toLowerCase().includes("cloud")
      ? "cloud"
      : "rain",
  }));


      setCurrentWeather({
        location: current.city,
        country: current.country,
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        temperature: `${Math.round(current.temp)}°`,
        condition: current.description,
        icon: current.description.toLowerCase().includes("sun")
          ? "sun"
          : current.description.toLowerCase().includes("cloud")
          ? "cloud"
          : "rain",
        stats: {
          feelsLike: `${Math.round(current.feels_like)}°`,
          humidity: `${current.humidity}%`,
          wind: `${Math.round(current.wind_speed)} km/h`,
          precipitation: "0 mm",
        },
        dailyForecast,
        hourlyForecast,
      });
    } catch (err) {
      setError("Failed to fetch weather data. Please check the city name.");
      console.error(err);
    }
  };

  const hasWeatherData = currentWeather.location !== "";

  return (
    <Box
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #1e1b4b, #4f46e5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 1rem",
        boxSizing: "border-box",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: 1280,
          marginBottom: 4,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <Title order={3} style={{ color: "#fff", fontWeight: 600 }}>
          ☀️ Weather Now
        </Title>
        <Button
          style={{
            backgroundColor: "#4B556380",
            color: "#fff",
            borderRadius: 8,
            height: 22,
            minWidth: 100,
          }}
        >
          Units ▼
        </Button>
      </Box>

      <Title
        order={2}
        style={{
          color: "#fff",
          fontWeight: 300,
          fontSize: "clamp(24px, 4vw, 36px)",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        How&apos;s the sky looking today?
      </Title>
<Box
  style={{
    display: "flex",
    width: "100%",
    maxWidth: 660,
    gap: 8,
    marginTop: 28,
    flexWrap: "wrap",
  }}
>
  <TextInput
    placeholder="Search for a place..."
    value={city}
    onChange={(e) => setCity(e.target.value)}
    styles={{
      input: {
        backgroundColor: "#1F293780",
        color: "#fff",
        borderRadius: 8,
        height: 44,
        border: "1px solid #4B5563B2",
        paddingLeft: 28,
        boxSizing: "border-box",
        flex: 1, // <-- makes input take remaining space
        minWidth: 0, // <-- prevents overflow in flex
      },
    }}
  />

  <Button
    onClick={handleSearch}
    style={{
      backgroundColor: "#2563EB",
      height: 44,
      width: 115, // fixed width for button
      borderRadius: 8,
      flexShrink: 0,
      color: "#fff",
    }}
  >
    Search
  </Button>
</Box>


      {error && <Text style={{ color: "red", marginBottom: 16 }}>{error}</Text>}

      {!hasWeatherData && (
        <Text
          style={{
            color: "#9CA3AF",
            marginTop: 82,
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          🌤️ Search for a city to see weather information
        </Text>
      )}

      {hasWeatherData && (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 1280,
            marginTop: 40,
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <Box
              style={{
                flex: 2,
                minWidth: 280,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <Card
                style={{
                  borderRadius: 16,
                  padding: 24,
                  background: "linear-gradient(135deg, #3b82f6, #9333ea)",
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  height: 190,
                }}
              >
                <Box>
                  <Text size="lg" fw={500}>
                    {currentWeather.location}, {currentWeather.country}
                  </Text>
                  <Text size="sm">{currentWeather.date}</Text>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "auto",
                    marginBottom: 20,
                  }}
                >
                  <Title order={1} style={{ fontSize: "64px", fontWeight: 700 }}>
                    {currentWeather.temperature}
                  </Title>
                </Box>
              </Card>

              <Box
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: 24,
                }}
              >
                {Object.entries(currentWeather.stats).map(([label, value]) => (
                  <Card
                    key={label}
                    style={{
                      background: "#1F293780",
                      borderRadius: 12,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      padding: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 400,
                        fontSize: 14,
                        color: "#9CA3AF",
                        marginBottom: 8,
                        textTransform: "capitalize",
                      }}
                    >
                      {label.replace(/([A-Z])/g, " $1")}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 500,
                        fontSize: 22,
                        lineHeight: "120%",
                        color: "#fff",
                      }}
                    >
                      {value}
                    </Text>
                  </Card>
                ))}
              </Box>

              <Box>
                <Title order={4} style={{ color: "#fff", marginBottom: 16 }}>
                  Daily forecast
                </Title>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(124px, 1fr))",
                    gap: 12,
                  }}
                >
                  {currentWeather.dailyForecast.map((d) => (
                    <Card
                      key={d.day}
                      style={{
                        width: "124px",
                        height: "125px",
                        borderRadius: 12,
                        background: "#1F293780",
                        color: "#fff",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text fw={500}>{d.day}</Text>
                      {renderIcon(d.icon)}
                      <Text size="sm">
                        {d.tempHigh} / {d.tempLow}
                      </Text>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box style={{ flex: 1, minWidth: 280 }}>
              <Card
                style={{
                  background: "#1F2937aa",
                  padding: 16,
                  borderRadius: 16,
                  color: "#fff",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <Title order={4}>Hourly forecast</Title>
                  <Text size="sm" fw={500}>
                    {currentWeather.date.split(",")[0]}
                  </Text>
                </Box>

                <Box style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  {currentWeather.hourlyForecast.map((h, index) => (
                    <Box key={h.time} style={{ width: "100%" }}>
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "4px 0",
                        }}
                      >
                        <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {h.icon ? renderIcon(h.icon) : null}
                          <Text size="sm">{h.time}</Text>
                        </Box>
                        <Text size="sm">{h.temp}</Text>
                      </Box>
                      {index !== currentWeather.hourlyForecast.length - 1 && (
                        <Divider my={0} style={{ backgroundColor: "#4B55634D", height: 1 }} />
                      )}
                    </Box>
                  ))}
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
