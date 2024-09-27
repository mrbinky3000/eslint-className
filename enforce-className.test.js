const { RuleTester } = require('eslint');
const classNameRule = require('./enforce-className');

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2015 because
  // that's when 'const' variables were introduced.
  languageOptions: { ecmaVersion: 2015}
});

ruleTester.run(
  "enforce-className",
  classNameRule,
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [{
      code: "const className = 'bob1';",
      code: "const myClassName = 'bob2';",
      code: "const classNameClassName = 'bob3';"
    }],
    // 'invalid' are cases that should not pass
    invalid: [{
      code: "const classname = 'bob4';",
      code: "const myclassname = 'bob5';",
      code: "const classnameclassname = 'bob6'",
      errors: 1
    }]
  }
)

console.log("All tests passed!")
