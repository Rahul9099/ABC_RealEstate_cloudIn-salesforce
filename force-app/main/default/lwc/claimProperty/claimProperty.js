import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getClaimedProperties from '@salesforce/apex/ClaimProperty.getClaimedProperties';
import updateProperty from '@salesforce/apex/ClaimProperty.updateProperty';
import Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import SALES_OFFICE_NAME_FIELD from '@salesforce/schema/Sales_Office__c.Name';



const columns = [
    { label: 'Property', fieldName: 'Name' },
    { label: 'Property City', fieldName: 'Property_City__c', type: 'text' },
    { label: 'Listing Price', fieldName: 'Listing_Price__c', type: 'currency' },
    { label: 'Status', fieldName: 'Status__c' },
    { label: 'Date Added', fieldName: 'CreatedDate', type: 'date' },
];

export default class ClaimProperty extends LightningElement {
    uid =Id;
    @track CurrentUser_Agent_Name;
    @track selectRowDataArray=[];
    selectedNumber;
    pageName;
    @track data = [];
    error;
    columns = columns;
    totalRecords=0;
    pageSizeOption=5;
    pageSize;
    totalPages;
    pageNumber =1;
    @track recordsToDisplay = [];

    get bDisableFirst() {
        return this.pageNumber == 1;
    }
    get bDisableLast() {
        return this.pageNumber == this.totalPages;
    }


    // @wire(CurrentPageReference) 
    // getCurrentPageReference(pageRef) {
    //     if (pageRef) {
    //         this.pageName = pageRef.attributes.name;
    //     }
    // }
    // @wire(getRecord, {recordId: Id,fields: [NAME_FIELD]}) 
    // wireuser({error, data}) {
    //     if (data) {
    //         this.CurrentUser_Agent_Name = data.fields.Name.value;
    //     } 
    // }

    @api recordId;
    @wire(getRecord,{recordId:'$recordId',fields:SALES_OFFICE_NAME_FIELD})
    sales_Region_Name_data;
    get Name(){
        return sales_Region_Name_data.data.fields.Name.value;
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
    getSelectedRow(event){
        const selectRow = event.detail.selectedRows;
        this.selectedNumber = selectRow.length;
        selectRow.forEach(element => {
            if(!this.selectRowDataArray.includes(element.id)){
             this.selectRowDataArray.push(element.Id);
            }
        });
    }
   
    handleClaim(){
        updateProperty({propId:this.selectRowDataArray,agentId:this.uid})
        .then(data=>{
        })
        .catch(error=>{
        })
        
    }
    
}