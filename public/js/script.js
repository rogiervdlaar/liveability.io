// JS APP CODE
const search = document.getElementById("search");
const result = document.getElementById("marina");
const file = "./QualityOfLife.json";
const form = document.getElementById("form");
let maxQOL;
let maxPPI;
let maxCOLI;
let maxSafety;
let maxHC;
let maxPPIR;
let maxTraffic;
let maxPol;
let maxClimate;

//calc arrays
const Arraymax_QOL = [];
const ArraymaxPPI = [];
const ArraymaxSafety = [];
const ArraymaxHC = [];
const ArraymaxCOLI = [];
const ArraymaxPPIR = [];
const ArraymaxTraffic = [];
const ArraymaxPol = [];
const ArraymaxClimate = [];


// Fetch all JSON Data
var dataInitial = "";
var searchTerm = "";
var QOLFilter = $('#ex1').val();
var PPFilter = $('#ex2').val();
var COLIFilter = $('#ex3').val();
var SafetyFilter = $('#ex4').val();
var HealthFilter = $('#ex5').val();
var PPIRFilter = $('#ex6').val();
var TrafficFilter = $('#ex7').val();
var PolFilter = $('#ex8').val();
var ClimateFilter = $('#ex9').val();
var searchResult = [];

// async function initialData() {
//   const res = await fetch(`${file}`);
//   dataInitial = await res.json();
//   calculateAll();
//   showData(dataInitial);
//   progressAll();
// }
// initialData();

async function getData() {
    const res = await fetch(`${file}`);
    dataInitial = await res.json();
    //Filters
    // searchResult = data.filter(x => x.Quality_of_Life_Index*100/maxQOL > 60 && x.City.includes(searchTerm));
    // searchResult = searchResult1.filter(x => x.Quality_of_Life_Index > QOLFilter)
    searchResult = dataInitial.filter(function (el) {
                 return el.Quality_of_Life_Index*100/maxQOL <= QOLFilter &&
                        el.Purchasing_Power_Index*100/maxPPI <= PPFilter &&
                        el.Cost_of_Living_Index*100/maxCOLI <= COLIFilter &&
                        el.Safety_Index*100/maxSafety <= SafetyFilter &&
                        el.Health_Care_Index*100/maxHC <= HealthFilter &&
                        el.Property_Price_to_Income_Ratio*100/maxPPIR <= PPIRFilter &&
                        el.Traffic_Commute_Time_Index*100/maxTraffic <= TrafficFilter &&
                        el.Pollution_Index*100/maxPol <= PolFilter &&
                        el.Climate_Index*100/maxClimate <= ClimateFilter
    })
    searchResult = searchResult.filter(x => x.City.toLowerCase().includes(searchTerm));
    
    calculateAll();
    showData(searchResult);
    progressAll();
}

//pass in search result
function showData(banana) {
    let output = "";

    banana.forEach(city => {
    output += 
        
    `        
    <div class="col-sm-6">
                <div class="card">
                    <img class="card-img-top" loading="lazy" src="${city.Img}" alt="">
                        <div class="card-block text-center"><h2 class="card-title" class="card-block text-center">${city.Rank}. ${city.City}</h2></div>
                        <div class="card-body">
                        <h5 class="duration">⛱️ Quality of Life: <div class="maxQOL progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Quality_of_Life_Index*100/maxQOL)}</div></h5>
                        
                        <h5 class="duration">💳 Purchasing Power Index: <div class="maxPPI progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Purchasing_Power_Index*100/maxPPI)}</div></h5>

                        <h5 class="duration">🚓 Safety: <div class="maxSafety progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Safety_Index*100/maxSafety)}</div></h5>

                        <h5 class="duration">⚕️ Health Care: <div class="maxHC progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Health_Care_Index*100/maxHC)}</div></h5>

                        <h5 class="duration">💰 Cost of Living: <div class="maxCOLI progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Cost_of_Living_Index*100/maxCOLI)}</div></h5>
                        
                        <h5 class="duration">🏠 Property Price to income: <div class="maxPPIR progress-bar" role="progressbar" aria-valuenow="10"
                        aria-valuemin="0" aria-valuemax="10" style="width: 0%">${Math.round(city.Property_Price_to_Income_Ratio)}</span></h5>
                        
                        <h5 class="duration">🚦 Traffic: <div class="maxTraffic progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Traffic_Commute_Time_Index*100/maxTraffic)}</div></span></h5>
                        
                        <h5 class="duration">🏭 Pollution: <div class="maxPol progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Pollution_Index*100/maxPol)}</div></h5>
                        
                        <h5 class="duration">🌲 Climate: <div class="maxClimate progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Climate_Index*100/maxClimate)}</div></h5>
                    </div>
                </div>
            </div>
    `
    });

    result.innerHTML = 
    `
    <div class="row">

    ${output}
    </div>

    `;
};

