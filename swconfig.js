module.exports = {// definition of the allowed query fields for each sitwatch table
	sale: {
	fieldtypes:{
		saleid: {
			type: 'number'
		},
		to: {
			type: 'date'
		},
		from: {
			type: 'date'
		}
	 },required:['to','from']
	},
	employee: { 
		fieldtypes:{
			empnumbers: {
			type: 'number'
			},
			emprole: {
			enum: ['cashier', 'sales']
			}
		}
	},
	items:{
		itemnumbers: {
			type: 'number' 
		  }	
	}
}  