/* eslint-disable valid-jsdoc */
// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sample/ui5/reactive/bean/Warehouse",
    "sample/ui5/reactive/bean/StorageBin",
    "sample/ui5/reactive/bean/Material",
    "sap/ui/model/base/ManagedObjectModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Warehouse, StorageBin, Material, ManagedObjectModel) {
        "use strict";

        return Controller.extend("sample.ui5.reactive.controller.Main", {
            onInit: function () {
               this._defineCalculatedProperties();
               this._oManagedObjectModel = this._prepareManagedObjectModel();
               this._setdManagedObjectModel();
            },
            onItemPress: function(oEvent){
                var oSource = oEvent.getSource();
                var sPath = oSource.getSelectedContextPaths()[0];
                var oCtx = this.getView().getModel("DataModel").getContext(sPath);
                var oArticleTable = this.getView().byId("idMaterialsTable");
                oArticleTable.setBindingContext(oCtx, "DataModel");
            },
            _prepareManagedObjectModel: function(){
                var oDataModelJson =  this.getOwnerComponent().getModel("DataModelJson");
                var oData = oDataModelJson.getData();

                var oWarehouse = new Warehouse();

                $.each(oData.storageBins, function(index, item){
                    var oStorageBin = new StorageBin();
                    oStorageBin.setName(item.name);

                    $.each(item.materials, function(indexM, itemM){
                        var oMaterial = new Material();
                        oMaterial.setUid(itemM.uuid);
                        oMaterial.setName(itemM.name);
                        oMaterial.setPrice(itemM.price);
                        oMaterial.setStock(itemM.stock);
                        oStorageBin.addMaterial(oMaterial);
                    });
                    oWarehouse.addStorageBin(oStorageBin);
                });
                
                return new ManagedObjectModel(oWarehouse);
            },
            _setdManagedObjectModel:function(){             
                this.getView().setModel(this._oManagedObjectModel, "DataModel");
            },
            _defineCalculatedProperties: function(){
                var oDataModelJson =  this.getOwnerComponent().getModel("DataModelJson");
                
                var oData = oDataModelJson.getData();

                $.each(oData.storageBins, function(index, item){
                    Object.defineProperty(item, "status", {
                        get: function () {
                            var bStockZero = true;
                            $.each(item.materials, function(indexM, itemM){
                                if(itemM.stock === 0){
                                    bStockZero = false;
                                    ///exit
                                    return false;
                                }
                            });
                            return bStockZero;
                        }
                    });
                    $.each(item.materials, function(indexM, itemM){
                        Object.defineProperty(itemM, "status", {
                            get: function () {
                                
                                return !!(itemM.stock && itemM.stock > 0);
                            }
                        });
                    });
                });
            },
            _setJsonModel:function(){
                var oDataModelJson =  this.getOwnerComponent().getModel("DataModelJson");
            
                this.getView().setModel(oDataModelJson, "DataModel");
            },
            onSelectionChange: function (oEvent) {
                var key = oEvent.getParameter("item").getKey();
                switch(key){
                    case "exp1": this._setdManagedObjectModel();
                        break;
                    case "exp2": this._setJsonModel();
                        break;
                }
            }
        });
    });
