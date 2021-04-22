let canvas = (<HTMLCanvasElement>document.getElementById("myCanvas"));
let ctx = canvas.getContext("2d");

const a = new BinarySearchTree<number>();

window.onload = () => {
  canvas.width = 1200;
  canvas.height = 600;
  document.getElementById("addNode")?.addEventListener("click", (e: MouseEvent) => {
    addNode();
    clear();
    draw(a);
  });
  document.getElementById("removeNode")?.addEventListener("click", (e: MouseEvent) => {
    removeNode();
    clear();
    draw(a);
  });
  document.getElementById("findNode")?.addEventListener("click", (e: MouseEvent) => {
    findNode();
    draw(a);
  });
  document.getElementById("traverseTree")?.addEventListener("click", (e: MouseEvent) => {
    clear();
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

  draw(a);
};

function clear(): void {
  (<HTMLInputElement>document.getElementById("removeKeyField")).value = "";
  (<HTMLInputElement>document.getElementById("keyField")).value = "";
  (<HTMLInputElement>document.getElementById("dataField")).value = "";
  (<HTMLInputElement>document.getElementById("errorRemove")).value = "";
  (<HTMLInputElement>document.getElementById("errorAdd")).value = "";
}

function traverseTree(): void {
  const elem = (<HTMLInputElement>document.getElementById("traverseField"));
  elem.value = a.isEmpty() ? "Дерево пусто" : a.printTree();
}

function findNode(): void {
  let _key: number;
  let elem = (<HTMLInputElement>document.getElementById("findField"));
  _key = Number(elem?.value);
  elem = (<HTMLInputElement>document.getElementById("resultField"));
  const check: myData<number> = a.find(_key);
  elem.value = check == null ?
    "Ключ " + _key + " не найден" : String(a.find(_key));
}

function removeNode(): void {
  let _key: number;
  const elem = (<HTMLInputElement>document.getElementById("removeKeyField"));
  _key = Number(elem?.value);
  const check: boolean = a.remove(_key);
  (<HTMLLabelElement>document.getElementById("errorRemove")).innerHTML = !check ?
    "Ключ " + _key + " не найден" : "";
}

function addNode(): void {
  let _key: number;
  let _data: myData<number>;
  let elem = (<HTMLInputElement>document.getElementById("keyField"));
  _key = Number(elem?.value);
  elem = (<HTMLInputElement>document.getElementById("dataField"));
  _data = Number(elem?.value);
  const check: boolean = a.insert(_key, _data);
  (<HTMLLabelElement>document.getElementById("errorAdd")).innerHTML =
    !check ? "Ключ " + _key + " уже есть в дереве" : "";
}

function draw<T>(Tree: BinarySearchTree<T>): void {
  Tree.setPositions();
  if (ctx != null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  const queue: (TreeNode<T> | null)[] = [];
  const black = "#000";
  queue.push(Tree.root);
  while (queue.length !== 0 && ctx != null) {
    const currentNode = queue.shift();
    if (currentNode != null) {
      const startPos: number[] = currentNode.position;
      if (currentNode === Tree.root) {
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
