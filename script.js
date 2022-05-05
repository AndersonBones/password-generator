var generate_btn = document.querySelector('#generate-btn');
var passwrd_length = document.querySelector('#passwrd-length');
var checkBox_input = document.querySelectorAll('input[type="checkbox"]');
var passwrd_result = document.querySelector('#passwrd-result');
var clipboard = document.querySelector('#clipboard-btn');

var characters = {
    lower: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    upper: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    numbers: ['0','1','2','3','4','5','6','7','8','9'],
    symbols: ['!','@','#','$','%','^','&','*','(',')','{','}','[',']','=','<','>','/',',','.']
}
var NO_CHECKED = false;

function Generate_passwrd(){
    let passwrd = '' 
    
    while(passwrd.length < parseInt(passwrd_length.value)){

        let randomLower = characters.lower[Math.trunc((Math.random() * characters.lower.length))];
        let randomUpper = characters.upper[Math.trunc((Math.random() * characters.upper.length))];
        let randomNumbers = characters.numbers[Math.trunc((Math.random() * characters.numbers.length))];
        let randomSymbols = characters.symbols[Math.trunc((Math.random() * characters.symbols.length))];
        

        if(Lower_checked() == true){
            passwrd += randomLower;
        }

        if(Upper_checked() == true){
            passwrd += randomUpper;
        }

        if(Number_checked() == true){
            passwrd += randomNumbers
        }

        if(Symbols_checked() == true){
            passwrd += randomSymbols;
        }
     
        passwrd = passwrd.substring(0, parseInt(passwrd_length.value))

    }

    passwrd_result.innerText = shuffle_password(passwrd);

}


function shuffle_password(passwrd){
    var randomPass = [];

    while(randomPass.length < passwrd.length){
        let sort_value = Math.trunc(Math.random() * passwrd.length);
        
        if(randomPass.indexOf(sort_value) == -1){
            randomPass.push(sort_value);
        }
    }

    
    let newpass = '';
    
    for(var i=0; i<randomPass.length; i++){
        newpass += passwrd[randomPass[i]];
    }
    return newpass;
    
}

function Lower_checked(){
    return checkBox_input[0].checked
}

function Upper_checked(){
    return checkBox_input[1].checked
}

function Number_checked(){
    return checkBox_input[2].checked
}

function Symbols_checked(){
    return checkBox_input[3].checked
}

function No_box_checked(){
    var counter = 0;

    for(var box of checkBox_input){
        if(box.checked == false){
            counter+=1;
        }
    }

    if(counter == 4){
        NO_CHECKED = true;
    }
    else{
        NO_CHECKED = false;
    }
    
}

generate_btn.addEventListener("click", ()=>{
    No_box_checked();

    if(NO_CHECKED == false){
        Generate_passwrd();
    }
    else{
        alert('Check at least one box')
    }
    
})

clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = passwrd_result.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();

	alert('Password copied to clipboard');
});
