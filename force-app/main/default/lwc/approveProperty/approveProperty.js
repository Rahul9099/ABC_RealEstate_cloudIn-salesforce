import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import SALES_REGION_NAME_FIELD from '@salesforce/schema/Sales_Region__c.Name';
import TOTAL_YEAR_TO_DATE_SALES_FIELD from '@salesforce/schema/Sales_Region__c.Total_year_To_Date_Sales__c';


export default class ApproveProperty extends LightningElement {
    currentPropertyName;
    totalYearToDateSale;
    @api recordId;
    //for fetching the record Name
    @wire(getRecord,{recordId:'$recordId',fields:[SALES_REGION_NAME_FIELD]})
    getRecordName({data,error}){
        if(data){
            console.log('this is user data name'+data.fields.Name.value);
            this.currentPropertyName=data.fields.Name.value; 
        }
    }
    @wire(getRecord,{recordId:'$recordId',fields:[TOTAL_YEAR_TO_DATE_SALES_FIELD]})
    getRecordTYDS({data,error}){
        if(data){
            console.log('this is Total_year_To_Date_Sales__c'+data.fields.Name.value);
            this.totalYearToDateSale=data.fields.Name.value; 
        }
    }
    


}


