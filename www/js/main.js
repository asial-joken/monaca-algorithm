document.addEventListener('init', function(event) {
    const page = event.target;

    if (page.id === 'stack_page') {
        const reset = function() {
            Stack.top = 0;
            Stack.store = new Array(STORE_MAX_SIZE).fill('');
        };
        const show = function() {
            const store = Stack.store;
            page.querySelectorAll('.item_list .item').forEach(function(item, index) {
                item.textContent = index + '：' + store[index];
            });
            page.querySelector('.top').textContent = Stack.top;
        };
        page.querySelector('.input_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');
            if (input_data.value) {
                Stack.push(input_data.value);
                show();
                input_data.value = '';
            }
        });
        page.querySelector('.output_button').addEventListener('click', function() {
            Stack.pop();
            show();
        });
        reset();
        show();
    } else if (page.id === 'queue_page') {
        const reset = function() {
            Queue.front = 0;
            Queue.rear = 0;
            Queue.store = new Array(STORE_MAX_SIZE).fill('');
        };
        const show = function() {
            const store = Queue.store;
            const start = Queue.front;
            const end = Queue.rear;
            page.querySelectorAll('.item_list .item').forEach(function(item, index) {
                if (start <= end) {
                    if (start <= index && index < end) {
                        item.textContent = index + '：' + store[index];
                    } else {
                        item.textContent = index + '：';
                    }
                } else {
                    if (start <= index || index < end) {
                        item.textContent = index + '：' + store[index];
                    } else {
                        item.textContent = index + '：';
                    }
                }
            });
            page.querySelector('.front').textContent = Queue.front;
            page.querySelector('.rear').textContent = Queue.rear;

        };
        page.querySelector('.input_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');
            if (input_data.value) {
                Queue.offer(input_data.value);
                show();
                input_data.value = '';
            }
        });
        page.querySelector('.output_button').addEventListener('click', function() {
            Queue.poll();
            show();
        });
        reset();
        show();
    } else if (page.id === 'array_list_page') {
        const reset = function() {
            Array_List.top = 0;
            Array_List.store = new Array(STORE_MAX_SIZE).fill('');
        };

        const show = function() {
            const store = Array_List.store;
            page.querySelectorAll('.item_list .item').forEach(function(item, index) {
                item.textContent = index + '：' + store[index];
            });
        };

        page.querySelector('.insert_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');
            if (input_data.value) {
                if (Array_List.insert(input_data.value)) {
                    show();
                    input_data.value = '';
                } else {
                    ons.notification.alert('これ以上追加できません');
                }
            }
        });
        page.querySelector('.search_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');
            if (input_data.value) {
                let index = Array_List.search(input_data.value);
                if (index === NOT_FOUND) {
                    ons.notification.alert(input_data.value + 'は見つかりませんでした');
                } else {
                    ons.notification.alert(index + '番目に見つかりました');
                }
            }
        });
        page.querySelector('.delete_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');
            if (input_data.value) {
                if (Array_List.delete(input_data.value)) {
                    show();
                    input_data.value = '';
                } else {
                    ons.notification.alert(input_data.value + 'は見つかりませんでした');
                }
            }
        });

        reset();
        show();
    } else if (page.id === 'node_list_page') {
        const reset = function() {
            sequence = 0;
            Node_List.head = new Node_List_Item(sequence, null, null);
        };
        const show = function() {
            const list = page.querySelector('.item_list');
            list.innerHTML = '';

            let item = Node_List.head;
            ons.createElement(
                `<ons-list-item><ons-row><ons-col width="100px">Node：${item.node_no}</ons-col><ons-col width="150px">Info：${item.info}</ons-col><ons-col>Next：${
                    item.next === null ? 'null' : item.next.node_no
                }</ons-col></ons-row></ons-list-item>`,
                { append: list }
            );
            while (item.next !== null) {
                item = item.next;
                ons.createElement(
                    `<ons-list-item><ons-row><ons-col width="100px">Node：${item.node_no}</ons-col><ons-col width="150px">Info：${item.info}</ons-col><ons-col>Next：${
                        item.next === null ? 'null' : item.next.node_no
                    }</ons-col></ons-row></ons-list-item>`,
                    { append: list }
                );
            }
        };
        page.querySelector('.insert_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');
            if (input_data.value) {
                Node_List.addNode(input_data.value);
                show();
                input_data.value = '';
            }
        });
        page.querySelector('.search_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');
            if (input_data.value) {
                if (Node_List.search(input_data.value)) {
                    ons.notification.alert(input_data.value + 'を見つけました');
                } else {
                    ons.notification.alert(input_data.value + 'は見つかりませんでした');
                }
            }
        });
        page.querySelector('.delete_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');
            if (input_data.value) {
                if (Node_List.delete(input_data.value)) {
                    show();
                    input_data.value = '';
                } else {
                    ons.notification.alert(input_data.value + 'は見つかりませんでした');
                }
            }
        });
        reset();
        show();
    } else if (page.id === 'sorted_list_page') {
        const reset = function() {
            Sorted_List.top = 0;
            Sorted_List.store = new Array(STORE_MAX_SIZE).fill('');
        };
        const show = function() {
            const store = Sorted_List.store;
            page.querySelectorAll('.item_list .item').forEach(function(item, index) {
                item.textContent = index + '：' + store[index];
            });
        };
        page.querySelector('.insert_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');
            if (input_data.value) {
                if (Sorted_List.insert(input_data.value)) {
                    show();
                    input_data.value = '';
                } else {
                    ons.notification.alert('これ以上追加できません');
                }
            }
        });
        page.querySelector('.search_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');
            if (input_data.value) {
                if (Sorted_List.binarySearch(input_data.value)) {
                    ons.notification.alert(input_data.value + 'を見つけました');
                } else {
                    ons.notification.alert(input_data.value + 'は見つかりませんでした');
                }
            }
        });
        page.querySelector('.delete_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');
            if (input_data.value) {
                if (Sorted_List.delete(input_data.value)) {
                    show();
                    input_data.value = '';
                } else {
                    ons.notification.alert(input_data.value + 'は見つかりませんでした');
                }
            }
        });
        reset();
        show();
    } else if (page.id === 'binary_search_tree_page') {
        const reset = function() {
            Bnode.nodeCount = 0;
            Binary_Search_Tree.init();
        };

        const show = function() {
            let list;
            Binary_Search_Tree.initOrder();

            const orderSegment = page.querySelector('.order_segment');
            const activeIndex = orderSegment.getActiveButtonIndex();

            switch (activeIndex) {
                case 0:
                    list = Binary_Search_Tree.preorder(Binary_Search_Tree.root);
                    break;
                case 1:
                    list = Binary_Search_Tree.inorder(Binary_Search_Tree.root);
                    break;
                case 2:
                    list = Binary_Search_Tree.postorder(Binary_Search_Tree.root);
                    break;
                default:
                    list = Binary_Search_Tree.list;
            }

            list.push(Binary_Search_Tree.z);

            const itemList = page.querySelector('.item_list');

            // 一覧をリセット
            while (itemList.firstChild) itemList.removeChild(itemList.firstChild);

            list.forEach(node => {
                ons.createElement(`<ons-list-item><span class="item">${node.toString()}</span></ons-list-item>`, { append: itemList });
            });
        };

        page.querySelector('.insert_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');

            if (input_data.value) {
                if (Binary_Search_Tree.insert(Number(input_data.value))) {
                    show();
                    input_data.value = '';
                } else {
                    ons.notification.alert('これ以上追加できません');
                }
            }
        });

        page.querySelector('.search_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');

            if (input_data.value) {
                if (Binary_Search_Tree.search(Number(input_data.value))) {
                    ons.notification.alert(input_data.value + 'を見つけました');
                } else {
                    ons.notification.alert(input_data.value + 'は見つかりませんでした');
                }
            }
        });

        page.querySelector('.delete_button').addEventListener('click', function(event) {
            const input_data = page.querySelector('.input_data');

            if (input_data.value) {
                if (Binary_Search_Tree.delete(Number(input_data.value))) {
                    show();
                    input_data.value = '';
                } else {
                    ons.notification.alert(input_data.value + 'は見つかりませんでした');
                }
            }
        });

        page.querySelector('.delete_recursive_button').addEventListener('click', function(event) {
            const input_data = page.querySelector('.input_data');

            if (input_data.value) {
                if (Binary_Search_Tree.delete(Number(input_data.value), true)) {
                    show();
                    input_data.value = '';
                } else {
                    ons.notification.alert(input_data.value + 'は見つかりませんでした');
                }
            }
        });

        Array.from(page.querySelectorAll('.order_button')).forEach(node => {
            node.addEventListener('click', show);
        });

        reset();
        show();
    } else if (page.id === 'heap_page') {
        const reset = function() {
            Heap.store = new Array(STORE_MAX_SIZE + 1).fill(0).map((v, i) => (i === 0 ? Number.MAX_VALUE : v));
            Heap.size = 0;
        };
        const show = function() {
            const store = Heap.store;

            page.querySelectorAll('.item_list .item').forEach(function(item, index) {
                item.textContent = index + '：' + store[index];
            });

            page.querySelector('.size_label').innerText = `SIZE: ${Heap.size}`;
        };

        page.querySelector('.input_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');

            if (!input_data.value) return;

            const value = Number(input_data.value);

            if (Number.isSafeInteger(value) && Heap.insert(value)) {
                show();
            } else {
                ons.notification.alert('データを保存出来ませんでした');
            }

            input_data.value = '';
        });

        page.querySelector('.output_button').addEventListener('click', function() {
            let value = Heap.remove();

            if (value === Heap.notfound) {
                ons.notification.alert('データがありません');
                value = '';
            }

            page.querySelector('.input_data').value = value;
            show();
        });

        reset();
        show();
    } else if (page.id === 'hash_page') {
        const reset = function() {
            Hash.store = new Array(Hash.maxsize).fill('');
        };
        const show = function() {
            const store = Hash.store;

            page.querySelectorAll('.item_list .item').forEach(function(item, index) {
                item.textContent = index + '：' + store[index];
            });
        };

        page.querySelector('.input_button').addEventListener('click', function() {
            const input_data = page.querySelector('.input_data');
            const input_skip = page.querySelector('.input_skip');

            if (!input_data.value) return;

            const value = input_data.value;
            let skip = Number(input_skip.value);

            if (!Number.isSafeInteger(skip)) skip = 1;

            if (Hash.store.some(v => v === '') && Hash.insert(value, skip)) {
                ons.notification.alert(`"${value}"を保存した`);
                page.querySelector('.hash_value').innerText = Hash.hashFunc(value);
                show();
            } else {
                ons.notification.alert('データを保存出来ませんでした');
            }

            input_data.value = '';
        });

        reset();
        show();
    } else if (page.id.match(/^.+_sort_page$/)) {
        const sort_obj_list = {
            bubble_sort_page: Bubble_Sort,
            selection_sort_page: Selection_Sort,
            insertion_sort_page: Insertion_Sort,
            quick_sort_page: Quick_Sort,
            merge_sort_page: Merge_Sort,
        };
        let dataset = [
            { data: 65, color: 'red' },
            { data: 21, color: 'hotpink' },
            { data: 59, color: 'darkorange' },
            { data: 39, color: 'gold' },
            { data: 80, color: 'lawngreen' },
            { data: 94, color: 'green' },
            { data: 26, color: 'aqua' },
            { data: 17, color: 'blue' },
            { data: 55, color: 'blueviolet' },
        ];
        let data = dataset.map(item => item.data);
        let color = dataset.map(item => item.color);
        let plot = new Plot(page, data, color);

        const sort_obj = sort_obj_list[page.id];

        page.querySelector('.start_button').addEventListener('click', function() {
            page.querySelector('.start_button').disabled = true;
            const speed = 100 - parseInt(page.querySelector('.speed_range').value);

            console.log(dataset.slice().length, plot, speed);
            const sorted_list = sort_obj.sort(dataset.slice(), plot, speed);

            if (sorted_list) {
                plot.update(sorted_list.dataset);
                page.querySelector('.compare_count').textContent = sorted_list.compare_count;
                page.querySelector('.swap_count').textContent = sorted_list.swap_count;
            }
            page.querySelector('.reset_button').disabled = false;
        });

        page.querySelector('.reset_button').addEventListener('click', function() {
            page.querySelector('.reset_button').disabled = true;
            plot.update(dataset);
            page.querySelector('.compare_count').textContent = 0;
            page.querySelector('.swap_count').textContent = 0;
            page.querySelector('.start_button').disabled = false;
        });

        page.querySelector('.data_size').addEventListener('change', function(event) {
            plot.destroy();
            page.querySelector('.start_button').disabled = false;
            page.querySelector('.reset_button').disabled = true;
            page.querySelector('.compare_count').textContent = 0;
            page.querySelector('.swap_count').textContent = 0;

            const size = parseInt(event.target.value);
            dataset = [];
            for (let i = 0; i < size; i++) {
                dataset[i] = {
                    data: Math.floor(Math.random() * 100) + 1,
                    color:
                        '#' +
                        Math.floor(Math.random() * 256)
                            .toString(16)
                            .padStart(2, '0') +
                        Math.floor(Math.random() * 256)
                            .toString(16)
                            .padStart(2, '0') +
                        Math.floor(Math.random() * 256)
                            .toString(16)
                            .padStart(2, '0'),
                };
            }

            data = dataset.map(item => item.data);
            color = dataset.map(item => item.color);
            plot = new Plot(page, data, color);
        });
    }
});
