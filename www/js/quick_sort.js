const Quick_Sort = {
    /* スピード調整機能なしのソースコード */
    /*
    sort: function(dataset) {
        let compare_count = 0;
        let swap_count = 0;

        const quickSort = function (data, l, r) {
            console.log(`l:${l}, r:${r}, pivot:${data[r].data}`)

            if (r > l) {
                const v = data[r].data
                let i = l
                let j = r-1

                while(true) {
                    while(data[i].data < v) {
                        i += 1

                        // 比較回数を更新
                        compare_count += 1;
                    }
                    while(data[j].data > v) {
                        j -= 1

                        // 比較回数を更新
                        compare_count += 1;
                    }

                    if (i >= j) break

                    const tmp = data[i]
                    data[i] = data[j]
                    data[j]= tmp

                    console.log(`swap: ${i}, ${j}`)

                    // 交換回数を更新
                    swap_count += 1;
                }

                const tmp = data[i]
                data[i] = data[r]
                data[r] = tmp

                console.log(`${i}, ${j}, swap: ${i}, ${r}`)

                // 交換回数を更新
                swap_count += 1;

                quickSort(data, l, i - 1)
                quickSort(data, i + 1, r)
            }
        }

        quickSort(dataset, 0, dataset.length - 1);

        return { dataset, compare_count, swap_count };
    }
    */
    /* スピード調整機能ありのソースコード */
    sort: function(dataset, plot, speed) {
        let compare_count = 0;
        let swap_count = 0;

        const quickSort = function(data, l, r) {
            if (r > l) {
                const v = data[r].data;
                let i = l;
                let j = r - 1;

                while (true) {
                    while (data[i].data < v) {
                        i++;

                        // 比較回数を更新
                        compare_count++;
                        const plot_compare = compare_count;
                        setTimeout(function() {
                            plot.compare_count_update(plot_compare);
                        }, speed * swap_count * 10 + compare_count * 10);
                    }

                    while (data[j].data >= v) {
                        if (j === 0) break;

                        j--;

                        // 比較回数を更新
                        compare_count++;
                        const plot_compare = compare_count;
                        setTimeout(function() {
                            plot.compare_count_update(plot_compare);
                        }, speed * swap_count * 10 + compare_count * 10);
                    }

                    if (i >= j) break;

                    const tmp = data[i];
                    data[i] = data[j];
                    data[j] = tmp;

                    // 交換回数を更新
                    swap_count++;
                    const plot_swap = swap_count;
                    setTimeout(function() {
                        plot.swap_count_update(plot_swap);
                    }, speed * swap_count * 10);

                    // チャートを更新
                    const plot_dataset = dataset.slice();
                    setTimeout(function() {
                        plot.update(plot_dataset);
                    }, speed * swap_count * 10);
                }

                const tmp = data[i];
                data[i] = data[r];
                data[r] = tmp;

                console.log(`${i}, ${j}, swap: ${i}, ${r}`);

                // 交換回数を更新
                const plot_swap = swap_count;
                setTimeout(function() {
                    plot.swap_count_update(plot_swap);
                }, speed * swap_count * 10);

                // チャートを更新
                const plot_dataset = dataset.slice();
                setTimeout(function() {
                    plot.update(plot_dataset);
                }, speed * swap_count * 10);

                quickSort(data, l, i - 1);
                quickSort(data, i + 1, r);
            }
        };

        quickSort(dataset, 0, dataset.length - 1);
    },
};
