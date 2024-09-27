// enforce className

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce that all instances of `classname` be written as `className` in camel case."
    },
    fixable: "code",
    schema: []
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        // Check if a `const` variable declaration
        if (node.parent.kind === 'const') {
          // Check if the variable name contains 'classname'
          const regex = /classname/g;
          if (node.id.type === 'Identifier' && regex.test(node.id.name)) {
            context.report({
              node,
              message: 'Please change any instance of classname in a variable name to camel case.  For example: className, myClassName, classNameInput, inputClassName',
              data: {
                notCamelCase: node.id.name
              },
              fix(fixer) {
                let fixed = node.id.name.replaceAll('classname', 'ClassName');
                if (fixed.startsWith('ClassName')) {
                  fixed = `${fixed.charAt(0).toLowerCase()}${fixed.slice(1)}`
                }
                return fixer.replaceText(node.id.name, fixed)
              }
            })
          }
        }
      }
    }
  }
}
