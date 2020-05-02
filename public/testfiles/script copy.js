// JS APP CODE
// const marinaList = "cruisinglist_master.json";
const search = document.getElementById("search");
const result = document.getElementById("marina");
const file = "./costofliving.json";
const form = document.getElementById("form");
var max_rent_array = [];
var max_Cost_of_Living = [];
var max_CLRI = [];
var max_Groceries = [];
var max_RPI = [];
var max_PPI =[];
var maxCost;
var maxRent;
var maxCLRI;
var maxGroc;
var maxRPI;
var maxPPI;


// Fetch all JSON Data
var data;
var searchTerm;

async function getData() {
    const res = await fetch(`${file}`);
    data = await res.json();
    //Filters
    // var searchResult = [];
    // //Name Filter
    // searchResult1 = data.filter(x => x.City.includes(searchTerm));
    // //Address Filter
    // searchResult2 = data.filter(x => x.Rank.includes(searchTerm));
    // searchResult = searchResult1.concat(searchResult2);
    // // searchResult = data.filter(x => x.Address.includes(searchTerm));
    searchResult = data.filter(x => x.City.includes(searchTerm));
    showData(searchResult);
}

async function initialData() {
  const res = await fetch(`${file}`);
  dataInitial = await res.json();
  calculateIndex();
  calculateCost();
  calculateCLRI();
  calculateGroc();
  calculateRPI();
  calculatePPI();
  showData(dataInitial);
  progressCost();
  progressRent();
  progressCLRI();
  progressGroc();
  progressRPI();
  progressPPI();
}
initialData();





//pass in search result
function showData(banana) {
    let output = "";

    banana.forEach(city => {
    output += 
    // `<div class="row">
    //  <div class="col-lg-4 mb-4">
    //  <div class="card"><div class="marina_list">
    //   <span><strong>${marina.Name}</strong> - ${marina.Address} - ${marina.Country}</span> 
    // </div>
    // </div>
    // </div>
    // </div>            ${(city.Rent_Index*100/maxRent)}%

        
    `        
    <div class="col-sm-6">
                <div class="card">
                    <img class="card-img-top" loading="lazy" src="${city.Img}" alt="">
                        <div class="card-block text-center"><h2 class="card-title" class="card-block text-center">${city.Rank}. ${city.City}</h2></div>
                        <div class="card-body">
                        <h5 class="duration">Cost of Living: <div class="maxCost progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Cost_of_Living_Index*100/maxCost)}</div></h5>

                        <h5 class="duration">Rent Index: <div class="maxRent progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Rent_Index*100/maxRent)}</div></h5>
                        
                        <h5 class="duration">Cost of Living (incl. rent): <div class="maxCLRI progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Cost_of_Living_Plus_Rent_Index*100/maxCLRI)}</span></h5>
                        
                        <h5 class="duration">Groceries Index: <div class="maxGroc progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Groceries_Index*100/maxGroc)}</div></span></h5>
                        
                        <h5 class="duration">Restaurant Price Index: <div class="maxRPI progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Restaurant_Price_Index*100/maxRPI)}</div></h5>
                        
                        <h5 class="duration">Local Purchasing Power Index: <div class="maxPPI progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Local_Purchasing_Power_Index*100/maxPPI)}</div></h5>
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


// getMarinas();

// Event listeners:
form.addEventListener('submit', e => {
    e.preventDefault();
  
    searchTerm = search.value.trim();
  
    if (!searchTerm) {
      alert('Please type in a search term');
    } else {
      getData(searchTerm);
    }
  });

//animate index bars

// $('.skill-percent').each(function(){
//   $(this).animate({
//     width:$(this).attr('data-percent')},"fast");
//   });

// Find max index for each
//Find max rent
function calculateIndex(){
for (var i = 0; i<dataInitial.length; i++){ 
  var rent = dataInitial[i].Rent_Index;
  max_rent_array.push(rent);
  
}
maxRent = Math.max(...max_rent_array);

};

//Calculate max Cost of living
function calculateCost(){
  for (var i = 0; i<dataInitial.length; i++){ 
    var costs = dataInitial[i].Cost_of_Living_Index;
    max_Cost_of_Living.push(costs);    
  }
  maxCost = Math.max(...max_Cost_of_Living);
  };

function calculateCLRI(){
  for (var i = 0; i<dataInitial.length; i++){ 
    var costs = dataInitial[i].Cost_of_Living_Plus_Rent_Index;
    max_CLRI.push(costs);    
  }
  maxCLRI = Math.max(...max_CLRI);
  };

  function calculateGroc(){
    for (var i = 0; i<dataInitial.length; i++){ 
      var costs = dataInitial[i].Groceries_Index;
      max_Groceries.push(costs);    
    }
    maxGroc = Math.max(...max_Groceries);
    };
  function calculateRPI(){
    for (var i = 0; i<dataInitial.length; i++){ 
      var costs = dataInitial[i].Restaurant_Price_Index;
      max_RPI.push(costs);    
    }
    maxRPI = Math.max(...max_RPI);
    };

  function calculatePPI(){
    for (var i = 0; i<dataInitial.length; i++){ 
      var costs = dataInitial[i].Local_Purchasing_Power_Index;
      max_PPI.push(costs);    
    }
    maxPPI = Math.max(...max_PPI);
    };

//update progress bar 

// //Cost of Living
var j;
function progressCost(){
  var maxCol = document.querySelectorAll('.maxCost');

for(var j=0; j<maxCol.length; j++) {
    maxCol[j].style.width = (max_Cost_of_Living[j]*100)/maxCost+ '%';
      }
}

// Rent Index
var k;
function progressRent(){
  var maxRt = document.querySelectorAll('.maxRent');

for(var k=0; k<maxRt.length; k++) {
  maxRt[k].style.width = (max_rent_array[k]*100)/maxRent+ '%';
      }
}

// CLRI Index
var l;
function progressCLRI(){
  var maxCRI = document.querySelectorAll('.maxCLRI');

for(var l=0; l<maxCRI.length; l++) {
  maxCRI[l].style.width = (max_CLRI[l]*100)/maxCLRI+ '%';
      }
}

//Groceries Index
var m;
function progressGroc(){
  var maxGr = document.querySelectorAll('.maxGroc');

for(var m=0; m<maxGr.length; m++) {
  maxGr[m].style.width = (max_Groceries[m]*100)/maxGroc+ '%';
      }
}

//RPI Index
var n;
function progressRPI(){
  var maxRP = document.querySelectorAll('.maxRPI');

for(var n=0; n<maxRP.length; n++) {
  maxRP[n].style.width = (max_RPI[n]*100)/maxRPI+ '%';
      }
}

//PPI Index
var o;
function progressPPI(){
  var maxPP = document.querySelectorAll('.maxPPI');

for(var o=0; o<maxPP.length; o++) {
  maxPP[o].style.width = (max_PPI[o]*100)/maxPPI+ '%';
      }
}


//QOL SECTION



