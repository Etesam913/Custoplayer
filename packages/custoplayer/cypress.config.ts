import { defineConfig } from "cypress";

module.exports = {
  env: {
    codeCoverage: {
      exclude: "cypress/**/*.*",
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on: any, config: any) {
      require('@cypress/code-coverage/task')(on, config)

      return config
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    setupNodeEvents(on: any, config: any) {
      require('@cypress/code-coverage/task')(on, config)

      return config
    },
  }

};

