/*
* @project: NetworkGraph
* @file: index.js
* @author: dangzhiteng
* @email: 642212607@qq.com
* @date: 2019.5.14
*/
var NETWORKCONFIG = {
    "layout_style": 0,       // 0: 力引导布局, 1: 圆布局, 2: 树布局
    "calculate_state": true, // 是否正在计算
    "analyse_mode": false,   // 分析模式
    "gravitation": 0.5,      // 吸引力
    "repulsion": -300,       // 排斥力
    "node_size": 15,         // 节点大小
    "node_color": "black",   // 节点颜色
    "node_opacity": "1",     // 节点透明度
    "link_width": 1,         // 边宽度
    "link_color": "#00FFFB", // 连线颜色
    "link_type": "slink",   // slink: 直线, curve: 曲线, hlink: 横直线, vlink: 竖直线
};

var BARCONFIG = {  
	"width": 400,
	"height": 300,
	"top": 20, 
	"bottom": 70, 
	"left": 20, 
	"right": 20,
}

var container = d3.select("#container");

var bar_graph = d3.select("#bar-graph")
        .attr("width", BARCONFIG.width)
        .attr("height", BARCONFIG.height)
        .style("opacity", 0);

var brush_svg = container.append("g")
        .attr("class", "brush-svg")
        .style("display", "none");

var network_graph = d3.select("#network-graph");

var defs_layout = network_graph.append("defs");

var temp_layout = network_graph.append("g")
        .attr("class", "temp-layout");

var link_layout = network_graph.append("g")
        .attr("class", "link-layout");

var text_layout = network_graph.append("g")
        .attr("class", "text-layout");

var node_layout = network_graph.append("g")
        .attr("class", "node-layout");

// 箭头
var marker = network_graph.append("marker")
    .attr("id", "resolved")
    .attr("markerUnits", "userSpaceOnUse")
    .attr("viewBox", "0 -5 10 10")//坐标系的区域
    .attr("refX", NETWORKCONFIG.node_size + 7)//箭头坐标
    .attr("refY", 0)
    .attr("markerWidth", 18)//标识的大小
    .attr("markerHeight", 12)
    .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
    .attr("stroke-width", 2)//箭头宽度
    .append("path")
    .attr("class", "link")
    .attr("d", "M2,0 L0,-3 L9,0 L0,3 L2,0") //箭头的路径 
    .style("fill", "#00FFFB");

// 颜色比例尺
var color = d3.scaleOrdinal(d3.schemeCategory10);

// 初始化配色条
var color_bar = d3.select("#color-bar");
for (var i = 0; i <= 1; i += 0.01) {
    color_bar.append("div")
        .attr("class", "color-item")
        .style("background-color", d3.interpolateSinebow(i));
}