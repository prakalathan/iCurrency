var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.loginPage = true;
    $scope.registerPage = false;
    $scope.mainPage = false;
    $scope.myForm = {};
    $scope.inrVal = 1;
    $scope.curSel = 0;
    $scope.registerAccount = function() {
    	$scope.registerPage = true;
    	$scope.loginPage = false;
    	$scope.mainPage = false;
    	$scope.myForm = {};
    };
    $scope.loginAccount = function() {
    	$scope.registerPage = false;
    	$scope.loginPage = true;
    	$scope.mainPage = false;
    	$scope.myForm = {};
    };
    $scope.loginFun = function() {
    	console.log($scope.myForm);
		$scope.loginDetails = localStorage.getItem("login", $scope.myForm);
		console.log(($scope.loginDetails));
		$scope.loginDetails = JSON.parse($scope.loginDetails);
		if($scope.loginDetails.myMailData == $scope.myForm.myMail && $scope.loginDetails.myPwdData == $scope.myForm.myPwd) {
			$scope.mainPage = true;
			$scope.registerPage = false;
			$scope.loginPage = false;
			var url = 'https://api.fixer.io/latest?base=INR';	
		    $http.get(url)
				    .success(function(response) {
				        console.log(response);
				        $scope.curVal = response;
			});

		}
    }
    $scope.registerFun = function() {
    	console.log($scope.myForm);
    	localStorage.setItem("login", JSON.stringify($scope.myForm));
    	$scope.loginAccount();
    }
});


app.directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.myForm.myPwdData
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
})
