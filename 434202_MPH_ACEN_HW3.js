/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope Public
 */
define(['N/ui/dialog', 'N/ui/message'],
/**
 * @param {dialog} dialog
 * @param {message} message
 */
function(dialog, message) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {
	
    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
    
    }

    /**
     * Function to be executed when field is slaved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     *
     * @since 2015.2
     */
    function postSourcing(scriptContext) {

    }

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function sublistChanged(scriptContext) {

    }

    /**
     * Function to be executed after line is selected.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function lineInit(scriptContext) {

    }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
    function validateField(scriptContext) {
        var stFieldId = scriptContext.fieldId;
        var recCurrentRecord = scriptContext.currentRecord;
        var stValue = recCurrentRecord.getValue({
            fieldId: 'memo'
        });
        if (stFieldId == 'memo' && stValue != '') {
            //this create bug in chrome, edge and opera
            //dialog.alert({
            //    title: 'Invalid value',
            //    message: 'MEMO must remain empty!'
            //});
            alert('MEMO must remain empty!');
            return false;
        }

        //extending point
     
        
        var stValueDate = new Date(recCurrentRecord.getValue({
            fieldId: 'trandate'
        }));
        var today = new Date();

        if (stFieldId == 'trandate' && stValueDate < today) {

   
            return errorMessageType('Time Machine', 'You can not purchase from past', 10000);
        }

           return true;
        
    }


    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateLine(scriptContext) {
		
    }

    /**
     * Validation function to be executed when sublist line is inserted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateInsert(scriptContext) {

    }

    /**
     * Validation function to be executed when record is deleted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateDelete(scriptContext) {

    }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) {

        var recCurrentRecord = scriptContext.currentRecord;
        var stIndType = recCurrentRecord.getValue({
            fieldId: 'currency'
        });

        if (stIndType == '1') {
            return errorMessageType('cannot save the order', 'saving prevente by 434202',8000);
        }
     
        else if (stIndType == '5') {
            recCurrentRecord.setValue({
                fieldId: 'department',
                value: '5'
            });
        }
        return true;

    }

     /**
     * Additional function errorMessageType
     *
     * @param {String} textToTitle
     * @param {String} TextToMessage
     * @param {Float} timeToDuration
     * @returns {false} 
     *
     * @since 2015.2
     */
    function errorMessageType(textToTitle,TextToMessage,timeToDuration) {

        var objMessage = message.create({
            title: textToTitle,
            message: TextToMessage,
            type: message.Type.ERROR
        });
        objMessage.show({
            duration: timeToDuration
        });
        return false;
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        //postSourcing: postSourcing,
        //sublistChanged: sublistChanged,
        //lineInit: lineInit,
        validateField: validateField,
        //validateLine: validateLine,
        //validateInsert: validateInsert,
        //validateDelete: validateDelete,
        saveRecord: saveRecord
    };
    
});
