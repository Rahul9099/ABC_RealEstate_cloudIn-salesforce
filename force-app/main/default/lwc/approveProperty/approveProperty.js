import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import SALES_REGION_NAME_FIELD from '@salesforce/schema/Sales_Region__c.Name';


export default class ApproveProperty extends LightningElement {

    @api recordId;
    @wire(getRecord,{recordId:'$recordId',fields:SALES_REGION_NAME_FIELD})
    sales_Region_Name_data;
    get Name(){
        return sales_Region_Name_data.data.fields.Name.value;
    }

    


}