# muse-website
Muse Knoxville is a discovery-based children’s museum in Knoxville, TN. See their [existing website](https://www.themuseknoxville.org/) for more information.

## Tech Stack
**Frontend**: React

**Backend**: TypeScript

**Next.js**: Server-side rendering, API routes, file-based routing

**Content Management System(CMS)**: Contentful/Square

**Database**: MongoDB


## Base Dependencies
node v14+ (recommend getting nvm to manage versions)

yarn (package manager - similar to npm)

## Run the Site
1. Clone the repository.
2. Run `yarn` or `yarn install` to update dependencies.
3. Run `yarn dev` for development mode with hot-code reloading, error reporting, and more.
4. Open [http://localhost:3000](http://localhost:3000) with your web browser to see the result.

Note: Running `yarn build` then `yarn start` will start the application in production mode.

## Tools Used
* Jira for issue tracking
* Figma for mockups
* Confluence for formal documents
* Square/Contentful for CMS access

## Code/PR Workflow
* Create a new branch in the format `[GITHUB_USERNAME]/MUSE-[JIRA ISSUE NUMBER]-[SHORT_DESCRIPTION]` by running `git checkout -b [BRANCH NAME]`
  * This way the issues are closed on Jira when we merge the PR with that branch name
### Example Branch
    rluberto/MUSE-12-init-project

* Be sure to lint, format, and type-check your code occasionally to catch errors by running `yarn lint`.
* Commit changes.
* Then push your branch by running `git push -u origin [BRANCH NAME]`. This pushes your branch to remote.
* Create a pull request (PR) on GitHub to merge your branch into `develop`. `main` will serve as production.
* In your PR, briefly describe the changes, then tag Trevor (trevormangrum) and Ray (rluberto) to the PR. Others are welcome to comment and give feedback as well.

## Project Structure
* `components/`: Contains most of our front-end code. This is where we put our React components.
* `pages/`: Contains files that are associated with a route based on its file name. For more information, see Next.js' [docs](https://nextjs.org/docs/basic-features/pages).
* `public/`: Stores static files like images, see Next.js' [docs](https://nextjs.org/docs/basic-features/static-file-serving).
* `requests/`: Contains several files, one for each entity/model in our application. We define for fetching data on the client-side here.
* `server/`: Contains almost all of our backend code. This is where we put our Mongoose models and business logic. 
* `utils/`: For code used across root directories.
