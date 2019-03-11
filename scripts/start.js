const shell = require('shelljs');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = process.env.NODE_ENV;

console.log('NODE_ENV', { env });

if (env === 'production') {
  shell.exec('run-s build && sails lift --prod');
} else {
  shell.exec('run-s server sass:watch');
}
