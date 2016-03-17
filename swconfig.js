module.exports = {// definition of the allowed query fields for each sitwatch table
	schemas: true,
  RESTconfig:{
    mainpath:'sitewatch',
    trees:{
     
      sale:{
          name:'sale',
          branches:[['entities'],['entities','data'],['data']] // different paths
          ,
          paths:{
              entities:['employee','site','customer','terminal'],
              data:['facts','items']
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
        },
        emprole: {
        enum: ['cashier', 'sales']
        }
      },fields:['employee.name','employeerole.name']
    },
    items:{
      properties:{
        itemnumbers:{
          type: 'number' 
        }	
      } 
    }
  }
}  