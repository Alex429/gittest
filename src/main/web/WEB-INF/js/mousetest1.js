var canvas = document.querySelector('#canvas'),
    readout = document.querySelector('#readout'),
    context = canvas.getContext('2d')
spritesheet = new Image();

//将相对于窗口的鼠标坐标转换为canvas坐标
function windowToCanvas(canvas, x, y) {
    /**
     在canvas对象上调用getBoundingClientRect()方法，
     来获取canvas元素的边界框，
     该边界框的坐标是相对于整个窗口的。
     然后返回一个对象，该对象的x、y属性分别对应于鼠标在canvas之中的坐标
     **/
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}


function drawBackground() {
    var VERTICAL_LINE_SPACING = 12;
    i = context.canvas.height;
    //清空画布
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'lightgray';
    context.lineWidth = 0.5;

    //从左上角开始画横线 横线见的间隔由VERTICAL_LINE_SPACING指定
    while (i > VERTICAL_LINE_SPACING * 4) {

        context.beginPath();
        context.moveTo(0, i);//横线的起始坐标
        context.lineTo(context.canvas.width, i);//结束坐标
        context.stroke();
        i -= VERTICAL_LINE_SPACING;
    }
}

spritesheet.src = 'http://ws-www.hantinghotels.com/hworld/NewWeb/img/activity3.jpg';

function drawSpritesheet() {
    //从画布的左上角开始绘制图像
    context.drawImage(spritesheet, 0, 0);
}

function drawGuidelines(x, y) {
    context.strokeStyle = 'rgba(0,0,230,0.8)';
    context.linewidth = 0.5;
    drawVerticalLine(x);
    drawHorizontalLine(y);
}


function updateReadout(x, y) {
    readout.innerHTML = '(' + x.toFixed(0) + ',' + y.toFixed(0) + ')';
}


function drawHorizontalLine(y) {
    context.beginPath();
    context.moveTo(0, y + 0.5);
    context.lineTo(context.canvas.width, y + 0.5);
    context.stroke();
}

function drawVerticalLine(x) {
    context.beginPath();
    context.moveTo(x + 0.5, 0);
    context.lineTo(x + 0.5, context.canvas.height);
    context.stroke();
}

//监听鼠标移动事件
canvas.onmousemove = function (e) {
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    console.log('x=' + e.clientX + ' y=' + e.clientY);
    //绘制背景
    drawBackground();
    //绘制图像
    drawSpritesheet();
    //绘制横线和竖线
    drawGuidelines(loc.x, loc.y);
    //更新坐标label
    updateReadout(loc.x, loc.y);
}

//监听图像加载事件
spritesheet.onload = function (e) {
    drawSpritesheet();
}




function drawKLine1(options) {
    var maxwhdth = document.getElementById("tkChart_wwygb_jmei").clientWidth;
    var maxheight = document.getElementById("tkChart_wwygb_jmei").offsetHeight;
    var c = document.getElementById("kLine");
    c.width = maxwhdth;
    c.height = maxheight;

    var ctx = c.getContext("2d");

    //字体颜色
    ctx.strokeStyle = 'rgba(138,138,138,1)';
    //设置线条宽度,默认为1px
    ctx.lineWidth = 0.2;

    var xlinenum = 13;
    var ylinenum = 8;

    ctx.moveTo(0, 0);
    ctx.lineTo(maxwhdth, maxheight);
    ctx.stroke();


    for (var i = 1; i < xlinenum; i++) {
        ctx.moveTo(maxwhdth / xlinenum * i, 0);
        ctx.lineTo(maxwhdth / xlinenum * i, maxheight);
        ctx.stroke();
    }

    for (var j = 0; j <= ylinenum; j++) {
        ctx.moveTo(0, maxheight / ylinenum * j);
        ctx.lineTo(maxwhdth, maxheight / ylinenum * j);
        ctx.stroke();

    }
}
StockChart.drawKLine1 = drawKLine1;