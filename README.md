# Frontend Application for News Aggregator(NewsNexus)

### Overview
Welcome to the take-home challenge for the Frontend web developer position. We are excited
to see your skills and experience in action. The challenge is to create the user interface for a
news aggregator website that pulls articles from various sources and displays them in a clean,
easy-to-read format.

### Requirements:
1. Article search and filtering: Users should be able to search for articles by keyword and
filter the results by date, category, and source.
2. Personalized news feed: Users should be able to customize their news feed by
selecting their preferred sources, categories, and authors.
3. Mobile-responsive design: The website should be optimized for viewing on mobile
devices.

### Data sources that can be used (choose at least 3):
1. NewsAPI: This is a comprehensive API that allows developers to access articles from
more than 70,000 news sources, including major newspapers, magazines, and blogs.
The API provides access to articles in various languages and categories, and it supports
search and filtering.
2. OpenNews: This API provides access to a wide range of news content from various
sources, including newspapers, magazines, and blogs. It allows developers to retrieve
articles based on keywords, categories, and sources.
3. NewsCred: The NewsCred API provides access to a wide range of news content from
various sources, including newspapers, magazines, and blogs. The API allows
developers to retrieve articles based on keywords, categories, and sources, as well as to
search for articles by author, publication, and topic.
4. The Guardian: This API allows developers to access articles from The Guardian
newspaper, one of the most respected news sources in the world. The API provides
access to articles in various categories and supports search and filtering.
5. New York Times: This API allows developers to access articles from The New York
Times, one of the most respected news sources in the world. The API provides access
to articles in various categories and supports search and filtering.
6. BBC News: This API allows developers to access news from BBC News, one of the
most trusted news sources in the world. It provides access to articles in various
categories and supports search and filtering.
7. NewsAPI.org: This API provides access to news articles from thousands of sources,
including news publications, blogs, and magazines. It allows developers to retrieve
articles based on keywords, categories, and sources.

### Challenge Guidelines
1. The output expected from this challenge is a front-end project using React.js.
2. You are free to choose at least three data sources from the provided list to fetch
articles for your news aggregator.
3. Ensure that the Frontend application can be containerized using Docker and provide
clear documentation on how to run the project within a Docker container.
4. Incorporate best practices of software development such as DRY (Don't Repeat
Yourself), KISS (Keep It Simple, Stupid), and SOLID (Single responsibility, Open-closed,
Liskov substitution, Interface segregation, Dependency inversion) into your code.


### Directory Structure :
```
└── JeevanA1999-NewsNexus/
    ├── README.md                # Documentation for the project
    ├── eslint.config.js         # ESLint configuration for linting JavaScript/React code
    ├── index.html               # Entry HTML file for the application
    ├── package.json             # Dependency and script management
    ├── postcss.config.js        # Configuration for PostCSS
    ├── tailwind.config.js       # Tailwind CSS configuration
    ├── vite.config.js           # Vite configuration for bundling and serving the application
    ├── public/                  # Public assets for the application
    └── src/                     # Source code for the application
        ├── App.css              # Styles for the main App component
        ├── App.jsx              # Main App component
        ├── index.css            # Global styles
        ├── main.jsx             # Application entry point
        ├── Store/               # Redux store and slices
        │   ├── itemsSlice.jsx       # Manages state for general items, sources, and filters
        │   ├── searchSlice.jsx      # Manages state for search toggle and search-related features
        │   └── store.jsx            # Centralized Redux store configuration
        ├── assets/              # Images and other static assets
        ├── components/          # Reusable components for the application
        │   ├── Error/               # Error handling components
        │   │   └── Error.jsx        # Component for displaying error messages
        │   ├── Home/                # Home page components
        │   │   └── Home.jsx         # Main Home page component
        │   ├── NavBar/              # Navigation bar components
        │   │   └── Navbar.jsx       # Navbar component
        │   ├── News/                # News-related components
        │   │   ├── NewsCard.jsx     # Component to display a single news card
        │   │   └── NewsComponent.jsx # Component to display news articles
        │   ├── Personalized/        # Components for personalized news feed
        │   │   └── Personalized.jsx # Displays user-customized news feed
        │   ├── Search/              # Search components
        │   │   ├── Serachcomponent.css # Styles for the search component
        │   │   └── Serachcomponent.jsx # Search functionality and UI
        │   └── Shimmer/             # Loading shimmer effects
        │       └── ShimmerNewsCard.jsx # Shimmer component for loading news cards
        └── config/              # Configuration files
            └── NetworkConfig.js  # Contains API configuration and constants
```

