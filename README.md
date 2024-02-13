# Installation of development environnement

#### After pulling the repo, install dependencies (add the '-D' argument to install dev dependencies) :

```
npm install
```

#### Do database migrations :

Not possible yet but will be introduced in the future.

#### Config files :

You have to create your own config.js file and adding your token of bot
Here is what it should looks like :
```javascript
module.exports = {

    "token" : "YourTokenHere"
}
```
#### To test the application :

Simply run :

```
node main
```

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
├───Components
│       Bout de code utilisée dans plusieurs partie du bot
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

# Requirements

### Node.js

Le reste bientôt...
