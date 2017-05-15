var template = 'Hello, {{foo}}!';
var render = Handlebars.compile(template);
var data = {foo: 'world'};
console.log(render(data));
