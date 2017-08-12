/**
 * Created by rockstar645 on 8/10/17.
 */

function snowfall() {
    createSnow();
    d3.selectAll('circle').transition()
        .duration('12000')
        .attr('cy', function(d,i){
            return parseInt(d3.select(this).attr('cy')) + 800;
        })
        .attr('cx',function(d,i){
            return parseInt(d3.select(this).attr('cx')) + 50;
        });
}

function rainFall() {
    createRain();
    d3.selectAll('rect').transition()
        .duration('12000')
        .attr('y', function(d,i){
            return parseInt(d3.select(this).attr('y')) + 800;
        })
        .attr('x',function(d,i){
            return parseInt(d3.select(this).attr('x')) + 50;
        });
}

function createSnow(){

    pageWidth = document.documentElement.clientWidth;

    data = generate();
    svg = d3.select('svg');

    svg.selectAll('circle')
        .data(data)
        .enter().append('circle')
        .attr('cy', function(){
            return (Math.random() *800)
        })
        .attr('cx', function(d){
            return (Math.random() * pageWidth)
        })
        .attr('r',function(d){
            return d;
        })
        .style('fill','white');

}

function createRain(){

        pageWidth = document.documentElement.clientWidth;

        data = generate();
        svg = d3.select('svg');

        svg.selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr('y', function(){
                return (Math.random() *800)
            })
            .attr('x', function(d){
                return (Math.random() * pageWidth)
            })
            .attr('width',function(d){
                return d/4.47;
            })
            .attr('height',function(d){
                return d+20;
            })
            .style('fill','white');



}

function generate(){
    smallSnow = [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8];
    mediumSnow = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];
    largeSnow = [12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12];
    data = [];
    for(i=0;i<4;i++){
        data.push.apply(data,smallSnow);
        data.push.apply(data,mediumSnow);
        data.push.apply(data,largeSnow);
    }
    return data
}


$(document).ready(function(){
    rainFall();
    snowFall();
    // d3.selectAll('circle').remove();
});
