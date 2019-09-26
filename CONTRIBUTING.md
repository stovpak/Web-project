# Contributing Guidelines

We would love for you to contribute to iot-monitor and help make it even better than it is today! 
As a contributor, here are the guidelines we would like you to follow:

* [Issues and Bugs](#issue)
* [Submission Guidelines](#submit)
* [Development Setup](#development)
* [Coding Rules](#rules)
* [Commit Message Guidelines](#commit)

## <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help us by
[submitting an issue](#submit-issue) to our [Vamk Git Repository][git]. Even better, you can
[submit a Pull Request](#submit-pr) with a fix.

## <a name="submit"></a> Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem 
already exists and the discussion might inform you of workarounds readily available.

### <a name="submit-pr"></a> Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [Vamk Git][pulls] for an open or closed PR
   that relates to your submission. You don't want to duplicate effort.
1. Fork the repository.
1. Make your changes in a new git branch:

   ```shell
   git checkout -b my-fix-branch master
   ```

1. Create your patch, **including appropriate test cases**.
1. Follow our [Coding Rules](#rules).
1. Run the full test suite
1. Commit your changes using a descriptive commit message that follows our
   [commit message conventions](#commit). Adherence to these conventions
   is necessary because release notes are automatically generated from these messages.

   ```shell
   git commit -a
   ```

   Note: the optional commit `-a` command line option will automatically "add" edited files.

1. Push your branch to Vamk Git:

   ```shell
   git push origin my-fix-branch
   ```

1. In Vamk Git, send a pull request to `iot-monitor-client:master`.

* If we suggest changes then:

  * Make the required updates.
  * Re-run the test suites to ensure tests are still passing.
  * Rebase your branch to upstream and force push to your Vamk Git repository (this will update your Pull Request):

    ```shell
    git checkout master
    git pull upstream master
    git checkout your-feature-branch
    git rebase upstream/master
  
    Once you have fixed conflicts
  
    git rebase --continue
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

* Delete the remote branch on Vamk Git either through the Vamk Git web UI or your local shell as follows:

  ```shell
  git push origin --delete my-fix-branch
  ```

* Check out the master branch:

  ```shell
  git checkout master -f
  ```

* Delete the local branch:

  ```shell
  git branch -D my-fix-branch
  ```

* Update your master with the latest upstream version:

  ```shell
  git pull upstream master
  ```

## <a name="development"></a> Development Setup

You will need dotnet version 2.2+:

1. After cloning the repo, run:

   ```shell
   dotnet restore
   ```
   
### Commonly used scripts

```bash
# build all packages and put them near to their source files
$ dotnet build

# run the full unit tests suite
$ dotnet test

# run integration tests
# docker is required(!)
$ sh scripts/run-integration.sh // IN PROGRESS
```

### Commonly used NPM scripts

```bash
$ npm start
$ npm run lint
$ npm run format
$ npm run test
```

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, use prettier and take a look at resources below:

* [Cheatsheets for experienced React developers](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet).

## <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more
readable messages** that are easy to follow when looking through the **project history**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type** and a **subject**:

```
<type>: <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on Vamk Git as well as in various git tools.

```
docs: update contributing rules
bugfix: add missing border to navigation
```

### Type

Must be one of the following:

* **build**: Changes that affect the build system or external dependencies
* **ci**: Changes to our CI configuration files and scripts
* **docs**: Documentation only changes
* **feature**: A new feature
* **bugfix**: A bug fix
* **performance**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

### Subject

The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body

The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference Vamk Git issues that this commit **Closes**.

[git]: https://git.vamk.fi/e1900242/iot-monitor-client
[pulls]: https://git.vamk.fi/e1900242/iot-monitor-client/pulls
