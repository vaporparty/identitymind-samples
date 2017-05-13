/*
 * Copyright (c) 2017. IDM Global Inc.  All Rights Reserved.
 */

/**
 * Created by kieran on 2/27/17.
 */


function setEdgeStroke(context, edge) {
  context.lineWidth = edge.size;
  if (edge.visible === undefined || edge.visible) {
    if (edge.relationshipType === 'k')
      context.strokeStyle = 'rgba(0, 0, 0, 0.76)';
    else if (edge.relationshipType === 'p')
      context.strokeStyle = 'rgba(0, 107, 82, 0.59)';
    else if (edge.relationshipType === 'd')  // transfer dst
      context.strokeStyle = 'rgba(46, 138, 138, 1)';
    else if (edge.relationshipType === 't')  // transfer src
      context.strokeStyle = 'rgba(255,0,255,0.3';
    else if (edge.relationshipType === 'l')
      context.strokeStyle = 'rgba(98, 0, 255, 0.51)';
    else if (edge.relationshipType === 'b')
      context.strokeStyle = 'rgba(0, 43, 255, 0.53)';
    else if (edge.relationshipType === 's')
      context.strokeStyle = 'rgba(58, 211, 228, 0.63)';
    else
    // bugs
      context.strokeStyle = 'lightgrey';
  } else {
    context.strokeStyle = '#eee';
  }
}



/**
 * Node border is based on whether it has tags and tag value
 */
function setNodeStroke(context, node, size) {
  if (node.visible === undefined || node.visible) {
    context.lineWidth = 1;
    context.strokeStyle = 'lightgrey';
    if (node.tags && node.tags.length > 0) {
      context.strokeStyle = 'black';
      context.lineWidth = 3;

      //
      // specific color based on tag
      // Most important first
      //
      if (node.tags.indexOf('Sanctioned') > -1 || node.tags.indexOf('Blacklisted') > -1)
        context.strokeStyle = 'red';
      else if (node.tags.indexOf('Merchant') > -1)
        context.strokeStyle = 'blue';
      else if (node.tags.indexOf('DropShipper') > -1)
        context.strokeStyle = 'green';
    }
  } else {
    context.fillStyle = '#eee';
  }
}


function setNodeStyle(context, node, size) {
  if (node.visible === undefined || node.visible)
    context.fillStyle = getNodeColor(node.trust, node.seenAtMerchant);
  else
    context.fillStyle = '#eee';
  setNodeStroke(context, node, size);
}

/**
 * color is based on reputation
 * opacity on whether current merchant has seen it
 */
function getNodeColor(trust, seenAtMerchant) {
    if (trust === 'UNKNOWN') {
        if (seenAtMerchant)
            return 'rgba(245, 242, 13, 1    )';
        else
            return 'rgba(245, 242, 13, 0.8)';
    } else if (trust === 'BAD') {
        if (seenAtMerchant)
            return 'rgba(198, 9, 9, 1)';
        else
            return 'rgba(198, 9, 9, 0.3)';
    }
    else if (trust === 'SUSPICIOUS') {
        if (seenAtMerchant)
            return 'rgba(240, 160, 0, 1)';
        else
            return 'rgba(240, 160, 0, 0.3)';
    }
    else if (trust === 'GOOD')  {
        if (seenAtMerchant)
            return 'rgba(5, 221, 172, 1)';
        else
            return 'rgba(5, 221, 172, 0.3)';
    }
    else if (trust === 'VERY_GOOD') {
        if (seenAtMerchant)
            return 'rgba(102, 187, 6, 1)';
        else
            return 'rgba(102, 187, 6, 0.3)';
    }
}



function drawShape(context, size, numberOfSides, XCenter, YCenter, doFill) {
    context.beginPath();
    context.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

    for (var i = 1; i <= numberOfSides; i += 1) {
        context.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
    }
    if (doFill)
        context.fill();
    context.stroke();
    context.closePath();
}


