app.controller('newAth-cont', function ($scope, $http, $state) {
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
    }, {
        title: 'Profile Image',
        icon: 'image'
    }]
    $scope.currTab = 0;
    $scope.setCurrTab = n => {
        $scope.currTab = n;
    }
    //the main "new user" obj
    $scope.newUser = {
        sports: [],
        social:{},
    };
    //miscellaneous helper data
    $scope.info = {
        genders: ['Male', 'Female', 'Non-Binary/Other', 'Prefer not to say'],
        countries: countries,
        sports: ["Golf",
            "Tennis",
            "Cricket",
            "Basketball",
            "Baseball",
            "American Football",
            "Aquatics",
            "Archery",
            "Automobile Racing",
            "Badminton",
            "Beach Volleyball",
            "Bobsleigh",
            "Body Building",
            "Boxing",
            "Cross Country Running",
            "Cross Country Skiing",
            "Curling",
            "Cycling",
            "Darts",
            "Decathlon",
            "Down Hill Skiing",
            "Equestrianism",
            "eSports",
            "Fencing",
            "Field Hockey",
            "Figure Skating",
            "Gymnastics",
            "Ice Hockey",
            "Martial Arts",
            "Mixed Martial Arts",
            "Modern Pentathlon",
            "Motorcycle Racing",
            "Netball",
            "Polo",
            "Racquetball",
            "Rowing",
            "Rugby",
            "Sailing",
            "Softball",
            "Shooting",
            "Skateboarding",
            "Skeet Shooting",
            "Skeleton",
            "Snow Boarding",
            "Soccer (Football)",
            "Squash",
            "Surfing",
            "Swimming",
            "Track and Field"],
        marital: [{
            title: 'Married',
            num: 2
        }, {
            title: 'Divorced/Separated/Widowed',
            num: 1
        }, {
            title: 'Single',
            num: 0
        }],
        drinks: [{
            title: 'Often',
            num: 2
        }, {
            title: 'Rarely',
            num: 1
        }, {
            title: 'Never',
            num: 0
        }]
    }
    $scope.cand = {

    };
    $scope.filterStuff = (arr, picked) => {
        return arr.filter(q => !picked.includes(q));
    }
    $scope.addItem = (cat, item) => {
        $scope.newUser[cat].push(item)
    }

    $scope.removeItem = (cat, item) => {
        $scope.newUser[cat] = $scope.newUser[cat].filter(q => q != item);
    }
    const requireds = ['name', 'nationality', 'location', 'gender', 'dob', 'sports', 'married', 'drinks'];
    $scope.preview = () => {
        const missing = requireds.filter(q=>!$scope.newUser[q] && $scope.newUser[q]!==0);
        if(missing.length){
            return bulmabox.alert('<i class="fa fa-exclamation-triangle"></i>&nbsp;Missing Information',`You're missing some information!<br> Make sure you've filled out every field with an asterix (*)!`);
        }
        const mainPar = $scope.$parent.$parent.$parent.$parent;
        mainPar.athDisplay = angular.copy($scope.newUser)
        mainPar.athDisplay.active = true;
        mainPar.athDisplay.tab = 0;
        mainPar.athDisplay.isAccept = true;
        // mainPar.$digest();
    }
    $scope.clearAll = () => {
        bulmabox.confirm('<i class="fa fa-question-circle"></i>&nbsp;Clear Data', `Are you sure you wish to clear all your entered data and start over?`, r => {
            if (!!r) {
                $scope.newUser = {
                    sports: []
                }
                $scope.$apply();
            }
        })
    }
    //img stuff
    $scope.loadFile = () => {
        $scope.loadingFile = true;
        const fr = new FileReader();
    }
    $scope.saveDataURI = (d) => {
        console.log('would record dataURI',d,'to this new user')
    }
})
    .filter('numToDate', function () {
        return function (num) {
            if (isNaN(num)) {
                return 'Invalid date!';
            }
            const theDate = new Date(num);
            console.log(theDate.getMinutes())
            return `${theDate.toLocaleDateString()} ${theDate.getHours() % 12}:${theDate.getMinutes().toString().length < 2 ? '0' + theDate.getMinutes() : theDate.getMinutes()} ${theDate.getHours() < 13 ? 'AM' : 'PM'}`;
        };
    })