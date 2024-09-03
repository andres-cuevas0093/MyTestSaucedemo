const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'j7hktz',
    // viewportWidth: 320,
    // viewportHeight: 480,
  e2e: {
    
    video: true,
    screenshotsFolder: 'cypress/screenshots',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  
});
