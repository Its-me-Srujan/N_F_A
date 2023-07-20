sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/Popover",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (BaseController, History, Popover, List, StandardListItem, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("sap.fiori.project1.controller.App", {
      onInit() {
      
        sap.ui.core.BusyIndicator.show(0);
        var url = 'https://ariba-smart-cheetah-rg.cfapps.us10-001.hana.ondemand.com/dev/GetEntitySet';
        fetch(url).then(res => res.json()).then(res => {
          var dataModel = new sap.ui.model.json.JSONModel();
          dataModel.setData(res.data);
          this.getView().setModel(dataModel, "oJSONModel");
          sap.ui.core.BusyIndicator.hide(); 
        });
      },
    

      // onSearchLiveChange: function (oEvent) {
      //   var sValue = oEvent.getParameter("newValue");
      //   var oTable = this.getView().byId("List");
      //   var oBinding = oTable.getBinding("items");

      //   var aFilters = [
      //     new Filter("Srcevtname", FilterOperator.Contains, sValue),
      //     new Filter("Desc", FilterOperator.Contains, sValue),
      //     new Filter("Createdby", FilterOperator.Contains, sValue),
      //     new Filter("status", FilterOperator.Contains, sValue),
      //     new Filter("Version", FilterOperator.Contains, sValue)
      //   ];

      //   var oMultiFilter = new Filter({
      //     filters: aFilters,
      //     and: false
      //   });

      //   oBinding.filter([oMultiFilter]);
      // },

      onSearch: function (oEvent) {
        var sValue = oEvent.getParameter("query");
        var oTable = this.getView().byId("List");
        var oBinding = oTable.getBinding("items");

        var aFilters = [
          new Filter("Srcevtname", FilterOperator.Contains, sValue),
          new Filter("Desc", FilterOperator.Contains, sValue),
          new Filter("Createdby", FilterOperator.Contains, sValue),
          new Filter("status", FilterOperator.Contains, sValue),
          new Filter("Version", FilterOperator.Contains, sValue)
        ];

        var oMultiFilter = new Filter({
          filters: aFilters,
          and: false
        });

        oBinding.filter([oMultiFilter]);
      },
      
  
      onSearchLiveChange: function (oEvent) {
        var sValue = oEvent.getParameter("newValue");
        var oTable = this.getView().byId("List");
        var oBinding = oTable.getBinding("items");
  
        var aFilters = [
          new Filter("Srcevtname", FilterOperator.Contains, sValue),
          new Filter("Desc", FilterOperator.Contains, sValue),
          new Filter("Createdby", FilterOperator.Contains, sValue),
          new Filter("status", FilterOperator.Contains, sValue),
          new Filter("Version", FilterOperator.Contains, sValue)
        ];
  
        var oMultiFilter = new Filter({
          filters: aFilters,
          and: false
        });
  
        oBinding.filter([oMultiFilter]);
      },
       

      
      onload: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("detail");
      },

      back: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("");
      },

      onOpen: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("questions");
      },

      onPreview: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("vendorprice");
      },

      fetchversion: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("version");
      },

      backtoDetail: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("detail");
      },

      backToHome: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("App");
      },

      onNavBack: function () {
        var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("app", {}, true);
        }
      }
    });
  }
);

