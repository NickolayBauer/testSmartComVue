import {
    Line
} from 'vue-chartjs'

export default {
    extends: Line,
    props: {
        graph: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.renderChart({
            labels: this.graph.map(function (elem) {
                return elem.title.length
            }),
            datasets: [{
                label: 'Количество символов в title',
                borderColor: "#4772A3",
                pointBorderColor: "#4772A3",
                pointBackgroundColor: "#4772A3",
                pointHoverBackgroundColor: "#4772A3",
                pointHoverBorderColor: "#4772A3",
                pointBorderWidth: 7,
                pointHoverRadius: 7,
                pointHoverBorderWidth: 3,
                pointRadius: 1,
                fill: false,
                borderWidth: 4,
                data: this.graph.map(function (elem) {
                    return elem.title.length
                }),
            }]
        })
    }
}