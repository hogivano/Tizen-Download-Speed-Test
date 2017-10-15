//JUST AN EXAMPLE, PLEASE USE YOUR OWN PICTURE!
var imageAddr = "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg";
//var imageAddr = "images/Download Speed.png";
var downloadSize = 4995374;

function ShowProgressMessage(msg) {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg);
        } else {
            for (var i = 0; i < msg.length; i++) {
                console.log(msg[i]);
            }
        }
    }

    var oProgress = document.getElementById("progress");
    if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
        oProgress.innerHTML = actualHTML;
    }
}

function InitiateSpeedDetection() {
    ShowProgressMessage("Please wait...");
    window.setTimeout(MeasureConnectionSpeed, 1);
};    

$(document).ready(function(){
	$("#btn").on("click", function(){
    	if ($(this).hasClass("start") == true){
            tizen.systeminfo.getPropertyValue('NETWORK', function(networkInfo) {
                if (networkInfo.networkType === 'NONE') {
                    console.log('Network connection is not available');
                    showSnackBar();
                } else {
                	$("#btn").removeClass("start");
                    $("#btn").addClass("stop");
                    $("#btn").empty();
                    $("#btn").append("Stop");
                    InitiateSpeedDetection();
                }
            });
            
        } else {
        	location.reload();
        }
    });

    $('.modal').on('click', function(){
        $('.modal').removeClass('is-active');
    });

    $('#yesModal').on('click', function(){
        tizen.application.getCurrentApplication().exit();
    });

    $('#noModal').on('click', function(){
        $('.modal').removeClass('is-active');
    });

    $('#menu').on('click', function(){
        if ($('.dropdown-menu').css('display') == 'none'){
            $('.dropdown-menu').slideDown();
//            console.log("drop" + $('.dropdown-menu').css('display'));
        } else {
            $('.dropdown-menu').slideUp();
//            console.log("drop" + $('.dropdown-menu').css('display'));
        }
        
    });

    $('#about').on('click', function(){
        $('.dropdown-menu').slideUp();
        $('#modalAbout').addClass('is-active');
    });
    
    $('#exit').on('click', function(){
        tizen.application.getCurrentApplication().exit();
    });
});

function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();

    download.onload = function () {
        endTime = (new Date()).getTime();
//        endTime = tizen.time.getCurrentDateTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
        ShowProgressMessage("Error please check your connection");
    }	
    
    startTime = (new Date()).getTime();
//    startTime = tizen.time.getCurrentDateTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;
//    download.src = imageAddr;
//    alert(download.src);
    
    function showResults() {
        $("#btn").removeClass("stop");
        $("#btn").addClass("start");
        $("#btn").empty();
        $("#btn").append("Start");
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        ShowProgressMessage([
            "Your connection speed",
            speedMbps + " Mbps"
        ]);
        
    }
}

function showSnackBar(){
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}

window.onload = function() {
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                // tizen.application.getCurrentApplication().exit();
            	if ($('#modalAbout').hasClass('is-active')){
            		$('#modalAbout').removeClass('is-active');
            	} else {
            		if ($('.dropdown-menu').css('display') != 'none'){
            			$('.dropdown-menu').slideUp();
            		}
            		$('#modalExit').addClass('is-active');
            	}
            } catch (ignore) {}
        }
    });
    
};