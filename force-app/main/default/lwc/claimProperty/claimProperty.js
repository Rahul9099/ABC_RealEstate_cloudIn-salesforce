import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getClaimedProperties from '@salesforce/apex/ClaimProperty.getClaimedProperties';

const columns = [
    { label: 'Property', fieldName: 'Name' },
    { label: 'Property City', fieldName: 'Property_City__c', type: 'text' },
    { label: 'Listing Price', fieldName: 'Listing_Price__c', type: 'currency' },
    { label: 'Status', fieldName: 'Status__c' },
    { label: 'Date Added', fieldName: 'CreatedDate', type: 'date' },
];

export default class ClaimProperty extends LightningElement {
    pageName;
    @wire(CurrentPageReference) 
    getCurrentPageReference(pageRef) {
        if (pageRef) {
            this.pageName = pageRef.attributes.name;
        }
    }
    data = [];
    error;
    columns = columns;
    totalRecords=0;
    pageSizeOption=5;
    pageSize;
    totalPages;
    pageNumber =1;
    recordsToDisplay = [];

    get bDisableFirst() {
        return this.pageNumber == 1;
    }
    get bDisableLast() {
        return this.pageNumber == this.totalPages;
    }

    connectedCallback(){
        getClaimedProperties()
        .then((data)=>{
            this.data = data;
            console.log('RESULT--> ' + JSON.stringify(data));
            this.totalRecords = data.length;
            this.pageSize= 5;
            this.paginationHelper();
        })
        .catch((error)=>{
            this.error =error;
        })  
    }

    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper();
    }
    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }
    firstPage() {
        this.pageNumber = 1;
        this.paginationHelper();
    }
    lastPage() {
        this.pageNumber = this.totalPages;
        this.paginationHelper();
    }

    paginationHelper() {
        this.recordsToDisplay = [];
        // calculate total pages
        this.totalPages = Math.ceil(this.totalRecords / 5);
        // set page number 
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
        // set records to display on current page 
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.recordsToDisplay.push(this.data[i]);
        }
        
    }
   renderedCallback(){
    console.log('record to display +++++++--> ' + JSON.stringify(this.recordsToDisplay));
   }
}