/*
* ng-time.js
* AngularJS UI component for time display
*/

angular.module('myApp.directives.ClockDirective', [])

.directive('clock', function($timeout) {
  function createSvg() {
    // http://commons.wikimedia.org/wiki/File:Swiss_railway_clock.svg
    var svg = '' +
    '<svg  ' +
    '     viewBox="-1024 -1024 2048 2048" ' +
    '     ng-attr-width="{{width}}" ng-attr-height="{{height}}">' +
    '  <title>Swiss Railway Clock</title>' +
    '  <style type="text/css">' +
    '    .bg {stroke: none; fill: white;}' +
    '    .fc {stroke: none; fill: black;}' +
    '    .h1 {stroke: none; fill: black;}' +
    '    .h2 {stroke: none; fill: #aa0000;}' +
    '  </style>' +
    '  <defs>' +
    '    <path id="mark1" d="M -20,-1000 l 40,0 0,100 -40,0 z"/>' +
    '    <path id="mark2" d="M -40,-1000 l 80,0 0,240 -80,0 z"/>' +
    '    <path id="mark3" d="M -40,-1000 l 80,0 0,300 -80,0 z"/>' +
    '    <path id="handh" d="M -50,-600  l 50,-50 50,50 0,800  -100,0 z"/>' +
    '    <path id="handm" d="M -40,-900  l 40,-40 40,40 0,1180 -80,0  z"/>' +
    '    <g id="hands">' +
    '      <path d="M -10,-910 l  10,-10 10,10 2,300 -24,0 z M -13,-390 l 26,0 7,690 -40,0 z"/>' +
    '      <path d="M   0,-620 a 120,120 0 0 1 0,240 a 120,120 0 0 1 0,-240 z M 0,-560 a  60,60  0 0 0 0,120 a 60,60 0 0 0 0,-120 z"/>' +
    '    </g>' +
    '    <g id="face1">' +
    '      <use xlink:href="#mark1" transform="rotate(06)"/>' +
    '      <use xlink:href="#mark1" transform="rotate(12)"/>' +
    '      <use xlink:href="#mark1" transform="rotate(18)"/>' +
    '      <use xlink:href="#mark1" transform="rotate(24)"/>' +
    '    </g>' +
    '    <g id="face2">' +
    '      <use xlink:href="#face1"/>' +
    '      <use xlink:href="#face1" transform="rotate(30)"/>' +
    '      <use xlink:href="#face1" transform="rotate(60)"/>' +
    '      <use xlink:href="#mark3"/>' +
    '      <use xlink:href="#mark2" transform="rotate(30)"/>' +
    '      <use xlink:href="#mark2" transform="rotate(60)"/>' +
    '    </g>' +
    '    <g id="face">' +
    '      <use xlink:href="#face2"/>' +
    '      <use xlink:href="#face2" transform="rotate(90)"/>' +
    '      <use xlink:href="#face2" transform="rotate(180)"/>' +
    '      <use xlink:href="#face2" transform="rotate(270)"/>' +
    '    </g>' +
    '  </defs>' +
    '  <circle class="bg" r="1024"/>' +
    '  <use xlink:href="#face" class="fc"/>' +
    '  <use xlink:href="#handh" class="h1" ng-attr-transform="rotate({{hourAngle}})"/>' +
    '  <use xlink:href="#handm" class="h1" ng-attr-transform="rotate({{minuteAngle}})"/>' +
    '  <use xlink:href="#hands" class="h2" ng-attr-transform="rotate({{secondAngle}})"/>' +
    '</svg>';
    return svg;
  };
  
  return {
    restrict: "E",
    transclude: true,
    scope: {
      width: "@",
      height: "@"
    },
    //templateUrl: "templates/template1_clock.html",
    template:
      '<div>' +
         createSvg()+
      '</div>',
    controller: function($scope) {
      console.log('clock controller'+ $scope.width);
      //$scope.tick();
    },
    link : function(scope, elm, attrs) {
          console.log('clock link');
          scope.tick = function() {
            //console.log('clock tick()');
            var date = new Date();
            scope.date = date;
            scope.hourAngle = 30 * date.getHours() + date.getMinutes() / 2;
            scope.minuteAngle = 6 * date.getMinutes() + date.getSeconds() / 10;
            scope.secondAngle = 6 * date.getSeconds();
            $timeout(scope.tick, 1000);
          };
          scope.$watch('tick', function($timeout) {
            //console.log("$watch", scope.tick);
            $timeout(scope.tick, 0);
          });
        }
  };
})
  
;
