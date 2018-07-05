var StockChart;
(function (StockChart) {
    var Chart = (function () {
        function Chart(options) {
            this.canvas = document.getElementById(options.id);
            this.width = options.width || document.body.clientWidth;
            this.height = options.height;
            this.textOffsetY = options.textOffsetY || 2;
            this.figureOffsetY = options.figureOffsetY || 20;
            this.volumeHeight = options.volumeHeight || 5;
            this.axisTextHeight = options.axisTextHeight || 10;
            this.figureWidth = this.width;
            this.figureHeight = this.height - this.volumeHeight - this.axisTextHeight;
            this.figureOffsetHeight = this.figureHeight - this.figureOffsetY;
            this.grid = options.grid;
            this.font = options.font || '10px Helvetica';
            // 字体颜色
            this.textColor = options.textColor || 'rgba(0,0,0,1)';
            // this.textColor = options.textColor || 'rgba(138,138,138,1)';
            this.lineColor = options.lineColor || 'rgba(94,168,199,1)';
        }

        Chart.prototype.initContext = function () {
            var dpr = Math.max(window.devicePixelRatio || 1, 1);
            var ctx = this.canvas.getContext('2d');
            if (dpr !== 1) {
                ctx.scale(dpr, dpr);
            }
            this.ctx = ctx;
            this.dpr = dpr;
        };
        Chart.prototype.initialize = function () {
            this.initContext();
            this.canvas.style.width = this.width + 'px';
            this.canvas.style.height = this.height + 'px';
            this.canvas.width = this.width * this.dpr;
            this.canvas.height = this.height * this.dpr;
        };

        Chart.prototype.drawLine = function (line, needStroke) {
            if (needStroke === void 0) {
                needStroke = true;
            }
            var _a = this, ctx = _a.ctx, dpr = _a.dpr;
            ctx.strokeStyle = line.color;
            ctx.lineWidth = line.size * dpr || 0;
            ctx.moveTo(line.startPoint[0] * dpr, line.startPoint[1] * dpr);
            line.points.forEach(function (point) {
                ctx.lineTo(point[0] * dpr, point[1] * dpr);
            });
            if (needStroke) {
                ctx.stroke();
            }
        };
        Chart.prototype.drawDashedLine = function (p1, p2, size) {
            if (size === void 0) {
                size = 2;
            }
            var _a = this, ctx = _a.ctx, dpr = _a.dpr;
            var diffX = p2[0] - p1[0];
            var diffY = p2[1] - p1[1];
            var dashes = Math.floor(Math.sqrt(diffX * diffX + diffY * diffY) / size);
            var dashX = diffX / dashes;
            var dashY = diffY / dashes;
            var q = 0;
            ctx.moveTo(p1[0] * dpr, p1[1] * dpr);
            while (q++ < dashes) {
                p1[0] += dashX;
                p1[1] += dashY;
                ctx[q % 2 === 0 ? 'moveTo' : 'lineTo'](p1[0] * dpr, p1[1] * dpr);
            }
            ctx[q % 2 === 0 ? 'moveTo' : 'lineTo'](p2[0] * dpr, p2[1] * dpr);
        };
        Chart.prototype.drawText = function (text, point, textColor) {
            if (textColor === void 0) {
                textColor = this.textColor;
            }
            var _a = this, ctx = _a.ctx, dpr = _a.dpr;
            ctx.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function (matched, m1, m2) {
                return m1 * dpr + m2;
            });
            ctx.fillStyle = textColor;
            ctx.fillText(text, point[0] * dpr, point[1] * dpr);
        };
        Chart.prototype.drawRound = function (round) {
            var _a = this, ctx = _a.ctx, dpr = _a.dpr;
            ctx.beginPath();
            ctx.arc(round.point[0] * dpr, round.point[1] * dpr, round.radius * dpr, 0, 2 * Math.PI);
            ctx.closePath();
            if (round.isStroke) {
                ctx.strokeStyle = round.borderColor;
                ctx.stroke();
            }
            if (round.isFill) {
                ctx.fillStyle = round.fillColor;
                ctx.fill();
            }
        };

        return Chart;
    }());
    StockChart.Chart = Chart;
})(StockChart || (StockChart = {}));


