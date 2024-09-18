(function() {
    'use strict';

    angular
        .module('elixibilitasApp')
        .directive('upTimeChart', upTimeChart);

        function upTimeChart (){
            var directive = {
                scope : {
                    dataset : "@",
                },
                link : link,
                restrict : 'EA'
            }
            return directive;

            function link (scope, element, attrs){

                // scope.$watch('dataset', function(newData, oldData) {
                //     if(newData){

                        var data = JSON.parse(scope.dataset);
                        // set the dimensions and margins of the graph
                        var margin = {top: 20, right: 20, bottom: 50, left: 70};
                        var width = 400;
                        var height = 200 - margin.top - margin.bottom;

                        // parse the date / time
                        // var parseTime = d3.utcParse("%d-%m-%Y");
                        var parseTime = d3.utcParse("%Y-%m-%d");
                        // var parsed3.time.format("%d-%b-%y").parse;

                        // set the ranges
                        var x = d3.scaleTime().range([0, width]);
                        var y = d3.scaleLinear().range([height, 0]);

                        // define the line
                        var valueline = d3.line()
                            .x(function(d) { return x(d.date); })
                            .y(function(d) { return y(d.status); });

                        // append the svg obgect to the body of the page
                        // appends a 'group' element to 'svg'
                        // moves the 'group' element to the top left margin
                        var svg = d3.select(element[0])
                        .append("svg")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                          .append("g")
                            .attr("transform",
                                  "translate(" + margin.left + "," + margin.top + ")");
                        data.forEach(function(d) {
                            d.date = parseTime(d.date);
                        })
                        // Get the data
                        x.domain(d3.extent(data, function(d) { return d.date; }));
                        y.domain([0, d3.max(data, function(d) { return d.status; })]);

                        // Add the valueline path.
                        svg.append("path")
                          .data([data])
                          .attr("class", "line")
                          .attr("d", valueline);

                        // Add the x Axis
                        svg.append("g")
                          .attr("transform", "translate(0," + height + ")")
                          .call(d3.axisBottom(x).ticks(data.length).tickFormat(data.date));

                        // text label for the x axis
                        svg.append("text")
                          .attr("transform",
                                "translate(" + (width/2) + " ," +
                                               (height + margin.top + 20) + ")")
                          .style("text-anchor", "middle")
                          .text("Date");

                        // Add the y Axis
                        svg.append("g")
                          .call(d3.axisLeft(y).ticks(1).tickFormat(function(d){ return d==1 ? "online" : "offline"}));

                        // text label for the y axis
                        svg.append("text")
                          .attr("transform", "rotate(-90)")
                          .attr("y", 0 - margin.left)
                          .attr("x",0 - (height / 2))
                          .attr("dy", "1em")
                          .style("text-anchor", "middle")
                          .text("status");

                //     }
                // }, true);



            }

        }

})();
