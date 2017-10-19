var app=function () {
	var obj={
		header:"Birthday Cal",
		weekday:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		color:['red', 'green', 'blue', 'orange', 'purple', 'yellow', 'violet'],
		data:null,
		initialize:function(){
			var self=this;
			this.render();
		},
		render:function(){
			var self=this;
			self.createDom();
			self.functional();
		},
		createDom:function(){
			var self=this;
			var content="";
			content +="<div id='calendarWrapper'>";
				content +="<p id='headerText'>"+self.header+"</p>";
				content +="<div id='dayWrapper'>";
					for (var i = 0; i < self.weekday.length; i++) {
						content +="<div id="+self.weekday[i]+" class='weekday'>";
							content +="<div class='dayName'>"+self.weekday[i]+"</div>";
							content +="<div class='nameWrapper'></div>";
						content +="</div>";
					}
				content +="</div>";
				content +="<div id='bindJSONdata'></div>";
				content +="<div class='YearWrapper'>";
					content +="<p class='year'>Year</p>";
					content +="<input class='txtBox' type='text'>";
					content +="<input id='btnUpdate' class='btnUpdate' type='button' value='UPDATE'>";					
				content +="</div>";

			content +="</div>";
			document.body.innerHTML=content;
		},
		functional:function(){
			var self=this;			
			getdata=function(url, callback){				
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
				    if (this.readyState == 4) {
				        var myArr = JSON.parse(this.responseText);
				        callback(myArr)
				    }
				};
				xmlhttp.open("GET", url);
				xmlhttp.send();
			}
			function mycallback(data) {			 
			   manipulate=data;	
			   document.getElementById('bindJSONdata').append(JSON.stringify(data));		  
			}
			getdata('data.json', mycallback);

			document.getElementById('btnUpdate').addEventListener('click', function(){	
			 	var dayWrapper=document.getElementById('dayWrapper');			
            	var clearElement=dayWrapper.childNodes;
            	clearElement.forEach(function(item, val){
               		var len=item.childNodes[1];
               		len.innerHTML="";
            	});

                var data=manipulate;
                var arr=[];
                var txtBoxValue=parseInt(document.getElementsByClassName('txtBox')[0].value);                
            	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
               
               data.forEach(function(value,i){
                       var date=new Date(value.birthday);
                       var day=days[date.getDay()];
                       var firstThreeLetter=day.substr(0,3);                       
                       if(date.getFullYear()==txtBoxValue){                           
                           arr.push(value);
                           var first=value.name.split(' ')[0];
                           var second=value.name.split(' ')[1];
                           var pro1=first.split('')[0];
                           var pro2=second.split('')[0];
                           var concat=pro1.concat(pro2);
                           for(item in dayWrapper.children){
                               if (item <=7){
                                   if(dayWrapper.children[item].id == firstThreeLetter){
                                       document.getElementById(dayWrapper.children[item].id).childNodes[1].innerHTML +='<div class="nameList">'+concat+'</div>';
                                   		//document.getElementById(dayWrapper.children[item].id).childNodes[1].style.height=84/document.getElementById(dayWrapper.children[item].id).childNodes[1].childNodes.length+"%";
                                   		//document.getElementById(dayWrapper.children[item].id).childNodes[1].style.width=100/document.getElementById(dayWrapper.children[item].id).childNodes[1].childNodes.length+"%";                                   		
                                   }
                               }
                           }
                       }                      
               })               
               var nodes=dayWrapper.childNodes;
               nodes.forEach(function(item, val){
               		var len=item.childNodes[1].childNodes;
               		len.forEach(function(it,v){
               			it.style.background=self.color[v];
               		})
               })
            })
		}
		}
	
	obj.initialize();
}
window.onload=function(){
	app();	
}
