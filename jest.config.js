module.exports = {
  testEnvironment: 'jsdom',

  roots: ['<rootDir>/blocks', '<rootDir>/scripts'],

  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js',
  ],

  collectCoverage: true,

  collectCoverageFrom: [
    'blocks/**/*.js',
    'scripts/**/*.js',
    '!**/*.test.js',
    '!**/node_modules/**',
  ],

  coverageDirectory: 'coverage',

  coverageReporters: ['text', 'lcov', 'html'],

  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },

  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
  ],
};