module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "vue"
  ],
  transform: {
    '.*\\.js$':'babel-jest',
    ".*\\.(vue)$": "vue3-jest"
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  testEnvironment: 'jsdom'
}