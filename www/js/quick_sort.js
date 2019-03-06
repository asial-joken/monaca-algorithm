const Quick_Sort = {
    /* スピード調整機能なしのソースコード */
    /*
    sort: function(dataset) {
        let compare_count = 0;
        let swap_count = 0;

        const sortFunc = (start, end) => {
            const x = dataset[Math.floor((start + end) / 2)].data;
            let i = start;
            let j = end;

            while (true) {
                while (dataset[i].data < x) {
                    i++;
                    compare_count++;
                }

                while (x < dataset[j].data) {
                    j--;
                    compare_count++;
                }

                if (i >= j) break;

                const n = dataset[i];
                dataset[i] = dataset[j];
                dataset[j] = n;

                swap_count++;
                i++;
                j--;
            }

            if (start < i - 1) sortFunc(start, i - 1);
            if (j + 1 < end) sortFunc(j + 1, end);
        };

        sortFunc(0, dataset.length - 1);

        return { dataset, compare_count, swap_count };
    },
    */
    /* スピード調整機能ありのソースコード */
    sort: function(dataset, plot, speed) {
        let compare_count = 0;
        let swap_count = 0;

        const sortFunc = (start, end) => {
            const x = dataset[Math.floor((start + end) / 2)].data;
            let i = start;
            let j = end;

            while (true) {
                while (dataset[i].data < x) {
                    i++;

                    // 比較回数を更新
                    compare_count++;
                    const plot_compare = compare_count;
                    setTimeout(function() {
                        plot.compare_count_update(plot_compare);
                    }, speed * swap_count * 10 + compare_count * 10);
                }

                while (x < dataset[j].data) {
                    j--;

                    // 比較回数を更新
                    compare_count++;
                    const plot_compare = compare_count;
                    setTimeout(function() {
                        plot.compare_count_update(plot_compare);
                    }, speed * swap_count * 10 + compare_count * 10);
                }

                if (i >= j) break;

                const n = dataset[i];
                dataset[i] = dataset[j];
                dataset[j] = n;

                swap_count++;
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

                i++;
                j--;
            }

            if (start < i - 1) sortFunc(start, i - 1);
            if (j + 1 < end) sortFunc(j + 1, end);
        };

        sortFunc(0, dataset.length - 1);
    },
};
