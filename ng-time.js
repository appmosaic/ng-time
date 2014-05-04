/*
* ng-time.js
* AngularJS UI component for time display
*/

angular.module('ngTime', [])

.directive('clock', function($timeout,$compile) {
  var uniqueId = 1;

  function createSvg1(uid, ampm) {
    var svg = '' +
    '<svg ' +
    'xmlns="http://www.w3.org/2000/svg" ' +
    'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
    'viewBox="-1024 -1024 2048 2048" ' +
    'ng-attr-width="{{width}}" ng-attr-height="{{height}}">' +
    '<title>{{ddate | date:"EEE d MMM yyyy HH:mm"}}</title>' +
    '<style type="text/css">' +
    '.bg {stroke: none; fill: white;}' +
    '.fc {stroke: none; fill: black;}' +
    '.fn {stroke: none; fill: black; font-size: 240px;}' +
    '.ampm {stroke: none; fill: #aaaaaa; font-size: 140px;}' +
    '.digital {stroke: none; fill: #999999; font-size: 180px;}' +
    '.h1 {stroke: none; fill: black;}' +
    '.h2 {stroke: none; fill: #aa0000;}' +
    '</style>' +
    '<defs>' +
    '<path id="x'+uid+'_mark1" d="M -10,-1000 l 20,0 0,50 -20,0 z"/>' +
    '<path id="x'+uid+'_mark2" d="M -16,-1000 l 32,0 0,120 -32,0 z"/>' +
    '<path id="x'+uid+'_mark3" d="M -16,-1000 l 32,0 0,150 -32,0 z"/>' +
    '<path id="x'+uid+'_handh" d="M -20,-600 l 20,-20 20,20 0,800 -40,0 z"/>' +
    '<path id="x'+uid+'_handm" d="M -16,-900 l 16,-16 16,16 0,1180 -32,0 z"/>' +
    //'<path id="x'+uid+'_mark1" d="M -20,-1000 l 40,0 0,100 -40,0 z"/>' +
    //'<path id="x'+uid+'_mark2" d="M -40,-1000 l 80,0 0,240 -80,0 z"/>' +
    //'<path id="x'+uid+'_mark3" d="M -40,-1000 l 80,0 0,300 -80,0 z"/>' +
    //'<path id="x'+uid+'_handh" d="M -50,-600 l 50,-50 50,50 0,800 -100,0 z"/>' +
    //'<path id="x'+uid+'_handm" d="M -40,-900 l 40,-40 40,40 0,1180 -80,0 z"/>' +
    '<text id="x'+uid+'_ampm" x="0" y="-440" text-anchor="middle">{{ddate | date:"a"}}</text>' +
    '<text id="x'+uid+'_digital" x="0" y="520" text-anchor="middle">{{ddate | date:digital}}</text>' +
    '<g id="x'+uid+'_hands">' +
    '<path d="M -10,-910 l 10,-10 10,10 7,1210 -40,0 z"/>' +
    //'<path d="M -10,-910 l 10,-10 10,10 2,300 -24,0 z M -13,-390 l 26,0 7,690 -40,0 z"/>' +
    //'<path d="M 0,-620 a 120,120 0 0 1 0,240 a 120,120 0 0 1 0,-240 z M 0,-560 a 60,60 0 0 0 0,120 a 60,60 0 0 0 0,-120 z"/>' +
    '</g>' +
    '<g id="x'+uid+'_facenum">' +
    '<text id="x'+uid+'_ampm" x="0" y="-640" text-anchor="middle">12</text>' +
    '<text id="x'+uid+'_ampm" x="0" y="800" text-anchor="middle">6</text>' +
    '<text id="x'+uid+'_ampm" x="-740" y="80" text-anchor="middle">9</text>' +
    '<text id="x'+uid+'_ampm" x="760" y="80" text-anchor="middle">3</text>' +
    '</g>' +
    '<g id="x'+uid+'_face1">' +
    '<use xlink:href="#x'+uid+'_mark1" transform="rotate(06)"/>' +
    '<use xlink:href="#x'+uid+'_mark1" transform="rotate(12)"/>' +
    '<use xlink:href="#x'+uid+'_mark1" transform="rotate(18)"/>' +
    '<use xlink:href="#x'+uid+'_mark1" transform="rotate(24)"/>' +
    '</g>' +
    '<g id="x'+uid+'_face2">' +
    '<use xlink:href="#x'+uid+'_face1"/>' +
    '<use xlink:href="#x'+uid+'_face1" transform="rotate(30)"/>' +
    '<use xlink:href="#x'+uid+'_face1" transform="rotate(60)"/>' +
    '<use xlink:href="#x'+uid+'_mark3"/>' +
    '<use xlink:href="#x'+uid+'_mark2" transform="rotate(30)"/>' +
    '<use xlink:href="#x'+uid+'_mark2" transform="rotate(60)"/>' +
    '</g>' +
    '<g id="x'+uid+'_face">' +
    '<use xlink:href="#x'+uid+'_face2"/>' +
    '<use xlink:href="#x'+uid+'_face2" transform="rotate(90)"/>' +
    '<use xlink:href="#x'+uid+'_face2" transform="rotate(180)"/>' +
    '<use xlink:href="#x'+uid+'_face2" transform="rotate(270)"/>' +
    '</g>' +
    '</defs>' +
    '<circle class="bg" r="1024"/>' +
    '<use xlink:href="#x'+uid+'_face" class="fc"/>' +
    '<use xlink:href="#x'+uid+'_facenum" class="fn"/>' +
    '<use xlink:href="#x'+uid+'_ampm" class="ampm"/>' +
    '<use xlink:href="#x'+uid+'_digital" class="digital"/>' +
    '<use xlink:href="#x'+uid+'_handh" class="h1" ng-attr-transform="rotate({{hourAngle}})"/>' +
    '<use xlink:href="#x'+uid+'_handm" class="h1" ng-attr-transform="rotate({{minuteAngle}})"/>' +
    '<use xlink:href="#x'+uid+'_hands" class="h2" ng-attr-transform="rotate({{secondAngle}})"/>' +
    '</svg>';
    return svg;
  };
  
  function createSvg2(uid, ampm) {
    var svg = '' +
    '<svg ' +
    'xmlns="http://www.w3.org/2000/svg" ' +
    'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
    'viewBox="-1024 -1024 2048 2048" ' +
    'ng-attr-width="{{width}}" ng-attr-height="{{height}}">' +
    '<title>{{ddate | date:"EEE d MMM yyyy HH:mm"}}</title>' +
    '<style type="text/css">' +
    //'.bg {stroke: none; fill: white;}' +
    '.bg {stroke: black; fill: white; stroke-width: 32;}' +
    '.fc {stroke: none; fill: black;}' +
    '.fn {stroke: none; fill: black; font-size: 240px;}' +
    '.ampm {stroke: none; fill: #aaaaaa; font-size: 140px;}' +
    '.digital {stroke: none; fill: #999999; font-size: 180px;}' +
    '.h1 {stroke: none; fill: black;}' +
    '.h2 {stroke: none; fill: #aa0000;}' +
    '</style>' +
    '<defs>' +
    '<path id="x'+uid+'_mark2" d="M -16,-940 l 32,0 0,120 -32,0 z"/>' +
    '<path id="x'+uid+'_mark3" d="M -16,-940 l 32,0 0,150 -32,0 z"/>' +
    '<path id="x'+uid+'_handh" d="M -20,-600 l 20,-20 20,20 0,800 -40,0 z"/>' +
    '<path id="x'+uid+'_handm" d="M -16,-900 l 16,-16 16,16 0,1180 -32,0 z"/>' +
    '<text id="x'+uid+'_ampm" x="0" y="-440" text-anchor="middle">{{ddate | date:"a"}}</text>' +
    '<text id="x'+uid+'_digital" x="0" y="520" text-anchor="middle">{{ddate | date:digital}}</text>' +
    '<g id="x'+uid+'_hands">' +
    '<path d="M -10,-910 l 10,-10 10,10 7,1210 -40,0 z"/>' +
    '</g>' +
    '<g id="x'+uid+'_facenum">' +
    '<text id="x'+uid+'_ampm" x="0" y="-580" text-anchor="middle">12</text>' +
    '<text id="x'+uid+'_ampm" x="0" y="740" text-anchor="middle">6</text>' +
    '<text id="x'+uid+'_ampm" x="-680" y="80" text-anchor="middle">9</text>' +
    '<text id="x'+uid+'_ampm" x="700" y="80" text-anchor="middle">3</text>' +
    '</g>' +
    '<g id="x'+uid+'_face2">' +
    '<use xlink:href="#x'+uid+'_mark3"/>' +
    '<use xlink:href="#x'+uid+'_mark2" transform="rotate(30)"/>' +
    '<use xlink:href="#x'+uid+'_mark2" transform="rotate(60)"/>' +
    '</g>' +
    '<g id="x'+uid+'_face">' +
    '<use xlink:href="#x'+uid+'_face2"/>' +
    '<use xlink:href="#x'+uid+'_face2" transform="rotate(90)"/>' +
    '<use xlink:href="#x'+uid+'_face2" transform="rotate(180)"/>' +
    '<use xlink:href="#x'+uid+'_face2" transform="rotate(270)"/>' +
    '</g>' +
    '</defs>' +
    '<circle class="bg" r="1004"/>' +
    '<use xlink:href="#x'+uid+'_face" class="fc"/>' +
    '<use xlink:href="#x'+uid+'_facenum" class="fn"/>' +
    '<use xlink:href="#x'+uid+'_ampm" class="ampm"/>' +
    '<use xlink:href="#x'+uid+'_digital" class="digital"/>' +
    '<use xlink:href="#x'+uid+'_handh" class="h1" ng-attr-transform="rotate({{hourAngle}})"/>' +
    '<use xlink:href="#x'+uid+'_handm" class="h1" ng-attr-transform="rotate({{minuteAngle}})"/>' +
    '<use xlink:href="#x'+uid+'_hands" class="h2" ng-attr-transform="rotate({{secondAngle}})"/>' +
    '</svg>';
    return svg;
  };
  
  function createSvg3(uid, ampm) {
    // http://commons.wikimedia.org/wiki/File:Swiss_railway_clock.svg
    var svg = '' +
    '<svg ' +
    'xmlns="http://www.w3.org/2000/svg" ' +
    'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
    'viewBox="-1024 -1024 2048 2048" ' +
    'ng-attr-width="{{width}}" ng-attr-height="{{height}}">' +
    '<title>{{ddate | date:"EEE d MMM yyyy HH:mm"}}</title>' +
    '<style type="text/css">' +
    '.bg {stroke: none; fill: white;}' +
    '.fc {stroke: none; fill: black;}' +
    '.ampm {stroke: none; fill: #aaaaaa; font-size: 140px;}' +
    '.digital {stroke: none; fill: #999999; font-size: 180px;}' +
    '.h1 {stroke: none; fill: black;}' +
    '.h2 {stroke: none; fill: #aa0000;}' +
    '</style>' +
    '<defs>' +
    '<path id="x'+uid+'_mark1" d="M -20,-1000 l 40,0 0,100 -40,0 z"/>' +
    '<path id="x'+uid+'_mark2" d="M -40,-1000 l 80,0 0,240 -80,0 z"/>' +
    '<path id="x'+uid+'_mark3" d="M -40,-1000 l 80,0 0,300 -80,0 z"/>' +
    '<path id="x'+uid+'_handh" d="M -50,-600 l 50,-50 50,50 0,800 -100,0 z"/>' +
    '<path id="x'+uid+'_handm" d="M -40,-900 l 40,-40 40,40 0,1180 -80,0 z"/>' +
    '<text id="x'+uid+'_ampm" x="0" y="-440" text-anchor="middle">{{ddate | date:"a"}}</text>' +
    '<text id="x'+uid+'_digital" x="0" y="520" text-anchor="middle">{{ddate | date:digital}}</text>' +
    '<g id="x'+uid+'_hands">' +
    '<path d="M -10,-910 l 10,-10 10,10 2,300 -24,0 z M -13,-390 l 26,0 7,690 -40,0 z"/>' +
    '<path d="M 0,-620 a 120,120 0 0 1 0,240 a 120,120 0 0 1 0,-240 z M 0,-560 a 60,60 0 0 0 0,120 a 60,60 0 0 0 0,-120 z"/>' +
    '</g>' +
    '<g id="x'+uid+'_face1">' +
    '<use xlink:href="#x'+uid+'_mark1" transform="rotate(06)"/>' +
    '<use xlink:href="#x'+uid+'_mark1" transform="rotate(12)"/>' +
    '<use xlink:href="#x'+uid+'_mark1" transform="rotate(18)"/>' +
    '<use xlink:href="#x'+uid+'_mark1" transform="rotate(24)"/>' +
    '</g>' +
    '<g id="x'+uid+'_face2">' +
    '<use xlink:href="#x'+uid+'_face1"/>' +
    '<use xlink:href="#x'+uid+'_face1" transform="rotate(30)"/>' +
    '<use xlink:href="#x'+uid+'_face1" transform="rotate(60)"/>' +
    '<use xlink:href="#x'+uid+'_mark3"/>' +
    '<use xlink:href="#x'+uid+'_mark2" transform="rotate(30)"/>' +
    '<use xlink:href="#x'+uid+'_mark2" transform="rotate(60)"/>' +
    '</g>' +
    '<g id="x'+uid+'_face">' +
    '<use xlink:href="#x'+uid+'_face2"/>' +
    '<use xlink:href="#x'+uid+'_face2" transform="rotate(90)"/>' +
    '<use xlink:href="#x'+uid+'_face2" transform="rotate(180)"/>' +
    '<use xlink:href="#x'+uid+'_face2" transform="rotate(270)"/>' +
    '</g>' +
    '</defs>' +
    '<circle class="bg" r="1024"/>' +
    '<use xlink:href="#x'+uid+'_face" class="fc"/>' +
    '<use xlink:href="#x'+uid+'_ampm" class="ampm"/>' +
    '<use xlink:href="#x'+uid+'_digital" class="digital"/>' +
    '<use xlink:href="#x'+uid+'_handh" class="h1" ng-attr-transform="rotate({{hourAngle}})"/>' +
    '<use xlink:href="#x'+uid+'_handm" class="h1" ng-attr-transform="rotate({{minuteAngle}})"/>' +
    '<use xlink:href="#x'+uid+'_hands" class="h2" ng-attr-transform="rotate({{secondAngle}})"/>' +
    '</svg>';
    return svg;
  };
  
  function getDate(timezone, time)
  {
    var date = time? new Date(time) : new Date();
    if(!timezone) {
      return date;
    }
    var localTime = date.getTime();
    var localOffset = date.getTimezoneOffset() * 60000;
    var utc = localTime + localOffset;
    var remotetime = utc + (3600000 * timezone);
    return new Date(remotetime);
  };
  
  return {
    restrict: "E",
    transclude: true,
    replace: false,
    scope: {
      width: "@",
      height: "@",
      timezone: "@",
      //time: "@",//todo
      //ampm: "@",
      digital: "@"
    },
    template: '<div></div>',
    controller: function($scope) {
    },
    link : function(scope, elm, attrs) {
          //console.log('clock link'+ uniqueId);
          uniqueId++;
          scope.ampm = 1;
          var html ='<div>'+ createSvg2(uniqueId, scope.ampm) +'</div>';
          var e = $compile(html)(scope);
          elm.find('div').replaceWith(e);
          
          scope.tick = function() {
            if (typeof scope.width == 'undefined' || +scope.width<10) {
              scope.width = 120;
            }
            if (typeof scope.height == 'undefined' || +scope.height<10) {
              scope.height = 120;
            }
            if (typeof scope.digital == 'undefined' ) {
              scope.digital = "EEE h:mma";
            }
            else if(scope.digital.length <1) {
              scope.digital = "''";
            };
            var date = getDate(scope.timezone,scope.time);
            scope.hourAngle = 30 * date.getHours() + date.getMinutes() / 2;
            scope.minuteAngle = 6 * date.getMinutes() + date.getSeconds() / 10;
            scope.secondAngle = 6 * date.getSeconds();
            scope.ddate = date;
            if(!scope.time) {
              $timeout(scope.tick, 1000);
            }
          };
          scope.$watch('tick', function($timeout) {
            scope.tick();
          });
        }
  };
})
  
;
