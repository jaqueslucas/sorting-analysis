"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chart_js_1 = require("chart.js");
var worker_1 = require("worker-loader!./worker");
chart_js_1.Chart.register.apply(chart_js_1.Chart, chart_js_1.registerables);
function runTests() {
    var sizes = [1000, 10000, 100000];
    var worker = new worker_1.default();
    worker.onmessage = function (event) {
        var results = event.data;
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
    };
    worker.postMessage(sizes);
}
document.addEventListener('DOMContentLoaded', runTests);
