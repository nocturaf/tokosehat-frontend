$(document).ready(function () {

	/**
	 * APPS AND DOMS
	 */

	// Product slider using slick



	/**
	 * API CALLS
	 */
	
	// credentials
	const HOST = 'http://35.240.133.181/api';



	// get recipes
	$.ajax({ 
	   type: 'GET',
	   dataType: 'json',
	   url: HOST+'/recipes',
	   success: function(data) {        
	   	let listFood = data.results;
	   	let limit = 5;
	   	for (var i = 0; i < 2; i++) {
   			let foodList = 
   			"<div class='slick-slide slick-current slick-active' data-slick-index='"+i+"' aria-hidden='false' id='foodCard'>"+
   				"<div>"+
	   				"<div class='col-md-3' id='foodCard'>"+
						"<div class='card' style='width: 18rem;'>"+
						  "<img src='"+listFood[i].image+"' class='card-img-top'>"+
						  "<div class='card-body'>"+
						    "<h5 class='card-title'>"+listFood[i].title+"</h5>"+
						    "<a href='#' class='badge badge-primary'>Snack</a>"+
						    "<a href='#' class='badge badge-success'>Roti</a>"+
						    "<br><br>"+
						    "<p style='font-family: "+'Lato, sans-serif;'+"class='card-text'>Manfaat : Bebas Gula</p>"+
						    "<a href='#' class='btn background-green'>Selengkapnya</a>"+
						  "</div>"+
						"</div>"+
					"</div>"+
				"</div>"+
			"</div>";

			$('#foodList .slick-list .slick-track').append(
				foodList
			);
	   	}
	     
	   }
	});

		$('.slick').slick({
		  // infinite: false,
		  // slidesToShow: 3,
		  // slidesToScroll: 3,
		  // dots: false,
		  prevArrow: false,
		  nextArrow: false,
		  variableWidth: true,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 4,
		  slidesToScroll: 4,	
	});
	

});