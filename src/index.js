if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

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

// Knight may travel in only two sequences: +/- [1,2] or +/- [2,1].
// This ends in 8 possible locations (relative to start) for the piece after each move:
// Up -> /left[-1,2] or /right[1,2]
// Right -> /up[2,1] or /down[2,-1]
// Down -> /left[-1,-2] or /right[1,-2]
// Left -> /up[-2, 1] or /down[-2,-1]

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

function isValid(node) {
  if (node.x >= 1 && node.x <= 8 && node.y >= 1 && node.y <= 8) {
    return true;
  }
  return false;
}

function knightMoves(start, end) {
  const startNode = new Node(start[0], start[1]);
  const endNode = new Node(end[0], end[1]);

  if (!isValid(startNode)) {
    throw new Error(
      "invalid range provided for start node. Must be a value between 1 and 8.",
    );
  }

  if (!isValid(endNode)) {
    throw new Error(
      "invalid range provided for start node. Must be a value between 1 and 8.",
    );
  }

  let queue = [startNode];
  let visited = new Set();

  visited.add(`${startNode.x},${startNode.y}`);

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
      const path = pathHistory(currentNode);
      console.log(
        `You made it in ${path.length - 1} moves!\n Here is your path:`,
      );
      path.forEach((step) => {
        console.log(step);
      });
      return path;
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

console.log(knightMoves([3, 3], [4, 3]));
