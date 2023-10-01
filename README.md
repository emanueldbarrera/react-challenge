# TODO app code challenge by Emanuel Barrera

## How To

### Run locally

`npm start`

Go to http://localhost:3000/

### Run tests

`npm test`

### Check coverage

`npm run coverage`

## What I did

- Implemented the two routes: '/' and '/todos/<todo item number>'
- The routing was done with react-router
- Used styled-components for styling, an added a skeleton loader while the api loads
- Added (very simple) error messages
- Added unit tests with vitest
- Added a code coverage tool
- Configured eslint locallys

## What I would have liked to add

- Handle api errors more thoroughly
- Add e2e tests (i.e. with Cypress)
- Use the Storybook tool, to design the components more isolatedly
- Use TypeScript across the project
- If the project were more complex, use some state management library like Redux
