angular
    .module(AppConfig.name)
    .controller('StartCtrl', function ($scope, scanModel, $state) {
        var isReady,
            self = this;

        document.addEventListener("deviceready", function () {
            console.log('deviceready');
            isReady = true;
        }, false);
        $scope.scanBarCode = function () {
            var success = function (result) {
                    window.plugins.toast.hide();
                    alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
                    if(!result.cancelled) {
                        scanModel.scanned.push({text: result.text});
                        scanModel.lastScanned = result.text;
                        console.log('product found:\n' +  result.text + '\nexellent');
                        cordova.plugins.barcodeScanner.scan(success, error);
                        window.plugins.toast.showWithOptions({
                            message: 'product found:\n' +  result.text + '\nexellent',
                            duration: "long",
                            position: "bottom",
                            styling: {
                                backgroundColor: '#000000', // make sure you use #RRGGBB. Default #333333
                                cornerRadius: 10, // minimum is 0 (square). iOS default 20, Android default 100
                                horizontalPadding: 100, // iOS default 16, Android default 50
                                verticalPadding: 30 // iOS default 12, Android default 30
                            }
                        });
                    }else {
                        console.log('stopScanning');
                        $state.go($state.current, {}, {reload: true});
                    }
                },
                error = function (data) {
                    //window.plugins.toast.hide();
                    self.badScan('Please rescan product');
                    //alert("Scanning failed: " + data);
                };
            if(isReady) {
                console.log('fastBarcodeScannerPlugin ' + cordova.plugins.fastBarcodeScannerPlugin);
                //cordova.plugins.fastBarcodeScannerPlugin.startScanning(success, error);
                cordova.plugins.barcodeScanner.scan(success, error);
            }

        };
        $scope.scanClean = function () {
            scanModel.scanned = [];
            //$scope.model = scanModel.scanned = [];
        };
        $scope.scanBad = function () {
            self.badScan('Product not found scan again.');
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
    });