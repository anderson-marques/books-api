module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['./src/**/*.spec.ts', './src/**/*.spec.js'],
  modulePathIgnorePatterns: ['.aws-sam'],
  coverageThreshold: {
    global: {
      statemets: 10,
      branches: 10,
      functions: 10,
      lines: 10,
    },
  },
};
