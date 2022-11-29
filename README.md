# Exploring NASA's NEOs API

The application displays data from the two NeoWs endpoints: Feed and Lookup. In
the feed we're looking at NEOs from a 7 day window. And the Lookup provides
expanded data for any given NEO.

## The Guts

This project is bootstrapped with Spring Boot so to run the backend you can
either

* run `mvn spring-boot:run` from the root directory of the project or

* or start it from your IDE of choice

The backend is configured to run on port 8080

## The UI

The frontend is bootstrapped with Create React App so once you navigate the root
folder `ui` run `npm install` to install dependencies and then `npm start`

The app will start in the development mode on port 3000

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
