var bookstyle = document.createElement('link');
bookstyle.rel = 'stylesheet';
bookstyle.type = 'text/css';
bookstyle.href = chrome.extension.getURL('css/bookstyle.css');
document.head.appendChild(bookstyle);

var myProgess=document.createElement('div');
myProgess.setAttribute('id','myProgress');
var myBar=document.createElement('div');
myBar.setAttribute('id','myBar');
myBar.innerHTML="";
myProgess.appendChild(myBar);
document.body.appendChild(myProgess);

function updateProgress(percent,myProgress,myBar){
    //console.log(totalNum,count,percent);
    var elem =myBar;   
    var width = percent;
    elem.style.width = width + '%'; 
    elem.innerHTML = width * 1  + '%';
    if(count>=totalNum && percent<=100){
        myBar.innerHTML="Complete !";
        setTimeout(function(){document.body.removeChild(myProgress);},1000);
    }
    
    
  
}

//function getSelectedText(eventObj){
//    var elem=eventObj.target;
//    
//    if(window.getSelection) { 
//      var text= window.getSelection().toString();
//      if(text!=""){
//          
//          var text=text.trim();
//          for(var i=0;i<text.length;i++){
//              if(text.charAt(i)=="\""){
//                  
//                  text=text.slice(0, i) + text.slice(i+1, text.length);
//                  break;
//              }
//          }
//          for(var i=text.length-1;i>=0;i--){
//              if(text.charAt(i)=="\""){
//                  
//                  text=text.slice(0, i) + text.slice(i+1, text.length);
//                  break;
//              }
//          }
//          console.log(text);
//          //chrome.runtime.sendMessage({text:text});
//          var xhr=new XMLHttpRequest();
//          xhr.open("GET","https://archive.org/details/texts?&and[]="+text, true);
//          
//          makeReqforBookNames(xhr,text,window.getSelection(),true);
//          
//      }
//  }
//}

function getSelectedText(eventObj){

    
    if(window.getSelection) { 
      var text= window.getSelection().toString();
      if(text!=""){
          var elem=window.getSelection();
          console.log("Got a selection");
          var text=text.trim();
          for(var i=0;i<text.length;i++){
              if(text.charAt(i)=="\""){
                  
                  text=text.slice(0, i) + text.slice(i+1, text.length);
                  break;
              }
          }
          for(var i=text.length-1;i>=0;i--){
              if(text.charAt(i)=="\""){
                  
                  text=text.slice(0, i) + text.slice(i+1, text.length);
                  break;
              }
          }
          
          var xhr=new XMLHttpRequest();
          xhr.open("GET","https://openlibrary.org/search.json?q="+text, true);
          //console.log(elem.toString());
          makeReqforBookNames(xhr,text,elem,true);
          
      }
  }
}


document.onmouseup=getSelectedText;

chrome.runtime.onMessage.addListener(function(request,sender){
    if(request.method=="getSelection" && window.getSelection) { 
      var text= window.getSelection().toString();
      if(text!=""){
          text=text.toLowerCase().split(' ').join('+');
          chrome.runtime.sendMessage({text:text});
      }
  }
});

var books=document.getElementsByTagName('i');
var allLinks=document.getElementsByTagName('a');
totalNum=books.length;
count=0;
percent=0;
var isbn=[];
var oclc=[];





