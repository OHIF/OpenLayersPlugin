// An OpenLayers based Microscopy OHIFPlugin


try {
    MicroscopyPlugin
} catch (error) {
    let MicroscopyPlugin;
}


MicroscopyPlugin = class MicroscopyPlugin extends OHIFPlugin {

    constructor(options = {}) {
        super();
        this.name = "MicroscopyPlugin";
        this.description = "Microscopy OHIF Plugin";
    }

    setup() {
      console.log('setup Microscopy');

      this.viewport = Session.get('activeViewport'));
    }

    getDisplaySet(viewportIndex) {
        const viewportData = OHIF.viewerbase.layoutManager.viewportData[viewportIndex];
        const { studyInstanceUid, displaySetInstanceUid } = viewportData;
        const studyMetadata = OHIF.viewer.StudyMetadataList.findBy({ studyInstanceUID: studyInstanceUid });
        
        return studyMetadata.findDisplaySet(displaySet => {
            return displaySet.displaySetInstanceUid === displaySetInstanceUid;
        });
    }

    renderViewport(viewportIndex = 0) {
        try {
            let self = this;
            // reset the div that will hold this plugin
            // - remove old ones
            // - add a new one with our id


            // Obtain the imaging data that has been provided to the viewport
            const displaySet = this.getDisplaySet(viewportIndex);

            // Clear whatever is currently present in the viewport
            const containers = document.querySelectorAll(".viewportContainer");
            const parent = containers[viewportIndex];
            parent.innerHTML = "";

            // Create our own viewport rendering window
            this.pluginDiv = document.createElement("div");
            this.pluginDiv.style.width = '100%';
            this.pluginDiv.style.height = '100%';
            this.pluginDiv.id = "microscopyPlugin";
            parent.appendChild(this.pluginDiv);

            // Retrieve the Cornerstone imageIds from the display set
            // TODO: In future, we want to get the metadata independently from Cornerstone
            const imageIds = displaySet.images.map(image => image.getImageId());

            installOpenLayersRenderer(container);
        }
        catch(error) {
            console.log(error);
        }
    }


    // install the microscopy renderer into the web page.
    // you should only do this once.
    installOpenLayersRenderer(container) {

    }


};


OHIFPlugin.entryPoints["MicroscopyPlugin"] = function () {
    let MicroscopyPlugin = new MicroscopyPlugin();
    MicroscopyPlugin.setup();

    OHIFPlugin.MicroscopyPlugin = MicroscopyPlugin;
};
