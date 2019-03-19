class Bnode {
    static nodeCount = 0;

    /**
     * constructor
     * @param {Object} args
     * @param {Number|undefined} args.key
     * @param {String|undefined} args.info
     * @param {Bnode|undefined} args.left
     * @param {Bnode|undefined} args.right
     */
    constructor(args = {}) {
        Bnode.nodeCount++;

        this.key = args.key || 0;
        this.info = args.info;
        this.left = args.left;
        this.right = args.right;
        this.hashCode = `node-${Bnode.nodeCount}`;
    }

    toString() {
        return `N: ${String(this.hashCode) || ''}, K: ${String(this.key) || ''}, L: ${String(this.left.hashCode) || ''}, R: ${String(this.right.hashCode) || ''}`;
    }
}

const Binary_Search_Tree = {
    root: null,
    z: null,
    order: '',
    list: [],
    init() {
        this.list = [];
        this.order = '';

        this.z = new Bnode();
        this.z.left = this.z;
        this.z.right = this.z;

        this.root = new Bnode({
            key: 0,
            left: this.z,
            right: this.z,
        });
    },

    initOrder() {
        this.order = '';
        this.list = [];
    },

    // 実行前に initNode()を実行すること.
    preorder(node) {
        if (node === this.z) return this.list;

        this.list.push(node);
        this.order = `${this.order}${node.info}, `;

        this.preorder(node.left);
        this.preorder(node.right);

        return this.list;
    },

    inorder(node) {
        if (node === this.z) return this.list;

        this.inorder(node.left);
        this.list.push(node);
        this.order = `${this.order}${node.info}, `;

        this.inorder(node.right);

        return this.list;
    },

    postorder(node) {
        if (node === this.z) return;

        this.postorder(node.left);
        this.postorder(node.right);

        this.list.push(node);
        this.order = `${this.order}${node.info}, `;

        return this.list;
    },

    search(key) {
        const node = this.BSTsearch(key, this.root);

        if (node === this.z) {
            return false;
        } else {
            return true;
        }
    },

    // 返り値が z なら見つからなかった.
    BSTsearch(key, node) {
        this.z.key = key;

        do {
            if (key < node.key) {
                node = node.left;
            } else {
                node = node.right;
            }
        } while (key !== node.key);

        if (node === this.z) {
            return this.z;
        } else {
            return node;
        }
    },

    insert(key) {
        const node = this.BSTinsert(key, this.root);

        if (node != null) {
            return true;
        } else {
            return false;
        }
    },

    BSTinsert(key, node) {
        let parent;

        do {
            parent = node;

            if (key < node.key) {
                node = node.left;
            } else {
                node = node.right;
            }
        } while (node !== this.z);

        const newNode = new Bnode({
            key,
            left: this.z,
            right: this.z,
        });

        if (key < parent.key) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }

        return node;
    },

    delete(key, isRecursive = false) {
        let node;
        if (isRecursive) {
            return this.BSTdeleteRecursive(key, this.root);
        } else {
            node = this.BSTdelete(key, this.root);
            if (node === this.z) {
                return false;
            } else {
                return true;
            }
        }
    },

    BSTdelete(key, node) {
        let parent, child;

        this.z.key = key;

        do {
            parent = node;

            if (key < node.key) {
                node = node.left;
            } else {
                node = node.right;
            }
        } while (key != node.key);

        if (node === this.z) return this.z;

        const found = node;

        if (node.left === this.z) {
            node = node.right;
        } else {
            child = node.left;

            if (child.right === this.z) {
                child.right = found.right;
                node = child;
            } else {
                while (child.right.right !== this.z) {
                    child = child.right;
                }

                node = child.right;

                child.right = node.left;
                node.left = found.left;
                node.right = found.right;
            }
        }

        if (found.key < parent.key) {
            parent.left = node;
        } else {
            parent.right = node;
        }

        return found;
    },

    findMax(node) {
        if (node.right === this.z) {
            return node.left;
        } else {
            return this.findMax(node.right);
        }
    },

    BSTdeleteRecursive(key, node) {
        let notfound = false;

        const del = (v, x) => {
            if (x === this.z) {
                notfound = true;
                return this.z;
            } else if (v !== x.key) {
                if (v < x.key) {
                    x.left = del(v, x.left);
                } else {
                    x.right = del(v, x.right);
                }

                return x;
            } else {
                if (x.left === this.z) {
                    return x.right;
                } else {
                    const r = this.findMax(x.left);

                    r.left = x.left;
                    r.right = x.right;

                    return r;
                }
            }
        };

        del(key, node);

        return !notfound;
    },

    RotR(node) {
        const tmp = node.left;

        node.left = tmp.right;
        tmp.right = node;

        return tmp;
    },
};
