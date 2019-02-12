# communities-react-app

This repo contains a server side rendered React app powered by [Next.js](https://nextjs.org/).

## Project Tools

- [Next.js](https://nextjs.org/) for handling React server side rendering
- [express](https://expressjs.com/) Fast, unopinionated, minimalist web framework for Node.js
- [graphQL](https://graphql.org/learn/) an application query language that is different from REST
- [react-apollo](https://github.com/apollographql/react-apollo) React integration for Apollo Client
- [TypeScript](https://www.typescriptlang.org/index.html) adds typings to JavaScript.
- [CSS Modules](https://github.com/css-modules/css-modules) all css class names and animation names are scoped locally by default.
- [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)
- [Jest](https://jestjs.io/) for unit testing.
- [tslint](https://palantir.github.io/tslint/) code linting for TypeScript.
- [stylelint](https://github.com/stylelint/stylelint) code linting for css.
- [Prettier](https://github.com/prettier/prettier) opinionated code formatter.
- [dotenv](https://github.com/motdotla/dotenv) helps manage environment variables from .env file

## Dependencies

You will need to ensure you have [Docker](https://docs.docker.com/) installed on you local machine.

- [Install Docker for Mac](https://docs.docker.com/docker-for-mac/install/)
- [Install Docker for Windows](https://docs.docker.com/docker-for-windows/)

> **IMPORTANT**: This project also depends on the [communities-node-api](https://github.com/SMG-Digital/communities-node-api). You will need to ensure that you have cloned this repo as a sibling to this repo, as the docker-compose file is expecting it to be in the same directory.

**Ensure both repos are cloned in the same directory:**

```
+-- communities-react-app
+-- communities-node-api
```

## Local Development (docker)

Once you have the docker dependencies installed run the following in the command line from the root of your project.

```bash
docker-compose up
```

This will start both the **nextjs** app, as well as the **graphql** server from [communities-node-api](https://github.com/SMG-Digital/communities-node-api) in dev mode. Meaning both services will automatically refresh based on file changes.

- The **nextjs** app will start on [localhost:3000](http://localhost:3000).
- The **graphql** server will start on [localhost:4000](http://localhost:4000).

> **NOTE:** If this is your first time running the `docker-compose up` command it will take a little longer as it will need to build the docker image.

## Running bash commands from the container

Please run all bash(terminal) related commands from the `communities-react-app-dev` container. This includes:

- Installing new npm modules
- Running tests
- Generating types
- Pretty much all the scripts commands in the package.json file

The one exception to this rule is the below command that will open an interactive terminal for the `communities-react-app-dev` container. Once in this interactive terminal you can now run your commands the same as you would from your local terminal.

```bash
# run from your computer's terminal
npm run docker:exec
```

If successful you should see the following in your termianl:

```bash
# This is showing me logged in as root user.
root@7a1add952cb7:/usr/app
```

By default your working directory should be `usr/app`, which is the root directory for the **nextjs** app. All commands should be run from here.

To exit the interactive terminal run the following:

```bash
exit
```

## Running Tests

Both server and client tests are using [Jest](https://jestjs.io/).

Single test run:

> **NOTE:** These commands should be run from the container. See [Running bash commands from the container](#running-bash commands-from-the-container)

```
npm test
```

Run in watch mode:

```
npm test -- --watch
```

## Recommendations

### IDE (Code Editor)

If you want to make your life easier I recommened using [VSCode](https://code.visualstudio.com/docs/setup/setup-overview) as your IDE when working on this project, and installing the following plugins. To install simply search for them in VSCode's built in extensions panel.

- [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)

This will ensure linting, and formatting issues are detected directly in your IDE as you code. If you chose to not use VSCode I'd recommend trying to find the same extensions, if available, in your IDE.

### Git

When committing, or pushing code please use the command line if possible. We have hooks setup that will lint your code on commit, and run the unit tests on push. These hooks may not run as expected when usig third party git tools that may be built into your IDE.
