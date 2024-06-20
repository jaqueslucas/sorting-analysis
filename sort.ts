import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function bubble<T>(v: T[]): void {
    let is_ordered = false;
    let last_swap_position = v.length - 1;
    while (!is_ordered) {
        is_ordered = true;
        let j = 0;
        while (j < last_swap_position) {
            if (v[j] > v[j + 1]) {
                let aux = v[j];
                v[j] = v[j + 1];
                v[j + 1] = aux;
                is_ordered = false;
            }
            ++j;
        }
        last_swap_position -= 1;
    }
}

function insertion<T>(v: T[]): void {
    for (let i = 0; i < v.length; ++i) {
        let pos = i;
        let element = v[pos];
        while (pos > 0 && element < v[pos - 1]) {
            v[pos] = v[pos - 1];
            --pos;
        }
        v[pos] = element;
    }
}

function generateReversedArray(size: number): number[] {
    return Array.from({ length: size }, (_, i) => size - i);
}

function generateRandomArray(size: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * size));
}

function measureTime(fn: (arr: number[]) => void, arr: number[]): number {
    const start = performance.now();
    fn(arr);
    const end = performance.now();
    return end - start;
}

function runTests() {
    const sizes = [1000, 10000, 100000];
    const results = {
        size: sizes,
        bubbleWorst: [] as number[],
        bubbleAverage: [] as number[],
        insertionWorst: [] as number[],
        insertionAverage: [] as number[]
    };

    for (const size of sizes) {
        const reversedArray = generateReversedArray(size);
        const randomArray = generateRandomArray(size);

        results.bubbleWorst.push(measureTime(bubble, [...reversedArray]));
        results.bubbleAverage.push(measureTime(bubble, [...randomArray]));

        results.insertionWorst.push(measureTime(insertion, [...reversedArray]));
        results.insertionAverage.push(measureTime(insertion, [...randomArray]));
    }

    console.table(results);

    const ctx = document.getElementById('chart') as HTMLCanvasElement;
    new Chart(ctx, {
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
}

document.addEventListener('DOMContentLoaded', runTests);
