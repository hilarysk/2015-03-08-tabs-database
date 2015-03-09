/////////////////
// MAIN SCRIPT //
/////////////////

window.onload = function() { 
  resetHiddenDivs()
  tabFunction()
}

///////////////
// FUNCTIONS //
///////////////
                                                                      
var addProduct = function() {   
  var productInfo = document.getElementById("addProductForm");         
  var req = new XMLHttpRequest;                         
  req.open("post", "http://localhost:4567/create");                    
  req.send(new FormData(productInfo));
  req.addEventListener("load", productResults);                       
}
                                                                      
                                                                      
var productResults = function(eventObject) {                                          
  var product = JSON.parse(this.response);
     //says undefined when error, so some issue with parsing this.response when hash with arrays as values? don't need to parse? not sure.
  document.getElementById("create_result").style.display = "block";
  
  if (product.worked === "yes") {
    document.getElementById("product_info").style.display = "block";
    document.getElementById("technical_specs").innerHTML = product.technical_specs;
    document.getElementById("general_info").innerHTML = product.general_info;
    document.getElementById("where_to_buy").innerHTML = product.where_to_buy;
    document.getElementById("create_message").innerHTML = "Congratulations! Your new product was successfully added.";
    document.getElementById("newProductFormDiv").style.display = "none";
  }
  
  if (product.worked != "yes") {
    document.getElementById("create_message").innerHTML = this.response;
    document.getElementById("newProductFormDiv").style.display = "none";
 
    //Can separate this out into function with argument of tech_spec vs. general_info etc.
    
    
    //THIS ISN'T WORKING BECAUSE CAN'T PARSE ERROR HASH
    // for (i = 0; i < product.technical_specs.length; i ++){
 //      var errors = document.createElement("p");
 //      var techSpecError = product.technical_specs[i];
 //      errors.innerHTML = techSpecError;
 //      document.getElementById("create_message").appendChild(errors);
 //    }
 //    for (i = 0; i < product.general_info.length; i ++){
 //      var errors = document.createElement("p");
 //      var genInfoError = product.general_info[i] + "<br>";
 //      errors.innerHTML = genInfoError;
 //      document.getElementById("create_message").appendChild(errors);
 //    }
 //    for (i = 0; i < product.where_to_buy.length; i ++){
 //      var errors = document.createElement("p");
 //      var whereBuyError = product.technical_specs[i] + "<br>";
 //      errors.innerHTML = whereBuyError;
 //      document.getElementById("create_message").appendChild(errors);
 //    }
  }
}


var resetHiddenDivs = function() {
  document.getElementById("product_info").style.display = "none";
  document.getElementById("create_result").style.display = "none";
  document.getElementById("newProductFormDiv").style.display = "block";
  document.getElementById("textarea1").innerHTML = "";
  document.getElementById("textarea2").innerHTML = "";
  document.getElementById("textarea3").innerHTML = "";
}

var getAllProductInfo = function() {
  var req = new XMLHttpRequest;                         
  req.open("get", "http://localhost:4567/view");                    
  req.send();
  req.addEventListener("load", formatAllProductInfo);
}

var formatAllProductInfo = function(eventObject) {
  var results = JSON.parse(this.response) //array of hashes
  
  for (i = 0; i < results.length; i ++){
    var list = document.createElement("li");
    var formattedProductInfo = "<strong>General information: </strong>" + results[i].general_info + 
                               "<br><strong>Where it's sold: </strong>" + results[i].where_to_buy +
                               "<br><strong>Technical specifications: </strong>" + results[i].technical_specs;
                                
    list.innerHTML = formattedProductInfo;
    
    document.getElementById("allProductsGoHere").appendChild(list);
  }

}



//Definitely can be refactored

var tabFunction = function(){
  
  //CREATE VARS FOR NAV LINKS
 
  //nav unordered list
  var navlist = document.getElementsByTagName("ul")[0]; 
 
 
  //view list item / link
  var viewLI = navlist.getElementsByTagName("li")[0];
  var viewLink = viewLI.getElementsByTagName("a")[0];
  //create list item / link
  var createLI = navlist.getElementsByTagName("li")[1];
  var createLink = createLI.getElementsByTagName("a")[0];
  //edit list item / link
  var editLI = navlist.getElementsByTagName("li")[2];
  var editLink = editLI.getElementsByTagName("a")[0];
  //delete list item / link
  var deleteLI = navlist.getElementsByTagName("li")[3];
  var deleteLink = deleteLI.getElementsByTagName("a")[0];
  
  //SET VARS FOR EACH TAB CONTENT
  
  var welcome = document.querySelector("#welcome");
  var viewTab = document.querySelector("#view");
  var createTab = document.querySelector("#create");
  var editTab = document.querySelector("#edit");
  var deleteTab = document.querySelector("#delete");
  
  //START OUT WITH WELCOME SHOWING
  
  welcome.style.display = "inline-block";
  viewTab.style.display = "none";
  editTab.style.display = "none";
  deleteTab.style.display = "none";
  createTab.style.display = "none";
  
  //LOAD EACH TAB ON-CLICK AND RE-HIDE OTHER TABS
  
  //view
  
  viewLink.onclick = function(){
    viewTab.style.display = "inline-block";
    editTab.style.display = "none";
    createTab.style.display = "none";
    deleteTab.style.display = "none";
    welcome.style.display = "none";
    
    viewLI.style.backgroundColor = "#FFFFFF";    
    editLI.style.backgroundColor = "#B0B0B0";   
    createLI.style.backgroundColor = "#B0B0B0";
    deleteLI.style.backgroundColor = "#B0B0B0"; 
    
    getAllProductInfo();
  }
  
  //create
  createLink.onclick = function(){
    resetHiddenDivs();   // Cannot figure out how to get it to reset text fields. 
    
    createTab.style.display = "inline-block";
    editTab.style.display = "none";
    deleteTab.style.display = "none";
    viewTab.style.display = "none";
    welcome.style.display = "none";

    createLI.style.backgroundColor = "#FFFFFF"; 
    editLI.style.backgroundColor = "#B0B0B0";
    deleteLI.style.backgroundColor = "#B0B0B0";
    viewLI.style.backgroundColor = "#B0B0B0";
  }
    
  //edit
    
  editLink.onclick = function(){
    editTab.style.display = "inline-block";
    createTab.style.display = "none";
    deleteTab.style.display = "none";
    viewTab.style.display = "none";
    welcome.style.display = "none";
    
    editLI.style.backgroundColor = "#FFFFFF";
    deleteLI.style.backgroundColor = "#B0B0B0";   
    createLI.style.backgroundColor = "#B0B0B0";
    viewLI.style.backgroundColor = "#B0B0B0";      
  }
  
  //delete
  
  deleteLink.onclick = function(){
    deleteTab.style.display = "inline-block";
    editTab.style.display = "none";
    createTab.style.display = "none";
    viewTab.style.display = "none";
    welcome.style.display = "none";
    
    deleteLI.style.backgroundColor = "#FFFFFF";    
    editLI.style.backgroundColor = "#B0B0B0";   
    createLI.style.backgroundColor = "#B0B0B0";
    viewLI.style.backgroundColor = "#B0B0B0";   
  }
}