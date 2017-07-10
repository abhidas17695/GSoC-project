//function getSelected() {
//  if(window.getSelection) { 
//      var text= window.getSelection().toString();
//      if(text!=""){
//          //alert(text);
//          text=text.toLowerCase().split(' ').join('+');
//          chrome.runtime.sendMessage({text:text});
//      }
//  }
//  
//}

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    
    if(request.method==="getSelectionfororcid" && window.getSelection.toString()!="") {
        
      var text= window.getSelection().toString();
      if(text!=""){
          //.log('called');
          text=text.toLowerCase().split(' ').join('+');
          //.log('Message returned',text);
          //chrome.runtime.sendMessage({text:text});
          console.log('Text Sent');
          sendResponse({text:text});
          
      }
  }
});

//document.onmouseup=getSelected;
