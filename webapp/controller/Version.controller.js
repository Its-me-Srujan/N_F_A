sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/routing/History"
], function (Controller, JSONModel, History) {
  "use strict";

  return Controller.extend("sap.fiori.project1.controller.Version", {
    onInit: function () {
      sap.ui.core.BusyIndicator.show(0);
      console.log("entered");
      // Set data model on view
      var url = "https://ariba-courteous-fossa-di.cfapps.eu10-004.hana.ondemand.com/dev/GetLatestBids?event_id=Doc33123002";
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          var dataModel = new JSONModel();
          dataModel.setData(res.data);
          this.getView().setModel(dataModel, "oJSONModel");

          // Store the original data for Vendor 1 and Vendor 2 in variables
          this._originalDataVendor1 = JSON.parse(JSON.stringify(res.data.items.Guruprasad));
          this._originalDataVendor2 = JSON.parse(JSON.stringify(res.data.items.Supplier_Demo2));

          // Show both scroll containers initially
          this.getView().byId("scrollContainer1").setVisible(true);
          this.getView().byId("scrollContainer2").setVisible(true);
          sap.ui.core.BusyIndicator.hide(); 
        });
    },

    handleSelectChange: function (oEvent) {
      var sSelectedKey = oEvent.getParameter("selectedItem").getKey();
      var oModel = this.getView().getModel("oJSONModel");
      var oScrollContainer1 = this.getView().byId("scrollContainer1");
      var oScrollContainer2 = this.getView().byId("scrollContainer2");

      if (sSelectedKey === "option1") {
        // Restore the original data for Vendor 1
        oModel.setProperty("/items/Guruprasad", this._originalDataVendor1);
        oScrollContainer1.setVisible(true); // Show the first grid
        oScrollContainer2.setVisible(true); // Hide the second grid
      } else if (sSelectedKey === "option2") {
        // Restore the original data for Vendor 2
        oModel.setProperty("/items/Supplier_Demo2", this._originalDataVendor2);
        oScrollContainer1.setVisible(false); // Hide the first grid
        oScrollContainer2.setVisible(true); // Show the second grid
      
      }
      // Add more conditions for other options as needed
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
    }
  });
});
