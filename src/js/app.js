
$.when( $.ready ).then(function() {
	// Document is ready.

	//SLIDER
	$('.Slider-container').owlCarousel({
		items: 1,
		loop: true,
		dotsContainer: '#carousel-custom-dots',
		autoplay: true,
		autoplaySpeed:1000,
		smartSpeed:1500,
		autoPlayHoverPause: true
	});

	function hacerLista(title, imageSrc, cat, index){
		let plantilla= `
			<article class="Movies-item item-${index}" data-cat="${cat}">
				<img src="${imageSrc}" alt="${title}">
				<div class="overlay">
					<div class="middle">
						<h3>${title}</h3>
						<a href="#" class="btn btn-on">Watch Now</a>
						<a href="#" class="btn">More Info</a>
					</div>
				</div>
				
			</article>
		`;

		return plantilla;
	}

	// obtener datos JSON
	$.getJSON( "js/ajax/test.json", function( data ) {
		let moviesList = [];
		// Crear listado peliculas
		$.each(data.movies, function(index,movie){		
			let title = movie.title;
			let imageSrc = "assets/img/thumbnails/" + movie.image;
			let cat = movie.cat;
			moviesList.push( hacerLista(title, imageSrc, cat, index) );
		});

		// Insertar listado en la pág.
		$(".Movies").append( moviesList.join( "" ) );
		
	});

	// Filtrar Peliculas
	
	function filterSelection(cat) {
		let items;
		items =  $(".Movies-item");
		if (cat == "All"){
			for (let i = 0; i < items.length; i++) {
				RemoveClass(items[i], "hide");				
			}
		}else{
			for (let i = 0; i < items.length; i++) {
				let item = items[i];
				let categoryList = $(item).data("cat").split(",");
				// Add the "hide" class (display:none) to the filtered elements
				if(categoryList.indexOf(cat) == -1){
					AddClass(item, "hide");
				}else{
					RemoveClass(item, "hide");
				}
			}
			
			
		}
	}
	
	function AddClass(element, name) {
		$(element).addClass(name);
	}
	
	function RemoveClass(element, name) {
		$(element).removeClass(name);
	}	
	
	let btnContainer = $(".Filter");
	let btns = $(".tab");
	for (let i = 0; i < btns.length; i++) {
		btns[i].addEventListener("click", function() {
			// Add active class to the current control button (highlight it)
			let current = $(".tab-active");
			current[0].className = current[0].className.replace(" tab-active", "");
			this.className += " tab-active";

			let cat = $( this ).data("cat");
			filterSelection(cat);
		});
	}

	// filterSelection("All");
	
});