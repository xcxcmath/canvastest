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

//Command Group
var commands = new Array();
//commands.push(new command('C', 100, 110, 'A'));
commands.push(new command('→', 100, 160, 'A'));
commands.push(new command('➹', 100, 210, 'A'));
//commands.push(new command('C', 700, 110, 'B'));
commands.push(new command('→', 700, 160, 'B'));
commands.push(new command('➹', 700, 210, 'B'));

//Game status manager
var stat = new gamestatus(4);

//Cursor Manager
var cursor = new cursormanager();

//Draw
var logo_delta = 0;
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    //Logo
    context.beginPath();
    context.fillStyle = '#225';
    context.arc(canvas.width*0.3, canvas.height*0.6, canvas.width/4, 0, Math.PI*2);
    context.fill();
    context.font = '50px Arial';
    context.fillStyle = backcolor;
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.fillText("Project", canvas.width*0.3 - canvas.width/5, canvas.height*0.6 - 25, canvas.width*0.4);
    context.fillText("Hamiltonian", canvas.width*0.3 - canvas.width/5, canvas.height*0.6 + 25, canvas.width*0.4);
    context.beginPath();
    context.strokeStyle = '#225'
    context.lineWidth = 5;
    context.arc(canvas.width*0.3, canvas.height*0.6, canvas.width/4 + 10, logo_delta, logo_delta+16/9*Math.PI);
    context.stroke();
    //
    for(var i = 0 ; i < edges.length; ++i)
    {
        edges[i].draw();
    }
    stat.draw_1();
    for(var i = 0;i < dots.length ; ++i)
    {
        dots[i].draw();
    }
    stat.draw_2();
    for(var i = 0 ; i < commands.length ; ++i){
        commands[i].draw();
    }
    cursor.draw(stat.clickable);
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
    logo_delta += 0.001;
    if(logo_delta > Math.PI*2) logo_delta -= Math.PI*2;
}

//Implements
setup();
setInterval(loop, 5);