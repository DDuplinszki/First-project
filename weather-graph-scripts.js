var avgTemp = [
	{Month: "Jan", Temp: 16},
	{Month: "Feb", Temp: 15},
	{Month: "Mar", Temp: 15},
	{Month: "Apr", Temp: 16},
	{Month: "May", Temp: 18},
	{Month: "Jun", Temp: 22},
	{Month: "Jul", Temp: 22},
	{Month: "Aug", Temp: 24},
	{Month: "Sep", Temp: 25},
	{Month: "Oct", Temp: 23},
	{Month: "Nov", Temp: 19},
	{Month: "Dec", Temp: 16}
];

var svg=d3.select("#svg");

var padding={top: 20, right: 30, bottom: 30, left: 50};

var chartArea={
	"width":parseInt(svg.style("width"))-padding.left-padding.right,
	"height":parseInt(svg.style("height"))-padding.top-padding.bottom,
};

var yScale = d3.scaleLinear()
	.domain([0, d3.max(avgTemp,function(d,i) {return d.Temp})])
	.range([chartArea.height,0]).nice();

var xScale = d3.scaleBand()
	.domain(avgTemp.map(function(d) {return d.Month}))
	.range([0, chartArea.width])
	.padding(.2);

var xAxis=svg.append("g")
	.classed("xAxis",true)
	.attr(
		"transform", "translate("+padding.left+","+(chartArea.height+ padding.top)+")"
	)
	.call(d3.axisBottom(xScale));

var yAxisFn=d3.axisLeft(yScale);
var yAxis=svg.append("g")
	.classed("yAxis",true)
	.attr(
		"transform","translate("+padding.left+","+padding.top+")"
		);
yAxisFn(yAxis);


//bars
var rectGrp=svg.append("g").attr(
	"transform","translate("+padding.left+","+padding.top+")"
);

rectGrp.selectAll("rect").data(avgTemp).enter()
	.append("rect")
	.attr("width",xScale.bandwidth())
	.attr("height",function (d,i) {
		return chartArea.height-yScale(d.Temp);
	})
	.attr("x",function (d,i) {
		return xScale(d.Month);
	})
	.attr("y",function (d,i) {	
		return yScale(d.Temp);
	})
	.attr("fill",function (d,i) {
		return d3.rgb(255, 219, 77);
	})
	.attr("class", "bar")
	.on("mouseover", function()
	{
		tooltip.style("display", null);
	})
	.on("mouseout", function()
	{
		tooltip.style("display", "none");
	})
	.on("mousemove", function(d)
	{
		var xPos = d3.mouse(this)[0] - 35;
		var yPos = d3.mouse(this)[1] - 45;
		tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
		tooltip.select("text").text(d.Month + " : " + d.Temp + " °C");
	});

var tooltip = svg.append("g")
	.attr("class", "tooltip")
	.style("display", "none");

tooltip.append("text")
	.attr("x", 15)
	.attr("dy", "1.2em")
	.style("font-size", "1.4em")
	.attr("font-weight", "bold");