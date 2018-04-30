module.exports = {
  "extends": [
    "react-app",
    "prettier"
  ],
  "plugins": [
    "react",
    "prettier"
  ],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "trailingComma": "es5",
      "bracketSpacing": true,
      "jsxBracketSameLine": false
    }]
  },
  "env": {
    "browser": true,
    "jest": true,
  },
  "globals": {
    "Drupal": true,
    "drupalSettings": true,
  },
}
