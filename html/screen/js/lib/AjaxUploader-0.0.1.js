/**
 * H5异步文件上传
 * @author 陈琪
 * @phone 18667163872
 * @email cq@sucsoft.com
 * @date 2015-08-29 23:15:13
 */
(function(win){
	function AjaxUploader(o){
		var type={
			param:{
				url:"rest/o/uploads/temp",		//文件上传提交地址
				name:"files",					//form参数名称
				dataType:"json",				//结果数据类型
				input:false,					//input元素
				initChoose:true,				//初始化时是否直接选择文件
				before:function(file){
					//已选择文件上传前，一般用来处理验证
					return true;
				},
				uploading:function(progress){
					//上传中，用来处理进度条
				},
				callBack:function(result){
					//上传结束，用来处理上传结果
					alert("上传成功");
				}
			},
			initParam:function(o){
				//初始化参数
				if(o){
					for(var name in o){
						this.param[name]=o[name];
					}
				}
			},
			initEvent:function(){
				var _this=this;
				var param=_this.param;
				//初始化事件
				var input=document.createElement("input");
				input.setAttribute("type","file");
				param.input=input;
				document.body.appendChild(input);
				input.style.display="none";
				var changeFun=function(){
					var file = input.files[0];
					//验证文件参数
					if(param.before.apply(input,[file])){
						var xMLHttpRequest = _this.getXMLHttpRequest();
						xMLHttpRequest.onreadystatechange=function(){
							//异步上传处理
							if (xMLHttpRequest.readyState == 4) {
								//成功处理
								var result=xMLHttpRequest.responseText;
								if(xMLHttpRequest.status == 200){
									if(param.dataType&&param.dataType=="json"){
										result=JSON.parse(result);
									}
								}
								param.callBack.apply(input,[result]);
			                }
						}
						xMLHttpRequest.upload.onprogress = function(event) {
							//上传进度处理
							progressValue = Math.floor(100 * event.loaded / event.total); 
							param.uploading.apply(input,[progressValue,event.loaded,event.total]);
						}
						var formData = new FormData();
						formData.append(param.name,file);
						
						if ("withCredentials" in xMLHttpRequest){
							xMLHttpRequest.open("post", param.url, true);
					    } else if (typeof XDomainRequest != "undefined"){
							xMLHttpRequest.open("post",param.url);
					    }
						
						xMLHttpRequest.send(formData);
					}
				};
//				input.onchange=function(){};	//标准普通用法
				if(window.addEventListener){ 
					//支持冒泡 Mozilla, Netscape, Firefox
					input.addEventListener('change', changeFun, false);
			    } else { 
			    	//支持冒泡 IE
			    	input.attachEvent('onchange',  changeFun);
			    }
			},
			choose:function(){
				var param=this.param;
				param.input.click();
			},
			getXMLHttpRequest:function(){
				if (typeof XDomainRequest != "undefined"){
					return new XDomainRequest();
				}
				return new XMLHttpRequest();
			},
			initView:function(){
				//初始化显示
				var param=this.param;
				if(param.initChoose){
					this.choose();
				}
			},
			reload:function(o){
				this.initParam(o);
				this.initEvent();
				this.initView();
			}
			
		};
		type.reload(o);
		return type;
		
	}
	win.AjaxUploader=AjaxUploader;
})(window);