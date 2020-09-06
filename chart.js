let ctx = document.getElementById('myChart');
let queryCount = document.getElementById('countQuery');
let errorCount = document.getElementById('countError');
let postId = 1;
let error = 0;
let prev;

let data = {
    labels: [],
    datasets: [{
        label: 'График загруженности процессора',
        backgroundColor: 'rgb(245,94,127)',
        borderColor: 'rgb(255, 99, 132)',
        data: []
    }]
};

let options = {
    responsive: true,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            }
        }]
    }
};

let chart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
});

function addData(data){

    chart.data.labels.push(postId++);
    chart.data.datasets[0].data.push(data);
    chart.update();

    queryCount.innerHTML = postId - 1;
    errorCount.innerHTML = error/(postId - 1);
}

 let getData = async function ()  {

     let url = 'http://exercise.develop.maximaster.ru/service/cpu/';

     let response = await fetch(url);

     if (response.ok) {
         let json = await response.json();
         addData(json);
         prev = json;
     } else {
         console.log(response.status);
         error++;
         addData(prev)
     }
 }

setInterval(getData, 5000);