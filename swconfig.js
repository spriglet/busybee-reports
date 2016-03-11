module.exports = {// definition of the allowed query fields for each sitwatch table
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