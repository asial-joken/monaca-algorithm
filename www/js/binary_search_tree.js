class Bnode {
    /**
     * constructor
     * @param {Object} args
     * @param {Number|undefined} args.key
     * @param {String|undefined} args.info
     * @param {Bnode|undefined} args.left
     * @param {Bnode|undefined} args.right
     */
    constructor(args = {}) {
        this.key = args.key;
        this.info = args.info;
        this.left = args.left;
        this.right = args.right;
    }

    toString() {
        return `N: ${this.hashCode || ''}, K: ${this.key || ''}, L: ${this.left.hashCode || ''}, R: ${this.right.hashCode || ''}`;
    }

    get hashCode() {
        const str = JSON.stringify(
            this,
            (() => {
                const tmp = [];
                return (key, value) => {
                    if (key === '') {
                        tmp.push(value);
                        return value;
                    }

                    if (typeof value === 'object') {
                        const item = tmp.find(item => value === item);

                        if (item) return undefined;

                        tmp.push(value);

                        return value;
                    }

                    return value;
                };
            })()
        );

        let hash = 0;

        for (let i = 0; i < str.length; i++) {
            hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
            hash = hash & hash; // Convert to 32bit integer
        }

        return hash;
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
        this.z.left = this.z.right = this.z;

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

    // 返り値が z なら見つからなかった.
    search(key) {
        this.z.key = key;

        let node = this.root;

        do {
            if (key < node.key) {
                node = node.left;
            } else {
                node = node.right;
            }
        } while (key !== node.key);

        if (node === this.z) {
            return false;
        } else {
            return true;
        }
    },

    insert(key) {
        let parent;
        let node = this.root;

        do {
            parent = node;

            if (key < node.key) {
                node = node.left;
            } else {
                node = node.right;
            }
        } while (node !== this.z);

        console.log(parent);

        const newNode = new Bnode({
            key,
            left: this.z,
            right: this.z,
        });

        console.log(newNode);

        if (key < parent.key) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }

        return Boolean(node);
    },

    delete(key) {
        let parent, child;
        let node = this.root;

        this.z.key = key;

        do {
            parent = node;

            node = key < node.key ? node.left : node.right;
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

        return this.z !== found;
    },

    RotR(node) {
        const tmp = node.left;

        node.left = tmp.right;
        tmp.right = node;

        return tmp;
    },
};
