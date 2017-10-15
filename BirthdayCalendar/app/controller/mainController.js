mainApp.controller('mainController', function ($rootScope, $scope) {
    var vm = $scope;
    //Fetch the data from data.js
    //Get the data in scope object for binding data into template (main.html)
    vm.data=data;
})