## To Install a react app from scratch 

    npx create-react-app app_name

## To Install all the dependancies

    npm install

## To Install the react router dom

    npm i react-router-dom

## To run the application

    npm start

## To install tailwindcss

    npm install -D tailwindcss@3
    npx tailwindcss init

# change the tailwind.config.js

    /** @type {import('tailwindcss').Config} */
    module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    }

# Add @tailwind directives to /src/index.css

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

# Install React Bootstrap

    npm install react-bootstrap bootstrap

# in the src\index.js

    import "bootstrap/dist/css/bootstrap.min.css";