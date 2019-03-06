const Binary_Search_Tree = {
    root: null,
    z: null,
    order: '',
    list: [],
    init() {
        this.list = [];
        this.order = '';

        this.z = {};
        this.z.left = this.z.right = this.z;

        this.root = {};
        this.root.key = 0;
        this.root.left = this.root.right = this.z;
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

        const newNode = {
            key,
            left: this.z,
            right: this.z,
        };

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
