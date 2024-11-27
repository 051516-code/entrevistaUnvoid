const Jasmine = require('jasmine');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

const specReporter = new SpecReporter({
  spec: {
    displayPending: true,
    displayStacktrace: 'pretty',
    displayErrorMessages: false,
  },
});

const jasmine = new Jasmine();

jasmine.loadConfig({ spec_dir: 'dist', spec_files: ['**/*.spec.js'], random: false });
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

jasmine.clearReporters();
jasmine.addReporter(specReporter);

jasmine.execute();
