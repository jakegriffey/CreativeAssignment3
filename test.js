var app = angular.module("app", []);

app.controller("LanguageController", function($scope, $http){
    $scope.videoSources = [];
    $scope.languageArray = [];
    
    $scope.getLanguages = function() {
        $http.get("https://restcountries.eu/rest/v2/all").then(function(response) {
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
        });
    };
    
    $scope.getVideos = function(language) {
        $scope.videoSources = [];
        
        var value = "learn+" + language + "+language";
        var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + value + "&maxResults=10&order=rating&type=video&videoEmbeddable=true&safeSearch=strict&key=AIzaSyBAg223tUmKQ9qctm6AzBFRtPsXfkZAPXY";
        $http.get(url).then(function(response) {
            let items = response["data"]["items"];
            let urlTemplate = "http://www.youtube.com/embed/";
            
            for(var i = 0; i < items.length; ++i) {
                let youtubeSource = urlTemplate + items[i].id.videId
                $scope.videoSources.push(youtubeSource);
            }
        });
    };
    
});

