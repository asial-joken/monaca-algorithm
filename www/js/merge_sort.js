const Merge_Sort = {
    /* スピード調整機能なしのソースコード */
    /*
    sort: function(dataset) {
        let compare_count = 0;
        let swap_count = 0;
        const tmp = [];

        const sortFunc = (start, end) => {
            if (start >= end) return;

            let center = Math.floor((start + end) / 2);
            sortFunc(start, center);
            sortFunc(center + 1, end);

            let l = 0;

            for (let i = start; i <= center; i++) {
                tmp[l++] = dataset[i];
            }

            let i = center + 1,
                j = 0,
                k = start;

            while (i <= end && j < l) {
                dataset[k++] =
                    tmp[j].data <= dataset[i].data ? tmp[j++] : dataset[i++];
                compare_count++;
                swap_count++;
            }

            while (j < l) {
                dataset[k++] = tmp[j++];
            }
        };

        sortFunc(0, dataset.length - 1);

        return {dataset, compare_count, swap_count};
    },
    */

    /* スピード調整機能ありのソースコード */
    sort: function(dataset, plot, speed) {
        let compare_count = 0;
        let swap_count = 0;
        const tmp = [];

        const sortFunc = (start, end) => {
            if (start >= end) return;

            let center = Math.floor((start + end) / 2);
            sortFunc(start, center);
            sortFunc(center + 1, end);

            let l = 0;

            for (let i = start; i <= center; i++) {
                tmp[l++] = dataset[i];
            }

            let i = center + 1,
                j = 0,
                k = start;

            while (i <= end && j < l) {
                dataset[k++] =
                    tmp[j].data <= dataset[i].data ? tmp[j++] : dataset[i++];

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

            while (j < l) {
                dataset[k++] = tmp[j++];
            }
        };

        sortFunc(0, dataset.length - 1);
    },
};
