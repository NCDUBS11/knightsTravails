// import "./styles.css";
//import { function name } from "./jsFile";
//import odinImage from "./odin.png";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

/*
knightMoves() will calculate the minimum path of travel
between a specified start and end point on a chess board.
The start point, end point and any other board spaces are 
nodes/vertices containing a [row, col]. Both values must be between 1-8.

The chess board doesn't actually need to exist as the function can 
just run through all possible moves until a base case is met or the 
specified end value is matched. In this function, the base case would
trigger when either the row or column value exceeds the specified bounds.

Knight may travel in only two sequences: [1,2] or [2,1].
This ends in 8 possible locations (relative to start) for the piece after each move:
Up -> /left[-1,2] or /right[1,2]
Right -> /up[2,1] or /down[2,-1]
Down -> /left[-1,-2] or /right[1,-2]
Left -> /up[-2, 1] or /down[-2,-1]

Each 'stop' along the path of travel needs to be saved and returned upon finding
the end target. eg: knightMoves([0,0],[3,3]) == [[0,0],[2,1],[3,3]].
Multiple 'shortest' paths may be found.
*/

//stores x and y board coordinates and records parent value.

class Node {
  constructor(x, y, prev = null) {
    this.x = x;
    this.y = y;
    this.prev = prev;
  }
}

function pathHistory(node) {
  const history = [];
  let currentNode = node;
  while (currentNode) {
    history.unshift([currentNode.x, currentNode.y]);
    currentNode = currentNode.prev;
  }
  return history;
}

function updateNodes(node) {
  const nodeList = [
    [node.x + 2, node.y + 1],
    [node.x + 2, node.y - 1],
    [node.x + 1, node.y + 2],
    [node.x - 1, node.y + 2],
    [node.x + 1, node.y - 2],
    [node.x - 1, node.y - 2],
    [node.x - 2, node.y + 1],
    [node.x - 2, node.y - 1],
  ];
  const updatedList = [];
  nodeList.forEach((item) => {
    updatedList.push(new Node(item[0], item[1], node));
  });
  return updatedList;
}

function knightMoves(start, end) {
  const startNode = new Node(start[0], start[1]);
  const endNode = new Node(end[0], end[1]);

  let queue = [start];
  let visited = new Set();

  visited.add(`${startNode.x},${startNode.y}`);

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
      return pathHistory(currentNode);
    }

    const newNodeGroup = updateNodes(currentNode);

    newNodeGroup.forEach((node) => {
      const value = `${node.x},${node.y}`;

      if (isValid(node) && !visited.has(value)) {
        visited.add(value);
        queue.push(node);
      }
    });
  }
}

knightMoves([1, 1], [3, 2]);
