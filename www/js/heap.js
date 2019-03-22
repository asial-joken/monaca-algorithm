const Heap = {
    notfound: Number.MIN_VALUE,
    maxsize: STORE_MAX_SIZE,
    store: new Array(STORE_MAX_SIZE + 1).fill(0).map((v, i) => (i === 0 ? Number.MAX_VALUE : v)),
    size: 0,
    upheap(index) {
        const value = this.store[index];

        while (this.store[Math.floor(index / 2)] <= value) {
            console.log(`Index: ${index}`);
            this.store[index] = this.store[Math.floor(index / 2)];
            index = Math.floor(index / 2);
        }

        this.store[index] = value;
    },
    insert(num) {
        console.log(`Size: ${this.size}`);

        if (this.size < this.maxsize) {
            this.size++;
            this.store[this.size] = num;

            this.upheap(this.size);

            return true;
        } else {
            return false;
        }
    },

    downheap(index) {
        const ret = this.store[index];

        while (index <= Math.floor(this.size / 2)) {
            let child = 2 * index;

            if (child < this.size) {
                if (this.store[child] < this.store[child + 1]) {
                    child++;
                }
            }

            if (ret >= this.store[child]) break;

            this.store[index] = this.store[child];
            index = child;
        }

        this.store[index] = ret;
    },

    remove() {
        if (this.size > 0) {
            const ret = this.store[1];
            this.store[1] = this.store[this.size];

            this.size--;

            this.downheap(1);
            return ret;
        } else {
            return this.notfound;
        }
    },

    peek(num) {
        return num <= this.maxsize ? String(this.store[num]) : null;
    },
};
