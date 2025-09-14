# 🌍 Countries Data App – Step 3

This project is part of the **Full Stack Open 2024** course (University of Helsinki).  
The goal of this exercise was to display information about countries and add weather information for the capital of a selected country using a public weather API.

## 📚 Description

The app displays data for all countries, including:

- Name, population, and languages
- Flag image
- Capital city

Additionally, users can click on a country to view detailed information including **current weather in the capital city**, fetched from a weather API such as [OpenWeatherMap](https://openweathermap.org).

The weather feature includes:

- Temperature
- Wind speed and direction
- Weather icon

Environment variables are used to securely store the API key (e.g., `VITE_SOME_KEY`) to avoid exposing sensitive information in source code.

## 🛠️ Tech Stack

- **Frontend:** React, JavaScript, HTML5, CSS3
- **API:** REST API for countries (`restcountries.com`)
- **Weather API:** OpenWeatherMap
- **Environment Variables:** `.env` / Vite (`VITE_` prefix)

## 🚀 Features

✅ View a list of all countries  
✅ Search/filter countries by name  
✅ Click a country to see detailed information  
✅ Display weather report for the capital city (temperature, wind, icon)  
✅ Securely manage API keys via environment variables

## 🎯 Learning Objectives

- Fetch and display data from multiple APIs

- Handle asynchronous operations and errors in React

- Use environment variables for sensitive data (API keys)

- Implement component-based architecture for clean code
