// An OpenLayers based Microscopy OHIFPlugin
class MicroscopyPlugin extends ViewportPlugin {
    constructor(options = {}) {
        super();

        this.name = "MicroscopyPlugin";
        this.description = "Microscopy OHIF Plugin";

        this.setupListeners();
    }

    setup() {
      console.log('setup Microscopy');
    }

    setupViewport(div, { viewportIndex = 0 }, displaySet) {
        // Obtain the imaging data that has been provided to the viewport
        if (!displaySet) {
            displaySet = ViewportPlugin.getDisplaySet(viewportIndex);
        }

        this.installOpenLayersRenderer(div, displaySet);
    }


    // install the microscopy renderer into the web page.
    // you should only do this once.
    installOpenLayersRenderer(container, displaySet) {
      console.log(container);

      const server = OHIF.servers.getCurrentServer();
      const accessToken = OHIF.user.getAccessToken(); // TODO: need to refresh

      const dicomWebClient = new DICOMwebClient.api.DICOMwebClient({
        url: server.wadoRoot,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const searchInstanceOptions = {
        studyInstanceUID: displaySet.studyInstanceUid,
        seriesInstanceUID: displaySet.seriesInstanceUid,
      };
      dicomWebClient.searchForInstances(searchInstanceOptions).then((instances) => {
        const promises = []
        for (let i = 0; i < instances.length; i++) {
          const sopInstanceUID = instances[i]["00080018"]["Value"][0];
          const retrieveInstanceOptions = {
            studyInstanceUID: displaySet.studyInstanceUid,
            seriesInstanceUID: displaySet.seriesInstanceUid,
            sopInstanceUID,
          };

          const promise = dicomWebClient.retrieveInstanceMetadata(retrieveInstanceOptions).then(metadata => {
            const imageType = metadata[0]["00080008"]["Value"];
            if (imageType[2] === "VOLUME") {
              return(metadata[0]);
            }
          });
          promises.push(promise);
        }
        return(Promise.all(promises));
      }).then(metadata => {
          console.warn(metadata);
          metadata = metadata.filter(m => m);

        const viewer = new DICOMMicroscopyViewer.api.DICOMMicroscopyViewer({
          client: dicomWebClient,
          metadata
        });
        viewer.render({container});
      });


    }
};


OHIFPlugin.entryPoints["MicroscopyPlugin"] = function () {
    let microscopyPlugin = new MicroscopyPlugin();
    microscopyPlugin.setup();

    OHIFPlugin.MicroscopyPlugin = microscopyPlugin;
};
