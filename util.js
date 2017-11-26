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

function isAdjacent(here, there) {
    return edge_info[here][there] === 1;
}

function adjacentPoints(points, here) {
    var aa = [];
    points.forEach(function (point) {
        if (isAdjacent(point, here)) {
            aa.push(point);
        }
    });
    return aa;
}

function isPossible(points, path, end) {
    var aa = [];
    points.forEach(function (point) {
        var test = path.some(function (v) {
            return point === v;
        });
        if (!test) {
            aa.push(point);
        }
    });
    return _isPossible(aa, path[path.length - 1], end);
}

function _isPossible(points, start, end) {
    if (points.length === 0) return start === end;
    var adjacent = adjacentPoints(points, start);
    return adjacent.some(function (v) {
        return isPossible(points, [start, v], end);
    });
}
