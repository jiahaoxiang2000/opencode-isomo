## Debugging

- To test opencode in the `packages/opencode` directory you can run `bun dev`

## Tool Calling

- ALWAYS USE PARALLEL TOOLS WHEN APPLICABLE.

## isomo-dev Branch

The `isomo-dev` branch is used for development and testing purposes:

- **Sync with dev**: This branch syncs with the `dev` branch one time as a starting point
- **Self-written code**: This branch receives our own code that we're working on
- **Not PR ready**: Code in this branch is NOT ready for pull requests
- **Code selection**: When we think our code is great, we'll pick the great code and create a new branch for the PR
- **Workflow**: isomo-dev → (select great code) → new feature branch → PR
