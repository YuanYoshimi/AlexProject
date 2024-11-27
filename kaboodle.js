(function(window, undefined){
  /* Options */
  

  var creatives = [
    {"title": "Join our AI Innovation Course!!", "creative": "AI.jpg", "href": "https://campusgroups.uci.edu/antrepreneur/rsvp_boot?id=1934032"},
    {"title": "Find your first job with Handshake!", "creative": "handshake.jpg", "href": "https://uci.joinhandshake.com/explore"},
    {"title": "Become an Anteater!", "creative": "ant.png", "href": "https://uci.edu/"},
    {"title": "Start your first AI chat with ChatGPT", "creative": "chatgpt.jpg", "href": "https://chatgpt.com/"}
  ];

  /* most recently parsed script */
  var scripts = document.getElementsByTagName("script");
  var index = scripts.length - 1;
  var kaboodleTag = scripts[index];
  var src = kaboodleTag.src;
  var kaboodleRoot = src.substring(0, src.lastIndexOf("/"));
  var kaboodleStyle = document.createElement("link");
  kaboodleStyle.href = kaboodleRoot + "/kaboodle.css";
  kaboodleStyle.rel = "stylesheet";
  kaboodleStyle.type = "text/css";
  document.head.appendChild(kaboodleStyle);

  var numRows = kaboodleTag.dataset.numRows || 2;

  var kaboodleModule = document.createElement("div");
  kaboodleModule.className = "kaboodle-module";
  kaboodleTag.parentNode.insertBefore(kaboodleModule, kaboodleTag.nextSibling);
  /* most recently added kaboodle tag, i.e. this one */
  var kaboodles = document.getElementsByClassName("kaboodle-module");
  var index = kaboodles.length - 1;
  var kaboodleModuleNode = kaboodles[index];

  var kaboodleHeader = document.createElement("a");
  kaboodleHeader.className = "kaboodle-header";
  kaboodleHeader.href = 'https://github.com/ptsteadman/kaboodle';
  kaboodleHeader.innerHTML = "Sponsored Links";
  kaboodleModuleNode.appendChild(kaboodleHeader);
  
  var kaboodleItems = document.createElement("div");
  kaboodleItems.className = "kaboodle-items";
  kaboodleModuleNode.appendChild(kaboodleItems);
  
  randomize(creatives);

  window.addEventListener("resize", loadItems, false);

  function loadItems (){
    while (kaboodleItems.firstChild) {
      kaboodleItems.removeChild(kaboodleItems.firstChild);
    }

    var numItems;
    var width = kaboodleModuleNode.offsetWidth;
    var numCols = Math.floor(width / 240.0);
    for(var i = 0; i < numCols * numRows; i++){
      var creative = creatives[i % creatives.length];
      var kaboodleItemLink = document.createElement("a");
      kaboodleItemLink.href = creative["href"];
      kaboodleItemLink.onclick = function(){
        if(ga){
          ga('send', 'event', 
          'kaboodleAd', 'click', creative["href"], {'hitCallback':
             function () {
             document.location = creative["href"];
             }
          });
        }
      };
      kaboodleItems.appendChild(kaboodleItemLink);
      
      var kaboodleItemWrapper = document.createElement("div");
      kaboodleItemWrapper.className = "kaboodle-item"; 
      kaboodleItemLink.appendChild(kaboodleItemWrapper);
      
      var kaboodleItemImg = document.createElement("img");
      
      // Check if the creative has "creative" or "image" as the key for the image file
      if (creative["creative"]) {
        kaboodleItemImg.src = creative["creative"]; // Use "creative" key for image
      } else if (creative["image"]) {
        kaboodleItemImg.src = creative["image"]; // Use "image" key for image
      }
      
      kaboodleItemWrapper.appendChild(kaboodleItemImg);
      
      var kaboodleItemCaption = document.createElement("p");
      kaboodleItemCaption.innerHTML = creative["title"];
      kaboodleItemWrapper.appendChild(kaboodleItemCaption);
    }
  }

  loadItems();

  function randomize(creatives){
    for(var i = creatives.length - 1; i > 0; i--){
      var swapIndex = getRandomInt(0, i + 1);
      var tmp = creatives[swapIndex];
      creatives[swapIndex] = creatives[i];
      creatives[i] = tmp;
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

})(window);
