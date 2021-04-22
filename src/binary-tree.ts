type myData<T> = T | null;

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

  public insert(_key: number, _data: myData<T>): boolean {
    if (this.root === null) {
      this.root = new TreeNode<T>(_key, _data);
    } else {
      if (this.find(_key) != null) {
        return false;
      }
      let currentNode: TreeNode<T> = this.root;
      while (currentNode) {
        if (_key > currentNode.key) {
          if (currentNode.right === null) {
            currentNode.right = new TreeNode(_key, _data);
            return true;
          }
          currentNode = currentNode.right;
        } else if (_key < currentNode.key) {
          if (currentNode.left === null) {
            currentNode.left = new TreeNode(_key, _data);
            return true;
          }
          currentNode = currentNode.left;
        } else {
          return false;
        }
      }
    }
    return true;
  }

  public find(_key: number): myData<T> {
    if (this.root != null) {
      let currentNode: TreeNode<T> = this.root;
      while (currentNode) {
        if (_key < currentNode.key) {
          if (currentNode.left != null) {
            currentNode = currentNode.left;
          } else {
            return null;
          }
        } else if (_key > currentNode.key) {
          if (currentNode.right != null) {
            currentNode = currentNode.right;
          } else {
            return null;
          }
        }
        if (_key === currentNode.key) {
          return currentNode.data;
        }
      }
      return null;
    }
    return null;
  }

  public findMinNode(currentNode: TreeNode<T>): TreeNode<T> {
    if (currentNode.left === null) {
      return currentNode;
    }
    return this.findMinNode(currentNode.left);
  }

  public remove(_key: number): boolean {
    if (this.root != null) {
      if (this.find(_key) == null) {
        return false;
      }
      this.root = this.removeNode(this.root, _key);
      if (this.removeNode(this.root, _key) == null &&
       this.root?.left != null && this.root.right != null) {
        return false;
      }
      return true;
    }
    return false;
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

  public isEmpty(): boolean {
    if (this.root == null) {
      return true;
    }

    return false;
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
}
