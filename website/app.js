/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='; //'id=524901'

const apiKey = '&appid=a5a8de631de85a25015d8769cddadae2&units=metric';
//console.log(baseURL+zipCode+apiKey);
document.getElementById('generate').addEventListener('click', performAction);
nodes("Date:",'date')
nodes("Temp:",'temp')
nodes("Feeling:",'content')

function nodes(data,id){
  var node = document.createElement("DIV");
  node.setAttribute('id',id)
 // var textnode = document.createTextNode(data);         // Create a text node

  //node.appendChild(textnode);
  document.getElementById('entryHolder').appendChild(node)
}

  function performAction(e){  
    getWeather(baseURL, apiKey)
  }


  async function getWeather (baseURL, key){
    try {
    let zipCode=document.getElementById('zip').value; //'10001';
    if (!zipCode){
      alert('please enter the zip code')
      return
    }
    const res = await fetch(baseURL+zipCode+key)
    console.log(res)
 
    let data = await res.json();
    console.log(data)
    console.log(data.main.temp)
    if(data.main.temp){
      Weather(data.main.temp)
    }
    //return data.main.temp;
  
    
      // 1. We can do something with our returned data here-- like chain promises!

    }  catch(error) {
      // appropriately handle the error
      console.log("error", error);
      if (error=="TypeError: Cannot read property 'temp' of undefined"){
        alert('city not found')
      }
    }
  }
  
  async function Weather (temp){
      let feeling=document.getElementById('feelings').value;
      let d = new Date();
    //  let day=parseInt(d.getDate())+1;
    //let day = new Date();
     let  day=(d.getMonth() + 1);
      let newDate = day+'.'+ d.getDate()+'.'+ d.getFullYear();
      
  if (!feeling){
    feeling="No Feeling";
  }
  const response =await fetch('/postData',{
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', 
   
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( {
      temp:temp,
      feelings:feeling,
      date:newDate,
    } 
      ), // body data type must match "Content-Type" header 
             
    });
    try {
      const newData = await response.json();
     console.log( newData);

    }catch(error) {
    console.log("error", error);
    }


  const res=await fetch('/get',{
     // method: 'GET', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', 
     
             
      });
      try {
        const newData2 = await res.json();
       console.log( newData2);
       document.getElementById('date').innerHTML="Date:"+newData2.date;
       document.getElementById('temp').innerHTML="Temp:"+newData2.temp+" "+"C";
       document.getElementById('content').innerHTML="Feeling:"+newData2.feeling;
      }catch(error) {
      console.log("error", error);
      }
  

    }
  

// Create a new date instance dynamically with JS
