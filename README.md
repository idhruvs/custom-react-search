### Custom React Search


#### Available Scripts

1. `npm run start `
    - Runs the code in development mode.

2. `npm run build`
    - Builds the UI source code and stores the result in `dist` folder

#### Components

1. `SearchComponent`
    - Component Type: Class Component 
    - Allows users to search places (cities / countries) using the Mapbox Places API.
    - Utilizes 'debounce' utility to control the API Requests Counts.
    - Contains auto-complete-suggestions component that gets rendered whenever there are suggestions available
    - Utilizes 'handleAPIError' utility to sanitize the API Response.

2. `LocationComponent`
   - Component Type: Functional Component
   - Renders the location parameters provided to the component in props.

3. `LoaderComponent`
   - Component Type: Functional Component
   - Pure CSS Loader inspired from https://loading.io/css

4. SearchHistoryListComponent
  - Component Type: Functional Component
  - Renders the search-history list provided to the component in props.
  - Dispatches clearHistory action to parent component for deleting a search-history-item.

#### Utils

1. `debounce`
    - Lightweight debounce functionality that takes the function to be executed as a callback arguement.
    - Another arguement to the debounce function is the timeout / delay after which the callback is required to     be executed. 

2. `handleAPIError`
    - Utility to parse Fetch API Responses for errors in response code
    - Enhances the error-handling capabilities of the component.abs

3. `hasClickedOutside`
    - Utility to check if 'clickevent' has occurred outside the DOM Node whose reference is passed as arguement     to the function.