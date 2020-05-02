//Image variables
var url = "https://unsplash.com/s/photos"
var orientation = "?orientation=landscape"

  var cityList = [];
  var urlList = [];
  var ListofLists = [];

//Get Images


async function getCities() {
    //get list of all cities
    const res = await fetch(`${file}`);
    cities = await res.json();
    for(var i = 0; i < cities.length; i++){
    var City = cities[i].City.split(",").shift();
    cityList.push(City);
    }
    //create all urls
    for (var i = 0; i < cityList.length; i++){
      var urlistResult = `${url}/${cityList[i]}+${orientation}`
      urlList.push(urlistResult);
      // console.log(`${url}+${cityList[i]}+${orientation}`);
      // console.log(urlList);
    }
    //Loop through the urlList and find IMG url
    for (var i = 0; i < urlList.length; i++){
    // var imgRequest = await fetch(urlList[i]);
    var html = (await (await fetch(urlList[i])).text());
    if (html.status != 200 && html.status <= 299) {
    html = ""}; 
    // else {
    //   // Handle errors
    //   console.log(html.status, html.statusText);
    // }
    var doc = new DOMParser().parseFromString(html, 'text/html');   
    if(!doc.querySelector("._2zEKz")){
      var link = "";
    }
    else {var link = doc.querySelector("._2zEKz")}
    var img = link.src;
    ListofLists.push(img);
    }


}

getCities();





