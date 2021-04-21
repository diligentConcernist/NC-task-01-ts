type myData<T> = T | null;

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;

window.onload = () => {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.id = "myCanvas";
  canvas.width = 1200;
  canvas.height = 600;
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid";
  document.body.appendChild(canvas);
  document.getElementById("addNode")?.addEventListener("click", (e: MouseEvent) => {
    addNode();
    a.draw();
  });
  document.getElementById("removeNode")?.addEventListener("click", (e: MouseEvent) => {
    removeNode();
    a.draw();
  });
  document.getElementById("findNode")?.addEventListener("click", (e: MouseEvent) => {
    findNode();
    a.draw();
  });
  document.getElementById("traverseTree")?.addEventListener("click", (e: MouseEvent) => {
    traverseTree();
  });
  a.insert(0, 1101);
  a.insert(3, 1);
  a.insert(-2, 1011);
  a.insert(-1, 1000);
  a.insert(1, 1111);
  a.insert(4, 1110);
  a.insert(2, 101);
  a.insert(-10, 110);
  a.insert(12, 0);

  a.draw();
};

function traverseTree(): void {
  const elem = (<HTMLInputElement>document.getElementById("traverseField"));
  elem.value = a.printTree();
}

function findNode(): void {
  let _key: number;
  let elem = (<HTMLInputElement>document.getElementById("findField"));
  _key = Number(elem?.value);
  elem = (<HTMLInputElement>document.getElementById("resultField"));
  elem.value = String(a.find(_key));
}

function removeNode(): void {
  let _key: number;
  const elem = (<HTMLInputElement>document.getElementById("removeKeyField"));
  _key = Number(elem?.value);
  a.remove(_key);
}

function addNode(): void {
  let _key: number;
  let _data: myData<number>;
  let elem = (<HTMLInputElement>document.getElementById("keyField"));
  _key = Number(elem?.value);
  elem = (<HTMLInputElement>document.getElementById("dataField"));
  _data = Number(elem?.value);
  a.insert(_key, _data);
}

class TreeNode<T> {
  public key: number;
  public data: myData<T>;
  public left: TreeNode<T> | null = null;
  public right: TreeNode<T> | null = null;

  public position: number[] = [0, 0];
  public color: string = "";

  constructor(_key: number, _data: myData<T>) {
    this.key = _key;
    this.data = _data;
  }
}

class BinarySearchTree<T> {
  public root: TreeNode<T> | null = null;

  public insert(_key: number, _data: myData<T>): void {
    if (this.root === null) {
      this.root = new TreeNode<T>(_key, _data);
    } else {
      let currentNode: TreeNode<T> = this.root;
      while (currentNode) {
        if (_key > currentNode.key) {
          if (currentNode.right === null) {
            currentNode.right = new TreeNode(_key, _data);
            return;
          }
          currentNode = currentNode.right;
        } else if (_key < currentNode.key) {
          if (currentNode.left === null) {
            currentNode.left = new TreeNode(_key, _data);
            return;
          }
          currentNode = currentNode.left;
        } else {
          return;
        }
      }
    }
  }

  public find(_key: number): myData<T> {
    if (this.root != null) {
      let currentNode: TreeNode<T> = this.root;
      while (currentNode) {
        if (_key < currentNode.key) {
          if (currentNode.left != null) {
            currentNode = currentNode.left;
          }
        } else if (_key > currentNode.key) {
          if (currentNode.right != null) {
            currentNode = currentNode.right;
          }
        }
        if (_key === currentNode.key) {
          return currentNode.data;
        }
      }
    }
    return null;
  }

  public findMinNode(currentNode: TreeNode<T>): TreeNode<T> {
    if (currentNode.left === null) {
      return currentNode;
    }
    return this.findMinNode(currentNode.left);
  }

  public remove(_key: number): void {
    if (this.root != null) {
      this.root = this.removeNode(this.root, _key);
    }
  }

