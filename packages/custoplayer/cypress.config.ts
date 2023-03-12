module.exports = {
  env: {
    codeCoverage: {
      exclude: "cypress/**/*.*",
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: false,
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
    video: false,
    setupNodeEvents(on: any, config: any) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  }

};

export { }