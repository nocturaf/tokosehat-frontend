processTimeElapsed = (current, past) => {
    let elapsedTime = (current.getTime() - past.getTime()) / 1000;
    if(elapsedTime>=3600) {
        return Math.floor(elapsedTime/3600) + " jam yang lalu";
    } else if(elapsedTime>=60) {
        return Math.floor(elapsedTime/60) + " menit yang lalu";
    } else {
        return Math.round(elapsedTime) + " detik yang lalu";
    }
}

function getUrlParams(url) {
    var params = {};
    url.substring(1).replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function (str, key, value) {
                 params[key] = value;
            });
    return params;
}
// formatRupiah = (money) => {
    
// }

$(document).ready(function () {

	/**
	 * APPS AND DOMS
	 */

	/**
	 * API CALLS
	 */
	
	// credentials
    const HOST = 'http://35.240.133.181/api';
    let params = getUrlParams(window.location.href);

    $.ajax({
        type: 'PATCH',
        dataType: 'json',
        data: {
            "isServed":true,
        },
        url: HOST+'/purchases/'+params["id"]+"/",
        
    });

    $('.confirm-order').on('click', function() {
        
      });
    // get recipes
    
    //TO DO -> ADD .THEN
	// $.ajax({ 
	//    type: 'GET',
	//    dataType: 'json',
	//    url: HOST+'/purchases/'+params["id"]+'/?expand=recipe',
	//    success: (data) => {        
    //        console.log(data)
	     
	//    }
	// });
	

});