function makeReqforBookNames(xhr,text,elem,alert){
        try{
        xhr.onload=function(){
            try{
            var response = JSON.parse(xhr.responseText);
            if(response.num_found!=0){
                //console.log(elem.toString());
                var flag=0;
                var docs=response.docs;
                for(var i=0;i<docs.length;i++){
                    if(docs[i].has_fulltext==true && (docs[i].ia!=null || docs[i].ia!=undefined ) && docs[i].public_scan_b==true){
                        var iaID=docs[i].ia[0];
                        var linkElem=document.createElement('a');
                linkElem.setAttribute('class','bookLink');
           
                linkElem.style.cursor="alias";
                
                var link="https://archive.org/details/"+iaID;
                linkElem.style.color="#09FF0A";
                linkElem.setAttribute('href',link);
                linkElem.setAttribute('target','_blank');
                linkElem.style.textDecoration='none';
                linkElem.innerHTML=text;
//                linkElem.addEventListener('click',function(eventObj){
//                    chrome.runtime.sendMessage({message: "openurl",url:link}, function(response) {});
//                });
                
                  if(elem instanceof Selection){
                    
                      console.log(elem.toString());
                    var range = elem.getRangeAt(0);
//                    var ancestor=range.commonAncestorContainer;
//                    console.log(ancestor.nodeName);
//                      if(ancestor.nodeName=='#text'){
//                          ancestor=ancestor.parentNode;
//                          
//                      }
//                      if(ancestor.nodeName=='A'){
//                          ancestor=ancestor.parentNode;
//                      }
//                        ancestor.innerHTML="";
//                        console.log(ancestor);
//                        ancestor.appendChild(linkElem);
                        
                        
                        range.deleteContents();
                        range.insertNode(linkElem);
//                        if(linkElem.parentNode.tagName=='a'){
//                            console.log('Here');
//                            var grandp=linkElem.parentNode.parentNode;
//                            grandp.replaceChild(linkElem,linkElem.parentNode);
//                        }
                    
                    
                    

                    if(window.getSelection) window.getSelection().removeAllRanges();
                }else{
                    elem.replaceChild(linkElem,elem.childNodes[0]);
                    
                }
                        flag=1;
                        break;
                    }
                }
                if(flag==0){
                    if(window.getSelection){
                     window.getSelection().removeAllRanges();
                }
                }
                
                
                
            }else if(response.num_found==0 && alert==true){
                if(window.getSelection){
                     window.getSelection().removeAllRanges();
                }
            }
            if(!(elem instanceof Selection)){
                count++;
            percent=Math.floor((count/totalNum)*100);
            updateProgress(percent,myProgess,myBar);
            }
        }
            catch(e){
              count++;
              //console.log(totalNum,cou
            }
        };
        }
    catch(e){
        count++;
        console.log(totalNum,count,e);
    }
        xhr.send(null);
    }  


//function makeReqforBookNames(xhr,text,elem,alert){
//        
//        xhr.onload=function(){
//            var restext=xhr.responseText;
//            var pos=restext.toString().indexOf('co-top-row')+12;
//            var snip=restext.substring(pos,pos+19);
//            var data=snip.match(/\d+/g)[0];
//            if(data!='0'){
//                var linkElem=document.createElement('a');
//                var link="https://archive.org/details/texts?&and[]="+text;
//                linkElem.setAttribute('href',link);
//                linkElem.setAttribute('target','_blank');
//                linkElem.style.color="red";
//                linkElem.innerHTML=text;
//                if(elem instanceof Selection){
//                    var range = elem.getRangeAt(0);
//            
//                    range.deleteContents();
//                    range.insertNode(linkElem);
//                    
//                    
//
//                    if(window.getSelection) window.getSelection().removeAllRanges();
//                }else{
//                    elem.replaceChild(linkElem,elem.childNodes[0]);
//                    
//                }
//                
//                
//            }else if(data=='0' && alert==true){
//                
//                if(window.getSelection) window.getSelection().removeAllRanges();
//            }
//            if(!(elem instanceof Selection)){
//                count++;
//            percent=Math.floor((count/totalNum)*100);
//            updateProgress(percent,myProgess,myBar);
//            }
//            
//        };
//        xhr.send(null);
//    }  




