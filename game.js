//Sound
var sounds = new soundmanager();

//Vertex Group
var dots = new Array();
dots.push(new vertex("A", 100, 300, colors['A']));
dots.push(new vertex("1", 200, 300));
dots.push(new vertex("2", 300, 200));
dots.push(new vertex("3", 300, 400));
dots.push(new vertex("4", 400, 100));
dots.push(new vertex("5", 400, 300));
dots.push(new vertex("6", 400, 500));
dots.push(new vertex("7", 500, 200));
dots.push(new vertex("8", 500, 400));
dots.push(new vertex("9", 600, 300));
dots.push(new vertex("B", 700, 300, colors['B']));

//Edge Group
var edge_info = [
    //    A  1  2  3  4  5  6  7  8  9  B
    /*A*/[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*1*/[1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    /*2*/[0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    /*3*/[0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0],
    /*4*/[0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    /*5*/[0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
    /*6*/[0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    /*7*/[0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0],
    /*8*/[0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    /*9*/[0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    /*B*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
];
var edges = new Array();
for(var i = 0 ; i < 10 ; ++i)
{
    for(var j = i+1 ; j << 11 ; ++j)
    {
        if(edge_info[i][j] == 1){
            edges.push(new edge(dots[i], dots[j]));
        }
    }
}

//Game status manager
var stat = new gamestatus();

//Cursor Manager
var cursor = new cursormanager();

//Draw

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0 ; i < edges.length; ++i)
    {
        edges[i].draw();
    }
    stat.draw();
    for(var i = 0;i < 11 ; ++i)
    {
        dots[i].draw();
    }
    cursor.draw(stat.clickable);
    //cursor.draw(dots);
}

//Main Functions (like Arduino)

function setup(){
    canvas.addEventListener('mousemove', function(evt){
        cursor.updateCursor(evt);
    });
    canvas.addEventListener('mousedown', function(evt){
        cursor.onClick(evt);
    });
}

function loop(){
    draw();
    //updating code
    cursor.update();
    stat.update();
}

//Implements
setup();
setInterval(loop, 5);