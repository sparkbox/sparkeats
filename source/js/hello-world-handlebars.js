// Define the template
var template = 'Hello, {{foo}}!';

// Compile the template
var render = Handlebars.compile(template);

// Define the data
var data = {foo: 'world'};

// Rendering the template
console.log(render(data));
