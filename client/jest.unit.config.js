module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest'
  },
  globals: {
    'vue-jest': {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('vaadin-'),
      },
    },
  }
};