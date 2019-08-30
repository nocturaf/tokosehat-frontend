$(document).ready(function () {

	/**
	 * APPS AND DOMS
	 */

	// Product slider using slick
	$('.recommend').slick({
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

	$('.vegetarian').slick({
		  prevArrow: false,
		  nextArrow: false,
		  variableWidth: true,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 4,
		  slidesToScroll: 4,	
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
	   url: HOST+'/recipes',
	   success: function(data) {        
	   	let listFood = data.results;
	   	console.log(listFood);
	   	let limit = 5;
	   	for (var i = 0; i < limit; i++) {
	
   			let foodList = "<div id='foodList' class='row'>"+
   				"<div class='col-md-3 ml-3'>"+
					"<div class='card' style='width: 18rem; height: 400px;'>"+
					  "<img src='"+listFood[i].image+"' class='card-img-top' style='height:180px;'>"+
					  "<div class='card-body'>"+
					    "<h5 class='card-title'>"+listFood[i].title+"</h5>"+
					    "<a href='#' class='badge badge-primary'>Snack</a>"+
					    "<a href='#' class='badge badge-success'>Roti</a>"+
					    "<br><br>"+
					    "<p style='font-family: "+'Lato, sans-serif;'+"class='card-text'>Manfaat : "+listFood[i].benefit+"</p>"+
					    "<a href='#' class='btn background-green'>Selengkapnya</a>"+
					  "</div>"+
					"</div>"+
				"</div>"+
			"</div>";
			$('.recommend').slick('slickAdd', foodList);
	   	}
	     
	   }
	});
	

});