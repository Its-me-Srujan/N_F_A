sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Column",
    "sap/m/ColumnListItem",
    "sap/m/Text"
  ],
  function (Controller, JSONModel, Column, ColumnListItem, Text) {
    "use strict";

    return Controller.extend("sap.fiori.project1.controller.App", {
      onInit: function () {
        sap.ui.core.BusyIndicator.show(0);
        var url = "https://ariba-courteous-fossa-di.cfapps.eu10-004.hana.ondemand.com/dev/GetSupplierBidsv1?event_id=Doc33123002";

        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            var biddingData = res.data.items.bidding_date;
            var oTable = this.getView().byId("idMyTable");

            // Add columns to idMyTable
            for (var key in biddingData[0]) {
              var oColumn = new Column({
                header: new sap.m.Label({
                  text: key
                })
              });
              oTable.addColumn(oColumn);
            }

            // Add rows to idMyTable
            for (var i = 0; i < biddingData.length; i++) {
              var rowData = biddingData[i];
              var oCells = [];

              for (var key in rowData) {
                var cellValue = rowData[key];
                var oCell = new sap.m.Text({
                  text: cellValue
                });
                oCells.push(oCell);
              }

              var oRow = new ColumnListItem({
                cells: oCells
              });
              oTable.addItem(oRow);
            }

            var qnsData = res.qns.qns_data;
            var oTable2 = this.getView().byId("list2");

            // Clear existing items
            oTable2.removeAllItems();

            // Add columns to list2
            var qnsHeader = res.qns.qns_header;
            for (var key in qnsHeader) {
              var oColumn = new Column({
                header: new sap.m.Label({
                  text: qnsHeader[key]
                })
              });
              oTable2.addColumn(oColumn);
            }

            // Add rows to list2
            for (var i = 0; i < qnsData.length; i++) {
              var qnsItem = qnsData[i];
              var oCells = [];

              // Change the order of the cells as per your desired layout
              var questionCell = new sap.m.Text({
                text: qnsItem.question
              });
              var guruprasadCell = new sap.m.Text({
                text: qnsItem.Guruprasad
              });
              var supplierDemo2Cell = new sap.m.Text({
                text: qnsItem.Supplier_Demo2
              });

              oCells.push(questionCell, guruprasadCell, supplierDemo2Cell);

              var oRow = new ColumnListItem({
                cells: oCells
              });
              oTable2.addItem(oRow);
              sap.ui.core.BusyIndicator.hide(); 
            }
          });
      },
      onPreview: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("vendorprice");
      },

      fetchversion: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("version");
      },

      quest: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("questions");
      }
    });
  }
);
      
 
