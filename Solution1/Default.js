// JavaScript source code
function onEnumerateDeviceInterfaces() {
    document.getElementById("Output").innerHTML = ""; // clear output
    try {
        var selection = document.getElementById("SelectInterfaceClass");
        var selectedDeviceClass = 
            selection.options[selection.selectedIndex].value;
        var deviceClass;
        var Enumeration = Windows.Devices.Enumeration;
        var selectorString = "";

        var mtpServiceDevice = Windows.Devices.Portable.ServiceDevice;
        var smsDevice = Windows.Devices.Sms.SmsDevice;
        var proximityDevice = Windows.Networking.Proximity.ProximityDevice;
        switch (selectedDeviceClass) {
            case "audioCapture":
                // same as:
                // var mediaDevice = Windows.Media.Devices.MediaDevice;
                // selectorString =  mediaDevice.getAudioCaptureSelector();
                deviceClass = Enumeration.DeviceClass.audioCapture;
                break;
            case "audioRender":
                // same as:
                // var mediaDevice = Windows.Media.Devices.MediaDevice;
                // selectorString =  mediaDevice.getAudioRenderSelector();
                deviceClass = Enumeration.DeviceClass.audioRender;
                break;
            case "portableStorageDevice":
                // same as: 
                // var storageDevice = Windows.Devices.Portable.StorageDevice;
                // selectorString = storageDevice.getDeviceSelector();
                deviceClass = Enumeration.DeviceClass.portableStorageDevice;
                break;
            case "videoCapture":
                // same as:
                // var mediaDevice = Windows.Media.Devices.MediaDevice;
                // selectorString =  mediaDevice.getVideoCaptureSelector();
                deviceClass = Enumeration.DeviceClass.videoCapture;
                break;
            case "mtpService":
            // Windows.Devices.Portable.ServiceDevice.getDeviceSelector
                selectorString = mtpServiceDevice.getDeviceSelector(Windows.Devices.Portable.ServiceDeviceType.calendarService);
                break;
            case "sms":
            // Windows.Devices.Sms.SmsDevice.getDeviceSelector
                selectorString = smsDevice.getDeviceSelector();
                break;
            case "proximity":
            // Windows.Networking.Proximity.ProximityDevice.getDeviceSelector
                selectorString = proximityDevice.getDeviceSelector();
                break;
            case "imageScanner":
            // same as:
            // var scannerDevice = Windows.Devices.Scanners.ImageScanner;
            // selectorString = scannerDevice.getDeviceSelector();
                deviceClass = Enumeration.DeviceClass.imageScanner;
                break;
            default: deviceClass = Enumeration.DeviceClass.all;
        }

        var DeviceInformation = Enumeration.DeviceInformation;
        if (selectorString == "") {
            DeviceInformation.findAllAsync(deviceClass).then(
                successCallback, 
                errorCallback
            );
        } else {
            DeviceInformation.findAllAsync(selectorString, null).then(
                successCallback, 
                errorCallback
            );
        }
    } catch (e) {
        document.getElementById("statusMessage").innerHTML = 
            "Failed to enumerate devices, error: " + e.message;
    }
}

// Handles successful completion of the findAllAsync method.
function successCallback(deviceInformationCollection) {
    var numDevices = deviceInformationCollection.length;
    document.getElementById("statusMessage").innerHTML = 
        numDevices + " device interface(s) found";
    if (numDevices) {
        for (var i = 0; i < numDevices; i++) {
            printFriendlyNameAndID(deviceInformationCollection[i], 
                document.getElementById("Output"));
        }
    } else {
        document.getElementById("statusMessage").innerHTML = "No devices found";
    }
}

// Handles an error completion of the findAllAsync method.
function errorCallback(e) {
    document.getElementById("statusMessage").innerHTML = 
        "Failed to find devices, error: " + e.message;
}

// Prints the friendly name of the device interface and its ID 
// The ID is the device interface path.
function printFriendlyNameAndID(deviceInterface, log) {

    // The name property is equivalent to System.ItemNameDisplay property
    log.innerHTML += "<h3>" + 
            deviceInterface.name + "<h3/>";
    log.innerHTML += "<p>Interface ID: " + deviceInterface.id;    
    log.innerHTML += "<p>Enabled: " + deviceInterface.isEnabled;
    
    log.innerHTML += "<br />";
}