### Technologies Used

##### React.js: 
A JavaScript library used for building dynamic and responsive user interfaces.
##### Redux Toolkit: 
A powerful state management library to efficiently manage application state.
##### Axios: 
A promise-based HTTP client for making API requests and handling data fetching.
##### Tailwind CSS: 
A utility-first CSS framework for styling.
##### Docker: 
A platform for containerizing the application, ensuring portability and consistency across environments.

## Implementation Details

### Search and Filtering

Search Component:
Enables users to search for articles by entering keywords and specifying a date range. This triggers a search request to the selected data sources.
FilterOptions Component:
Allows users to filter articles based on categories and sources. This component interacts with Redux to update the selected source and category criteria.

### Personalized News Feed

Personalized Component:
Displays a customized news feed based on user preferences such as preferred categories, sources, and authors. User preferences are managed in Redux and used to fetch and display relevant articles.
Note: The APIs do not natively support personalized filtering based on categories, sources, or authors. To address this, local filtering is implemented using Redux states.

### Mobile-Responsive Design

Responsive Layout:
UI components are designed using Tailwind CSS, ensuring the layout adapts seamlessly across different screen sizes and devices.

### API Integration

Data Sources: The application integrates with three APIs: NewsAPI, GuardianAPI, and NYTAPI.
HTTP Requests: API calls are handled using Axios, a popular JavaScript library for making HTTP requests. Axios simplifies API integration by providing an easy-to-use interface and features like automatic JSON parsing.
Service File: A dedicated service file manages API requests to the respective data sources. It includes functions to fetch data, which is then stored in Redux.
Performance Optimization: Callback functions are used to prevent unnecessary API calls on every render, enhancing performance.

### State Management

Redux Toolkit:
Manages the application's state, including key properties such as:
allSources
generalItems
defaultSource
defaultGeneral
defaultDate
selectedCat
Redux slices (e.g. itemsSlice.js) are created to manage specific aspects of the state, ensuring a modular and maintainable codebase.

### Dockerization:

The Dockerfile defines the steps to build the Docker image for the application:

#### Use the Node.js 18 Alpine base image for a lightweight container
`FROM node:18-alpine`

#### Set the working directory inside the container
`WORKDIR /app`

#### Copy the package.json and package-lock.json files into the container
`COPY package*.json ./`

#### Install the dependencies
`RUN npm install`

#### Copy all source files into the container
`COPY . .`

#### Build the application
`RUN npm run build`

#### Install the serve package globally to serve the production build
`RUN npm install -g serve`

#### Define the default command to serve the app
`CMD ["serve", "-s", "dist", "-l", "3000"]`

#### Expose port 3000 to make the application accessible
`EXPOSE 3000`



### Docker Compose
The docker-compose.yml file simplifies running the containerized application by defining services and configuration:
```
services:
  news-nexus:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000" # Maps container port 3000 to host port 3000
    restart: always # Ensures the container restarts automatically in case of failure
```
## Project Setup and Dockerization
### Clone the Repository:
`git clone https://github.com/JeevanA1999/NewsNexusOne.git`
### Navigate into the project directory:
`cd NewsNexusOne`

## Build and Run the Docker Container
#### Steps to Run the Application in Docker
Ensure Docker and Docker Compose are Installed

#### Install Docker and Docker Compose on your machine
Build the Docker Image

#### Build the Docker Image
Run the following command in the project directory:
`docker-compose build`

#### Run the Application
Start the containerized application using:
`docker-compose up`
#### Access the Application
The application will be available at `http://localhost:3000.`

#### Stop the Application
`docker-compose down`