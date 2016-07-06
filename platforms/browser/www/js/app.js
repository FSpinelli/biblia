angular.module('starter', ['ionic'])
 
.controller('AppCtrl', function($scope) {
  $scope.data = {
    speechText: ''
  };
  $scope.recognizedText = '';
 
  $scope.speakText = function() {
    TTS.speak({
           text: $scope.data.speechText,
           locale: 'pt-BR',
           rate: 1.5
       }, function () {
           // Do Something after success
       }, function (reason) {
           // Handle the error case
       });
  };
 
  $scope.record = function() {
    var recognition = new webkitSpeechRecognition();
    recognition.onresult = function(event) {
        // if (event.results.length > 0) {
        //     $scope.recognizedText = event.results[0][0].transcript;
        //     $scope.$apply()
        // }

        if (event.results.length > 0) {
          var result = event.results[0];
          var text = "";
          for (var i = 0; i < result.length; ++i) {
            text += result[i].transcript+"<br><br>";
          }
          $scope.recognizedText = text;
        }

    };
    recognition.start();
  };
});

// function dump(arr,level) {
//   var dumped_text = "";
//   if(!level) level = 0;
  
//   //The padding given at the beginning of the line.
//   var level_padding = "";
//   for(var j=0;j<level+1;j++) level_padding += "    ";
  
//   if(typeof(arr) == 'object') { //Array/Hashes/Objects 
//     for(var item in arr) {
//       var value = arr[item];
      
//       if(typeof(value) == 'object') { //If it is an array,
//         dumped_text += level_padding + "'" + item + "' ...\n";
//         dumped_text += dump(value,level+1);
//       } else {
//         dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
//       }
//     }
//   } else { //Stings/Chars/Numbers etc.
//     dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
//   }
//   return dumped_text;
// }