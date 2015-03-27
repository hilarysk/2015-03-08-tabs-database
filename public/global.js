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

var deleteProduct = function() {   
  var productId = document.getElementById("deleteProductForm");         
  var req = new XMLHttpRequest;                         
  req.open("post", "http://localhost:4567/delete");                    
  req.send(new FormData(productId));
  req.addEventListener("load", deleteProductResults);                       
}


var deleteProductResults = function() { 
  document.getElementById("delete_result").style.display = "block";
  document.getElementById("deleteDropdown").style.display = "none";
  document.getElementById("delete_result").innerHTML = "<p><strong>The product was sucessfully deleted.</strong></p>";
}
                                                                      
var addProduct = function(secondFunction) {   
  var productInfo = document.getElementById("addProductForm");         
  var req = new XMLHttpRequest;                         
  req.open("post", "http://localhost:4567/add");                  
  req.send(new FormData(productInfo));
  req.addEventListener("load", secondFunction);                       
}    

var findErrorMessages = function(key, parsedResponse) {
  if (parsedResponse[key] != undefined){
    for (i = 0; i < parsedResponse[key].length; i++){
      var errors = document.createElement("p");
      var specificError = parsedResponse[key][i];
      errors.innerHTML = specificError;
      document.getElementById("create_message").appendChild(errors);
    }
  }
}                                                                  
                                                                      
var productResults = function(eventObject) {                                         
  var product = JSON.parse(this.response);

  document.getElementById("create_result").style.display = "block";
  
  if (product.worked === "yes") {
    document.getElementById("product_info").style.display = "block";
    document.getElementById("technical_specs").innerHTML = product.technical_specs;
    document.getElementById("general_info").innerHTML = product.general_info;
    document.getElementById("where_to_buy").innerHTML = product.where_to_buy;
    document.getElementById("create_message").innerHTML = "Congratulations! Your new product was successfully added.";
    document.getElementById("addProductForm").reset(); 
  }
  
  if (product.worked != "yes") {
    document.getElementById("create_message").innerHTML = "<p class='errornote'><br><strong>ERROR</strong></p>"
    
    findErrorMessages("technical_specs", product);
    findErrorMessages("general_info", product);
    findErrorMessages("where_to_buy", product);
  }
}

//RESETS VALUES TO DEFAULT

var resetHiddenDivs = function() {
  document.getElementById("product_info").style.display = "none";
  document.getElementById("create_result").style.display = "none";
  document.getElementById("newProductFormDiv").style.display = "block";
  document.getElementById("delete_result").style.display = "none";
  document.getElementById("deleteDropdown").style.display = "block";
  document.getElementById("addProductForm").reset();
  document.getElementById("deleteProductForm").reset(); //is order going to be an issue here?
  getAllProductInfo(productLoop);
  document.getElementById("selectDelete").innerHTML = "";
  getAllProductInfo(formatAllProductInfo);
  document.getElementById("allProductsGoHere").innerHTML = "";
}

//XHR FOR ALL VIEW OF ALL PRODUCTS IN DATABASE

var getAllProductInfo = function(secondFunction) {
  var req = new XMLHttpRequest;                         
  req.open("get", "http://localhost:4567/view");                    
  req.send();
  req.addEventListener("load", secondFunction);
}

// FORMATS EACH PRODUCT IN DATABASE

var formatAllProductInfo = function(eventObject) {
  var results = JSON.parse(this.response); //array of hashes
  for (i = 0; i < results.length; i ++){
    var list = document.createElement("li");
    var formattedProductInfo = "<strong>General information: </strong>" + results[i].general_info + 
                               "<br><strong>Where it's sold: </strong>" + results[i].where_to_buy +
                               "<br><strong>Technical specifications: </strong>" + results[i].technical_specs;
                                
    list.innerHTML = formattedProductInfo;
    
    document.getElementById("allProductsGoHere").appendChild(list);
  }

}

//LOOPS THROUGH PRODUCTS SO YOU CAN PICK NAME AND IT SENDS ID

var productLoop = function(eventObject) {
  var results = JSON.parse(this.response);
  
  for (i = 0; i < results.length; i++){
    var option = document.createElement("option");
    option.value = results[i].id;
    option.text = results[i].general_info;
    
    document.getElementById("selectDelete").appendChild(option);
  }
}

//MAIN TAB FUNCTION

var tabFunction = function(){
   //array of nav list items (tab buttons)
  
  var listItems = [document.getElementById("viewLI"), document.getElementById("editLI"),
                   document.getElementById("addLI"), document.getElementById("deleteLI")]
  
  //function to changee color of active tab button
  
  var changeColorActiveTabButton = function(activeTab){
    for (i = 0; i < listItems.length; i++){
      if (listItems[i] === document.getElementById(activeTab + "LI")){
          listItems[i].className = "tab active";
      }
      else {
        listItems[i].className = "tab inactive";
      }
    }
  }
  
  //tab contents array
  
  var tabContents = [document.querySelector("#welcome"), document.querySelector("#view"), 
                     document.querySelector("#add"), document.querySelector("#edit"), 
                     document.querySelector("#delete")]

  //function to display active tab
  
  var displayActiveTab = function(activeTab){
    for (i = 0; i < tabContents.length; i++){
      if (tabContents[i] === document.querySelector("#" + activeTab)){
        tabContents[i].style.display = "inline-block";
      }
      else {
        tabContents[i].style.display = "none";
      }
    }
  }
    
  //START OUT WITH WELCOME SHOWING
  
  displayActiveTab("welcome");
  
  //COULD PROBABLY REFACTOR THIS TOO
  
  //view
  
  document.getElementById("viewLink").onclick = function(){
    resetHiddenDivs();
    displayActiveTab("view");
    changeColorActiveTabButton("view");
  }
  
  //add
  document.getElementById("addLink").onclick = function(){
    resetHiddenDivs(); 
    displayActiveTab("add");
    changeColorActiveTabButton("add");
  }
    
  //edit
    
  document.getElementById("editLink").onclick = function(){
    resetHiddenDivs();
    displayActiveTab("edit");
    changeColorActiveTabButton("edit");      
  }
  
  //delete
  
  document.getElementById("deleteLink").onclick = function(){
    resetHiddenDivs();
    displayActiveTab("delete");
    changeColorActiveTabButton("delete");    
  }
}