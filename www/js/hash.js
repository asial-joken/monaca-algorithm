const Hash = {
    maxsize: 11,
    store: new Array(STORE_MAX_SIZE).fill(''),
    hashFunc(str) {
        let h = str.charCodeAt(0) % this.maxsize;

        for (let i = 1; i < str.length; i++) {
            console.log(`Hash: ${h}`);

            h = (h * 128 + str.charCodeAt(i)) % this.maxsize;
        }

        return h;
    },

    insert(str, skip) {
        let index = this.hashFunc(str);

        console.log(`Hash Last: ${index}`);

        while (this.store[index] !== '') {
            console.log(`store[${index}] ${store[index]}`);
            index = (index + skip) % maxsize;
        }

        if (this.store[index] === '' || index !== hashFunc(str)) {
            this.store[index] = str;

            return true;
        } else {
            return false;
        }
    },

    peek(num) {
        return this.store[num];
    },
};
