/* eslint-disable valid-jsdoc */
/*eslint linebreak-style: ["error", "windows"]*/
sap.ui.define([
	"sap/ui/base/ManagedObject"
], /**
 * @param {typeof sap.ui.base.ManagedObject} ManagedObect 
 */
function (ManagedObect) {
	"use strict";
	return ManagedObect.extend("sample.ui5.reactive.bean.Warehouse", {
		metadata: {
			properties: {
				name: "string"
			},
			aggregations: {
                storageBins:{
                    type:"sample.ui5.reactive.bean.StorageBin",
                    multiple: true
                }
            },
			events: {}
		},
		init: function () {}
	});
});