sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], 

function (Controller, JSONModel) {  
  "use strict";
  
    return Controller.extend("sap.fiori.project1.controller.Questions", {
      onInit: function () 
      {  
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.loadData("/Z_SOURCE_EVENT_SRV/QuestionAllSet?$format=json&username=developer28&password=Peol@123");
        this.getView().setModel(oModel);
  
        // set data model on view
      //    var url='Z_SOURCE_EVENT_SRV/QuestionAllSet?$format=json';
      //     fetch(url).then(res => res.json()).then(res =>
      //       { 
      //         var dataModel = new sap.ui.model.json.JSONModel();
      //           dataModel.setData(res.d.results);
      //         this.getView().setModel(dataModel,"questionsModel")
      //       });
      //   var oModel = new sap.ui.model.json.JSONModel();
      //   oModel.loadData("Z_SOURCE_EVENT_SRV/QuestionAllSet?$format=json");
      //   this.getView().setModel(oModel, "oJSONModel");
      //   console.log(oModel);

      // var url = 'Z_SOURCE_EVENT_SRV/QuestionAllSet?$format=json';
      // fetch(url)
      //   .then(res => res.json())
      //   .then(res => {
      //     var dataModel = new sap.ui.model.json.JSONModel();
      //     dataModel.setData(res.d.results);
      //     this.getView().setModel(dataModel, "questionsModel");
        
      //     var oSelect = this.getView().byId("myDropdown");
      //     oSelect.bindItems({
      //       path: "questionsModel>/",
      //       template: new sap.ui.core.Item({
      //         key: "{questionsModel>key}",
      //         text: "{questionsModel>text}"
      //       })
      //     });
      //   });
      


      },
      backtoDetail: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("detail");
      },
      onload: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("detail");
      },
      onload2: function (oEvent) {
        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel);
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("venderprice");
      },
      back: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("detail");
      },
    });
  }
);
