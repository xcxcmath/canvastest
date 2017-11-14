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
