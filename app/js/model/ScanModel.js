angular
    .module(AppConfig.name)
    .factory('scanModel', [function () {
        return {
            scanned :[],
            lastScanned: '',
            stopScanning: false
        };
    }]);
