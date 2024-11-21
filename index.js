$(async () => {
	// c-1 get latest year for footer
	const current = new Date().getFullYear();

	$("#fullyear").text(current);
	// c-1 end

	// fetch data from json file
	async function fetchProjects() {
		try {
			const response = await $.getJSON("projects.json");
			return response;
		} catch (error) {
			console.log("Cannot get content of a JSON");
			throw error;
		}
	}

	// only fetch the data once
	const projects = await fetchProjects();
	let selectedProjectId = projects[0]?.id ?? 0;
	let images = projects[0]?.images;
	updateCarousel(images.length, images);

	

	// render titles for categories
	for (let project of projects) {
		const newContent = `
            	<div class="max-w-80 xsm:leading-4 flex items-center bg-dark ${
								project.id == selectedProjectId ? "border border-hover" : ""
							} rounded py-2 px-4 rounded transition-all transform hover:scale-110 hover:border hover:border-hover cursor-pointer mx-1 mt-2 md:mx-4 md:mt-4" data-id="${
			project.id
		}">
                    <img src="./images/${
											project.type == "Desktop"
												? "desktop"
												: project.type == "Web"
												? "web"
												: "mobile"
										}.png" alt="Web" class="w-6 md:w-10 mr-2" />
                    <p class="text-md md:text-lg">${project.title}</p>
				</div>
        `;

		$("#project-titles").append(newContent);

		//asign description for selected project
		if (project.id == selectedProjectId) {
			$("#project-description").text(project.desc);
			$("#project-link").attr({ href: project.link });

			const imageCOntainer = $("#image-container");
			$(imageCOntainer).empty();
			for (const img in project.images) {
				const newElement = $("<div> </div>").attr({
					class:
						"carousel-item   w-screen md:w-1/3 max-w-maxWidth min-w-minWidth bg-dark rounded  grid place-items-center  md:mx-8 ",
					"data-id": img,
				});

				const newImage = $("<img />").attr({
					src: `./asset/${project.images[img]}`,
					alt: "Project Image",
					class: "object-cover transition-all transform hover:scale-90",
				});
				newElement.append(newImage);
				imageCOntainer.append(newElement);
			}
		}
	}

	// handle click on each project to change the corresponding data
	$("#project-titles").on("click", "div[data-id]", function () {
		const selectedId = $(this).data("id");
		const selectedProject = projects.find(
			(project) => project.id === selectedId
		);

		if (selectedProject) {
			$("#project-description").text(selectedProject.desc);
			$("#project-link").attr({ href: selectedProject.link });

			// update the selected project styling
			$("#project-titles div").removeClass("border border-hover");
			$(this).addClass("border border-hover");


			updateCarousel(selectedProject.images.length, selectedProject.images);
		}


	});


    // Function to generate random colors
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

	function updateCarousel(numItems, items) {
    // Clear existing children
    $('.carousel-wrapper #carousel-main').empty();
    $('.carousel-wrapper .radio-buttons-container').empty();

    // Add carousel items
    for (let i = 1; i <= numItems; i++) {
        $('<div>')
            .addClass('item')
            .css('--offset', i)
			.css('background', `url("asset/${items[i]}") center center / cover no-repeat`)
			.on('click', (e) => {
				const loc = window.location.href;				
				window.open(`${loc}/luiz.github.io/asset/${items[i]}`, '_blank').focus();				
			})
            .appendTo('#carousel-main')
    }

    // Add radio buttons
    for (let i = 1; i <= numItems; i++) {
        const radio = $('<input>')
            .attr('type', 'radio')
            .attr('name', 'position')
            .on('change', function () {
                $('#carousel-main').css('--position', i);
            });

        if (i === 1) radio.prop('checked', true);

        $('.radio-buttons-container').append(radio);
    }

    // Update carousel variables
    $('#carousel-main').css('--items', numItems);
    $('#carousel-main').css('--middle', Math.ceil(numItems / 2));
}

});
