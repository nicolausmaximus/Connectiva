var spData = null;
var counter=0;
function doData(json) {
    spData = json.feed.entry;
}

function drawCell(tr, val) {
    var td = $("<td/>");
        counter++;
        tr.append(td);
        td.append(counter+"."+val);
        return td;
    
}
function drawRow(table, rowData) {
    if (rowData == null) return null;
    if (rowData.length == 0) return null;
    var tr = $("<tr/>");
    table.append(tr);
    for(var c=1; c<rowData.length; c++) {
        console.log(sessionStorage["xyz"]);
        if(rowData[0]==sessionStorage["xyz"])
        drawCell(tr, rowData[c]);
    }
    return tr;
}

function drawTable(parent) {
    var table = $("<table/>");
    parent.append(table);
    return table;
}

function readData(parent) {
    var data = spData;
    var table = drawTable(parent);
    var rowData = [];
    
    for(var r=0; r<data.length; r++) {
        var cell = data[r]["gs$cell"];
        var val = cell["$t"];
        if (cell.col == 1) {
            drawRow(table, rowData);
            rowData = [];
        }
        rowData.push(val);
    }
    drawRow(table, rowData);
}

