

var phonecatApp = angular.module('phonecatApp', ['flow']);

phonecatApp.controller('PhoneListCtrl', ['$scope','$rootScope','$http', function($scope,$rootScope,$http) {
  $http.get('json/phones.json').success(function(data) {
    var m = $scope.m = {}; 	
    m.phones = data.phones;
    //更换品牌时，型号置空。
    $scope.$watch('m.brand', function(brand) {
      m.name = null;
    });
    //更换型号时，颜色置空。
    $scope.$watch('m.name', function(name) {
      m.color = null;
    });
    $rootScope.tel=m.tel;
    $rootScope.brand=m.brand;
    $rootScope.name=m.name;
    $rootScope.color=m.color;
    $rootScope.imei=m.imei;
    $rootScope.pic=m.pic;

  });
}]);

//add pic
phonecatApp.config(['flowFactoryProvider', function (flowFactoryProvider) {
  flowFactoryProvider.defaults = {
    target: 'upload.php',
    permanentErrors: [404, 500, 501],
    maxChunkRetries: 1,
    chunkRetryInterval: 5000,
    simultaneousUploads: 4
    // singleFile: true
  };
  flowFactoryProvider.on('catchAll', function (event) {
    console.log('catchAll', arguments);
  });
  // Can be used with different implementations of Flow.js
  // flowFactoryProvider.factory = fustyFlowFactory;
}]);

//post
 phonecatApp.config(function($httpProvider){
   $httpProvider.defaults.transformRequest = function(obj){
     var str = [];
     for(var p in obj){
       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
     }
     return str.join("&");
   }
   $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/x-www-form-urlencoded'
   }
});

phonecatApp.controller('xCtrl',['$scope','$rootScope','$window','$http',function($scope,$rootScope,$window,$http){

      $scope.postOrder=function(){
        var tel=$rootScope.tel;
        var brand=$rootScope.brand;
        var name=$rootScope.name;
        var color=$rootScope.color;
        var imei=$rootScope.imei;
        var pic=$rootScope.pic;
        //it should be post
/*        $http.get('json/postOrder.json',{tel:tel,brand:brand,name:name,color:color,imei:imei})
        .success(function(data){
          // if (data==="success") {
            $window.location.replace('/wel.html?code='+data);
          // }
        });
*/
        $http({
           method:'post',
           url:'post.php',
           data:{tel:tel,brand:brand,name:name,color:color,imei:imei,pic:pic},
           headers:{'Content-Type': 'application/x-www-form-urlencoded'},
           transformRequest: function(obj) {
             var str = [];
             for(var p in obj){
               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
             }
             return str.join("&");
           }
        }).success(function(req){
               console.log(req);
        })

      };

}]);     