function tagelement(action, imid) {

    var tag = document.getElementById('tagvalue').value;
    console.log("tagging", action, imid, tag);

    var xhr = sigma.utils.xhr();
    if (!xhr)
      throw 'XMLHttpRequest not supported, cannot load the file.';

    var url = getBaseURL() + "jax/entitytag/" + action + "/" + imid + "/" + tag;
    console.log(url);

    xhr.open('POST', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status != 200) {
                console.log(xhr, xhr.status, xhr.statusText, xhr.response);
                alert("tagging: " + xhr.statusText + ": " + xhr.response);
                return;
            }
            console.log(xhr.responseText);
            loadEntity(imid, '', 'entityContainer');
        }
    };
    xhr.send();
}



function searchGraph(term, zoom) {

    console.log("Searching for", term);
    var foundCount = 0;
    var foundNode;
    gg.graph.nodes().forEach(function(n) {
        if(n.id==term || n.typeString==term || (n.label && n.label.indexOf(term) > -1) || (n.tags && n.tags.indexOf(term) > -1)) {
            n.originalSize = n.size;   // save so we can restore later
            n.selectedNode = true;
           // n.size = 5;
            foundNode = n;
            foundCount++;
        }
    });
    console.log("found", foundCount);
    if (foundCount > 0)
        gg.refresh();  // refresh redraws to update properties
    else if (foundCount == 0)
        setTimeout(function() { alert("Did not find entity"); }, 1000);

    if (foundCount == 1 && zoom) {
        gg.cameras[0].goTo({x:foundNode['read_cam0:x'],y:foundNode['read_cam0:y'],ratio:0.725});
    }
}


function resetGraph() {
    console.log("reset graph");
    var foundCount = 0;
    gg.graph.nodes().forEach(function(n) {
        if (n.originalSize) {
            n.size = n.originalSize;
        }
        n.selectedNode = false;
    });
    gg.refresh();
}


function getBaseURL() {
    var location = window.location;
    return location.protocol + '//' + location.host + '/im/admin/';
}

/**
 * Load the details for a specified entity
 * @param  {string} imid the identifier for the entity to be loaded
 * @param  {string} entityElementId the target element for the entity data
 */
function loadEntity(imid, label, entityElementId) {
    document.getElementById(entityElementId).innerHTML = "";
    document.getElementById(entityElementId).appendChild(document.createElement('pre')).innerHTML = imid;

    console.log("Load entity ", imid);

    var xhr = sigma.utils.xhr();
    if (!xhr)
      throw 'XMLHttpRequest not supported, cannot load the file.';

    var url = getBaseURL() + "entitygraph/v2/entity/" + imid;
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status != 200) {
                console.log(xhr, xhr.status, xhr.statusText, xhr.response);
                alert("entity load: " + xhr.statusText + ": " + xhr.response);
                return;
            }
            var entityData = JSON.parse(xhr.responseText);
            document.getElementById(entityElementId).innerHTML = "";
            document.getElementById(entityElementId).appendChild(document.createElement('pre')).innerHTML =
                '<div class="entity-data-table">' +
                    '    <table>' +
                   '      <tr><th align="left">' + label + '</th> <td></td></tr>' +
                   '      <tr><th align="left">Entity Id</th> <td>' + imid + '</td></tr>' +
                   '      <tr><th align="left">Reputation</th> <td>' + entityData.trustScore.rating + '</td></tr>' +
                   '      <tr><th align="left">Entity Tags</th> <td>' + (entityData.tags === undefined ? "" : entityData.tags) + '</td></tr>' +
                   '    </table>' +
                '<\div><br>';

            document.getElementById(entityElementId).appendChild(document.createElement('pre')).innerHTML = JSON.stringify(entityData, null, 2);
            if (globalAdminLoggedIn) {
                document.getElementById(entityElementId).appendChild(document.createElement('div')).innerHTML = '    <form action="" name="taggingform" class="taggingform">'
                                                                                                                + '        <label for="tagvalue">tag</label><input type="text" name="imid" id="tagvalue"><br>'
                                                                                                                + '        <input type="button" value="Add" id="addtag" onclick="tagelement(\'add\',\'' + imid + '\')"/>'
                                                                                                                + '        <input type="button" value="Remove" id="removetag" onclick="tagelement(\'remove\',\'' + imid + '\')"/>'
                                                                                                                + '    </form>';
            }
        }
    };
    xhr.send();
}



