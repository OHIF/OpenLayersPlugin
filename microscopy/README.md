# Usage

Open OHIFViewer at https://ohif.netlify.com/viewer/?url=https://s3.eu-central-1.amazonaws.com/ohif-viewer/sampleDICOM.json

Open developer tools

Paste the following into the console:
```

microscopyPluginConfig = {

  url: "https://min.gitcdn.link/repo/OHIF/OpenLayersPlugin/master/microscopy/microscopy.js",

  allowCaching: false,
  scriptURLs: [
    "https://min.gitcdn.link/repo/openlayers/openlayers.github.io/master/en/v5.1.3/build/ol.js",

    "https://unpkg.com/dicomweb-client@0.0.4",

    "https://unpkg.com/dicom-microscopy-viewer@0.0.3/build/dicom-microscopy-viewer.js",
  ]
};

OHIF.plugins.OHIFPlugin.reloadPlugin(microscopyPluginConfig);


```


Then paste this:
```
OHIFPlugin.entryPoints.MicroscopyPlugin()
```
