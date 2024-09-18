function Chart(){
    this.type;
    this.label;
    this.data ;
    this.series;
    this.color;
    this.options;

    this.construct = function (type,label,data,series,color,options){
        this.setType(type);
        this.setLabel(label);
        this.setData(data);
        this.setSeries(series);
        this.setColor(color);
        this.setOptions(options);
    }

        this.setType = function (type){this.type = type;}
        this.setLabel = function (label){this.label = label;}
        this.setData = function (data){this.data = data;}
        this.setSeries = function (series){this.series = series;}
        this.setColor = function (color){this.color = color;}
        this.setOptions = function (options){this.options = options;}

        this.getType = function (){return this.type;}
        this.getLabel = function (){return this.label;}
        this.getData = function (){return this.data;}
        this.getSeries = function (){return this.series;}
        this.getColor = function (){return this.color;}
        this.getOptions = function (){return this.options;}
}
