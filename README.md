# Sweeft Making Science React Technical Task

This project was developed during the selection part of acceleration programm at Sweeft Digital company. This is the project where you can find the most relevant data information of countries around world, check and filter their airport lists and convert each countries currency to another.

## Tech Stack

- Typescript
- React
- React Router DOM
- CSS
- Vite

### Main functionality

- Implemented very flexible custom hook for fetching data inside whole project
- Implemented React-context for often used data and cashing feature around all components to avoid unneseccary requests
- Added Error Boundaries to show information for user and not found page. Application will not crush if something went wrong.
- Added React Router DOM for routing
- Using `navigator.geolocation` to detect users position (latitude,longitude).
- Using React Portals for loading screens
- If user already viewed page, the information of page will be saved inside React-context `cashStore` state and will be deleted after refresh.
- Was implemented debouncing effect for airport search input

## Run project
1. Install dependencies - `npm install`
2. Start the project - `npm run dev`
