function isHamiltonian(vertices, edges, start, end) {
    if (edges[0] !== start) return false;
    if (edges[edges.length - 1] !== end) return false;
    for (var i = 0; i < edges.length; ++i) {
        var index = vertices.indexOf(edges[i]);
        if (index === -1) return false;
        vertices.splice(index, 1);
    }
    return vertices.length === 0;
}

function index_of_point(point, points){
    for(var i = 0 ; i < points.length ; ++i){
        if(point.key == points[i].key)
            return i;
    }
    return -1;
}

function isAdjacent(edges, here, there) {
    return edges[here][there] == 1;
}

function adjacentPoints(edges, points, here, dots) {
    var aa = [];
    points.forEach(function (point) {
        var point_idx = index_of_point(point, dots);
        var here_idx = index_of_point(here, dots);
        if (isAdjacent(edges, point_idx, here_idx)) {
            aa.push(point);
        }
    });
    return aa;
}

function isPossible(edges, points, path, end, dots) {
    var aa = [];
    points.forEach(function (point) {
        var test = path.some(function (v) {
            return point.key == v.key;
        });
        if (!test) {
            aa.push(point);
        }
    });
    return _isPossible(edges, aa, path[path.length - 1], end, dots);
}

function _isPossible(edges, points, start, end, dots) {
    if (points.length == 0) return start.key == end.key;
    var adjacent = adjacentPoints(edges, points, start, dots);
    return adjacent.some(function (v) {
        return isPossible(edges, points, [start, v], end, dots);
    });
}