//function makeReqforNum(xhr,code_no,typeofCode,elem){
//    
//    
//        xhr.onload=function(){
//            var response =JSON.parse(xhr.responseText);
//            
//                if(response.status=='ok'){
//                
//                
//                
//                
//                var linkElem=document.createElement('a');
//                    if(response.ia_identifiers.length>0){
//                        var link="https://archive.org/details/"+response.ia_identifiers[0].ia_identifier;
//                    
//                
//                linkElem.setAttribute('href',link);
//                linkElem.setAttribute('target','_blank');
//                linkElem.style.color="red";
//                linkElem.innerHTML=code_no;
//                elem.replaceChild(linkElem,elem.childNodes[0]);
//                    }
//            }
//            count++;
//            percent=Math.floor((count/totalNum)*100);
//            updateProgress(percent,myProgess,myBar);
//            
//        };
//        xhr.send(null);
//}


//function makeReqforNum(xhr,code_no,typeofCode,elem){
//    
//    
//        xhr.onload=function(){
//            var response =xhr.responseText;
//            
//                if(response!='{}'){
//                
//                
//                
//                
//                var linkElem=document.createElement('a');
//                    
//                        var link="https://openlibrary.org/books/"+typeofCode+"/"+code_no;
//                    
//                
//                linkElem.setAttribute('href',link);
//                linkElem.setAttribute('target','_blank');
//                //linkElem.setAttribute('class','bookLink');
//                linkElem.style.cursor="grab";
//                linkElem.style.color="red";
//                linkElem.innerHTML=code_no;
//                elem.replaceChild(linkElem,elem.childNodes[0]);
//                    
//            }
//            count++;
//            percent=Math.floor((count/totalNum)*100);
//            updateProgress(percent,myProgess,myBar);
//            
//        };
//        xhr.send(null);
//}

for(var i=0;i<allLinks.length;i++){
    if(allLinks[i].getAttribute('href')!=null){
    if(allLinks[i].getAttribute('href').includes('Special:BookSources')){
        //console.log(allLinks[i]);
        var isbn_no=allLinks[i].innerHTML.split('-').join('').match(/\d+/g)[0];
        //var isbn_no=allLinks[i].innerHTML;
        isbn.push(isbn_no);
        var xhr = new XMLHttpRequest();
        var elem=allLinks[i];
        //xhr.open("GET","https://archive.org/services/book/v1/do_we_have_it/?isbn="+isbn_no, true);
        //xhr.open("GET","https://openlibrary.org/api/books?bibkeys=ISBN:"+isbn_no+"&format=json&jscmd=data", true);
        xhr.open("GET","https://openlibrary.org/search.json?q="+isbn_no, true);
        //makeReqforNum(xhr,isbn_no,'isbn',allLinks[i]);
        makeReqforBookNames(xhr,isbn_no,elem,false);
    }else if(allLinks[i].getAttribute('href').includes('oclc')){
        
//        var oclc_no=allLinks[i].innerHTML;
//        oclc.push(oclc_no);
//        var xhr = new XMLHttpRequest();
//        xhr.open("GET","https://openlibrary.org/api/books?bibkeys=OCLC:"+oclc_no+"&format=json&jscmd=data", true);
//        makeReqforNum(xhr,oclc_no,'oclc',allLinks[i]);
    }
    }
}

var excludedTexts=['citation needed','Learn how and when to remove this template message','a','b','c','d','e','f','g','h','i','j'];

for(var i=0;i<books.length;i++){
    
    var book=books[i];
    var elem=books[i];
    while(book.childNodes[0].nodeType!=3){
        book=book.childNodes[0];
    }
    
    
    var text=book.innerHTML;
    if(excludedTexts.indexOf(text)>=0){
        count++;
        
        continue;
    }
    
    var xhr = new XMLHttpRequest();
   
    //xhr.open("GET","https://openlibrary.org/search.json?q="+text, true);
    //xhr.open("GET","https://archive.org/details/texts?&and[]="+text, true);
    xhr.open("GET","https://openlibrary.org/search.json?q="+text, true);
    makeReqforBookNames(xhr,text,elem,false);
    //xhr.onload=xhrReqs[i];
    //xhr.send(null);
    
}


//console.log(oclc);
//console.log(isbn);
