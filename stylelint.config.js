module.exports = {
  extends: 'stylelint-config-standard',
  'rules': {
    'selector-pseudo-element-colon-notation': 'single',
    'at-rule-no-unknown': [ true, {
      'ignoreAtRules': [
        'mixin',
        'extends',
        'ignores',
        'include'
      ]
    }]
  }
}
