# real-estate-demo

## Getting Started
Checkout, then run:

`npm run build`
`npm run start`

Agent Login:
`andrea@northopointerealty.com`
`password`

### real-estate-dashboard
The dashboard was created using [create-react-app](https://create-react-app.dev) and responds to `yarn start`, `yarn build`, etc.

UI architecture consists of stateful `containers` and stateless `components`, styled by CSS imports.

UI is navigated via React Router.
- `/` The listings page
  - `/login` The login page
  - `/listings/:id` A listing page

Data architecture is Redux, mixed in via react-redux. API communication is RESTful via `fetch` API. Reducers:
- `{listings}`
  - `[listings]` An array of `listing` objects
  - `{filters}` A set of filter flags
- `{login}`
  - `email` The email field for the login form
  - `password` The password field for the login form
- `{session}`
  - `token` The session token acquired by logging in
- `{share}`
  - `email` The email field for the share form

### real-estate-api
The API is a standard [express](http://expressjs.com) app and responds to `npm run start`.

Middlewares are used to enable CORS (for testing, prototype purposes), inject a DB driver, and manage auth via cookies.

The DB is a SQLite file. Recommend [DB Browser for SQLite](https://sqlitebrowser.org) for reading schema and running local execution.

Routes:
- `GET` `/api/login` Access via email and password hash or "access code," in the case of a shallow account created by a listing agent for a client.
- `GET` `/api/listings` All listings, flagged with "favorites" for the active user.
- `GET` `/api/listings/:id` Individual listing, flagged as "favorite" for the active user if favorited. Includes listing agent's contact information.
- `PUT` `/api/favorites/:listing_id` Sets the given listing as favorited for the active user.
- `DELETE` `/api/favorites/:listing_id` Unsets the given listing as favorited for the active user.
- `GET` `/api/agents/:id/listings` All listings by the given agent.
- `POST` `/api/share/:id` A sharable link for the listing ID. Takes one body param, `"with"`, the recipient email. If the active user is a listing agent, and the recipient email does not have an account, one is created with an "access code" that automatically logs in the new user.

## Shortcuts Taken
- Cleaved closely to react-redux paradigms to stay small
- For larger project, would define a more replicable structure for pages, containers, and components
- Would also use a component library like material UI, pending design discussion
- Would use an authentication management layer
- Production should use a type system like Typescript
- SQLite, deployed to Glitch via a mono-repo; product would use RDS, EC2, Docker, multi-repo.

## Known Bugs
- Logo is missing in some circumstances
- Access Code account creation is a security hole
- Access Code-based share links require a refresh after loading the page
- Code link generation has no feedback on Chromium browsers
- Page title is not set
