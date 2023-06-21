// eslint-disable-next-line no-undef
module.exports = {
  roots: [ '<rootDir>/src' ],

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
    '\\.(png|jpg|svg)$': 'jest-transform-stub',
  },

  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  moduleFileExtensions: [ 'ts', 'tsx', 'js', 'jsx', 'json', 'node' ],

  moduleDirectories: [ 'node_modules', '<rootDir>/src' ],

  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
  },

  modulePaths: [ '<rootDir>/src' ],
};

