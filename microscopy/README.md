

# Usage

Open OHIFViewer at https://ohif.netlify.com/viewer/?url=https://s3.eu-central-1.amazonaws.com/ohif-viewer/sampleDICOM.json

Open developer tools

Paste the following into the console:
```

microscopyPluginConfig = {
  url: "https://rawgit.com/OHIF/OpenLayersPlugin/master/microscopy/microscopy.js",
  allowCaching: false,
  scriptURLs: [
    "https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.1.3/build/ol.js",
  ]
};

OHIFPlugin.reloadPlugin(microscopyPluginConfig);


```


Then paste this:
```
OHIFPlugin.entryPoints.MicroscopyPlugin()
```
