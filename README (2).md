This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

Contact @domjv for a copy of .env file. 
Copy the .env file to the root of the project . Then run the below commands. We use `npm` only, DO NOT USE `yarn`

1. Install the npm packages

    `npm install`
   
3. Enter the following command to start the storybook:

    `npm run storybook`

  3.1 Once started, you can launch the storybook:

    `http://localhost:6006/`
    
4. Enter the following command to start the dev server:
    `npm run dev`
   
   4.1 Once started, you can launch the dev:

    `http://localhost:3000/`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!



## Ready to submit a Pull Request

Before you submit a new pull request, make sure you can build successfully, your project is still passing eslint:

1. Check ESLint

    `npm run test:lint`

2. Build the project

    `npm run build`
   
4. Build the storybook
    `npm run build-storybook`

## Branching and Release strategy
 - Normal Git-flow to be followed
 - Do not commit directly to main branch. 
 - Create feature branches always and create Pull Request to merge to main.  
 - All the feature branch should be in this format: "<your-name>/<title-of-the-task>". For example: "dom/create-docker-files"
 - Commits should be relevant to the task you do. For example: "Created Dockerfile for containerization"
 - Release branch should be created from main in this format: "release/v<major-version-number>.<minor-version-number>". For example: "release/v1.0"
 - Release should be created from the release branch with the tags in this format: "v<major-version-number>.<minor-version-number>.<patch-number>". For example: "v1.0.0"
 - If there are any hotfixes to be applied to a particular release, commit to that release branch, cherry-picked to main and create a release and tag from the release branch in this format: "v<major-version-number>.<minor-version-number>.<patch-number>". For example: "v1.0.1"

## Pull Request Strategy
 - Do not commit directly to main branch.
 - Create feature branches always and create Pull Request to merge to main.
 - When a Pull Request is created, it should have the format: "[<task-number>]-[<title-of-the-task>]". For example: "[INFRA-01]-[Create Docker File]"
 - Pull Request should be reviewed by at least 2 people before merging to main