  public removeNode(currentNode: TreeNode<T> | null, _key: number):
    TreeNode<T> | null {
    if (currentNode != null) {
      console.log(currentNode);
      if (currentNode.key < _key) {
        currentNode.right = this.removeNode(currentNode.right, _key);
      } else if (currentNode.key > _key) {
        currentNode.left = this.removeNode(currentNode.left, _key);
      } else if (currentNode.left != null && currentNode.right != null) {
        const aux = this.findMinNode(currentNode.right);
        currentNode.key = aux.key;
        console.log(aux);
        currentNode.right =
          this.removeNode(currentNode.right, currentNode.key);
      } else {
        if (currentNode.left == null && currentNode.right == null) {
          currentNode = null;
        } else if (currentNode.left == null) {
          currentNode = currentNode.right;
        } else if (currentNode.right == null) {
          currentNode = currentNode.left;
        }
      }
    }
    return currentNode;
  }

  public printNode(node: TreeNode<T>): string {
    let result: string = "";
    if (this.root != null) {
      const queue: (TreeNode<T> | null)[] = [];
      queue.push(node);
      while (queue.length !== 0) {
        const currentNode = queue.shift();
        if (currentNode != null) {
          result = result + currentNode.key + "(" + currentNode.data + "), ";
          if (currentNode.left != null) {
            queue.push(currentNode.left);
          }
          if (currentNode.right != null) {
            queue.push(currentNode.right);
          }
        }
      }
    }
    return result;
  }

  public printTree(): string {
    let result: string = "";
    if (this.root != null) {
      result = this.printNode(this.root);
    }
    result = result.substring(0, result.length - 2);
    return result;
  }

  public setPositions(): void {
    const position: number[] = [600, 50];
    if (this.root != null) {
      const queue: (TreeNode<T> | null)[] = [];
      queue.push(this.root);
      while (queue.length !== 0) {
        const currentNode = queue.shift();
        if (currentNode === this.root) {
          currentNode.position = position;
        }
        if (currentNode != null) {
          if (currentNode.left != null) {
            currentNode.left.position =
              [currentNode.position[0] - 220 +
                currentNode.position[1], currentNode.position[1] + 50];
            queue.push(currentNode.left);
          }
          if (currentNode.right != null) {
            currentNode.right.position =
              [currentNode.position[0] + 220 -
                currentNode.position[1], currentNode.position[1] + 50];
            queue.push(currentNode.right);
          }
        }
      }
    }
  }

  public draw(): void {
    this.setPositions();
    if (ctx != null) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    const queue: (TreeNode<T> | null)[] = [];
    const black = "#000";
    queue.push(this.root);
    while (queue.length !== 0 && ctx != null) {
      const currentNode = queue.shift();
      if (currentNode != null) {
        const startPos: number[] = currentNode.position;
        if (currentNode === this.root) {
          currentNode.color = "#eb4034";
        }
        if (currentNode.left != null && ctx != null) {
          queue.push(currentNode.left);
          const leftPos = currentNode.left.position;
          currentNode.left.color = "#fcba03";
          ctx.beginPath();
          ctx.moveTo(startPos[0], startPos[1]);
          ctx.lineTo(leftPos[0], leftPos[1]);
          ctx.stroke();
        }
        if (currentNode.right != null && ctx != null) {
          queue.push(currentNode.right);
          const rightPos = currentNode.right.position;
          currentNode.right.color = "#9b2ee8";
          ctx.beginPath();
          ctx.moveTo(startPos[0], startPos[1]);
          ctx.lineTo(rightPos[0], rightPos[1]);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(startPos[0], startPos[1], 20, 0, 2 * Math.PI);
        ctx.strokeStyle = black;
        ctx.fillStyle = currentNode.color;
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = black;
        ctx.strokeText(currentNode?.key.toString(), startPos[0] - 2,
        startPos[1] + 2);
      }
    }
  }
}

const a = new BinarySearchTree<number>();
