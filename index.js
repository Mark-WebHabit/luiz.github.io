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

	let currentIndex = 0;
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

			//asign description for selected project

			const imageCOntainer = $("#image-container");
			$(imageCOntainer).empty();
			for (const img in selectedProject.images) {
				const newElement = $("<div> </div>").attr({
					class:
						"carousel-item w-screen md:w-1/3 max-w-maxWidth min-w-minWidth bg-dark rounded  grid place-items-center  md:mx-8 ",
					"data-id": img,
				});

				const newImage = $("<img />").attr({
					src: `./asset/${selectedProject.images[img]}`,
					alt: "Project Image",
					class:
						"object-cover transition-all transform hover:scale-90 origin-left",
				});
				newElement.append(newImage);
				imageCOntainer.append(newElement);
			}

			// Reset currentIndex when a new project is clicked
			currentIndex = 0;
			$("#image-container").css("left", 0); // Reset the image container's position
		}
	});

	// Handle the "Next" and "Previous" buttons click
	let isAnimating = false; // To prevent spam clicks

	$("#next").click(function () {
		if (!isAnimating) {
			const images = $("#image-container div");

			if (currentIndex < images.length - 1) {
				currentIndex++;
				const nextImage = $(images[currentIndex]);
				const nextImageWidth = nextImage.outerWidth();

				isAnimating = true; // Disable the buttons during the animation
				$("#image-container").animate(
					{
						left: `-=${nextImageWidth}px`,
					},
					300, // Animation duration in milliseconds
					() => {
						isAnimating = false; // Re-enable the buttons after the animation is complete
					}
				);
			}
		}
	});

	$("#prev").click(function () {
		if (!isAnimating) {
			const images = $("#image-container div");

			if (currentIndex > 0) {
				const prevImage = $(images[currentIndex]);
				currentIndex--;

				const prevImageWidth = prevImage.outerWidth();

				isAnimating = true; // Disable the buttons during the animation
				$("#image-container").animate(
					{
						left: `+=${prevImageWidth}px`,
					},
					300, // Animation duration in milliseconds
					() => {
						isAnimating = false; // Re-enable the buttons after the animation is complete
					}
				);
			}
		}
	});
});
