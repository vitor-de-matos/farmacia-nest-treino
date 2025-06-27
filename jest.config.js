module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  transformIgnorePatterns: ['/node_modules/', '\\.js$'],
  testRegex: '.*\\.spec\\.ts$',
  rootDir: '.',
};
