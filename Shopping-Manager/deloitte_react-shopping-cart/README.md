# Webpack Setup

1. `npm init`
2. create "src" folder and add index.js and app.js file
3. `npm install -D webpack`
4. add script in "package.json" `"build": "webpack",`
5. for custom webpack config create "webpack.config.js" file at root
6. use [webpack](https://webpack.js.org/concepts/) link to setup costome config
7. to setup babel follow [Babel](https://babeljs.io/setup#installation) link
8. `npm install --save-dev babel-loader @babel/core`
9. `npm install -D @babel/preset-env`
10. setup .babelrc file

```json
{
  "presets": ["@babel/preset-env"]
}
```

11. `npm install --save-dev html-webpack-plugin` [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/#root)

```json
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
     ...,
     plugins: [
         new HtmlWebpackPlugin({
         template: './public/index.html',
         filename: 'index.html'
         })
     ],
 }
```

12. `npm install -D webpack-dev-server` [webpack-dev-server](https://webpack.js.org/guides/development/#using-webpack-dev-server)

```json
module.exports = {
     ...,
     devServer: {
         port: 9000,
         open: true
     }
 }
```

13. add script in "package.json" file `"start": "webpack serve",`

```json
 "scripts": {
     "build": "webpack",
     "start": "webpack serve"
 },
```

14. install [eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
15. setup eslint `npm init @eslint/config` and give answer accordingly
16. create ".eslintignore" file

```json
 node_modules
 dist
```

17. add scripts in "package.json" file

```json
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
```

18. install [prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

19. create ".prettierrc.json" file on root path
20. add follwing settings

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true
}
```

21. create ".prettierignore" file on root path
22. add script to "package.json" file

```json
"prettier": "prettier --write ."
```

23. for tune between prettier and eslint install `npm install --save-dev eslint-config-prettier` [eslint config](https://github.com/prettier/eslint-config-prettier)

24. add follwiing code is ".eslintrc.js" file

```json
{
  "extends": ["some-other-config-you-use", "prettier"]
}
```

25. install `npm install -D typescript`
26. `npx tsc --init`
27. replace all ".js" extention with ".ts" extention in webpack.config.json
28. add follwing code in "webpack.config.json

```json
 resolve: {
     extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
 },
```

29. add "@babel/preset-typescript" in ".babelrc" file

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```
