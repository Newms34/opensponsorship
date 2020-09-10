app.controller('allAth-cont', function ($scope, $http, $state,$log) {
    $scope.athList = [];
    $scope.n=0;
    $scope.getMoreAths = ()=>{
        $http.get(`/athletes/athlete?n=${$scope.n?$scope.n:0}`).then(athr=>{
            $scope.athList.push(...athr.data);
            console.log('list now',$scope.athList)
        }).catch(e=>{
            console.log('some sorta err!',e)
        })
    }
    $scope.getMoreAths(0);
    $scope.infiniScrollTimer
    $scope.setInfiScrollTimer = function(){
        $scope.infiniScrollTimer = setTimeout(function(){
            $scope.n+=20;
            $scope.getMoreAths()
        },1000)
    }
    window.addEventListener('scroll',e=>{
        // console.log('skrol info',e,window.innerHeight,window.pageYOffset,document.body.scrollHeight)
        if ((window.innerHeight + window.pageYOffset + 50) >= document.body.scrollHeight) {
            $scope.setInfiScrollTimer();
        }else{
            $scope.infiniScrollTimer = null;
        }
    })
    $scope.viewAth=a=>{
        const p = $scope.$parent.$parent.$parent.$parent;
        p.athDisplay = angular.copy(a);
        p.athDisplay.isAccept=false;
        p.athDisplay.tab=0;
        p.athDisplay.active=true;
    }
    $scope.deleteAth=a=>{
        bulmabox.confirm('Delete Athlete',`Are you sure you wish to delete ${a.name} from the database?<br> This action is not reversable!`,r=>{
            if(!!r){
                $http.delete('/athletes/athlete?id='+a._id).then(r=>{
                    bulmabox.alert('Athlete removed!',"That athlete has been deleted successfully");
                    $state.go($state.current, {}, {reload: true})
                }).catch(e=>{
                    bulmabox.alert('<i class="fa fa-exclamation-triangle"></i>&nbsp;Error Deleting Athlete',`There was an error deleting that athlete. Sorry!`);
                })
            }
        })
    }
})