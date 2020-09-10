app.controller('nav-cont',function($scope,$http,$state){
    
    $scope.pages = [{
        sref:'app.list',
        txt:'View Athletes',
        icon:'list'
    },{
        sref:'app.add',
        txt:'Add Athlete',
        icon:'plus'
    }];
})