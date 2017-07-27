URL="";
function dispTooltipText(eventObj){
        function showTooltip(){
      console.log('showing');
          $( document ).tooltip({
      position: {
        my: "center bottom-20",
        at: "center top",
        collision: "none",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    });
}
    //console.log($( document ).tooltip);
    $( document ).tooltip('close')
    //$( document ).tooltip();
    //$("[data-toggle='tooltip']").tooltip('close');
  var target=eventObj.target;
  console.log(target);
  if(target.getAttribute('count')=='1'){
          showTooltip();
      $(target).tooltip();
      
      $(target).tooltip('close').tooltip('open');
    //$("[data-toggle='tooltip']").tooltip('hide');
    //$(target).tooltip('show');    
    return;
  }
  var source;    
  if(target.getAttribute('src')==null){
    source=target.getAttribute('href');
  }else{
    source=target.getAttribute('src');
  }
  var numberPattern = /\d+/g;
  var ts=source.match(numberPattern);
  var text;
  if(ts==null || ts[0]==null || ts[0].length!=14){
    text="Time stamp not found !";
    //target.setAttribute('data-original-title',text);
    target.setAttribute('title',text);
    showTooltip();
    $(target).tooltip();
    
    $(target).tooltip('close').tooltip('open');
      target.setAttribute('count','1');
    return;
  }else{
    var pos;
    var URLofElem;
    var xhr=new XMLHttpRequest();
    var wb_url;
    if(URL.includes('https')){
        
        if(URL.includes('web-beta.archive.org')){
            pos=source.indexOf('im_');
            //URLofElem=source.substring(pos+43);
            URLofElem=source.substring(pos+4);
            wb_url="https://archive.org/wayback/available?url="+URLofElem+"&timestamp="+ts[0];
        }else{
            //pos=source.indexOf('web.archive.org');
            pos=source.indexOf('im_');
            URLofElem=source.substring(pos+4);
            wb_url="https://archive.org/wayback/available?url="+URLofElem+"&timestamp="+ts[0];
        }
    }else{
        
        //pos=source.indexOf('web.archive.org');
        pos=source.indexOf('im_');
        //URLofElem=source.substring(pos+38);
        URLofElem=source.substring(pos+4);
        wb_url="http://archive.org/wayback/available?url="+URLofElem+"&timestamp="+ts[0];
    }
    
    console.log(wb_url);
    console.log(pos);
    xhr.open("GET",wb_url,true);
    xhr.onload=function(){
          if(xhr.status==503){
          var text="Server not available";
          target.setAttribute('title',text);
          showTooltip();
           $(target).tooltip();
           
    $(target).tooltip('close').tooltip('open');
          return;
      }else{
    var text;
    var res=JSON.parse(xhr.responseText);
    if(res.archived_snapshots.closest==undefined){
          var text="Server not available";
          target.setAttribute('title',text); 
           showTooltip();
           $(target).tooltip();
           
    $(target).tooltip('close').tooltip('open');
          return;
      }else{
      if(res.archived_snapshots.closest.available==true){
        var newts=res.archived_snapshots.closest.timestamp;
        var year=newts.slice(0,4);
        var month=newts.slice(4,6);
        var day=newts.slice(6,8);
        var hour=newts.slice(8,10);
        var min=newts.slice(10,12);
        var sec=newts.slice(12,14);
        switch(month){
          case "01":
          month="January";
          break;
          case "02":
          month="February";
          break;
          case "03":
          month="March";
          break;
          case "04":
          month="April";
          break;
          case "05":
          month="May";
          break;
          case "06":
          month="June";
          break;
          case "07":
          month="July";
          break;
          case "08":
          month="August";
          break;
          case "09":
          month="September";
          break;
          case "10":
          month="October";
          break;
          case "11":
          month="November";
          break;
          case "12":
          month="December";
          break;
        }
        text=month+" "+day+" "+year+" "+" "+hour+":"+min+":"+sec;
        target.setAttribute('title',text);
        showTooltip();
        $(target).tooltip();
        $(target).tooltip('close').tooltip('open');
          
        
        //target.setAttribute('data-original-title',text);
        target.setAttribute('count','1');
        //$("[data-toggle='tooltip']").tooltip('hide');
        //$(target).tooltip('show');    
        return;
      }
      }
      }
    };
    xhr.send(null);
  }
}
$(document).ready(function(){
//  var boot = document.createElement('link');
//  boot.rel = 'stylesheet';
//  boot.type = 'text/css';
//  boot.href = chrome.extension.getURL('css/bootstrap.css');
//  document.head.appendChild(boot);
      $( document ).tooltip({
      position: {
        my: "center bottom-20",
        at: "center top",
        collision: "none",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    });

  var count=0;
  var body=document.body;
  var ts_elems=['img','iframe'];
  var links=[];
  var element;
  for(var i=0;i<ts_elems.length;i++){
    links[i]=document.getElementsByTagName(ts_elems[i]);
  }
  for(var i=0;i<ts_elems.length;i++){
    for(var j=0;j<links[i].length;j++){
      element=links[i][j]; 
      element.setAttribute('data-toggle','tooltip');
      element.removeAttribute('data-original-title');
      element.removeAttribute('alt');
      element.setAttribute('title','');
      element.setAttribute('count','0');   
      element.addEventListener('mouseover',dispTooltipText);
      $(element).on('mouseout',function(){
        $(this).blur();
      });
    }
  }
  //$("body").tooltip({ selector: "[data-toggle='tooltip']",container:'body'});
    chrome.runtime.sendMessage({message:'sendurl'});
    chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
        if(message.url){
            URL=message.url;
        }
    });
});




