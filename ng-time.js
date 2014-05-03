/*
* ng-time.js
* AngularJS UI component for time display
*/

angular.module('ngClock', [])

.directive('clock', function($timeout,$compile) {
  var uniqueId = 1;
  
  function createSvg(uniqueId) {
    // http://commons.wikimedia.org/wiki/File:Swiss_railway_clock.svg
    var svg = '' +
    '<svg ' +
    ' xmlns="http://www.w3.org/2000/svg" ' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink" ' +
    ' viewBox="-1024 -1024 2048 2048" ' +
    ' ng-attr-width="{{width}}" ng-attr-height="{{height}}">' +
    ' <title>Swiss Railway Clock</title>' +
    ' <style type="text/css">' +
    ' .bg {stroke: none; fill: white;}' +
    ' .fc {stroke: none; fill: black;}' +
    ' .digital {stroke: none; fill: #555555; font-size: 140px;}' +
    ' .h1 {stroke: none; fill: black;}' +
    ' .h2 {stroke: none; fill: #aa0000;}' +
    ' </style>' +
    ' <defs>' +
    ' <path id="x'+ uniqueId +'_mark1" d="M -20,-1000 l 40,0 0,100 -40,0 z"/>' +
    ' <path id="x'+ uniqueId +'_mark2" d="M -40,-1000 l 80,0 0,240 -80,0 z"/>' +
    ' <path id="x'+ uniqueId +'_mark3" d="M -40,-1000 l 80,0 0,300 -80,0 z"/>' +
    ' <path id="x'+ uniqueId +'_handh" d="M -50,-600 l 50,-50 50,50 0,800 -100,0 z"/>' +
    ' <path id="x'+ uniqueId +'_handm" d="M -40,-900 l 40,-40 40,40 0,1180 -80,0 z"/>' +
    ' <text id="x'+ uniqueId +'_digital" x="0" y="520" text-anchor="middle">{{ddate | date:digital}}</text>' +
    ' <g id="x'+ uniqueId +'_hands">' +
    ' <path d="M -10,-910 l 10,-10 10,10 2,300 -24,0 z M -13,-390 l 26,0 7,690 -40,0 z"/>' +
    ' <path d="M 0,-620 a 120,120 0 0 1 0,240 a 120,120 0 0 1 0,-240 z M 0,-560 a 60,60 0 0 0 0,120 a 60,60 0 0 0 0,-120 z"/>' +
    ' </g>' +
    ' <g id="x'+ uniqueId +'_face1">' +
    ' <use xlink:href="#x'+ uniqueId +'_mark1" transform="rotate(06)"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_mark1" transform="rotate(12)"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_mark1" transform="rotate(18)"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_mark1" transform="rotate(24)"/>' +
    ' </g>' +
    ' <g id="x'+ uniqueId +'_face2">' +
    ' <use xlink:href="#x'+ uniqueId +'_face1"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_face1" transform="rotate(30)"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_face1" transform="rotate(60)"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_mark3"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_mark2" transform="rotate(30)"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_mark2" transform="rotate(60)"/>' +
    ' </g>' +
    ' <g id="x'+ uniqueId +'_face">' +
    ' <use xlink:href="#x'+ uniqueId +'_face2"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_face2" transform="rotate(90)"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_face2" transform="rotate(180)"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_face2" transform="rotate(270)"/>' +
    ' </g>' +
    ' </defs>' +
    ' <circle class="bg" r="1024"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_face" class="fc"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_digital" class="digital"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_handh" class="h1" ng-attr-transform="rotate({{hourAngle}})"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_handm" class="h1" ng-attr-transform="rotate({{minuteAngle}})"/>' +
    ' <use xlink:href="#x'+ uniqueId +'_hands" class="h2" ng-attr-transform="rotate({{secondAngle}})"/>' +
    '</svg>';
    return svg;
  };
  
  function getDate(timezone)
  {
    var date = new Date();
    if(!timezone) {
      return date;
    }
    //console.log("getDate "+ timezone);
    var localTime = date.getTime();
    var localOffset = date.getTimezoneOffset() * 60000;
    var utc = localTime + localOffset;
    var remotetime = utc + (3600000 * timezone);
    return new Date(remotetime);
  };
  
  return {
    restrict: "E",
    transclude: true,
    scope: {
      width: "@",
      height: "@",
      timezone: "@",
      digital: "@"
    },
    //templateUrl: "templates/template1_clock.html",
    template: '<div></div>',
    controller: function($scope) {
      //console.log('clock controller', $scope);
    },
    link : function(scope, elm, attrs) {
          console.log('clock link'+ uniqueId);
          uniqueId++;
          var html ='<div>'+ createSvg(uniqueId) +'</div>';
          var e = $compile(html)(scope);
          elm.replaceWith(e);          
          
          scope.tick = function() {
            //console.log('clock tick()'+ scope.timezone);
            if (typeof scope.digital == 'undefined' ) {
              scope.digital = "EEE hh:mma";
            }
            else if(scope.digital.length <1) {
              scope.digital = "''";
            };
            var date = getDate(scope.timezone);
            scope.hourAngle = 30 * date.getHours() + date.getMinutes() / 2;
            scope.minuteAngle = 6 * date.getMinutes() + date.getSeconds() / 10;
            scope.secondAngle = 6 * date.getSeconds();
            scope.ddate = date;
            $timeout(scope.tick, 1000);
          };
          scope.$watch('tick', function($timeout) {
            scope.tick();
          });
        }
  };
})
  
;