/**
 * Base method from sigma.parsers.json.   Extended to support basic auth and
 * to pass the metrics object to the callback.
 *
 * This function loads a JSON file and creates a new sigma instance or
 * updates the graph of a given instance. It is possible to give a callback
 * that will be executed at the end of the process.
 *
 * @param  {string}       url      The URL of the JSON file.
 * @param  {object}       config      A sigma configuration object.
 * @param  {?function}    callback Eventually a callback to execute after
 *                                 having parsed the file. It will be called
 *                                 with the related sigma instance as
 *                                 parameter.
 */
function loadEntityGraphJSON(url, config, callback) {
    var graph,
            xhr = sigma.utils.xhr();

    if (!xhr)
        throw 'XMLHttpRequest not supported, cannot load the file.';

    xhr.open('GET', url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status != 200) {
                console.log(xhr, xhr.status, xhr.statusText, xhr.response);
                alert("graph load: " + xhr.statusText + ": " + xhr.response);
                return;
            }
            graph = JSON.parse(xhr.responseText);
            config.graph = graph;
            sigmaCanvas = new sigma(config);

            // whether to enable global admin features.  The API will authenticate before performing any actions!
            globalAdminLoggedIn = graph.globalAdmin;

            // Call the callback if specified:
            if (callback)
                callback(sigmaCanvas, graph);
        }
    };
    xhr.send();
}


function hideNonNeighbours(nn, g) {
  var nodeId = nn.data.node.id,
    toKeep = g.graph.neighborhood(nodeId);
  var keepNodeIds = new Set();
  toKeep.nodes.forEach(function(n) {
    keepNodeIds.add(n.id);
  });
  g.graph.nodes().forEach(function(n) {
    n.visible = keepNodeIds.has(n.id);
  });

  g.graph.edges().forEach(function(e) {
    e.visible = keepNodeIds.has(e.source) && keepNodeIds.has(e.target);
  });

  g.refresh()
}

function allUnhidden(nn, g) {
  g.graph.nodes().forEach(function(n) {
    n.visible = true;
  });

  g.graph.edges().forEach(function(e) {
    e.visible = true;
  });

  g.refresh()
  
}


/*
   Payment renderer
   */
  sigma.canvas.nodes.p = function(node, context, settings) {
      var prefix = settings('prefix') || '',
              size = node[prefix + 'size'];

      setNodeStyle(context, node, size);
      context.beginPath();
      context.arc(node[prefix + 'x'], node[prefix + 'y'], size, 2* Math.PI, false);
      context.fill();
      context.stroke();
      context.closePath();

      // is it selected?
      if (node.selectedNode) {
          context.lineWidth = highlightStrokeWidth;
          context.strokeStyle = highlightColor;
          context.beginPath();
          context.arc(node[prefix + 'x'], node[prefix + 'y'], size * 3, 2* Math.PI, false);
          context.stroke();
          context.closePath();
      }
  };
  /*
   UAI renderer
   */
  sigma.canvas.nodes.u = function(node, context, settings) {
      var prefix = settings('prefix') || '',
              size = node[prefix + 'size'];

      setNodeStyle(context, node, size);
      context.beginPath();
      context.rect(
              node[prefix + 'x'] - size,
              node[prefix + 'y'] - size,
              size * 2,
              size * 2
      );
      context.fill();
      context.stroke();
      context.closePath();


      // is it selected?
      if (node.selectedNode) {
          context.beginPath();
          context.lineWidth = highlightStrokeWidth;
          context.strokeStyle = highlightColor;
          size = size * 2;
          context.rect(
                  node[prefix + 'x'] - size,
                  node[prefix + 'y'] - size,
                  size * 2,
                  size * 2
          );
          context.stroke();
          context.closePath();
      }

  };
  /*
   Device renderer
   */
  sigma.canvas.nodes.d = function(node, context, settings) {
      var prefix = settings('prefix') || '', size = node[prefix + 'size'];
      setNodeStyle(context, node, size);

      Xcenter = node[prefix + 'x'];
      Ycenter = node[prefix + 'y'];
      numberOfSides = 3;
      drawShape(context, size, numberOfSides, Xcenter, Ycenter, true);
      // is it selected?
      if (node.selectedNode) {
          context.lineWidth = highlightStrokeWidth;
          context.strokeStyle = highlightColor;
          drawShape(context, size * 3, numberOfSides, Xcenter, Ycenter, false);
      }
  };
  /*
   Address renderer
   */
  sigma.canvas.nodes.a = function(node, context, settings) {
      var prefix = settings('prefix') || '',
              size = node[prefix + 'size'];

      setNodeStyle(context, node, size);

      //
      // hexagon
      //
      Xcenter = node[prefix + 'x'];
      Ycenter = node[prefix + 'y'];
      numberOfSides = 6;
      drawShape(context, size, numberOfSides, Xcenter, Ycenter, true);

      // is it selected?
      if (node.selectedNode) {
          context.lineWidth = highlightStrokeWidth;
          context.strokeStyle = highlightColor;
          drawShape(context, size * 3, numberOfSides, Xcenter, Ycenter, false);
      }
  };

  sigma.canvas.edges.t = function(edge, source, target, context, settings) {
      prefix = settings('prefix') || '';
      setEdgeStroke(context, edge);

      context.beginPath();
      context.moveTo(
          source[prefix + 'x'],
          source[prefix + 'y']
      );
      context.lineTo(
          target[prefix + 'x'],
          target[prefix + 'y']
      );
      context.stroke();
  };


