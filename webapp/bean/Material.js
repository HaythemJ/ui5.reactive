/* eslint-disable valid-jsdoc */
/*eslint linebreak-style: ["error", "windows"]*/
sap.ui.define([
	"sap/ui/base/ManagedObject"
], /**
 * @param {typeof sap.ui.base.ManagedObject} ManagedObect 
 */
function (ManagedObect) {
	"use strict";
	return ManagedObect.extend("sample.ui5.reactive.bean.Material", {
		metadata: {
			properties: {
                uid: "string",
				name: "string",
                price: "int",
                stock: "int",
				status: "boolean"
			},
			aggregations: {},
			events: {}
		},
		init: function () {},
		setStock: function (value) {
			this.setProperty("stock", value, true);
			if (value && value > 0) {
				this.setProperty("status", true);
			} else {
				this.setProperty("status", false);
			}
		}
	});
});