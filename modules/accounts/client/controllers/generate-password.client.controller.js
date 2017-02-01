(function () {
  'use strict';

  angular
    .module('accounts')
    .controller('GeneratePasswordController', GeneratePasswordController);

  GeneratePasswordController.$inject = [];

  function GeneratePasswordController() {
    var vm = this;
    vm.pwgOptions = {
      length: 10,
      isUseNumbersOnly: false,
      isUseNumbers: true,
      isUseSpecialChars: true,
      smallCharSets: 'abcdefghjkmnpqrstwxyz',
      capCharSets: 'ABCDEFGHJKMNPQRSTWXYZ',
      numericSets: '23456789',
      punctuationSets: '!@#$%^&*?'
    };
  }
} ());
