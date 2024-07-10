# GROW STOCK (Stocks/ETFs Broking Platform) 
![icon](https://github.com/kushaljgec2025/grow_stock/assets/108950724/0b360195-225d-4cab-9c41-9592ba463b5a)

## APK 
<a href="https://drive.google.com/file/d/1_rLn_5g7yr0E46-aEH-M1RJ9ftsn85tZ/view?usp=sharing">APK LINK</a>
## Overview

This application is designed to provide users with up-to-date information on the top gainers and losers in the stock market. Users can explore these sections and view detailed information and price trends for individual stocks/ETFs.

## Features

### Explore Screen
- **Top Gainers and Losers Tabs**: Displays the top-performing and worst-performing stocks/ETFs.
- **Stock/ETF Cards**: Each card shows essential information such as the stock/ETF name, ticker symbol, and percentage change.

### Product Screen
- **Basic Information**: Provides detailed information about the selected stock/ETF.
- **Line Graph**: Displays the price trend of the stock/ETF using a third-party library for line graphs.

### Additional Features
- **Error Handling**: Loading, error, and empty states are managed effectively to enhance user experience.

## Technology Stack

- **React Native**: For building the cross-platform mobile application.
- **Native Wind**: For catchy and usable UI.
- **Redux**: For state management.
- **Expo**: For streamlined development and deployment.
- **Alphavantage.co API**: For fetching stock/ETF data.
- **Third-party Library for Line Graphs(react-native-graphs,react-native-reanimated,react-native-gesture-handler)**: For rendering price trends in interactive graph

## Implementation Details

### Explore Screen

- **Tabs**: The Explore screen consists of two tabs: Top Gainers and Top Losers.
- **Grid of Cards**: Each tab displays a grid of cards with stock/ETF information.

### Product Screen

- **Basic Information**: Displays the company overview and other relevant details fetched from the Alpha Vantage Fundamental data API.
- **Line Graph**: Shows the historical price data of the stock/ETF.

### API Handling

- **Alpha Vantage API**: The application uses the Alpha Vantage API to fetch top gainers and losers, company overview, and ticker search.

### Error Handling

- **Loading State**: Display a loading spinner or indicator while fetching data.
- **Error State**: Show appropriate error messages if the API call fails.
- **Empty State**: Handle cases where no data is returned from the API.

### API Error
- **API limit reach error**: Use a different network for a smooth experience.
- (Alpha Vantage free API gives 25 API calls/day for one IP.)

### Some Android View
<div>
<img src="https://github.com/kushaljgec2025/grow_stock/assets/108950724/1da131a3-0b11-45bb-a78b-97a71742d413" width="300"  alt="Screenshot">
<img src="https://github.com/kushaljgec2025/grow_stock/assets/108950724/c8925197-1dab-4d41-a359-2c82cac9df60" width="300"  alt="Screenshot 1">
<img src="https://github.com/kushaljgec2025/grow_stock/assets/108950724/605fb638-5d2f-4452-a0b0-2065a32a425f" width="300" alt="Screenshot 2">
<img src="https://github.com/kushaljgec2025/grow_stock/assets/108950724/ab7d22fa-5927-4ee8-8610-288d5bfe49c7" width="300"  alt="Screenshot 3">
<img src="https://github.com/kushaljgec2025/grow_stock/assets/108950724/c1541da8-e95a-4a55-8020-d844a5e7b657" width="300"  alt="Screenshot 4">
<img src="https://github.com/kushaljgec2025/grow_stock/assets/108950724/98cb0092-d652-4fe2-bfc6-36032a36abd5" width="300"  alt="Screenshot 5">
</div>


###  Android Video Preview


https://github.com/kushaljgec2025/grow_stock/assets/108950724/dafe2db9-4fb4-48fe-bdd9-b4d093843b10


## Installation and Setup

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