var StockChart;
(function (StockChart) {
    function mixins(target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        var output = Object(target);
        for (var index = 0; index < sources.length; index++) {
            var source = sources[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    }

    StockChart.mixins = mixins;

    function arrayObjectIndexOf(array, property, expectedValue) {
        var len = array.length;
        for (var i = 0; i < len; i++) {
            if (array[i][property] === expectedValue) {
                return i;
            }
        }
        return -1;
    }

    StockChart.arrayObjectIndexOf = arrayObjectIndexOf;
})(StockChart || (StockChart = {}));


var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];

    function __() {
        this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var StockChart;
// k线图
(function (StockChart) {
    var Period;
    (function (Period) {
        Period[Period["Day"] = 0] = "Day";
        Period[Period["Week"] = 1] = "Week";
        Period[Period["Month"] = 2] = "Month";
    })(Period || (Period = {}));


    var MAColors;
    (function (MAColors) {
        MAColors[MAColors["MaPink"] = 0] = "MaPink";
        MAColors[MAColors["MaBlue"] = 1] = "MaBlue";
        MAColors[MAColors["MaRed"] = 2] = "MaRed";
        MAColors[MAColors["MaGreen"] = 3] = "MaGreen";
    })(MAColors || (MAColors = {}));

    var COLOR = {
        YELLOW: 'rgba(219,169,83,.5)',
        BLUE: 'rgba(99,179,243,.5)',
        PINK: 'rgba(223,140,201,.5)',
        GREEN: 'rgba(151,192,57,.5)',
        MAPINK: 'rgba(252,156,184,.8)',
        MABLUE: 'rgba(18,189,217,.8)',
        MARED: 'rgba(238,47,114,.8)',
        MAGREEN: 'rgba(140,187,13,.8)'
    };

    var KLine = (function (_super) {
        __extends(KLine, _super);

        function KLine(options) {
            _super.call(this, options);
            this.ohlcPrices = options.ohlcPrices;
            this.volumes = options.volumes;
            this.dates = options.dates;
            this.dataCount = options.dataCount;
            this.volumeTopHeight = this.height - this.volumeHeight + this.textOffsetY;
            this.unitX = this.figureWidth / this.dataCount;
            this.riseColor = options.riseColor;
            this.fallColor = options.fallColor;
            this.period = options.period;
            this.maLists = options.maLists;
        }

        KLine.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            //底层灰度网格
            this.drawGrid();
            // k线
            this.drawPriceBar();

            //ma线（必须有k线）
            this.drawMaLines();

            // // 交易量图
            // this.drawVolumeBar();

            //Y轴最大最小值
            this.drawAxisYText();
        };
        KLine.prototype.drawGrid = function () {
            var _a = this, ctx = _a.ctx, grid = _a.grid, height = _a.height, figureWidth = _a.figureWidth,
                figureHeight = _a.figureHeight, figureOffsetHeight = _a.figureOffsetHeight,
                figureOffsetY = _a.figureOffsetY, volumeTopHeight = _a.volumeTopHeight;
            ctx.beginPath();

            this.drawLine({
                color: grid.color,
                startPoint: [0, this.figureHeight],
                points: [[figureWidth, figureHeight]]
            });

            // 字体下面的线
            // this.drawLine({
            //     color: grid.color,
            //     startPoint: [0, volumeTopHeight],
            //     points: [[figureWidth, volumeTopHeight]]
            // }, false);

            // 最上面的线
            // this.drawLine({
            //     color: grid.color,
            //     startPoint: [0, 0],
            //     points: [[figureWidth, 0]]
            // }, false);

            // this.drawLine({
            //     color: grid.color,
            //     startPoint: [0, this.height],
            //     points: [[figureWidth, height]]
            // });

            var gridY = figureOffsetHeight / grid.y;
            for (var i = 0; i < grid.y; i++) {
                ctx.beginPath();
                this.drawLine({
                    color: grid.color,
                    startPoint: [0, gridY * i + figureOffsetY],
                    points: [[figureWidth, gridY * i + figureOffsetY]]
                });
            }
            this.drawGridX();
        };
        KLine.prototype.drawPriceBar = function () {
            var _a = this, ctx = _a.ctx, ohlcPrices = _a.ohlcPrices, dataCount = _a.dataCount,
                figureHeight = _a.figureHeight, figureOffsetHeight = _a.figureOffsetHeight;
            var len = ohlcPrices.length;
            var count = Math.min(len, dataCount);
            var highPrices = ohlcPrices.map(function (price) {
                return price.h;
            });
            var lowPrices = ohlcPrices.map(function (price) {
                return price.l;
            });
            var maxPrice = Math.max.apply(null, highPrices);
            var minPrice = Math.min.apply(null, lowPrices);
            var unitX = this.unitX;
            var unitY = this.unitY = (figureOffsetHeight - 10) / (maxPrice - minPrice);
            this.roofPrice = maxPrice;
            this.floorPrice = minPrice;
            var calcY = this.calcY = function (price) {
                return Math.round(figureHeight - Math.abs(price - minPrice) * unitY - 10);
            };
            for (var i = 0; i < count; i++) {
                var openPrice = ohlcPrices[i].o;
                var highPrice = ohlcPrices[i].h;
                var lowPrice = ohlcPrices[i].l;
                var closePrice = ohlcPrices[i].c;
                var barX = unitX * i + unitX / 2;
                var barColor = this.getBarColor(ohlcPrices, i);
                ctx.beginPath();
                this.drawLine({
                    color: barColor,
                    size: 1,
                    startPoint: [barX, calcY(highPrice)],
                    points: [[barX, calcY(lowPrice)]]
                });
                ctx.beginPath();
                if (calcY(openPrice) === calcY(closePrice)) {
                    this.drawLine({
                        color: barColor,
                        size: 1,
                        startPoint: [barX - 2, calcY(openPrice)],
                        points: [[barX + 2, calcY(closePrice)]]
                    });
                }
                else {
                    this.drawLine({
                        color: barColor,
                        // chenxu 需要调整，k线粗细
                        size: unitX*2/3,
                        startPoint: [barX, calcY(openPrice)],
                        points: [[barX, calcY(closePrice)]]
                    });
                }
            }
        };
        KLine.prototype.drawVolumeBar = function () {
            var _a = this, ctx = _a.ctx, volumes = _a.volumes, ohlcPrices = _a.ohlcPrices, dataCount = _a.dataCount,
                height = _a.height, volumeHeight = _a.volumeHeight, textOffsetY = _a.textOffsetY, unitX = _a.unitX;
            var len = volumes.length;
            var count = Math.min(len, dataCount);
            var maxVolume = Math.max.apply(null, volumes);
            var minVolume = Math.min.apply(null, volumes);
            if (maxVolume === minVolume) {
                minVolume = maxVolume - 1;
            }
            var volumeUnitY = (volumeHeight - textOffsetY) / (maxVolume - minVolume);
            var currentVolumeHeight;
            for (var i = 0; i < count; i++) {
                var barX = unitX * i + unitX / 2;
                currentVolumeHeight = Math.round(height - (volumes[i] - minVolume) * volumeUnitY);
                if (currentVolumeHeight === height) {
                    currentVolumeHeight = height - 1;
                }
                ctx.beginPath();
                this.drawLine({
                    color: this.getBarColor(ohlcPrices, i),
                    size: 4,
                    startPoint: [barX, height],
                    points: [[barX, currentVolumeHeight]]
                });
            }
        };
        KLine.prototype.drawMaLines = function () {
            var _this = this;
            var maLists = this.maLists;
            if (!maLists.length) {
                return;
            }
            maLists.forEach(function (maList) {
                _this.drawMaLine(maList);
            });
            this.drawMaLegend();
        };
        KLine.prototype.drawMaLine = function (maList) {
            var _a = this, ctx = _a.ctx, unitX = _a.unitX, calcY = _a.calcY, roofPrice = _a.roofPrice;
            var len = maList.prices.length;
            var count = Math.min(len, this.dataCount);
            var points;
            var maColor;
            if (count === 0) {
                return;
            }
            maColor = this.getMaColor(maList);
            points = maList.prices.map(function (price, index) {
                return [unitX * index+unitX/2, price > roofPrice ? NaN : calcY(price)];
            });
            ctx.beginPath();
            this.drawLine({
                color: maColor,
                size: 1,
                startPoint: points.splice(0, 1)[0],
                points: points
            });
        };
        KLine.prototype.getMaColor = function (maList) {
            var maColor;
            if (typeof maList.color === 'undefined') {
                var index = StockChart.arrayObjectIndexOf(this.maLists, 'title', maList.title);
                maColor = COLOR[MAColors[index].toUpperCase()];
            }
            else if (typeof maList.color === 'number') {
                maColor = COLOR[MAColors[maList.color].toUpperCase()];
            }
            else {
                maColor = maList.color.toString();
            }
            return maColor;
        };
        KLine.prototype.drawMaLegend = function () {
            var _a = this, ctx = _a.ctx, dpr = _a.dpr, maLists = _a.maLists, figureWidth = _a.figureWidth,
                figureOffsetY = _a.figureOffsetY;
            var len = maLists.length;
            var dot = {
                radius: 3,
                paddingLeft: 10,
                paddingRight: 3
            };
            var text;
            var textWidth;
            var prices;
            var lastPrice;
            for (var i = len - 1, textWidth_1 = 0; i >= 0; i--) {
                var title = maLists[i].title;
                ctx.font = this.font;
                prices = maLists[i].prices.filter(function (price) {
                    return Boolean(price);
                });
                if (!prices.length) {
                    continue;
                }
                lastPrice = prices[prices.length - 1];
                text = title + "  " + lastPrice;
                textWidth_1 += ctx.measureText(text).width;
                this.drawText(text, [figureWidth - textWidth_1, figureOffsetY - 5]);
                this.drawRound({
                    point: [figureWidth - textWidth_1 - dot.radius - dot.paddingRight, figureOffsetY - 5 - dot.radius],
                    radius: dot.radius,
                    isFill: true,
                    fillColor: this.getMaColor(maLists[i])
                });
                textWidth_1 += dot.radius * 2 + dot.paddingLeft + dot.paddingRight;
            }
        };
        KLine.prototype.drawAxisYText = function () {
            this.drawText(this.roofPrice.toFixed(2), [0, this.figureOffsetY - this.textOffsetY]);
            this.drawText(this.floorPrice.toFixed(2), [0, this.figureHeight - this.textOffsetY]);
        };
        KLine.prototype.drawGridX = function () {
            var _this = this;
            var _a = this, ctx = _a.ctx, dataCount = _a.dataCount, period = _a.period;
            var dates = this.dates;
            var len = dates.length;
            var count = Math.min(len, dataCount);
            if (count <= 2) {
                return;
            }
            ctx.beginPath();
            switch (Period[period]) {
                case 'Week':
                    var uniqDates = [];
                    var weekDates = [];
                    for (var i = 2; i < count - 2; i++) {
                        if (dates[i] !== dates[i - 1]) {
                            uniqDates.push({
                                text: dates[i],
                                index: i
                            });
                        }
                    }
                    weekDates = uniqDates.filter(function (date, index) {
                        return !(index % 3);
                    });
                    if (!weekDates.length) {
                        return;
                    }
                    weekDates.forEach(function (date) {
                        _this.drawGridTextX(date.text, date.index);
                    });
                    break;
                case 'Month':
                    var monthDates = [];
                    dates = dates.map(function (date) {
                        return date.split('-')[0];
                    });
                    for (var i = 2; i < count - 2; i++) {
                        if (dates[i] !== dates[i - 1]) {
                            monthDates.push({
                                text: dates[i],
                                index: i
                            });
                        }
                    }
                    monthDates.forEach(function (date) {
                        _this.drawGridTextX(date.text, date.index);
                    });
                    break;
                default:
                    var dayDates = [];
                    for (var i = 2; i < count - 2; i++) {
                        if (dates[i] !== dates[i - 1]) {
                            dayDates.push({
                                text: dates[i],
                                index: i
                            });
                        }
                    }
                    for (var j = 1; j < dayDates.length; j++) {
                        if (dayDates[j].index - dayDates[j - 1].index < 7) {
                            dayDates.splice(j, 1);
                        }
                    }
                    dayDates.forEach(function (date) {
                        _this.drawGridTextX(date.text, date.index);
                    });
                    break;
            }
        };
        KLine.prototype.drawGridTextX = function (date, index) {
            var _a = this, grid = _a.grid, dataCount = _a.dataCount, height = _a.height, volumeHeight = _a.volumeHeight,
                figureWidth = _a.figureWidth, figureHeight = _a.figureHeight, figureOffsetY = _a.figureOffsetY;
            var unitX = figureWidth / dataCount;
            var axisY = height - volumeHeight;
            var barX = unitX * index + unitX / 2;
            this.drawText(date, [unitX * index - 15, axisY]);
            this.drawLine({
                color: grid.color,
                startPoint: [barX, figureOffsetY],
                points: [[barX, figureHeight]]
            });
        };
        KLine.prototype.getBarColor = function (bars, index) {
            var _a = this, riseColor = _a.riseColor, fallColor = _a.fallColor;
            var openPrice = bars[index].o;
            var closePrice = bars[index].c;
            if (closePrice > openPrice) {
                return riseColor;
            }
            else if (closePrice < openPrice) {
                return fallColor;
            }
            else {
                if (index === 0) {
                    return 'black';
                }
                else {
                    var preClosePrice = bars[index - 1].c;
                    return closePrice > preClosePrice ? riseColor : fallColor;
                }
            }
        };
        return KLine;
    }(StockChart.Chart));


    function drawKLine(options) {
        var defaultOptions = {
            dataCount: 50,
            grid: {
                y: 4,
                color: 'rgba(221,221,221,1)'
            },
            lineColor: 'rgba(94,168,199,1)',
            volumeColor: 'rgba(130,152,200,1)',
            riseColor: 'rgba(252,63,29,1)',
            fallColor: 'rgba(85,170,48,1)',
            period: 0
        };
        options = StockChart.mixins({}, defaultOptions, options);
        var kLine = new KLine(options);
        kLine.initialize();
    }

    StockChart.drawKLine = drawKLine;

})(StockChart || (StockChart = {}));


var StockChart;
(function (StockChart) {
    function mouseListen() {
        
    }
    StockChart.mouseListen = mouseListen;
})(StockChart || (StockChart = {}));
