var app = angular.module("app", []);

app.controller("LanguageController", function($scope, $http){
    $scope.getLanguages = function() {
        $http.get("https://restcountries.eu/rest/v2/all").then(function(response) {
            console.log(response);
            let data = response.data;
            let languages = [];
            
            for(var i = 0; i < data.length; ++i) {
                let countryLanguages = data[i]["languages"];
                for(var j = 0; j < countryLanguages.length; ++j) {
                    if(languages.indexOf(countryLanguages[j]["name"]) == -1) {
                        languages.push(countryLanguages[j]["name"]);
                    }
                }
            }
            
            $scope.languageArray = languages;
            console.log($scope.languageArray);
        });
    };
    
    $scope.getVideos = function(language) {
        var value = "learn+" + language + "+language";
        var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + value + "&maxResults=10&order=rating&type=video&videoEmbeddable=true&safeSearch=strict&key=AIzaSyBAg223tUmKQ9qctm6AzBFRtPsXfkZAPXY"
        $http.get(url).then(function(response) {
            console.log(response)
        })
    };
    
});