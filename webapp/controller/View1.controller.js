sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	'sap/ui/model/Filter'
], function (Controller,MessageBox,Filter) {
	"use strict";

	return Controller.extend("training.day3_training_1.controller.View1", {
		onInit: function () {
          var oModel= this.getOwnerComponent().getModel("NorthwindModel");
           sap.ui.core.BusyIndicator.show();
         oModel.read("/Products", {
				success: function (oData) {
				   console.log(oData);
				var oModelNorth = new sap.ui.model.json.JSONModel();
				oModelNorth.setData(oData);
			 /*   var list =this.getView().byId("input");
			    list.bindElement("/results");*/
				this.getView().setModel(oModelNorth,"Northwind");
				
				 sap.ui.core.BusyIndicator.hide();
				}.bind(this),
				error: function (oData) {
					sap.m.MessageToast.show("Connection not established");
					sap.ui.core.BusyIndicator.hide();
				}
			});
		},
	/*	OnSubmitPress :function(){
			var name =this.getView().byId("name").getValue();
			var email =this.getView().byId("emailInput").getValue();
			if (name && email){
		MessageBox.success("Form Submitted");	}
		else {
			this.getView().byId("name").setValueState("Error");
			MessageBox.error("Please Enter Mandatory Fields");
		}
		},*/
		validateName :function(){
				var name =this.getView().byId("name").getValue();
			var email =this.getView().byId("emailInput").getValue();
			if (name ){
				this.getView().byId("submit").setEnabled(true);
			}
		else {
			this.getView().byId("submit").setEnabled(false);
		}
		},
		OnNameClick :function(){
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("training.day3_training_1.fragments.Dialog", this);
				this._oDialog.setModel(this.getView().getModel("Northwind"));
			}
            this._oDialog.open();
		},
		handlConfirm :function(oEvent){
		var value = oEvent.getParameters("selectedItem").selectedItem.getProperty("title");
		this.getView().byId("name").setValue(value);
		},
		handleSearch :function(oEvent){
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("ProductName", sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		}
		
	});
});