'use strict';

// Register `navbar` component, along with its associated controller and template
angular.module('navbar')
    .component('navbar', {
        templateUrl: 'shared/navbar/navbar.template.html',
        controller: function NavbarController($location, AuthService, $rootScope) {
            this.appName = 'My Manager';
            if($rootScope.currentUser){
                this.currentUser = $rootScope.currentUser.username;
            }else{
                this.currentUser = "none";
            }

            //function to check current nav based on which active nav formatting done
            this.checkCurrentNav = function (nav) {
                return ($location.path() === nav);
            };

            this.logout = function(){
                AuthService.logout();
                $location.url("/")
            }
        }
    });