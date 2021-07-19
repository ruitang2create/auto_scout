# Auto Scout
**Auto Scout** is an simple web app built with **React.js**. It utilizes [NHTSA Vehicle API](https://vpic.nhtsa.dot.gov/api) to allow users to check vehicle information by vehicle make, type and year.

## Set Up

1. ##### Install **yarn**: (skip this step if you are using **npm**)
   ```
   npm install -g yarn
   ```
2. ##### Install dependencies:

   - yarn:
     ```
     yarn
     ```
   - npm:
     ```
     npm install
     ```
     (This project is using yarn by default. If you want to use npm, delete **yarn.lock** under the root folder.)

## Run the development server locally

```bash
yarn start
# or
npm run start
```

Then you should be able to visit the app at http://localhost:3000

## Usage

- ##### Home page
  - You can search for vehicle models based on at most 3 key information:
    - **Vehicle make(required)**
    - Vehicle type(optional)
    - Vehicle year(optional)
      - (p.s. year number must be in between 1980-present)
  - Click the **Search** button to conduct the search

- ##### Result page
  - Search result:
    - All matches vehicle information will be presented in a table
    - Blank table indicates 0 match
  - To **filter the result** or **conduct a new search**:
    - Click the little **grey arrow tag** on the middle of the left screen border to open the sidebar that contains the **filter**
    - Select wanted vehicle make and type
    - Drag the range slider to set the car year