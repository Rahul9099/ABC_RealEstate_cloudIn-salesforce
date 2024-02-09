import { LightningElement, api } from 'lwc';


    const columns = [
        { label: 'Property', fieldName: 'Name' },
        { label: 'Property City', fieldName: 'Property_City__c', type: 'text' },
        { label: 'Listing Price', fieldName: 'Listing_Price__c', type: 'currency' },
        { label: 'Status', fieldName: 'Status__c' },
        { label: 'Date Added', fieldName: 'CreatedDate', type: 'date' },
    ];

export default class ResuablePagination extends LightningElement {

    @api editable=false;

    @api columns;
    
}