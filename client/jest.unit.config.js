module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
  },
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue3-jest'
  },
  globals: {
    'vue-jest': {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('vaadin-'),
      },
    },
    collectCoverage: true,
collectCoverageFrom: [
  'src/**/*.{js,vue}',
  '!src/main.js', // No need to cover bootstrap file
],
  }
};