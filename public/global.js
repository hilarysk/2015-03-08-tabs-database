window.onload = function() {
  
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
  
  var viewTab = document.querySelector("#view");
  var createTab = document.querySelector("#create");
  var editTab = document.querySelector("#edit");
  var deleteTab = document.querySelector("#delete");
  
  //START OUT WITH VIEW TAB SHOWING
  
  viewLI.style.backgroundColor = "#FFFFFF";
  viewTab.style.display = "inline-block";
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
    
    viewLI.style.backgroundColor = "#FFFFFF";    
    editLI.style.backgroundColor = "#B0B0B0";   
    createLI.style.backgroundColor = "#B0B0B0";
    deleteLI.style.backgroundColor = "#B0B0B0";   
  }
  
  //create
  createLink.onclick = function(){
    createTab.style.display = "inline-block";
    editTab.style.display = "none";
    deleteTab.style.display = "none";
    viewTab.style.display = "none";

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
    
    deleteLI.style.backgroundColor = "#FFFFFF";    
    editLI.style.backgroundColor = "#B0B0B0";   
    createLI.style.backgroundColor = "#B0B0B0";
    viewLI.style.backgroundColor = "#B0B0B0";   
  }
}