sigma.canvas.edges.d =
  function(edge, source, target, context, settings) {

  var color = edge.color,
      prefix = settings('prefix') || '',
      edgeColor = settings('edgeColor'),
      defaultNodeColor = settings('defaultNodeColor'),
      defaultEdgeColor = settings('defaultEdgeColor'),
      cp = {},
      size = edge[prefix + 'size'] || 1,
      tSize = target[prefix + 'size'],
      sX = source[prefix + 'x'],
      sY = source[prefix + 'y'],
      tX = target[prefix + 'x'],
      tY = target[prefix + 'y'],
      aSize = Math.max(size * 15, settings('minArrowSize')),
      d,
      aX,
      aY,
      vX,
      vY;

  cp = (source.id === target.id) ?
    sigma.utils.getSelfLoopControlPoints(sX, sY, tSize) :
    sigma.utils.getQuadraticControlPoint(sX, sY, tX, tY);

  if (source.id === target.id) {
    d = Math.sqrt(Math.pow(tX - cp.x1, 2) + Math.pow(tY - cp.y1, 2));
    aX = cp.x1 + (tX - cp.x1) * (d - aSize - tSize) / d;
    aY = cp.y1 + (tY - cp.y1) * (d - aSize - tSize) / d;
    vX = (tX - cp.x1) * aSize / d;
    vY = (tY - cp.y1) * aSize / d;
  }
  else {
    d = Math.sqrt(Math.pow(tX - cp.x, 2) + Math.pow(tY - cp.y, 2));
    aX = cp.x + (tX - cp.x) * (d - aSize - tSize) / d;
    aY = cp.y + (tY - cp.y) * (d - aSize - tSize) / d;
    vX = (tX - cp.x) * aSize / d;
    vY = (tY - cp.y) * aSize / d;
  }

  if (!color)
    switch (edgeColor) {
      case 'source':
        color = source.color || defaultNodeColor;
        break;
      case 'target':
        color = target.color || defaultNodeColor;
        break;
      default:
        color = defaultEdgeColor;
        break;
    }

    setEdgeStroke(context, edge);
  context.lineWidth = size;
  context.beginPath();
  context.moveTo(sX, sY);
  if (source.id === target.id) {
    context.bezierCurveTo(cp.x2, cp.y2, cp.x1, cp.y1, aX, aY);
  } else {
    context.quadraticCurveTo(cp.x, cp.y, aX, aY);
  }
  context.stroke();

  context.fillStyle = context.strokeStyle;
  context.beginPath();
  context.moveTo(aX + vX, aY + vY);
  context.lineTo(aX + vY * 0.6, aY - vX * 0.6);
  context.lineTo(aX - vY * 0.6, aY + vX * 0.6);
  context.lineTo(aX + vX, aY + vY);
  context.closePath();
  context.fill();
};







