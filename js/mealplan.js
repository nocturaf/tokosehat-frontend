getDayString = (day) => {
    let days = ['Minggu','Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[day];
}

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

	// Product slider using slick

    $('.mealplan').slick({
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
});

// credentials
const HOST = 'http://35.240.133.181/api';
let globalMeal;

$.ajax({
    type:'GET',
    dataType:'json',
    url: HOST+'/recipes/?limit=7',
    success: (res) => {
        let data = res.results;
        globalMeal = data;
        console.log(res);

        let limit = 7;
        let today = (new Date()).getDay();

        for (var i = 0; i < limit && i<data.length; i++) {
 
            let foodList = "<div id='foodList' class='row'>"+
                   "<div class='col-md-3 ml-3'>"+
                   "<h1 style='text-align:center'>"+getDayString((today+i)%7)+"</h1>"+
					"<div class='card' style='width: 18rem; height: 360;'>"+
					  "<img src='"+data[i].image+"' class='card-img-top' style='height:180px;'>"+
					  "<div class='card-body'>"+
                        "<h5 class='card-title'>"+data[i].title+"</h5>"+
                        getTags(data[i])+
					    "<br><br>"+
					    "<p style='font-family: "+'Lato, sans-serif;'+"class='card-text'>Manfaat : "+data[i].benefit+"</p>"+
					    // "<a href='#' class='btn background-green'>Selengkapnya</a>"+
					  "</div>"+
					"</div>"+
				"</div>"+
			"</div>";
			$('.mealplan').slick('slickAdd', foodList);
        }
    }
});

let dateNow = new Date();

// $('#mealplan_form').submit(function(event) {
//     event.preventDefault();
//     for(let i=0; i<7 && i<globalMeal.length; i++) {
//         let dayRecipe = [globalMeal[i].id];
//         let param = JSON.stringify({
//             "date": dateNow.toISOString().split('T')[0],
//             "recipes": dayRecipe
//         });
//         $.post(HOST+'/plans/', param)
//             .done(function(data) {
//                 console.log('success...');
//                 console.log(data);
//             });

//         dateNow = new Date(dateNow.setDate(dateNow.getDate()+1));
//     }
// });

$('#mealplan_form').on('submit', function(event) {
    event.preventDefault();
    for(let i=0; i<7 && i<globalMeal.length; i++) {
        let dayRecipe = globalMeal[i].id;
        $.ajax({
            type:'POST',
            data: {
                "date": dateNow.toISOString().split('T')[0],
                "recipes": JSON.stringify(dayRecipe),
            },
            url: HOST+'/plans/',

        })

        dateNow = new Date(dateNow.setDate(dateNow.getDate()+1));
    }
    console.log("success!");
});