	// Hàm này dùng để validate dữ liệu form trước khi submit.
function submitForm(){
		// Lấy giá trị từ thẻ input.
	account = $('#account').val();
	password = $('#password').val();
	confirmpassword = $('#confirmpassword').val();
	name = $('#name').val();
	date = $('#date').val();
	mail = $('#mail').val();
	tel = $('#tel').val();
	
		// Validate account. 
	if(account == '' || account.trim().length == 0){
		$('#accountError_msg').text('* Enter your account!');
		$('#accountError_msg').attr('style', 'color:red;');
		$('#account').attr('style', 'border: 1px solid #f00;');
		return false;		
	}else if(account.length < 6 || account.length > 20){
		$('#accountError_msg').text('* Your account must larger 6 and smaller 20 characters!');
		$('#accountError_msg').attr('style', 'color:red;');
		$('#account').attr('style', 'border: 1px solid #f00;');		
		return false;	
	} else{
		$('#accountError_msg').text('');
		$('#accountError_msg').attr('style', '');
		$('#account').attr('style', 'border: 1px solid green;');		
	}
	
		// Validate password 
	if(password == '' || password.trim().length == 0){
		$('#passwordError_msg').text('* Enter your password!');
		$('#passwordError_msg').attr('style', 'color:red;');
		$('#password').attr('style', 'border: 1px solid #f00;');
		return false;		
	}else if(password.length < 6 || password.length > 20){
		$('#passwordError_msg').text('* Your password must larger 6 and smaller 20 characters!');
		$('#passwordError_msg').attr('style', 'color:red;');
		$('#password').attr('style', 'border: 1px solid #f00;');		
		return false;	
	} else{
		$('#passwordError_msg').text('');
		$('#passwordError_msg').attr('style', '');
		$('#password').attr('style', 'border: 1px solid green;');		
	}

		// Validate confirm password 
	if(confirmpassword == ''){
		$('#confirmpasswordError_msg').text('* Enter your password again!');
		$('#confirmpasswordError_msg').attr('style', 'color:red;');
		$('#confirmpassword').attr('style', 'border: 1px solid #f00;');
		return false;
	}else if(confirmpassword!= password){
		$('#confirmpasswordError_msg').text('* Check your password!');
		$('#confirmpasswordError_msg').attr('style', 'color:red;');
		$('#confirmpassword').attr('style', 'border: 1px solid #f00;');		
		return false;	
	} else{
		$('#confirmpasswordError_msg').text('');
		$('#confirmpasswordError_msg').attr('style', '');
		$('#confirmpassword').attr('style', 'border: 1px solid green;');
	}
	
		// Validate full name
	if(name == '' || name.trim().length == 0){
		$('#nameError_msg').text('* Enter your name!');
		$('#nameError_msg').attr('style', 'color:red;');
		$('#name').attr('style', 'border: 1px solid #f00;');
		return false;
	} else{
		$('#nameError_msg').text('');
		$('#nameError_msg').attr('style', '');
		$('#name').attr('style', 'border: 1px solid green;');		
	}
	
		// Validate Birthday
	if(date == "" ){
		$('#dateError_msg').text('* Enter your date of birth!');
		$('#dateError_msg').attr('style', 'color:red;');
		$('#date').attr('style', 'border: 1px solid #f00;');
		return false;
	} else{
		$('#dateError_msg').text('');
		$('#dateError_msg').attr('style', '');
		$('#date').attr('style', 'border: 1px solid green;');
	}
	
		// Validate Email
	if(mail == '' || mail.trim().length == 0){
		$('#mailError_msg').text('*Enter your email!');
		$('#mailError_msg').attr('style', 'color:red;');
		$('#mail').attr('style', 'border: 1px solid #f00;');		
		return false;	
	}else if(!validateEmail(mail)){
		$('#mailError_msg').text('* Please enter your email in the format: abc@xyz.com!');
		$('#mailError_msg').attr('style', 'color:red;');
		$('#mail').attr('style', 'border: 1px solid #f00;');		
		return false;	
	} else{
		$('#mailError_msg').text('');
		$('#mailError_msg').attr('style', '');
		$('#mail').attr('style', 'border: 1px solid green;');		
	}
	
		//Validate Phone
	if(tel==""){
		$('#telError_msg').text('* Enter your telephone !');
		$('#telError_msg').attr('style', 'color:red;');
		$('#tel').attr('style', 'border: 1px solid #f00;');
		return false;
	}else{
		$('#telError_msg').text('');
		$('#telError_msg').attr('style', '');
		$('#tel').attr('style', 'border: 1px solid green;');
	}
	
	function validateEmail(email)
	{
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	alert('Sign Up Success')
}