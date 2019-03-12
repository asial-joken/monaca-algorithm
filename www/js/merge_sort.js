const Merge_Sort = {
    /* スピード調整機能なしのソースコード */
    /*
    sort: function(dataset) {
        let compare_count = 0;
        let swap_count = 0;
        const tmp = [];

        const mergeSort = function (data, left, right) {
            if (left < right) {
                const copyLeft = []
                const copyRight = []
                const mid = Math.floor((left + right) / 2)

                mergeSort(data, left, mid)
                mergeSort(data, mid + 1, right)

                for (let i = left; i <= mid; i++) {
                    copyLeft.push(data[i])
                }

                copyLeft.push(Number.MAX_SAFE_INTEGER)

                for (let j = mid + 1; j <= right; j++) {
                    copyRight.push(data[j])
                }

                copyRight.push(Number.MAX_SAFE_INTEGER)

                let i = 0;
                let j = 0;

                for (let k = left; k <= right; k++) {
                    if (copyLeft[i] < copyRight[j]) {
                        data[k] = copyLeft[i]
                        i += 1
                    } else {
                        data[k] = copyRight[j]
                        j += 1
                    }
                }
            }
        }

        mergeSort(0, dataset.length - 1);

        return {dataset, compare_count, swap_count};
    }
    */
    /* スピード調整機能ありのソースコード */
    sort: function(dataset, plot, speed) {
        let compare_count = 0;
        let swap_count = 0;

        const mergeSort = function(data, left, right) {
            if (left < right) {
                const copyLeft = [];
                const copyRight = [];
                const mid = Math.floor((left + right) / 2);

                mergeSort(data, left, mid);
                mergeSort(data, mid + 1, right);

                for (let i = left; i <= mid; i++) {
                    copyLeft.push(data[i]);
                }

                copyLeft.push({ data: Number.MAX_SAFE_INTEGER });

                for (let j = mid + 1; j <= right; j++) {
                    copyRight.push(data[j]);
                }

                copyRight.push({ data: Number.MAX_SAFE_INTEGER });

                let i = 0;
                let j = 0;

                for (let k = left; k <= right; k++) {
                    if (copyLeft[i].data < copyRight[j].data) {
                        data[k] = copyLeft[i];
                        i += 1;
                    } else {
                        data[k] = copyRight[j];
                        j += 1;
                    }

                    // 比較回数を更新
                    compare_count++;
                    const plot_compare = compare_count;
                    setTimeout(function() {
                        plot.compare_count_update(plot_compare);
                    }, speed * swap_count * 10 + compare_count * 10);

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
            }
        };

        mergeSort(dataset, 0, dataset.length - 1);
    },
};
