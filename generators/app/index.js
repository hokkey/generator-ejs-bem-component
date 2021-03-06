'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.extend({

  constructor: function (args, opts) {
    yeoman.apply(this, arguments);
    this.argument('moduleName', {
      desc: 'A name of the new component',
      type: String,
      required: false
    });
  },

  prompting: function () {
    const prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'What is tha name of the new component?',
      when: typeof this.options.moduleName === 'undefined'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.moduleName = this.props.moduleName;
    }.bind(this));
  },

  writing: function () {
    let baseName;

    if (typeof this.options.moduleName === 'undefined') {
      baseName = this.props.moduleName;

    } else {
      baseName = this.options.moduleName;
    }

    const ejsName = '_' + baseName + '.ejs';
    const scssName = '_' + baseName + '.scss';

    this.fs.copyTpl(
      this.templatePath('_template.ejs'),
      this.destinationPath(baseName + '/' + ejsName),
      { name:baseName, end:'%>' }
    );

    this.fs.copyTpl(
      this.templatePath('_template-preview.ejs'),
      this.destinationPath(baseName + '/_' + baseName + '-preview.ejs'),
      {name: baseName, end: '%>'}
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

    this.fs.copyTpl(
      this.templatePath('_template-guide.ejs'),
      this.destinationPath(baseName + '/' + '_' + baseName + '-guide.ejs'),
      { name:baseName, end: '%>' }
    );
  },

  install: function () {
    //this.installDependencies();
  }
});
