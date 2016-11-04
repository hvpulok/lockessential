angular.module('information.data')
    .factory('InfoDataClass', [function () {
        var info_data = function(info){
            this.account = info.account;
            this.username = info.username;
            this.password = info.password;
            this.category = info.category;
            this.email = info.email;
            this.url = info.url;
            this.description = info.description;
        };
        return info_data;
    }]);

