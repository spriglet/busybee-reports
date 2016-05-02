module.exports = {// definition of the allowed query fields for each sitwatch table
	schemas: true,
  RESTconfig:{
    mainpath:'sitewatch',
    trees:{
      formfields:{
          name:'formfields',
          branches:[['tabtypes']],
          paths:{
              tabtypes:['employee','items'],
              
          }
          

      },
      sale:{
          name:'sale',
          branches:[['entities'],['entities','data'],['entities','data','data'],['entities','data','data','data'],['data']] // different paths
          ,
          paths:{
              entities:['employee','site','customer','terminal'],
              data:['facts','items','rptcategory','items2']
          }
      }
    }
  },
  schemas:{
   
    sale: {
      properties: {
        saleid:{
          type: 'number'
        },
        to: {
          type: 'date'
        },
        from: {
          type: 'date'
        }
       },
       required:['to','from'],
       fields:['saleidfunc','sale.actualsaleid','sale.code',
          'statuscode','sale.total','sale.shift','sale.created','sale.modified']
    },
    employee: { 
      properties:{
        empnumbers: {
        type: 'number'
        },empnumber:{
          type: 'string'    
        },
        emprolename: {
        enum: ['Cashier', 'sales']
        }
      },fields:['employee.code','employee.name','employeerole.name']
    },
    items:{
      properties:{
        item:{
          type: 'string' 
        }
      },fields:['item.name','saleitems.val','saleitems.qty','saleitems.amt']
    }, rptcategory:{
    properties:{
      name: {
        type:'string'
      }
      },fields:['rptcategory.name']
    },items2:{
      properties:{
        itemn2:{
          type: 'string' 
        }	,
        item2name:{
          type: 'string'
        }
      },fields:['item2.name','saleitems2.val','saleitems2.qty','saleitems2.amt'] 
    } 
  }
 
}  