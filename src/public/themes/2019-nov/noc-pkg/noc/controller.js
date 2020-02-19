app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.
    when('/nocs', {
        template: '<nocs></nocs>',
        title: 'NOCs',
    });
}]);

app.component('nocs', {
    templateUrl: noc_list_template_url,
    controller: function($http, $location, HelperService, $scope, $routeParams, $rootScope, $location) {
        $scope.loading = true;
        var self = this;
        self.hasPermission = HelperService.hasPermission;
        $http({
            url: laravel_routes['getNocs'],
            method: 'GET',
        }).then(function(response) {
            self.nocs = response.data.nocs;
            $rootScope.loading = false;
        });
        $rootScope.loading = false;
    }
});