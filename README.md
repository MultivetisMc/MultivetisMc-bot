# About MultivetisMc bot

The MultivetisMc bot is coded in JavaScript using the discord.js packages to communicates whit the servers of Discord and make some tasks easier and/or faster. Started in 2022, then stop and removed in 2023, it was recreated to finally start being developed on the day this repositories was created. It's also the time where MultivetisMc decided to make most of is software open source under the GPL-3.0 license and the bot is in those software, because it's open source you can contribute to it but we recommend to check out the [Code of Conduct](https://github.com/MultivetisMc/MultivetisMc-bot/blob/main/.github/CODE_OF_CONDUCT.md) and also the [CONTRIBUITING.md](https://github.com/MultivetisMc/MultivetisMc-bot/blob/main/.github/CONTRIBUITING.md). If you whant to use the software we recommend checking out the [SECURITY.md](https://github.com/MultivetisMc/MultivetisMc-bot/blob/main/.github/SECURITY.md) as it explains what is the version supported for security updates, we alose give a guide on how to install the software under here. If you whant us to create a wiki whit a guide on how to use the bot, go over to the [discussions](https://github.com/orgs/MultivetisMc/discussions) on the organisation and submit your ideas or create a [issues here](https://github.com/MultivetisMc/MultivetisMc-bot/issues).

# Installation of development environnement

## Requirements to run/program the software

| Software           | Version          | More information             |
| ------------------ | ---------------- | ---------------------------- |
| Node.js            | 20.x or higher   | Bundles javaScript and npm   |
| MySQL              | 8.2.x or higher  | The database of the bot      |
| git                | 2.25.1 or higher | Commands for Github          |

**After pulling the repo, install dependencies (add the '-D' argument to install dev dependencies) :**

```
npm install
```

## Recommanded to run/program the software

| Software           | Version          | More information             |
| ------------------ | ---------------- | ---------------------------- |
| phpMyAdmin         | 5.2.1 or higher  | Interface for MySQL          |
| XAMPP              | 8.2.4 or higher  | Bundles MySQL and phpMyAdmin |
| Visual Studio Code | 1.86.2 or higher | Recommended IDE              |

## Setting up your environnement whitout docker

**Doing the database installation :**

Pretty simple, take the **.sql file in the code** and drag and drop it into your **MySQL database whit phpMyAdmin** if you have it, if you don't just use the **command line** and do this :
```
mysql -u theusername -p yourpassword db_name < Bot-setup-database.sql
```

**Configuration of the project** :

To configure the project you will need to **copy the .env folder and paste it in the project folder**, then renaming it to **Config**. You can then go in the **config files and changes what you want**, explanations about each values can be found in the files above each of the value. If you have any question please go [here](https://github.com/orgs/MultivetisMc/discussions) and create a discussion.

**To test the application :**

Simply run :

```
node main
```

I recommended checking out the [GPL-3.0 lisence file](https://github.com/MultivetisMc/MultivetisMc-bot/blob/main/LICENSE) before using the software. If you whant to help us code the software, I recommended you also checking out the [Code of conduct]() and the [CONTRIBUITING.md file]().

## Setting up your environnement whit docker :

### Comming soon...

# Project architecture

```
█───Project folder
│
│   main.js
│   .gitignore
│   package-lock.json
│   package.json
│   LISENCE
│   README.md
│   anti-crash.js
│   Config.js
│   Bot-setup-database.sql
│
├───.env
│       The folder containing the default configs of the bot.
│
├───.github
│       Essentials files for the github repos.
│
├───Commands
│   │   
│   ├───Giveaway       
│   │       Giveaway related commands.
│   │   
│   ├───Information       
│   │       Information related commands.
│   │    
│   ├───Modération       
│   │       Moderation related commands.
│   │
│   └───Tickets
│           Tickets related commands.
│
├───Events
│       Discord related events.       
│
├───Fonctions
│       Fonctions fils required to run some commands.
│
└───Loaders
        The loaders that load the events and commands files.
```
