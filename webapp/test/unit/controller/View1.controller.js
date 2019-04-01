/*global QUnit*/

sap.ui.define([
	"training/day3_training_1/controller/View1.controller"
], function (oController) {
	"use strict";

	QUnit.module("View1 Controller");

	QUnit.test("I should test the View1 controller", function (assert) {
		var oAppController = new oController();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});