/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope Public
 */
define(['N/email', 'N/record', 'N/ui/serverWidget', 'N/runtime'],
/**
 * @param {email} email
 * @param {record} record
 * @param {serverWidget} serverWidget
 */
    function (email, record, serverWidget, runtime) {
   
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(scriptContext) {
		var recNewRecord = scriptContext.newRecord;
    	var objForm = scriptContext.form;
      	 //Set field display type to disabled
    	var objFieldToHide = objForm.getField({
            id: 'class'
    	});
    	
    	objFieldToHide.updateDisplayType({
    		    displayType: serverWidget.FieldDisplayType.DISABLED
    		});
    	  

        recNewRecord.setValue({
            fieldId: 'memo',
            value: 'This memo was set by 434202'
        });
    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {
        var stFieldId = '';
        var recNewRecord = scriptContext.newRecord;

        // Get value of #custbody_acen_sec_cust_it
        var stValue = recNewRecord.getValue({
            fieldId: 'custbody_acen_sec_cust_it'
        });

        // If empty
        if (stValue == '') {
            recNewRecord.setValue({
                fieldId: 'otherrefnum',
                value: '434202'
            });
        }
        else {
            recNewRecord.setValue({
                fieldId: 'otherrefnum',
                value: 'Not available'
            });
        }

        var stValueDepartment = recNewRecord.getValue({
            fieldId: 'department'
        });

        var stValueEntity = recNewRecord.getValue({
            fieldId: 'entity'
        });

        if (stValueDepartment == '' && stValueEntity == '33') {
            recNewRecord.setValue({
                fieldId: 'department',
                value: '5'
            });
        }
    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(scriptContext) {
    	var recNewRecord = scriptContext.newRecord;
		// Get value of #custbody_acen_sec_cust_it
		var stValue = recNewRecord.getValue({
			fieldId : 'department'
		});
      	var objCurrentUser = runtime.getCurrentUser();
		
		if(stValue == '')
		{
            var stMessage = 'New Invoice was created with empty department.';
		}
		else
		{
            var stMessage = 'New Invoice was created with department id: ' +stValue;
		}
		
        email.send({
            author: objCurrentUser.id,
            recipients: objCurrentUser.id,
			subject : 'Invoice created',
			body : stMessage
		});
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
