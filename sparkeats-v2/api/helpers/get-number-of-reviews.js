module.exports = {

  friendlyName: 'Format welcome message',


  description: 'Return a personalized greeting based on the provided name.',


  inputs: {

    name: {
      type: 'string',
      example: 'Ami',
      description: 'The name of the person to greet.',
      required: true
    }

  },


  fn: async function (inputs, exits) {
    var result = `Hello, ${inputs.name}!`;
    return exits.success(result);
  }

};