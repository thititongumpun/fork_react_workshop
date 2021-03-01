# Welcome to React Training!

We have new workshop material for 2021 🎉. Be sure to checkout https://reacttraining.com/workshops. We offer:

- Regular Public Workshops
- Private tailored Corporate Workshops

This repo contains the latest course material for [React Training](https://reacttraining.com/).

Before attending the training, please make sure you install the code (not just clone) and run the app to make sure it works. The most common problems for not being able to install and run are related to network configurations at the workshop venue like proxies. If your having these or other issues see the Troubleshooting section below.

## The "What do I need to do before attending React Training" Checklist:

- [ ] Bring a laptop (don't forget a long power cord).
- [ ] Install this code (if you can't see the app in the browser after doing `npm run app`, then you don't quite have it installed yet).
- [ ] [Learn the JavaScript syntax that matters the most to React](https://reacttraining.com/blog/javascript-the-react-parts/).
- [ ] We have some [additional reading material](./reading) for those who are interested in getting a head start
- [ ] You can take notes in the workshop, but just keep in mind we already wrote some for you. Checkout the "student lesson notes" file(s) in the root of the repo
- [ ] WAIT! Does your company or computer use VPN's or any sort of proxy? That might cause some issues. We normally see at companies that use these things that someone on your team knows how to get around the problem. We can't really help out because the issues surrounding VPN's and Proxies are so diverse and out of our control.

## Install & Setup

If you have any problems with these steps, make sure you see the [Troubleshooting](#troubleshooting) section below.

**Windows Users!** Please read the [Windows Users](#windows-users) section before finishing these setup steps. Particularly, we have found that PowerShell works better.

<hr />

You need to have Git and Node installed. You might already so verify with these commands:

```sh
# Verify Git and Node are installed
$ git --version
$ node --version
```

If one of those commands doesn't work, then you don't have that tool installed. Go to these pages and follow the instructions for your operating system:

- [Git](http://git-scm.com/downloads)
- [NPM and Node](https://www.npmjs.com/get-npm) - If you didn't have Node installed, get the LTS (Long Term Support) version. If you have an older version like Node 8, that will probably work too.

Then **clone**, **install**, and **run** the app:

```sh
# Clone the repo to your local machine (This just clones, it does not "install")
$ git clone https://github.com/ReactTraining/react-workshop.git

# Whichever directory you run the above command from, that directory should
# now have a folder called `react-workshop`.

# Change directory to the `react-workshop` folder:
$ cd react-workshop

# Install and run. Make sure you do these two commands from within the `react-workshop` folder:
$ npm install

# After this command, a menu will show some different app options. Choose #1 by typing `1`
$ npm run app

# If you have issues, read below.
```

Everything is working if the code compiles and you can visit `http://localhost:3000/` in a browser.

If something goes wrong, you may need to see the [Troubleshooting](#troubleshooting) section below. We even have a special section for [Windows Users](#windows-users)

## Running the Course and Lesson Material

While in the workshop, you will be asked to do `npm start` to see a menu for courses and then lessons. The first time you run this, you'll be asked which course, and if you want to save your preferences so you're not asked again.

```
Which Course?

[1] advanced-composition
[2] advanced-hooks
[3] core-v1
[4] core-v2
[5] electives
[0] CANCEL

Choose one from list [1...5 / 0]: 4

Do you want us to remember this course selection? [y/n]: y
```

If choosing `y` to the "remember" question you won't get the "Which Course?" menu again.

After a course is chosen:

```
$ npm start

Which Lesson of core-v2?

[1] 01-thinking-in-react
[2] 02-state
[3] 03-forms
[4] 04-data-fetching
[5] 05-effects
[6] 06-client-side-routing
[7] 07-context
[8] 08-authentication
[9] 09-app-state
[a] 10-testing
[b] 11-react-query
[c] context-with-theme
[d] FULL APP
[e] 👈 BACK TO COURSE SELECTION
[0] CANCEL

Choose one from list [1...9, a...e, 0]: 1
```

After choosing a lesson, you'll be asked which material you want to run:

```
Which lesson type of 01-thinking-in-react?

[1] exercise
[2] lecture
[3] 👈 BACK TO LESSON SELECTION
[0] CANCEL
```

Shortcut!

If you have a course preference already and you run `npm start 1` (or any valid lesson number), it will skip all the way to the end where you choose between exercise and lecture.

## Prettier Plugin

(not required, but nice)

You might notice as the instructors save their code that a tool called "Prettier" is automatically formatting things. If you use VSCode, here is the [prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) you need to install. Clicking the install button on the website will open VSCode and install it as a plugin. However you install it, many code editors will just pick up on the settings we've setup for prettier in our `package.json` file.

## Database

When you start our code, it will start the app at port `3000` and a small local database at port `3333`. Don't worry about the database, it's not even a real database. It's a tool called `json-server` that treats a JSON file like a restful database and runs 100% within this repo so as soon as you quit the app and if you remove the repo, you've removed the database.

When you do `npm install` we run a `postinstall` script to copy a `db-seed.json` file to `db.json`. We're using Node for this in a way that is supposed to help with cross-platform filesystem stuff. But incase it fails, you'll just have to copy this file manually. The file is in `apps/ProjectPlanner/database`.

There are some rare times when you quit the app the background process for port `3333` remains open and this will prevent you from starting the app again until the port is closed. So we made `npm run kill-db-port` as a command for you in case this happens. All this does is quit the processes associated with port 3333. If you have any problems you can do this manually.

## Updating

If you've already cloned the repo but you need to get updated code, then follow these steps:

- First, `cd` into the root directory of the repo
- Then do an `ls` command to ensure you see a `package.json` file listed. If you don't you're not in the root folder of the repo
- Clear out any dirty files in your git working tree (`git stash` is a safe way to do it, `git reset ---hard` is how to live dangerously)
- Then run these steps to get the updates:

```sh
git pull origin master
npm install
```

Then you should be able to do your `npm start` again.

## Troubleshooting

A few common problems:

- **You're having problems cloning the repository.** Some corporate networks block port 22, which git uses to communicate with GitHub over SSH. Instead of using SSH, clone the repo over HTTPS. Use the following command to tell git to always use `https` instead of `git`:

```sh
$ git config --global url."https://".insteadOf git://

# This adds the following to your `~/.gitconfig`:
[url "https://"]
  insteadOf = git://
```

- **You're having trouble installing Node.** We recommend using [nvm](https://github.com/creationix/nvm). nvm makes it really easy to use multiple versions of node on the same machine painlessly. After you install nvm, install the latest stable version of node with the following command:

```sh
$ nvm use default stable
```

- **You don't have permissions to install stuff.** You might see an error like `EACCES` during the `npm install` step. If that's the case, it probably means that at some point you did an `sudo npm install` and installed some stuff with root permissions. To fix this, you need to forcefully remove all files that npm caches on your machine and re-install without sudo.

```sh
$ sudo rm -rf node_modules

# If you installed node with nvm (suggested):
$ sudo rm -rf ~/.npm

# If you installed node with Homebrew:
$ sudo rm -rf /usr/local/lib/node_modules

# Then (look ma, no sudo!):
$ npm install
```

- **You can't start the app with `npm start` or `npm start app`.** Make sure you can see a `node_modules` folder at the root. If you can't you need to run `npm install` from the root of the repo. If that's not the issue and you've ran the app before but now it's not running, try `npm run kill-db-port` (Mac/Linux). We run a small local database for our curriculum project on port `3333` and there's some circumstances where it doesn't get killed correctly when you exited the app last time.

- **The app launches but there doesn't seem to be any data. The `/products` page just says "No Results"**. This just means that your `db.json` file is missing for whatever reason. Run `npm run create-db` and see if that fixes it. If you're on Windows, see the [PowerShell](#powershell) section below.

## Windows Users

**TL;DR: You probably want to use PowerShell instead of GitBash**

There are three problems that might arise in a Windows Environment:

- Error after install. Chances are the `npm install` went well but we also do a `postinstall` script to create the `database.json` file. See the [Database](#database) section above for details
- If you're able to successfully run the app once but it doesn't start on the subsequent runs, chances are the database port didn't shut down when you recently stopped the app. See the [Database](#database) section above for details.
- If you do `npm run app` or `npm start` and you get weird errors instead of our menu system, we don't know what that is yet but the only reporters have been using GitBash instead of PowerShell.

<hr />

If you're a Windows user who already does active JS/Node development then you should be good-to-go. Otherwise this section might be able to help.

Consider using [VSCode](https://code.visualstudio.com/download) (A lightweight version of Visual Studio) for our workshops as it is probably more appropriately suited for modern JavaScript development than Visual Studio, Eclipse, IntelliJ, etc. It has a terminal built-in which uses PowerShell by default.

If you want, you can go into Windows' settings to turn on file extensions. In JavaScript projects, it's common to have a filename like `.gitignore` which would be difficult to see without extensions turned on. It's not required though.

If these instructions for Windows users can be improved, please let us know or make a PR!

## License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html). If you would like to use this material to conduct your own workshop, please contact us at [hello@reacttraining.com](mailto:hello@reacttraining.com).
