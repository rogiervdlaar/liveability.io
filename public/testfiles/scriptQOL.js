// JS APP CODE
// const marinaList = "cruisinglist_master.json";
const search2 = document.getElementById("search2");
const result2 = document.getElementById("marina2");
const file2 = "./QualityOfLife.json";
const form2 = document.getElementById("form2");
// var max_rent_array = [];
// var max_Cost_of_Living = [];
// var max_CLRI = [];
// var max_Groceries = [];
// var max_RPI = [];
// var max_PPI =[];
// var maxCost;
// var maxRent;
// var maxCLRI;
// var maxGroc;
// var maxRPI;
// var maxPPI;


// Fetch all JSON Data
var data;
var searchTerm;

async function getDataQOL() {
    const res = await fetch(`${file2}`);
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

async function initialDataQOL() {
  const res = await fetch(`${file2}`);
  dataInitial = await res.json();
  // calculateIndex();
  // calculateCost();
  // calculateCLRI();
  // calculateGroc();
  // calculateRPI();
  // calculatePPI();
  showData2(dataInitial);
  // progressCost();
  // progressRent();
  // progressCLRI();
  // progressGroc();
  // progressRPI();
  // progressPPI();
}
initialDataQOL();





//pass in search result
function showData2(banana) {
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
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Quality_of_Life_Index)}</div></h5>

                        <h5 class="duration">Rent Index: <div class="maxRent progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.SafetyIndex)}</div></h5>
                        
                        <h5 class="duration">Cost of Living (incl. rent): <div class="maxCLRI progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Climate_Index)}</span></h5>

                        <h5 class="duration">Cost of Living (incl. rent): <div class="maxCLRI progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Health_Care_Index)}</span></h5>

                        <h5 class="duration">Cost of Living (incl. rent): <div class="maxCLRI progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="width: 0%">${Math.round(city.Pollution_Index)}</span></h5>
                        
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
form2.addEventListener('submit', e => {
    e.preventDefault();
  
    searchTerm = search2.value.trim();
  
    if (!searchTerm) {
      alert('Please type in a search term');
    } else {
      getDataQOL(searchTerm);
    }
  });