// Event listeners:
form.addEventListener('submit', e => {
    e.preventDefault();
    searchTerm = search.value.toLowerCase();
    getData(searchTerm);
  });


//Progress bars calc
//All

function calculateAll(){
calculateQOL();
calculatePPI();
calculateSafety();
calculateHC();
calculateCOLI();
calculatePPIR();
calculateTraffic();
calculatePol();
calculateClimate();
}

function progressAll(){
progressQOL();
progressPPI();
progressSafety();
progressHC();
progressCOLI();
progressPPIR();
progressTraffic();
progressPol();
progressClimate();
}


//animate index bars




// Find max index for each
//Find max for all
function calculateQOL(){
for (var i = 0; i<dataInitial.length; i++){ 
  var num = dataInitial[i].Quality_of_Life_Index;
  Arraymax_QOL.push(num);  
}
function test (){console.log(Arraymax_QOL)};
maxQOL = Math.max(...Arraymax_QOL);
};


//Calculate max Cost of living
function calculatePPI(){
  for (var i = 0; i<dataInitial.length; i++){ 
    var num = dataInitial[i].Purchasing_Power_Index;
    ArraymaxPPI.push(num);    
  }
  maxPPI = Math.max(...ArraymaxPPI);
  };

function calculateSafety(){
  for (var i = 0; i<dataInitial.length; i++){ 
    var num = dataInitial[i].Safety_Index;
    ArraymaxSafety.push(num);    
  }
  maxSafety = Math.max(...ArraymaxSafety);
  };

  function calculateHC(){
    for (var i = 0; i<dataInitial.length; i++){ 
      var num = dataInitial[i].Health_Care_Index;
      ArraymaxHC.push(num);    
    }
    maxHC = Math.max(...ArraymaxHC);
    };
  function calculateCOLI(){
    for (var i = 0; i<dataInitial.length; i++){ 
      var num = dataInitial[i].Cost_of_Living_Index;
      ArraymaxCOLI.push(num);    
    }
    maxCOLI = Math.max(...ArraymaxCOLI);
    };

  function calculatePPIR(){
    for (var i = 0; i<dataInitial.length; i++){ 
      var num = dataInitial[i].Property_Price_to_Income_Ratio;
      ArraymaxPPIR.push(num);    
    }
    maxPPIR = Math.max(...ArraymaxPPIR);
    };

  function calculateTraffic(){
    for (var i = 0; i<dataInitial.length; i++){ 
      var num = dataInitial[i].Traffic_Commute_Time_Index;
      ArraymaxTraffic.push(num);    
    }
    maxTraffic = Math.max(...ArraymaxTraffic);
    };
  function calculatePol(){
    for (var i = 0; i<dataInitial.length; i++){ 
      var num = dataInitial[i].Pollution_Index;
      ArraymaxPol.push(num);    
    }
    maxPol = Math.max(...ArraymaxPol);
    };

  function calculateClimate(){
    for (var i = 0; i<dataInitial.length; i++){ 
      var num = dataInitial[i].Climate_Index;
      ArraymaxClimate.push(num);    
    }
    maxClimate = Math.max(...ArraymaxClimate);
    };

//update progress bar 

//BUG: ON SLIDE CANNOT READ dataInitial output so QOL/max.

// //Cost of Living
var j;
function progressQOL(){
  var Qol = document.getElementsByClassName('maxQOL');
for(var j=0; j<Qol.length; j++) {
  var ratio = Qol[j].innerText;
  Qol[j].style.width = ratio+'%';
  }
}
// dataInitial[j].Quality_of_Life_Index*100/maxQOL
// Rent Index
var k;
function progressPPI(){
  var PPI = document.getElementsByClassName('maxPPI');
for(var k=0; k<PPI.length; k++) {
  var ratio = PPI[k].innerText;
  PPI[k].style.width = ratio+ '%';
      }
}

// Safety Index
var l;
function progressSafety(){
  var Safety = document.getElementsByClassName('maxSafety');
for(var l=0; l<Safety.length; l++) {
  var ratio = Safety[l].innerText;
  Safety[l].style.width = ratio+ '%';
  }
}

//Groceries Index
var m;
function progressHC(){
  const HC = document.getElementsByClassName('maxHC');
for(var m=0; m<HC.length; m++) {
  var ratio = HC[m].innerText;
  HC[m].style.width = ratio+'%';
      }
}

//RPI Index
var n;
function progressCOLI(){
  var COLI = document.getElementsByClassName('maxCOLI');
for(var n=0; n<COLI.length; n++) {
  var ratio = COLI[n].innerText;
  COLI[n].style.width = ratio+ '%';
      }
}

