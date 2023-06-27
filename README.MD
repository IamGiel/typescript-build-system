You can check build by

1. cd build
2. npx serve

In this commit:

1. Define a common config
2. seprate dev and prod
3. pass env variables
4. user webpack-merge to merge configs

```
    const { merge } = require("webpack-merge");
    const commonConfig = require('./webpack.common.js');

    module.exports = (envVars) => {
    const {env} = envVars;
    const envConfig = require(`./webpack.${env}.js`)
    const config = merge(commonConfig, envConfig); // <--- merged

    return config
}
```

to run build

yarn build
cd build
npx serve

src: https://www.youtube.com/watch?v=25kFcF54GNk
