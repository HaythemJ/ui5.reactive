/* eslint-disable valid-jsdoc */
/*eslint linebreak-style: ["error", "windows"]*/
// @ts-nocheck
sap.ui.define([
	"sap/ui/base/ManagedObject"
], /**
 * @param {typeof sap.ui.base.ManagedObject} ManagedObect 
 */
function (ManagedObect) {
	"use strict";
	return ManagedObect.extend("sample.ui5.reactive.bean.StorageBin", {
		metadata: {
			properties: {
				name: "string",
				status:"boolean"
			},
			aggregations: {
                materials:{
                    type:"sample.ui5.reactive.bean.Material",
                    multiple: true
                }
            },
			events: {}
		},
		init: function () {},
		getStatus:function(){
			var aMaterials = this.getAggregation("materials");
			var bStockZero = true;
			$.each(aMaterials, function(index, item){
				if(item.getStock() === 0){
					bStockZero = false;
					///exit
					return false;
				}
			});
			return bStockZero;
		}
	});
});