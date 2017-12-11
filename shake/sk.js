
$(document).ready(function(){

	var vibrateInterval;

	// 开始震动
	function startVibrate(duration) {
	    navigator.vibrate(duration);
	}

	// 停止震动
	function stopVibrate() {
	    // 清除间隔和停止持续振动
	    if(vibrateInterval) clearInterval(vibrateInterval);
	    navigator.vibrate(0);
	}

	//在给定的持续时间和间隔时开始持续的振动
	//假定一个数字值
	function startPeristentVibrate(duration, interval) {
	    vibrateInterval = setInterval(function() {
	        startVibrate(duration);
	    }, interval);
	}

	startVibrate(8000);

	

//-------------------------------------------------------------------------------------------

	var oImg = document.getElementById('img1');
	var btn = document.getElementById('btn');

	//var originHtml = oImg.innerHTML;

	var disX;
	var disY;
	
	var prevX;
	var prevY;
	var iSpeedX;
	var iSpeedY;
	
	var timer;
	
var isbool = 1;

	function chushi() {

		disX = 0;
		disY = 0;
	
		prevX = 0;
		prevY = 0;
		iSpeedX = 0;
		iSpeedY = 0;
	
		timer = null;

		oImg.style.left = document.documentElement.clientWidth/2 + 'px';
		oImg.style.top = document.documentElement.clientHeight/2 + 'px';
	
		oImg.style.display = "block";
		btn.style.display = "block";
	
		toChange(400);

		 
	}
	
	chushi();

	function toChange(iTarget){
		
		var offsetL = oImg.offsetLeft;
		var offsetT = oImg.offsetTop;
		
		var timer = setInterval(function(){
			if(oImg.offsetWidth == iTarget){
				clearInterval(timer);
				//startMove();
				
			}
			else{
				oImg.style.width = oImg.offsetWidth + 10 + 'px';
				oImg.style.height = oImg.offsetHeight + 10 + 'px';
				oImg.style.left = offsetL - oImg.offsetWidth/2 + 'px';
				oImg.style.top = offsetT - oImg.offsetHeight/2 + 'px';
			}
		},30);
		
		
	}
	
	oImg.onmousedown = function(ev){
		var ev = ev || window.event;
		disX = ev.clientX - oImg.offsetLeft;
		disY = ev.clientY - oImg.offsetTop;
		
		prevX = ev.clientX;
		prevY = ev.clientY;
		
		clearInterval(timer);
		
		document.onmousemove = function(ev){
			var ev = ev || window.event;
			oImg.style.left = ev.clientX - disX + 'px';
			oImg.style.top = ev.clientY - disY + 'px';
			
			iSpeedX = ev.clientX - prevX;
			iSpeedY = ev.clientY - prevY;
			
			prevX = ev.clientX;
			prevY = ev.clientY;
			
		};
		
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			
			//startMove();
			
		};
		
		return false; //阻止默认事件
		
	};
	
	function startMove(){
		
		clearInterval(timer);
		timer = setInterval(function(){
		
			iSpeedY += 3;
		
			var L = oImg.offsetLeft + iSpeedX;
			var T = oImg.offsetTop + iSpeedY;
		
			if(T>document.documentElement.clientHeight - oImg.offsetHeight){
				T = document.documentElement.clientHeight - oImg.offsetHeight;
				iSpeedY *= -1;
				iSpeedY *= 0.75;
				iSpeedX *= 0.75;
				
			}
			else if(T<0){
				T = 0;
				iSpeedY *= -1;
				iSpeedY *= 0.75;
			}
			
			if(L>document.documentElement.clientWidth - oImg.offsetWidth){
				L = document.documentElement.clientWidth - oImg.offsetWidth;
				iSpeedX *= -1;
				iSpeedX *= 0.75;
			}
			else if(L<0){
				L = 0;
				iSpeedX *= -1;
				iSpeedX *= 0.75;
			}
		
			oImg.style.left = L + 'px';
			oImg.style.top = T + 'px';
			
		},30);
	}
	
	btn.onclick = function(){

		//document.body.removeChild(img1);
		oImg.style.display = "none";
		btn.style.display = "none";
		stopVibrate();
		
		//alert("zoule");

		setTimeout(function(){

			oImg.style.width = 50 + 'px';
			oImg.style.height = 50 + 'px';

			chushi();
			startVibrate(8000);

		},500);
		
	}




});