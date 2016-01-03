'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the geometric ' + chalk.red('generator-holiday') + ' generator!'
    ));

    var prompts = [{
      name: 'moduleName',
      message: 'type new module name, please',
      default: 'newName'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      this.moduleName = this.props.moduleName;
      done();
    }.bind(this));
  },

  writing: function () {
    var baseName = this.moduleName;
    var ejsName = '_' + baseName + '.ejs';
    var scssName = '_' + baseName + '.scss';

    this.fs.copyTpl(
      this.templatePath('_template.ejs'),
      this.destinationPath(baseName + '/' + ejsName),
      { name:baseName, end:'%>' }
    );
    this.fs.copyTpl(
      this.templatePath('_template.scss'),
      this.destinationPath(baseName + '/' + scssName),
      { name:baseName }
    );
    this.fs.copyTpl(
      this.templatePath('index.ejs'),
      this.destinationPath(baseName + '/' + 'index.ejs'),
      { name:baseName, end: '%>' }
    );
  },

  install: function () {
    //this.installDependencies();
  }
});
