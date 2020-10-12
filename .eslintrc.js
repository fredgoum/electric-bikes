module.exports = {
  "env": {
    "node": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential"
  ],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    //end of lines windows / unix
    'linebreak-style': 'off',
    'max-len': ['error', 200],
    'space-unary-ops': [2, {
    "words": true,
    "nonwords": false,
    "overrides": {
      "!": true
    }
    }],
  }
};
