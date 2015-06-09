
var margin = 20,
    diameter = 800;

var color = d3.scale.linear()
    .domain([-1, 5])
    .range(["#84e684", "#079107"])
    .interpolate(d3.interpolateHcl);

var pack = d3.layout.pack()
    .padding(10)
    .size([diameter - margin, diameter - margin])
    .value(function(d) { return Math.sqrt(d.followerNo); })

var svgContainer = d3.select("section").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

d3.json("twitter_data.json", function(error, root) {
    if (error) return console.error(error);

    var focus = root,
        nodes = pack.nodes(root),
        view;

    var defs = svgContainer.selectAll("defs")
        .data(nodes)
        .enter()
        .append("defs").attr("id", "imgdefs");

    var pattern = defs.append("pattern")
        .attr("id", function(d) { return d.name; })
        .attr("height", function(d) { return 1; })
        .attr("width", function(d) { return 1; })
        .attr("x",0)
        .attr("y",0);

    var image = pattern.append("svg:image")
        .attr("width", function(d) { return d.r * 2; })
        .attr("height", function(d) { return d.r * 2; })
        .attr("xlink:href", function(d) { return d.image; })
        .attr("x",0)
        .attr("y",0);

    //var fakecircle = svgContainer.append("circle").attr("cx", 0).attr("cy",0).attr("r",400).attr("fill","blue");
    //console.log("CIRCLE");

    var circle = svgContainer.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("fill", function(d) { return "url(#" + d.name + ")" ; })
        .attr("class", function(d) { return d.parent ? d.children ? "node" : "node--leaf" : "node--root"; })
        //.style("display", function(d) { return (d.parent === root || d === root) ? null : "none"; })
        // CONTROLS WHAT GETS SEEN AT WHAT ZOOM LEVEL//
        .style("display", function(d) { return (d.parent === root) ? "inline" : "none"; })

        // .style("fill-opacity", function(d) { return d.parent ? d.children ? 0.5 : "node node--leaf" : "node node--root";})
        // .style("stroke", function(d) { return d.parent ? d.children ? "red" : "node node--leaf" : "node node--root";})
        // .style("stroke-width", function(d) { return d.parent ? d.children ? 4 : "node node--leaf" : "node node--root";})
        // .style("display", function(d) { return (d.parent === root || d === root) ? null : "none"; })
        // //.style("fill", function(d) { return d.children ? color(d.depth) : null; })
        .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

    svgContainer.selectAll(".node--root")
        .style("display", "inline");

    var handle = svgContainer.selectAll("handle")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "handle")
        .style ("text-anchor", "middle")
        //.attr("fill", "green")
        // CONTROLS WHAT GETS SEEN AT WHAT ZOOM LEVEL//
        .style("display", function(d) { return (d.parent === root) ? "inline" : "none"; })
        // .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
        // //.style("fill", function(d) { return d.parent === root ? "green" : "blue"; })
        // .style("display", function(d) { return d.parent === root ? null : "none"; })
        .style("font-size", function(d) { if (d.depth===1) /*console.log(radii);*/ return d.r * 1/65 + "em"; return d.r * 1/20 + "em";})
        //END//

        //.attr("font-size", function(d) { console.log("fontsize"); console.log(d.r); return d.r * 0.2; })
        //.style()
        //.style("font-size", function(d) { console.log("fontsize"); console.log(d.r); return d.r * 0.01; })
        .text(function(d) { return d.name; });


    //var radii = 0;

    //console.log(radii);

    var tweet = svgContainer.selectAll("tweet")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "tweet")
        //.attr("textLength", function(d) { return d.r * 1.5; })
        //.attr("lengthAdjust", "spacingAndGlyphs")
        //.style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
        //.style("display", function(d) { return d.parent === root ? null : "none"; })
        .text(function(d) { return d.tweet; })
        //.text("Why Are We Leaving Facebook? Why Are We Leaving Facebook? Why Are We Leaving Facebook?")
        //.style("font-size", function(d) { console.log("fontsize"); console.log(d.r); return d.r * 0.01; })
        .style ("text-anchor", "middle")
        .style("font-size", function(d) { radii = d.r; /*console.log(radii);*/ return d.r * 1/75 + "em"; })
        .style("display", function(d) { return (d.parent === root) ? "inline" : "none"; })

        //.style("font-size", function(d) { console.log("HEREEEEE"); console.log(d.r.toString() + "px"); return "20px"; /*var temp = d.r * .1; return temp.toString();*/ })
        //.style("font")
        .each(function(d) {
            var tweetText = d3.select(this),
                words = tweetText.text().split(/\s+/).reverse(),
                word,
                line = [],
            //lineNumber = 0,
            //lineHeight = 1.1, // ems
            //y = 10,
                dx = 0,
                dy = function(d) { return d.r/5; },
                tspan = tweetText
                    .text(null)
                    .append("tspan")
                    //.attr("x", 0)
                    //.attr("y", y)
                    .attr("dx", dx)
                    .attr("dy", 0);
            //.text("lalala");

            //console.log(apple);

            /*console.log(width);
             console.log("WIDTH");
             console.log(d3.select(this));
             console.log(d3.select(this.firstChild).attr("font-size"));*/

            //console.log(words);
            while (word = words.pop()) {
                line.push(word);
                //console.log(word);
                tspan.text(line.join(" "));

                var trouble = tspan.node().getComputedTextLength();
                console.log(radii);

                if (tspan.node().getComputedTextLength() > d.r * 1.8) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    //console.log("hihihi");
                    //console.log(line);
                    tspan = tweetText.append("tspan")
                        .attr("x", 0)
                        //.attr("y", y)
                        .attr("dx", dx )
                        .attr("dy", dy );
                    //.append("text")
                    //.attr("fill", "green")

                    //.text("abc");
                }
            }
        });
    //.call(wrap, 300/* function(d) { console.log(d.r * 1/1400); return d.r * 1/1400; } */);
    //
    //.append("tspan")
    //.attr("x", 0)
    //.attr("y", y)
    //.attr("dy", 50)
    //.attr("dx", 50)
    //.text("lalala");

    var node = svgContainer.selectAll("circle");

    var tweetnode = svgContainer.selectAll(".tweet");

    var handlenode = svgContainer.selectAll(".handle");

    //var imagenode = svgContainer.selectAll("image");

    d3.select("body")
        .style("background-color", "white")
        .on("click", function() { zoom(root); });

    zoomTo([root.x, root.y, root.r * 2 + margin]);

    resetToRoot();

    function resetToRoot(transition)
    {
        /*console.log("RESETTING");
         //console.log(transition.selectAll(".node node--leaf"));
         console.log(d3.selectAll(".node"));
         //.filter(function(d) { return d.parent === focus || this.style.display === "inline" || d === focus; })
         d3.selectAll(".node").style("display", function(d) {  return "none"; })*/
    }


    //console.log(root);

    console.log(d3.selectAll("circle"));

    function zoom(d) {
        //console.log(d); //d is the circle you clicked on (zoom level)

        console.log("d");
        console.log(d);
        console.log("dparent");
        console.log(d.parent);
        console.log("focus");
        console.log(focus);
        console.log("focus0");
        console.log(focus0);

        if ((d.parent || d) === root)
        {
            var focus0 = focus; focus = d;

            var transition = d3.transition()
                .duration(d3.event.altKey ? 7500 : 750)
                .tween("zoom", function(d) {
                    var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                    return function(t) { zoomTo(i(t)); };
                });

            /* CONTROLS WHAT GETS SEEN AT WHAT ZOOM LEVEL*/
            /*transition.selectAll("circle")
             .filter(function(d) { return d.parent === focus || this.style.display === "inline" || d === focus; })
             .style("display", function(d) { return (d) ? "inline" : "none"; });
             // .style("stroke", function(d) {  return (d || d.parent) ? "green" : "red"; })
             .style("fill-opacity", function(d) { return (d.parent === focus) ? 1 : 0; })
             .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
             .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });*/




            transition.selectAll(".tweet, .handle, circle") //show objects at the level you are zoomed to
                //.filter(function(d) { return d.parent === focus })
                .style("display", function(d) { return (d.parent === focus) ? "inline" : "none"; });

            transition.selectAll("circle") //don't show leaves at first level influencers
                .style("display", function(d) {
                    if ((focus===root) && (d.parent != root))
                    {
                        return "none";
                    }  });

            transition.selectAll(".node--root")
                .style("display", "inline");
            //always show root
            /*transition.selectAll("circle") //don't show leaves at first level influencers
             .style("display", function(d) {
             if (d.parent)
             {
             return "inline";
             }
             return "none";
             });*/


            /*transition.selectAll("circle")
             .style("display", function(d) { return (d.parent === focus) ? "inline" : "none"; });*/

            /*transition.selectAll("circle")
             //.filter(function(d) { return d.parent === focus || this.style.display === "inline" || d === focus; })
             .style("display", function(d) {  return (d || d.parent) ? "inline" : "none"; })*/

            /*transition.selectAll("text, circle")
             //.filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
             .style("display", function(d) {  return (d.parent === focus || d === focus || d) ? "inline" : "none"; })
             .style("fill-opacity", function(d) { return (d.parent === focus) ? 1 : 0; })
             .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
             .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });*/


            //CODE ADAPTED FROM: Circle packing, zoomable circles, wrap function,

            if (focus===root) //OR focus0 != root
            {

                console.log(transition.selectAll(".node"));
                //resetToRoot(transition);
            }

        }


    }

    function zoomTo(v) {

        var k = diameter / v[2]; view = v;

        node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });

        tweetnode.attr("transform", function(d) {
            var tweetnode_x = d.x - v[0];
            var tweetnode_y = d.y - v[1];
            var tweetnode_r = d.r;
            return "translate(" + tweetnode_x * k + "," + (tweetnode_y - 0.35 * tweetnode_r) * k + ")"; });

        handlenode.attr("transform", function(d) {
            var handlenode_x = d.x - v[0];
            var handlenode_y = d.y - v[1];
            var handlenode_r = d.r;
            return "translate(" + handlenode_x * k + "," + (handlenode_y - 0.7 * handlenode_r) * k + ")"; });

        image.attr("width", function(d) { return d.r *k * 2; })
            .attr("height", function(d) { return d.r *k * 2; });

        circle.attr("r", function(d) { return d.r * k; });
    }

    //zoom(root);

});

d3.select(self.frameElement).style("height", diameter + "px");
