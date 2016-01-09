var app = angular.module("mainModule", []);

app.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode({
                        enabled: true,
                        requireBase: false
                      }).hashPrefix('!');
}]);

app.controller("flags", function ($scope)
  {
    $scope.flagone = "wqerytiuopasdfgjhklzxvcbnm";
    $scope.flagtwo = "YnUgcW5hdCBqdW5nZiBoYyB5cmlyeSBnamIgcGJxciwgbGJoIG5lciB0cmdndmF0IG9yZ2dyZSBuYXEgb3JnZ3JlLiB5cmcgenIgeGFiaiBqdW5nIGd1ciBwYnFyIHZm";
    $scope.flagthree = "baz";
  });

app.controller("instructions", function($scope) {
    $scope.instructionsOne = "As encouragement for you to learn JavaScript/html, this is an AngularJS JavaScript web app.  It is a challenge to you.";
    $scope.instructionsTwo = "There are 3 levels to this challenge.  All are available on this page.  Good luck, tell me when you get each code.  It will be obvious when you do.";
    $scope.instructionsThree = "You don't/can't solve them all at once, so getting any answer is sufficient to have solved the challenge.";
  });

app.controller("answers", function($scope, $location)
  {
    Array.prototype.toObj = function(values){
      values = values || this.map(function(v){return true;}); 
      var some;
      this .map(function(v){return [v,this.shift()]},values)
           .map(function(v){this[v[0]]=v[1];},some = {});
      return some; 
    };
    
    var Cipher = {};
    Cipher.toQWERTY = function(text, decode, m) {
      var map = ['a', 'b', 'c', 'd', 'e',
                  'f', 'g', 'h', 'i', 'j',
                  'k', 'l', 'm', 'n', 'o',
                  'p', 'q', 'r', 's', 't',
                  'u', 'v', 'w', 'x', 'y', 'z'].toObj(m); //' ' is ignored on purpose.
  
      // Flip the map
      if(decode) {
          map = (function() {
              var tmp = {};
              var k;
  
              // Populate the tmp variable
              for(k in map) {
                  if(!map.hasOwnProperty(k)) continue;
                  tmp[map[k]] = k;
              }
  
              return tmp;
          })();
      }
  
      return text.split('').filter(function(v) {
          // Filter out characters that are not in our list
          return map.hasOwnProperty(v.toLowerCase());
      }).map(function(v) {
          // Replace old character by new one
          // And make it uppercase to make it look fancier
          return map[v.toLowerCase()].toUpperCase();
      }).join('');
    };

     
    function Encrypt3(stringToEncrypt, addSelected, multSelected) {
        //http://practicalcryptography.com/ciphers/affine-cipher/
        var word, newword, code, newcode, newletter;
        var addkey, multkey;
        word = stringToEncrypt;
        word = word.toLowerCase();
        word = word.replace(/\W/g, "");
        addkey = 0;
        addList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
        for (i=0; i < addList.length; i++) {
            addkey = addkey + (addList[i])*(Boolean(addSelected == addList[i]));
        }
        multkey = 0;
        multList = [1,3,5,7,9,11,15,17,19,21,23,25];
        for (i=0; i < multList.length; i++) {
            multkey = multkey + (multList[i])*(Boolean(multList[i] == multSelected));
        }
        newword = "";
        for (i = 0; i < word.length; i++) {
            code = word.charCodeAt(i) - 97;
            newcode = ( (multkey*code + addkey) % 26 ) + 97;
            newletter = String.fromCharCode(newcode);
            newword = newword + newletter;
        }
        return newword;
    }

    function Decrypt3(stringToDecrypt, addSelected, multSelected) {
        //http://practicalcryptography.com/ciphers/affine-cipher/
        var word, newword, code, newcode, newletter;
        var addkey, multkey, multinverse;
        word = stringToDecrypt;
        word = word.toLowerCase();
        word = word.replace(/\W/g, "");
        addkey = 0;
        addList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
        for (i=0; i < addList.length; i++) {
            addkey = addkey + (addList[i])*(Boolean(addSelected == addList[i]));
        }
        multkey = 0;
        multList = [1,3,5,7,9,11,15,17,19,21,23,25];
        for (i=0; i < multList.length; i++) {
            multkey = multkey + (multList[i])*(Boolean(multList[i] == multSelected));
        }
        multinverse = 1;
        for (i=1; i <= 25; i = i + 2) {
            if ( (multkey*i) % 26 == 1 ) { multinverse = i };
        }
        newword = "";
        for (i = 0; i < word.length; i++) {
            code = word.charCodeAt(i) - 97;
            newcode = ( (multinverse*(code + 26 - addkey)) % 26 ) + 97;
            newletter = String.fromCharCode(newcode);
            newword = newword + newletter;
        }
        return newword.toLowerCase();
    }

    
    var paramValue = $location.search().token;
    if (paramValue) {
      var flagOneCipher = "RUdGSUtXWkxQR0ZOR1hVV1ZZRUdESlNZWllSWlVZVE9LTFpHVFpVS1lZT1pZRExTWVpEWUFGR0NaVU9MWUJXRVpaWUJaV0ZST0NPU1NKS0dWT1JZREdGWVpXS05FR0RKWUZMV1pPR0Y="
      //substitution cipher + base64
      $scope.answer1="Challenge 1 Possible Answer: " + Cipher.toQWERTY(window.atob(flagOneCipher), true, paramValue.split(''));
      //$scope.answer1=window.btoa(Cipher.toQWERTY(text, false, paramValue.split(''))); //give me plaintext to get encrypted value
      //rot13
      $scope.answer2="Challenge 2 Possible Answer: " + window.atob(paramValue).replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
      $scope.answer3="Challenge 3 Possible Answer: " + Decrypt3(paramValue,4,7);
    }

  });