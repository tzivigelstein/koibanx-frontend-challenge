# Koibanx 3.0 frontend challenge

## Available Scripts

In the project directory, you can run:

## Requirements

Run `npm i` or `npm install` in project root to install the necessary packages.

When developing, the database throws a CORS error when trying to connect.
The only way I could solve this issue is to install the following extension in Chrome:

- [Moesif Website](https://www.moesif.com/)
- [Moesif Chrome Extension](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc?hl=en-US)

### Important

Please deactivate or delete the extension after developing because it
will break the connection of your opened tabs.

I'm letting the environment variables open and public so you can run the project.

### `npm run dev`

Runs `vite` which starts Vite.js in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run build`

Runs `vite build` which builds the application for production usage.

### `npm run preview`

Runs `vite preview` which will boot up local static web server that serves
the files from dist at http://localhost:4173. It's an easy way to check if the production
build looks OK in your local environment.

## Technologies

- React/Vite
- CSS modules

## Considerations

The main problem to consider before getting started was to think of a way of retrieving the data
from somewhere so the frontend mock process could be easier.

After a while, I decided to mock the data with the online API/DB from restdb.io where the challenge
suggested the queries.
Having a JSON file that fulfills the function of a database wasn't the best option due to not being
able to retrieve the data from the API and I would be losing contact with the particular query language.

Having decided what source of data I would be using, I noticed that the challenge specifically asked
that the queries in the text input should be able to get data that was similar to the given search term.

Searching for **34**, should retrieve:

- Store **34**
- CUIT **34**0-3456522-90
- \_id: 6259128540ab28**34**218

After a while reading the documentation I noticed that there was no
way to search for a substring in the database, unless you use regex.
Now, I know that regex it's not the best way to search for a substring, because it's a lot of load on the API, but it was the only way I could find similar data.

The restdb.io API has a feature that allows you to populate fields
with a certain amount of random data. I created 100 documents with random data and the following types:

- \_id: `ObjectId` - Such as the MongoDB \_id, created by restdb.io
- store: `string` - An Address1 of a store with this format '8417 Veda Circles'.
- CUIT: `string` - A Guid_short it's a Random ID. They don't have a CUIT generator.
- concepts: `array<number>` - An array of random numbers. [2,3,4,5,1,6]
- currentBalance: `number` - A random number between 30k and 3M.
- lastTransaction: `Date` - A random date.
