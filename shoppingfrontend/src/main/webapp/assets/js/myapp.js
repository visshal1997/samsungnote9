$(function() {

	// solving the active menu problem
	switch (menu) {
	case 'About Us':
		$('#about').addClass('active');
		break;

	case 'Contact Us':
		$('#contact').addClass('active');
		break;

	case 'All Products':
		$('#listProducts').addClass('active');
		break;
		
	case 'Manage Products':
		$('#manageProducts').addClass('active');
		break;

	default:
		$('#a_' + menu).addClass('active');
		break;

	}

	// code for jquery dataTable

	var $table = $('#productListTable');
	// execute the below code where we have this table

	if ($table.length) {
		// console.log('Inside the table');

		var jsonurl = '';
		if (window.categoryId == '') {
			jsonurl = window.contextRoot + '/json/data/all/products';
		}

		else {
			jsonurl = window.contextRoot + '/json/data/category/'
					+ window.categoryId + '/products';
		}

		$table
				.DataTable({
					lengthMenu : [ [ 3, 5, 10, -1 ],
							[ '3 Records', '5 Records', '10 Records', 'ALL' ] ],
					pageLength : 5,
					ajax : {
						url : jsonurl,
						dataSrc : ''
					},

					columns : [
							{
								data : 'code',
								bSortable : false,
								mRender : function(data, type, row) {
									return '<img src="' + window.contextRoot
											+ '/resources/images/' + data
											+ '.jpg" class="dataTableImg"/>'
								}
							},
							{
								data : 'name'
							},
							{
								data : 'brand'
							},
							{
								data : 'unitPrice',
								mRender : function(data, type, row) {
									return '&#8377; ' + data
								}

							},
							{
								data : 'quantity',
								mRender : function(data, type, row) {
									if (data < 1) {
										return '<span style="color: red">Out of Stock</span>';
									}
									return data;
								}

							},
							{
								data : 'id',
								bSortable : false,
								mRender : function(data, type, row) {
									var str = '';
									str += '<a href="'
											+ window.contextRoot
											+ '/show/'
											+ data
											+ '/product" class= "btn btn-primary"><span class="glyphicon glyphicon-eye-open"></span></a> &#160;';
									if (row.quantity < 1) {
										str += '<a href="javascript:void(0)" class="btn btn-success disabled"><span class="glyphicon glyphicon-shopping-cart"></span></a>';
									} else {
										str += '<a href="'
												+ window.contextRoot
												+ '/cart/add'
												+ data
												+ '/product" class="btn btn-success"><span class="glyphicon glyphicon-shopping-cart"></span></a>';
									}

									return str;
								}
							}

					]

				});
		
	}
				
	//dismissing the alert after 3 seconds		
		var $alert = $('.alert');
		
			if($alert.length)
				{
				setTimeout(function(){$alert.fadeOut('slow')},3000)
				}
			
	
	
	// jquery dataTable for admin

	var $adminProductsTable = $('#adminProductsTable');
	// execute the below code where we have this table

	if ($adminProductsTable.length) {
		// console.log('Inside the table');

		var jsonurl = window.contextRoot + '/json/data/admin/all/products';
		
		$adminProductsTable.DataTable({
					lengthMenu : [ [ 10, 30, 50, -1 ],
							[ '10 Records', '30 Records', '50 Records', 'ALL' ] ],
					pageLength : 30,
					ajax : {
						url : jsonurl,
						dataSrc : ''
					},

					columns : [
							{
								data : 'id',
								
							},
							{
								data : 'code',
								bSortable : false,
								mRender : function(data, type, row) {
									return '<img src="' + window.contextRoot
											+ '/resources/images/' + data
											+ '.jpg" class="adminDataTableImg"/>'
								}
							},
							{
								data : 'name'
							},
							{
								data : 'brand'
							},
							{
								data : 'quantity',
								mRender : function(data, type, row) {
									if (data < 1) {
										return '<span style="color: red">Out of Stock</span>';
									}
									return data;
								}
								
							},
							{
								data : 'unitPrice',
								mRender : function(data, type, row) {
									return '&#8377; ' + data
								}

							},
							{
								data:'active',
								bSortable : false,
								mRender : function(data, type, row){
									var str=''
									if(data == true)
										{
										str= '<label class="switch"><input type="checkbox" checked="checked" value="' + row.id + '"/><div class="slider"></div></label>'
										}
									else
										{
										str = '<label class="switch"><input type="checkbox" value="' + data + '"/><div class="slider"></div></label>'
										}
										
									return str
									}	
							},
							{
								data:'id',
								bSortable : false,
								mRender : function(data, type, row){
									var str='<a href="'+ window.contextRoot + '/manage/' + data + '/product" class="btn btn-warning"><span class="glyphicon glyphicon-pencil"></span></a>'
									return str
									}	
							}
			
					],
					
					// to activate toggle switch alert box
					
					initComplete: function(){
						
						var api = this.api();
						
						api.$('.switch input[type="checkbox"]').on('change',function() {
							
							var checkbox = $(this);
							var checked = checkbox.prop('checked');
							var msg = (checked) ? 'You want to activate the product?': 'You want to deactivate the product?';

							var value = checkbox.prop('value');
							bootbox.confirm({

										size : 'medium',
										title : 'Product Activation and Deactivation',
										message : msg,
										callback : function(confirmed) {
											if (confirmed) {
												
												var activationUrl = window.contextRoot + '/manage/product/' + value + '/activation';
												
												$.post(activationUrl,function(data){
													bootbox.alert({
														size : 'medium',
														title : 'Information',
														message : data
													});
												});
												
											} 
											else {
												checkbox.prop('checked', !checked);
											}
										}

									});

						});
					}

				});
		
	}

	
	// validation while adding new category

	var $categoryForm = $('#categoryForm');

	if ($categoryForm.length) {

		$categoryForm.validate({

					rules : {

						name : {

							required : true,
							minlength : 2
						},

						description : {

							required : true
						}

					},
					messages : {

						name : {

							required : 'Please enter the category name !',
							minlength : 'The category name should not be less than 2 characters !'
						},

						description : {

							required : 'Please add a description for this category !'

						}

					},
					errorElement : 'em',
					errorPlacement : function(error, element) {

						// adding help-block class
						error.addClass('help-block');

						// adding error element after the input element
						error.insertAfter(element);

					}

				});

	}
	
	//-----------
	
	


});