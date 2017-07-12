angular.module('mgo-angular-wizard').factory('WizardHandler', function() {
   var service = {};

   var wizards = {};

    var duplicate = {};

   service.defaultName = "defaultWizard";

   service.addWizard = function (name, wizard) {
       if (wizards[name]) {
           duplicate[name] = wizards[name];
           wizards[name] = wizard;
           return true;
       } else {
           wizards[name] = wizard;return false;
       }
   };

   service.removeWizard = function (name) {
       if (duplicate[name]) {
           delete duplicate[name];
           return true;
       }
       delete wizards[name];
       return false;
   };

   service.wizard = function(name) {
       var nameToUse = name;
       if (!name) {
           nameToUse = service.defaultName;
       }

       return wizards[nameToUse];
   };

   return service;
});
