export const LOGIN = {
    'email' : {
        'required': 'E-mail field is required',
        'email': 'Please enter a valid e-mail address'
    },
    'password' : {
        'required': 'Password field is required',
        'minlength': 'Password must be at least 6 characters long',     
        'maxlength': 'Password maximum length 20 characters only'
    },
};

export const REGISTRATION = {
    'fullName' : {
        'required': 'Full Name field is required',
        'minlength': 'Full Name must be at least 3 characters long',
        'maxlength': 'Full Name maximum length 20 characters only'
    },
    'email' : {
        'required': 'E-mail field is required',
        'email': 'Please enter a valid e-mail address'
    },    
    'password' : {
        'required': 'Password field is required',
        'minlength': 'Password must be at least 6 characters long',
        'maxlength': 'Password maximum length 20 characters only'
    },
    'confirmPassword' : {
        'required': 'Confirm password field is required'
    },
    'address' : {
        'required': 'Address field is required',
        'maxlength': 'Address maximum length 70 characters only'
    },

};

export const ADDPRODUCT = {
    'name' : {
        'required': 'Product name field is required',
        'maxlength': 'Product name maximum length 20 characters only'
    },
    'price' : {
        'required': 'Product price field is required',
        'maxlength': 'Product price maximum length 20 characters only'
    },
    'brand' : {
        'required': 'Brand name field is required'
    },    
    'size' : {
        'required': 'Size field is required'
    },
    'image' : {
        'required': 'Image field is required'
    }

}