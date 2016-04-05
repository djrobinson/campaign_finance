'use strict';

/* The main app with route configurations */

angular.module('campaignApp', ['ngRoute'])
.config(function($routeProvider){
    console.log('config working?');
    $routeProvider

    /* LANDING PAGE */
    .when('/', {
        templateUrl: '/app/views/api.html',
        css: '/styles/css/main.css'
    })
    .otherwise('/');
});