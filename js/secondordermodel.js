/* Wrapped in an anonymous function call so all variables are local to this file. */
(function () {
    var scene;
    var container;
    var camera;
    var plot;
    var Aslider;
    var Bslider;
    var basicGUI;
    
    init();

    function createPlotFunction(A, B, C, D, E, F){
	return function(x, y){return A + B*x + C*y + D*x*y + E*x*x + F*y*y;};
    }
    
    function init()
    {
	// Setup scene and lighting
	container = document.getElementById("hypparab");
	var values = setup3DScene(container);
	scene = values.scene;
	camera = values.camera;
	fancyLighting(scene);
	setCamera();

	// Axes
	var ticks = [-1, 0, 1];
	var zticks = [-3, -2, -1, 0, 1, 2, 3];
	scene.add(axes(1.5, ticks, 1.5, ticks, -3.5, 3.5,  zticks));

	// Setup UI, first the simple stuff.

	basicGUI = new BasicGUI(container, updatePlot, setCamera);
	
	// Now setup and connect the sliders.

	var sliders = container.getElementsByClassName("slidergroup");
	Aslider = setupSlider(sliders[0], "A =   ",  {
	    start: 0.5,
	    range: {"min": -1.0, "max": 1.0},
	    orientation: "horizontal",
	    connect: "lower",
	});

	Bslider = setupSlider(sliders[1], "Bx =  ", {
	    start: 0.5,
	    range: {"min": -1.0, "max": 1.0},
	    orientation: "horizontal",
	    connect: "lower",
	});

	Cslider = setupSlider(sliders[2], "Cy =  ", {
	    start: 0.5,
	    range: {"min": -1.0, "max": 1.0},
	    orientation: "horizontal",
	    connect: "lower",
	});

	Dslider = setupSlider(sliders[3], "Dxy = ", {
	    start: 0.5,
	    range: {"min": -1.0, "max": 1.0},
	    orientation: "horizontal",
	    connect: "lower",
	});

	Eslider = setupSlider(sliders[4], "Ex<sup>2</sup> = ", {
	    start: 0.5,
	    range: {"min": -1.0, "max": 1.0},
	    orientation: "horizontal",
	    connect: "lower",
	});

	Fslider = setupSlider(sliders[5], "Fy<sup>2</sup> = ", {
	    start: 0.5,
	    range: {"min": -1.0, "max": 1.0},
	    orientation: "horizontal",
	    connect: "lower",
	});

	Aslider.noUiSlider.on("update", updatePlot);
	Bslider.noUiSlider.on("update", updatePlot);
	Cslider.noUiSlider.on("update", updatePlot);
	Dslider.noUiSlider.on("update", updatePlot);
	Eslider.noUiSlider.on("update", updatePlot);
	Fslider.noUiSlider.on("update", updatePlot);


	values.animate();
    }

    function setCamera(){
	camera.position.set(6.7, -7.9, 5.4);
	camera.up = new THREE.Vector3(0,0,1);
	camera.lookAt(new THREE.Vector3(0,0,0));
    }
    

    function updatePlot()
    {
	scene.remove(plot);
	var A = getSliderValue(Aslider);
	var B =  getSliderValue(Bslider);
	var C =  getSliderValue(Cslider);
	var D =  getSliderValue(Dslider);
	var E =  getSliderValue(Eslider);
	var F =  getSliderValue(Fslider);

	var f = createPlotFunction(A, B, C, D, E, F);
	var opts = {showgrid: basicGUI.checkbox.checked};

	if (basicGUI.menu.value == "square"){
	    plot = drawPlotOverSquare(f, opts);
	}
	else{
	    plot = drawPlotOverDisk(f, opts);
	}
	    
	scene.add(plot);
	// console.log(camera.position);
	// console.log(camera.up);
	
    }
    
}()); // calling anonymous function. 
