angular
    .module(AppConfig.name)
    .controller('StartCtrl', function ($scope, scanModel, $state, $timeout) {
        var isReady,
            self = this,
            model = {
                scanned :[{code: 1231232312}, {code: 1231232312},{code: 1231232312}, {code: 1231232312},{code: 1231232312}, {code: 1231232312},{code: 1231232312}, {code: 1231232312},{code: 1231232312}, {code: 1231232312},{code: 1231232312}, {code: 1231232312},],
                lastScanned: '1111',
                stopScanning: false
            };


        document.addEventListener("deviceready", function () {
            console.log('deviceready');
            isReady = true;
        }, false);
        $scope.scanBarCode = function () {
            //model.scanned.unshift({code: new Date().toISOString()});
            //return;
            //var success = function (result) {
            //        window.plugins.toast.hide();
            //        alert("We got a barcode\n" +
            //            "Result: " + result.text + "\n" +
            //            "Format: " + result.format + "\n" +
            //            "Cancelled: " + result.cancelled);
            //        if(!result.cancelled) {
            //            scanModel.scanned.push({text: result.text});
            //            scanModel.lastScanned = result.text;
            //            console.log('product found:\n' +  result.text + '\nexellent');
            //            cordova.plugins.barcodeScanner.scan(success, error);
            //            window.plugins.toast.showWithOptions({
            //                message: 'product found:\n' +  result.text + '\nexellent',
            //                duration: "long",
            //                position: "bottom",
            //                styling: {
            //                    backgroundColor: '#000000', // make sure you use #RRGGBB. Default #333333
            //                    cornerRadius: 10, // minimum is 0 (square). iOS default 20, Android default 100
            //                    horizontalPadding: 100, // iOS default 16, Android default 50
            //                    verticalPadding: 30 // iOS default 12, Android default 30
            //                }
            //            });
            //        }else {
            //            console.log('stopScanning');
            //            $state.go($state.current, {}, {reload: true});
            //        }
            //    },
            //    error = function (data) {
            //        //window.plugins.toast.hide();
            //        self.badScan('Please rescan product');
            //        //alert("Scanning failed: " + data);
            //    };
            if(isReady) {
               var self = this,
                   success = function (result) {
                    //console.log('result ' + result.code);
                    //console.log('model  ' + model.scanned.length);
                       scanModel.scanned.unshift({code: result.code});
                   //$scope.model.scanned = model.scanned;
                       scanModel.lastScanned = result.code;
                   $timeout(function() {
                       scanner.resumeScan();
                   },50);
                };
                scanner.setContinuous(false);
                scanner.startScanning(function () {}, success, 0, 10, 100, 35);
            }

        };
        $scope.scanClean = function () {
            $scope.model.scanned = scanModel.scanned = [];
        };
        $scope.scanBad = function () {
            scanner.stopScanner();
            //self.badScan('Product not found scan again.');
        };
        $scope.addscanBarCode = function () {
            model.scanned.unshift({code: new Date().toISOString()});
        };

        this.badScan = function (reason) {
            window.plugins.toast.showWithOptions({
                message: reason,
                duration: "long",
                position: "bottom",
                styling: {
                    backgroundColor: '#FF0000', // make sure you use #RRGGBB. Default #333333
                    cornerRadius: 5, // minimum is 0 (square). iOS default 20, Android default 100
                    horizontalPadding: 50, // iOS default 16, Android default 50
                    verticalPadding: 30 // iOS default 12, Android default 30
                }
            });
        };
        $scope.model = scanModel;
        //$scope.model = scanModel.scanned;
        //$scope.lastScanned = scanModel.lastScanned;
    });