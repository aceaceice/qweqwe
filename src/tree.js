export default class Tree {
  #children = new Map();
  parent = null;
  id = Math.floor(Math.random() * Date.now());
  #completed = { status: false };
  #name;
  constructor(name, completed) {
    this.#name = name;
    this.#completed = completed;
  }
  get name() {
    return this.#name;
  }
  get completed() {
    return this.#completed;
  }
  set name(newName) {
    this.#name = newName;
  }
  get identifier() {
    return this.id;
  }
  get children() {
    return Array.from(this.#children.values());
  }
  setCompleted(user) {
    if (this.#completed.status === false) {
      this.#completed = {
        status: true,
        timestamp: Date.now(),
        user,
      };
    } else {
      this.#completed.status = false;
    }
  }
  get parentNode() {
    return this.parent;
  }
  set parentNode(newParent) {
    if (
      newParent !== this.parentNode &&
      (newParent === null || newParent instanceof Tree)
    ) {
      this.parent = newParent;
    }
  }
  serialize() {
    return {
      name: this.name,
      id: this.identifier,
      completed: this.completed,
      children: this.children.map((child) => {
        return child.serialize();
      }),
    };
  }
  addSubtree(subtree) {
    const { name, completed, children } = subtree;
    const head = this.createChildNode(name, completed);
    children.map((node) => {
      return head.addSubtree(node);
    });
  }
  static deserialize(json) {
    const { name, completed, children } = json;
    const tree = new Tree(name, completed);
    children.map((child) => {
      return tree.addSubtree(child);
    });
    return tree;
  }
  getChildrenNode(id) {
    for (let child of this.children) {
      if (child.identifier === id) {
        return child;
      }
    }
    return null;
  }
  removeNode() {
    this.parentNode.#children.delete(this.identifier);
    return this;
  }
  createChildNode(name, completed) {
    const newNode = new Tree(name, completed);
    this.#children.set(newNode.identifier, newNode);
    newNode.parentNode = this;
    return newNode;
  }
}
