"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var chart_js_1 = require("chart.js");
chart_js_1.Chart.register.apply(chart_js_1.Chart, chart_js_1.registerables);
function bubble(v) {
    var is_ordered = false;
    var last_swap_position = v.length - 1;
    while (!is_ordered) {
        is_ordered = true;
        var j = 0;
        while (j < last_swap_position) {
            if (v[j] > v[j + 1]) {
                var aux = v[j];
                v[j] = v[j + 1];
                v[j + 1] = aux;
                is_ordered = false;
            }
            ++j;
        }
        last_swap_position -= 1;
    }
}
function insertion(v) {
    for (var i = 0; i < v.length; ++i) {
        var pos = i;
        var element = v[pos];
        while (pos > 0 && element < v[pos - 1]) {
            v[pos] = v[pos - 1];
            --pos;
        }
        v[pos] = element;
    }
}
function sort(v) {
    if (v.length < 2) {
        return v;
    }
    var pivot = v[0];
    var left_array = new Array();
    var right_array = new Array();
    for (var i = 1; i < v.length; ++i) {
        if (v[i] < pivot)
            left_array.push(v[i]);
        if (v[i] >= pivot)
            right_array.push(v[i]);
    }
    return Array.prototype.concat(sort(left_array), pivot, sort(right_array));
}
function generateReversedArray(size) {
    return Array.from({ length: size }, function (_, i) { return size - i; });
}
function generateRandomArray(size) {
    return Array.from({ length: size }, function () { return Math.floor(Math.random() * size); });
}
function measureTime(fn, arr) {
    var start = performance.now();
    fn(arr);
    var end = performance.now();
    return end - start;
}
function runTests() {
    var sizes = [1000, 10000, 100000];
    var results = {
        size: sizes,
        bubbleWorst: [],
        bubbleAverage: [],
        insertionWorst: [],
        insertionAverage: [],
        quickSortWorst: [],
    };
    for (var _i = 0, sizes_1 = sizes; _i < sizes_1.length; _i++) {
        var size = sizes_1[_i];
        var reversedArray = generateReversedArray(size);
        var randomArray = generateRandomArray(size);
        results.bubbleWorst.push(measureTime(bubble, __spreadArray([], reversedArray, true)));
        results.bubbleAverage.push(measureTime(bubble, __spreadArray([], randomArray, true)));
        results.insertionWorst.push(measureTime(insertion, __spreadArray([], reversedArray, true)));
        results.insertionAverage.push(measureTime(insertion, __spreadArray([], randomArray, true)));
        results.quickSortWorst.push(measureTime(sort, __spreadArray([], reversedArray, true)));
    }
    console.table(results);
    var ctx = document.getElementById('chart');
    new chart_js_1.Chart(ctx, {
        type: 'line',
        data: {
            labels: results.size,
            datasets: [
                {
                    label: 'Bubble Sort - Pior Caso',
                    data: results.bubbleWorst,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Bubble Sort - Caso Médio',
                    data: results.bubbleAverage,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Insertion Sort - Pior Caso',
                    data: results.insertionWorst,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Insertion Sort - Caso Médio',
                    data: results.insertionAverage,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Insertion Sort - Caso Médio',
                    data: results.quickSortWorst,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tamanho do Vetor'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Tempo de Ordenação (ms)'
                    }
                }
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', runTests);
