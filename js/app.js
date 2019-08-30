
getTags = (data) => {
    let str = "";
    for(let i=0; i<data.tags.length; i++) {
        str+="<a href='#' class='badge badge-"+data.tags[i].color+"'>"+data.tags[i].name+"</a>"
    }
    return str;
}

$(document).ready(function () {

	/**
	 * APPS AND DOMS
	 */
	
	$('#search_box_result').hide();

	// Product slider using slick
	$('.recommend').slick({
		  prevArrow: false,
		  nextArrow: false,
		  variableWidth: true,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 4,
		  slidesToScroll: 4,	
	});

	$('.latestPurchase').slick({
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

	$('.nonSeafood').slick({
		  prevArrow: false,
		  nextArrow: false,
		  variableWidth: true,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 4,
		  slidesToScroll: 4,	
	});

	$('.spicy').slick({
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

	$('#search_food').focus(function() {
		$('#search_box_result').show();
		$.ajax({ 
		   type: 'GET',
		   dataType: 'json',
		   url: HOST+'/search-histories/?ordering=-datetime&limit=2',
		   success: function(data) {        
		   	let listRecent = data.results;
		   	for (var i = 0; i < listRecent.length; i++) {
				$('#recent_search_list').append(
					'<li>'+
						'<a href="#" style="color:#1D800E;">'+listRecent[i].keyword+'</a>'+
					'</li>'
				);
		   	}
		     
		   }
		});
		$.ajax({ 
		   type: 'GET',
		   dataType: 'json',
		   url: HOST+'/search-histories/popular?limit=2',
		   success: function(data) {        
		   	let listRecent = data.results;
		   	for (var i = 0; i < listRecent.length; i++) {
				$('#popular_search_list').append(
					'<li>'+
						'<a href="#" style="color:#1D800E;">'+listRecent[i].keyword+'</a>'+
					'</li>'
				);
		   	}
		     
		   }
		});
	});

	$('#search_food').blur(function() {
		$('#search_box_result').hide();
		$('#recent_search_list').text('');
	})

	$('#search_form').submit(function(event) {
		event.preventDefault();
		let keyword = {
			"keyword": $('#search_food').val()
		};
		$.post(HOST+"/search-histories/", keyword)
		  	.done(function( data ) {
		  		window.location.replace('search-result.html?keyword='+$('#search_food').val());
		});	
	});

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
                        getTags(listFood[i])+
					    "<br><br>"+
					    "<p style='font-family: "+'Lato, sans-serif;'+"class='card-text'>Manfaat : "+listFood[i].benefit+"</p>"+
					    "<a href='product-detail.html?id="+listFood[i].id+"' class='btn background-green product-button'>Selengkapnya</a>"+
					  "</div>"+
					"</div>"+
				"</div>"+
			"</div>";
			$('.recommend').slick('slickAdd', foodList);
	   	}
	     
	   }
	});

	// get recipes recent
	$.ajax({ 
	   type: 'GET',
	   dataType: 'json',
	   url: HOST+'/purchases/recent/?expand=recipe',
	   success: function(data) {        
	   	let listPurchases = data.results;
	   	console.log(listPurchases);
	   	for (var i = 0; i < listPurchases.length; i++) {
   			let foodList = "<div id='foodList' class='row'>"+
   				"<div class='col-md-3 ml-3'>"+
					"<div class='card' style='width: 18rem; height: 200px;'>"+
					  "<div class='card-body'>"+
                        "<h5 class='card-title'>"+listPurchases[i].recipe.title+"</h5>"+
                        getTags(listPurchases[i].recipe)+
					    "<br><br>"+
					    "<p style='font-family: "+'Lato, sans-serif;'+"class='card-text'>Manfaat : "+listPurchases[i].recipe.benefit+"</p>"+
					    "<a href='product-detail.html?id="+listPurchases[i].recipe.id+"' class='btn background-green product-button'>Selengkapnya</a>"+
					  "</div>"+
					"</div>"+
				"</div>"+
			"</div>";
			$('.latestPurchase').slick('slickAdd', foodList);
	   	}
	     
	   }
	});

	// get vegetarians
	$.ajax({ 
	   type: 'GET',
	   dataType: 'json',
	   url: HOST+'/categories/recipes/',
	   success: function(data) {        
	   	let listCategories = data.results[0].recipes;
	   	console.log(listCategories);
	   	for (var i = 0; i < listCategories.length; i++) {
			
			let foodList = "<div id='foodList' class='row'>"+
   				"<div class='col-md-3 ml-3'>"+
					"<div class='card' style='width: 18rem; height: 400px;'>"+
					  "<img src='"+listCategories[i].image+"' class='card-img-top' style='height:180px;'>"+
					  "<div class='card-body'>"+
                        "<h5 class='card-title'>"+listCategories[i].title+"</h5>"+
                        getTags(listCategories[i])+
					    "<br><br>"+
					    "<p style='font-family: "+'Lato, sans-serif;'+"class='card-text'>Manfaat : "+listCategories[i].benefit+"</p>"+
					    "<a href='product-detail.html?id="+listCategories[i].id+"' class='btn background-green product-button'>Selengkapnya</a>"+
					  "</div>"+
					"</div>"+
				"</div>"+
			"</div>";

			$('.vegetarian').slick('slickAdd', foodList);
	   	}
	     
	   }
	});

	// get non-seafoods
	$.ajax({ 
	   type: 'GET',
	   dataType: 'json',
	   url: HOST+'/categories/recipes/',
	   success: function(data) {        
	   	let listCategories = data.results[1].recipes;
	   	console.log(listCategories);
	   	for (var i = 0; i < listCategories.length; i++) {
			
			let foodList = "<div id='foodList' class='row'>"+
   				"<div class='col-md-3 ml-3'>"+
					"<div class='card' style='width: 18rem; height: 400px;'>"+
					  "<img src='"+listCategories[i].image+"' class='card-img-top' style='height:180px;'>"+
					  "<div class='card-body'>"+
                        "<h5 class='card-title'>"+listCategories[i].title+"</h5>"+
                        getTags(listCategories[i])+
					    "<br><br>"+
					    "<p style='font-family: "+'Lato, sans-serif;'+"class='card-text'>Manfaat : "+listCategories[i].benefit+"</p>"+
					    "<a href='product-detail.html?id="+listCategories[i].id+"' class='btn background-green product-button'>Selengkapnya</a>"+
					  "</div>"+
					"</div>"+
				"</div>"+
			"</div>";

			$('.nonSeafood').slick('slickAdd', foodList);
	   	}
	     
	   }
	});

	// get spicy
	$.ajax({ 
	   type: 'GET',
	   dataType: 'json',
	   url: HOST+'/categories/recipes/',
	   success: function(data) {        
	   	let listCategories = data.results[2].recipes;
	   	console.log(listCategories);
	   	for (var i = 0; i < listCategories.length; i++) {
			
			let foodList = "<div id='foodList' class='row'>"+
   				"<div class='col-md-3 ml-3'>"+
					"<div class='card' style='width: 18rem; height: 400px;'>"+
					  "<img src='"+listCategories[i].image+"' class='card-img-top' style='height:180px;'>"+
					  "<div class='card-body'>"+
                        "<h5 class='card-title'>"+listCategories[i].title+"</h5>"+
                        getTags(listCategories[i])+
					    "<br><br>"+
					    "<p style='font-family: "+'Lato, sans-serif;'+"class='card-text'>Manfaat : "+listCategories[i].benefit+"</p>"+
					    "<a href='product-detail.html?id="+listCategories[i].id+"' class='btn background-green product-button'>Selengkapnya</a>"+
					  "</div>"+
					"</div>"+
				"</div>"+
			"</div>";

			$('.spicy').slick('slickAdd', foodList);
	   	}
	     
	   }
	});

	let productDetail = false;
    $(document).on("click", ".product-button" , function() {
        let searchParams = new URLSearchParams(window.location.search);
        let recipeId = searchParams.get('id');
    });
	
	function getURLParameter(url, name) {
    	return (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
	}

});