//PPI Index
var o;
function progressPPIR(){
  var PPIR = document.getElementsByClassName('maxPPIR');
for(var o=0; o<PPIR.length; o++) {
  var ratio = PPIR[o].innerText;
  PPIR[o].style.width = (ratio*100/47)+ '%';
      }
}

var p;
function progressTraffic(){
  var Traffic = document.getElementsByClassName('maxTraffic');
for(var p=0; p<Traffic.length; p++) {
  var ratio = Traffic[p].innerText;
  Traffic[p].style.width = ratio+ '%';
      }
}

var q;
function progressPol(){
  var Pol = document.getElementsByClassName('maxPol');
for(var q=0; q<Pol.length; q++) {
  var ratio = Pol[q].innerText;
  Pol[q].style.width = ratio+ '%';
      }
}

var r;
function progressClimate(){
  var Climate = document.getElementsByClassName('maxClimate');
for(var r=0; r<Climate.length; r++) {
  var ratio = Climate[r].innerText;
  Climate[r].style.width = ratio+ '%';
      }
}


//QOL SECTION

// //Weather
// const url = "http://api.openweathermap.org/data/2.5/weather?";
// //lat={lat}&lon={lon}
// const key = "&appid=a87ae803577428dbda6ec98b6dafbeec";

// var num;
// var num2;
// var weatherArray =[];
// async function getWeather(){
//   for (var i = 0; i<50; i++){ 
//     var num = dataInitial[i].Lat;
//     var num2 = dataInitial[i].Lon;         
//   var res = await fetch(`${url}lat=${num}&lon=${num2}${key}`);
//   var weatherdata = await res.json();
//   weatherArray.push(weatherdata);

// }
// console.log(weatherArray);
// }

//Sliders
//Quality of Life
$('#ex1').on('change', function(e) {
  QOLFilter = e.target.value;
  document.getElementById("ex1Val").innerHTML = QOLFilter;
  $('#ex1').value = QOLFilter;
  getData();
});
$('#ex1').change();

//Cost of Living
$('#ex2').on('change', function(e) {
  PPFilter = e.target.value;
  document.getElementById("ex2Val").innerHTML = PPFilter;
  $('#ex2').value = PPFilter;
  getData();
});
$('#ex2').change();

//
$('#ex3').on('change', function(e) {
  COLIFilter = e.target.value;
  document.getElementById("ex3Val").innerHTML = COLIFilter;
  $('#ex3').value = COLIFilter;
  getData();
});
$('#ex3').change();
//
$('#ex4').on('change', function(e) {
  SafetyFilter = e.target.value;
  document.getElementById("ex4Val").innerHTML = SafetyFilter;
  $('#ex4').value = SafetyFilter;
  getData();
});
$('#ex4').change();
//
$('#ex5').on('change', function(e) {
  HealthFilter = e.target.value;
  document.getElementById("ex5Val").innerHTML = HealthFilter;
  $('#ex5').value = HealthFilter;
  getData();
});
$('#ex5').change();
//
$('#ex6').on('change', function(e) {
  PPIRFilter = e.target.value;
  document.getElementById("ex6Val").innerHTML = PPIRFilter;
  $('#ex6').value = PPIRFilter;
  getData();
});
$('#ex6').change();
//
$('#ex7').on('change', function(e) {
  TrafficFilter = e.target.value;
  document.getElementById("ex7Val").innerHTML = TrafficFilter;
  $('#ex7').value = TrafficFilter;
  getData();
});
$('#ex7').change();
//
$('#ex8').on('change', function(e) {
  PolFilter = e.target.value;
  document.getElementById("ex8Val").innerHTML = PolFilter;
  $('#ex8').value = PolFilter;
  getData();
});
$('#ex8').change();
//
$('#ex9').on('change', function(e) {
  ClimateFilter = e.target.value;
  document.getElementById("ex9Val").innerHTML = ClimateFilter;
  $('#ex9').value = ClimateFilter;
  getData();
});
$('#ex9').change();

//add more filters in 3 blocks of three
// add more info per city
// add visa links (visahunter?)
// add climate and weather info
// add job references 
// add country information
// sign up page for favourite city
// launch initia;

// var toggleFilter = document.getElementById('toggleFilter');
// toggleFilter.addEventListener('click', toggleFilterDisplay);

  function toggleFilterDisplay() {
  var x = document.getElementById('toggle-sliders');
  if(x.classList.contains("off")){setInterval
  x.classList.remove("off");
  x.classList.add("container-flex-on");
  
}
  else { x.classList.remove("container-flex-on");
  x.classList.add("off");
  };
}

var name = document.getElementsByName('name');
// var email = document.getElementsByName('email');
var feature = document.getElementsByName('feature');