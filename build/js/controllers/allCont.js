app.controller('all-cont', function ($scope, $http, $state,$log) {
    $scope.athDisplay={
        img:'',
        //FIRST TAB
        name:'',
        nationality:'',
        gender:'',
        birth:0,
        location:'',
        //BREAK
        sports:[],
        team:'',
        association:'',
        //BREAK
        social:{},
        interests:'',
        charities:'',
        //BREAK
        about:'',
        pets:'',
        married:0,
        drinks:0,
        //DATA STUFF
        active:false,
        tab:0,
        isAccept:false,
    }
    
    $scope.closeDisplay = ()=>{
        Object.keys($scope.athDisplay).forEach(p=>{
            if(typeof $scope.athDisplay[p]=='string'){
                $scope.athDisplay[p]=''
            }else if(typeof $scope.athDisplay[p]=='number'){
                $scope.athDisplay[p]=0;
            }else if($scope.athDisplay[p] instanceof Array){
                $scope.athDisplay[p]=[];
            }else if(typeof $scope.athDisplay[p]=='object'){
                $scope.athDisplay[p]={};
            }
            $scope.athDisplay.active=false;
        })
    }

    //tab stuff
    $scope.sections = [{
        title: 'Basic Information',
        icon: 'user'
    }, {
        title: 'Athletic Information',
        icon: 'futbol-o'
    }, {
        title: 'Social Information',
        icon: 'globe'
    }, {
        title: 'Miscellaneous Information',
        icon: 'list'
    }]
    $scope.athDisplay.tab=0;
    $scope.setCurrTab = n=>{
        $scope.athDisplay.tab = n;
    }
    $scope.getDob = n=>new Date(n).toLocaleDateString();
    $scope.hasSocial = s=>{
        //basically, we're looking to see if the user has provided *any* social media things
        return !!Object.values(s).filter(q=>!!q).length;
    }
    $scope.formatLink = (pref,info)=>{
        if(!info) return '';
        if (!info.startsWith(pref) && !info.startsWith(`http://${pref}`) && !info.startsWith(`https://${pref}`) && !info.startsWith(`http://wwww.${pref}`) && !info.startsWith(`https://www${pref}`)){
            pref = `https://${pref}${info}`;
        }
        return pref.replace('http:','https:');//force https
        
    }
    $scope.submitAth = ()=>{
        $scope.athDisplay.birth = $scope.athDisplay.dob.getTime();
        $http.post('/athletes/athlete',$scope.athDisplay).then(r=>{
            $scope.closeDisplay();
            $state.go('app.list');
        }).catch(e=>{
            bulmabox.alert('<i class="fa fa-exclamation-triangle"></i>&nbsp;Error Saving Athlete',`There was an error saving your athlete. Sorry!`);
            console.log('ERR',e)
        });
    }
})

