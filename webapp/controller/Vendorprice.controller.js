sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History"
  ],
  function (Controller, JSONModel, History) {
    "use strict";

    return Controller.extend("sap.fiori.project1.controller.Vendorprice", {
      onInit: function () {
        sap.ui.core.BusyIndicator.show(0);
        console.log("entered");
        // set data model on view

        var url = "https://ariba-courteous-fossa-di.cfapps.eu10-004.hana.ondemand.com/dev/GetLatestBids?event_id=Doc33123002";
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            debugger
            var dataModel = new JSONModel();
            dataModel.setData(res.data);
            this.getView().setModel(dataModel, "oJSONModel");
            sap.ui.core.BusyIndicator.hide(); 
          });
      },
      handleGridItemPress: function (oEvent) {
        // Get the clicked grid item
        var oItem = oEvent.getSource();
        // Get the JSON model data for the clicked item
        var oModelData = oItem.getBindingContext("oJSONModel").getObject();

        // Check if the "low_flag" property exists and is true in the JSON data
        if (oModelData.hasOwnProperty("low_flag") && oModelData.low_flag === "x") {
          // Set the red border for the clicked grid item
          oItem.addStyleClass("redBorder");
        } else {
          // Remove the red border for the clicked grid item
          oItem.removeStyleClass("redBorder");
        }
      },
     
    });
  }
);
