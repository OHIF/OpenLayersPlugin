# OHIF Microscopy Plugin

OHIF microscopy plugin based on the [DICOM Microscopy Viewer](https://github.com/dcmjs-org/dicom-microscopy-viewer).

1. Load the OHIF Viewer on a study
2. Paste the following into your JavaScript console to define the plugin and load the scripts.

````javascript
var plugin = {
    name: "MicroscopyPlugin",
    url: "https://cdn.rawgit.com/OHIF/OpenLayersPlugin/master/microscopy/microscopy.js",
    allowCaching: false,
    scriptURLs: [
        "https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.1.3/build/ol.js",
        "https://unpkg.com/dicomweb-client",
        "https://cdn.rawgit.com/dcmjs-org/dicom-microscopy-viewer/feature/annotations/build/dicom-microscopy-viewer.js"
    ]
};
OHIF.plugins.OHIFPlugin.reloadPlugin(plugin);
````

3. Switch a viewport to use the plugin by specifying its viewport index:

````javascript
OHIF.plugins.MicroscopyPlugin.setViewportToPlugin(0)
````