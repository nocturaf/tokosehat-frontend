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

// formatRupiah = (money) => {
    
// }

$(document).ready(function () {

	/**
	 * APPS AND DOMS
	 */

	// Product slider using slick
	$('.opportunity').slick({
		  // infinite: false,
		  // slidesToShow: 3,
		  // slidesToScroll: 3,
		  // dots: false,
		  prevArrow: false,
		  nextArrow: false,
		  variableWidth: true,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 3,
		  slidesToScroll: 3,	
	});

	/**
	 * API CALLS
	 */
	
	// credentials
	const HOST = 'http://35.240.133.181/api';

	// get recipes
	$.ajax({ 
	   type: 'GET',
	   dataType: 'json',
	   url: HOST+'/purchases/?is_opportunity=true&expand=recipe&is_served=false',
	   success: (data) => {        
	   	let listFood = data.results;
           let limit = 5;
        console.log(listFood);
	   	for (var i = 0; i < limit && i<listFood.length; i++) {
            let dateDiff = processTimeElapsed(new Date(), new Date(listFood[i].datetime));
   			let foodList = "<div id='foodList' class='row'>"+
   				"<div class='col-md-3 ml-3'>"+
					"<div class='card' style='width: 18rem; height: 400px;'>"+
					  "<img src='"+listFood[i].recipe.image+"' class='card-img-top' style='height:180px;'>"+
					  "<div class='card-body'>"+
						"<h5 class='card-title'>"+listFood[i].recipe.title+"</h5>"+
						"<p>Dipesan "+dateDiff+"</p>"+
                        "<br>"+
                        "<div class='row'>" +

                            "<div class='col-8'>"+
                                "<p>Rp. "+listFood[i].price * listFood[i].quantity+"</p>"+
                            "</div>"+

                            "<div class='col-4'>"+
                                "<p>Qty: "+listFood[i].quantity+"</p>"+
                            "</div>"+
                        "</div>"+
					    "<a href='confirm-peluang.html?id="+listFood[i].id+"' class='btn background-green'>Ambil Pesanan</a>"+
					  "</div>"+
					"</div>"+
				"</div>"+
			"</div>";
			$('.opportunity').slick('slickAdd', foodList);
	   	}
	     
	   }
	});
	

});