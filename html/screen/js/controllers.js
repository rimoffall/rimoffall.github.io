var phonecatApp = angular.module('phonecatApp', ['ngTip']);

phonecatApp.controller('xCtrl', function($scope,$rootScope,$http,ngTip) {
  $scope.m={};
  $scope.m.state="init";
  //绑定品牌事件
  $scope.initBrand=function(){

            $scope.brandList=["iPhone"];
            console.log($scope.brandList);
    };
    
    $scope.showAgree=function(){
      popWin.showWin("300","400","机蜜碎屏宝客户协议","http://rest.zd0806.com/phone.pub/html/screen/rule.html");

    }
    
    //绑定型号事件
    $scope.$watch('c.brand', function(brand) {
      if(brand){
            $scope.modelList=["iPhone6","iPhone6s","iPhone5s"];
      }
    });
    
    //绑定正面图片
    $scope.initImage=function(){
      var uploader=new AjaxUploader({
      url:"http://file.zd0806.com/api/uploads/phone",
      name:"files",
      before:function(file){
        progressObv=document.createElement("progress");
        progressObv.setAttribute("max",100);
        progressObv.setAttribute("style","width:70px;height:10px;position:absolute;bottom:-13px;");
        document.querySelector(".obv").appendChild(progressObv);
        return true;
      },
      uploading:function(progressValue){
          if(progressObv){
            progressObv.value=progressValue;
          }
      },
      callBack:function(result){
          var $scope=angular.element(document.body).scope();
          $scope.m.image="http://file.zd0806.com/api/download/phone/"+result.data[0]+"/"+document.body.clientWidth;
          $scope.$apply();
          if(progressObv){
            document.querySelector(".obv").removeChild(progressObv);
          }
        }
    });

    }
    //绑定反面图片事件
    $scope.initReverseImage=function(){
      var uploader=new AjaxUploader({
      url:"http://file.zd0806.com/api/uploads/phone",
      name:"files",
      before:function(file){
        progressRev=document.createElement("progress");
        progressRev.setAttribute("max",100);
        progressRev.setAttribute("style","width:70px;height:10px;position:absolute;bottom:-13px;");

        document.querySelector(".rev").appendChild(progressRev);
        return true;
      },
      uploading:function(progressValue){
          if(progressRev){
            progressRev.value=progressValue;
          }
      },
      callBack:function(result){
          var $scope=angular.element(document.body).scope();
          $scope.m.reverseImage="http://file.zd0806.com/api/download/phone/"+result.data[0]+"/"+document.body.clientWidth;
          $scope.$apply();
          if(progressRev){
             document.querySelector(".rev").removeChild(progressRev);
          }
        }
    });
    }
    //获取URL参数
    $scope.getQueryStr=function(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null) return decodeURI(r[2]); return null;
    }
    //提交
    $scope.postOrder=function(){
      var activateTime=new Date();
      $scope.m.brand=$scope.c.brand.value;
      $scope.m.model=$scope.c.model.value;
      $scope.m.color=$scope.c.color.value;
      $scope.m.activateTime=activateTime;
      $scope.m.source=$scope.getQueryStr("site");
      $http.post("rest/o/screenDemand/json/add",$scope.m).success(function(){
        ngTip.tip('信息提交成功','success');
      }).error(function(){
        ngTip.tip('信息提交失败','warning');
      });
    }
  
    $scope.initBrand();
});
