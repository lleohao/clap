# clap
command line argument parser

# Install

```
npm i @lleohao/clap --save
```

# Usage

```javascript
const {Clap} = require('@lleohao/clap');

const commandLine = `import --query "select * from \\"default\\".\\"table\\"" --user name --delete`;
const clap = new Clap();

clap.parse(commandLine)

console.log(clap);

// clap.command = 'import';
// clap.params = {query: 'select * from "default"."table"', user: 'name', delete: true}

```
