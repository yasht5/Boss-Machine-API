# Boss Machine

## Project Overview

In this project, you will create an entire API to serve information to a Boss Machine, a unique management application for today's most accomplished (evil) entrepreneurs. You will create routes to manage your 'minions', your brilliant 'million dollar ideas', and to handle all the annoying meetings that keep getting added to your busy schedule.

### Server Boilerplate

In **server.js**, you will see some boilerplate code, but the server is missing key functionality to allow it to run. You must:

- Set up body-parsing middleware with the `body-parser` packagae.
- Set up CORS middleware with the `cors` package. You can use the default settings.
- Mount the existing `apiRouter` at `/api`. This router will serve as the starting point for all your API routes.
- Start the server listening on the provided `PORT`. Make sure to use the `PORT` constant and not a hard-coded number, as this is required for tests to run.

Take note of the comments in **server.js**, as your code needs to fit into specific places around the existing boilerplate.

### API Routes

- Your routes should live inside the **server** folder. The file and router structure is up to you, the testing suite will only test whether your API endpoints work as intended, not how you nest your code!
- Your 'database' exists in **server/db.js**. The beginning database will be seeded every time the server is restarted. There is more information on working with the database and the helper functions it exports below.

#### Routes Required

- `/api/minions`
  - GET /api/minions to get an array of all minions.
  - POST /api/minions to create a new minion and save it to the database.
  - GET /api/minions/:minionId to get a single minion by id.
  - PUT /api/minions/:minionId to update a single minion by id.
  - DELETE /api/minions/:minionId to delete a single minion by id.
- `/api/ideas`
  - GET /api/ideas to get an array of all ideas.
  - POST /api/ideas to create a new idea and save it to the database.
  - GET /api/ideas/:ideaId to get a single idea by id.
  - PUT /api/ideas/:ideaId to update a single idea by id.
  - DELETE /api/ideas/:ideaId to delete a single idea by id.
- `/api/meetings`
  - GET /api/meetings to get an array of all meetings.
  - POST /api/meetings to create a new meeting and save it to the database.
  - DELETE /api/meetings to delete _all_ meetings from the database.

For all `/api/minions` and `/api/ideas routes`, any POST or PUT requests will send their new/updated resources in the request body. POST request bodies will not have an `id` property, you will have to set it based on the next id in sequence.

For `/api/meetings` POST route, no request body is necessary, as meetings are generated automatically by the server upon request. Use the provided `createMeeting` function exported from **db.js** to create a new meeting object.

### Working with the 'Database'

The **server/db.js** file exports helper functions for working with the database arrays. The goal of this project is for you to focus on Express routes and not worry about how the database works under the hood. These functions always take at least one argument, and the first argument is always a string representing the name of the database model: `'minions'`, `'ideas'`, `'meetings'`, or `'work'`.

`getAllFromDatabase`:

- Takes only the single argument for model name. Returns the array of elements in the database or `null` if an invalid argument is supplied

`getFromDatabaseById`:

- Takes the model name argument and a second string argument representing the unique ID of the element. Returns the instance with valid inputs and `-1` with an invalid id.

`addToDatabase`:

- Takes the model name argument and a second argument which is an object with the key-value pairs of the new instance. `addToDatabase` handles assigning `.id` properties to the instances. It does not check to make sure that valid inputs are supplied, so you will have to add those checks to your routes if necessary. `addToDatabase` will return the newly-created instance from the database. This function will validate the schema of the instance to create and throw an error if it is invalid.

`updateInstanceInDatabase`:

- Takes the model name argument and a second argument which is an object representing an updated instance. The instance provided must have a valid `.id` property which will be used to match. `updateInstanceInDatabase` will return the updated instance in the database or `null` with invalid inputs. This function will validate the schema of the updated instance and throw an error if it is invalid.

`deleteFromDatabasebyId`:

- Takes the model name argument and a second string argument representing the unique ID of the element to delete. Returns `true` if the delete occurs properly and `false` if the element is not found.

`deleteAllFromDatabase`:

- Takes only the single argument for model name. Deletes all elements from the proper model and returns a new, empty array. You will only need to use this function for a /api/meetings route.

#### Schemas

- Minion:
  - id: string
  - name: string
  - title: string
  - salary: number
- Idea
  - id: string
  - name: string
  - description: string
  - numWeeks: number
  - weeklyRevenue: number
- Meeting
  - time: string
  - date: JS `Date` object
  - day: string
  - note: string


