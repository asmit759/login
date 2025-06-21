const email=document.querySelector('.emailId');
const password=document.querySelector('.password');
const login_btn=document.querySelector('.login_btn');
const newAcc_btn=document.querySelector('.newAcc_btn');
const verified=false;


//signup contents
const create_Name=document.querySelector('.create_Name');
const create_Email=document.querySelector('.create_Email');
const create_Phone=document.querySelector('.create_Phone');
const create_Pass=document.querySelector('.create_Pass');
const create_CnfPass=document.querySelector('.create_CnfPass');
const createSignup=document.querySelector('.createSignup');


let token = localStorage.getItem('token');

let isLoading = false;

const apiBase = '/';

        async function authenticate() {
            const emailVal = email.value
            const passVal = password.value

            if (
                isLoading ||
                !emailVal ||
                !passVal ||
                !passVal.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/)||
                !emailVal.match(/^[a-zA-Z0-9._%+-]+@kiit\.ac\.in$/)
            ) { 
                alert("check email and password again and password should have 1 uppercase 1 number 1 charecter with length >=6");
                verified=true;
            
            }
        };

        login_btn.addEventListener('click',authenticate);


//API check
try{
    let data
        if (verified) {

             // login an account
            async function loginIt(){
                const response = await fetch(apiBase + 'auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: emailVal, password: passVal })
            })
            data = await response.json()
            }
           
        } else {
            // register an account
            async function registerIt(){
                const response = await fetch(apiBase + 'auth/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: emailVal, password: passVal })
            })
            data = await response.json()
            }
        }


    if (data.token) {
            token = data.token;
            localStorage.setItem('token', token);

            // authenicating into loading
            authBtn.innerText = 'Loading...';

            // fetch todos
            await fetchTodos();

            // show dashboard
            showDashboard();
        } else {
            throw Error('❌ Failed to authenticate...');
        }
}catch(e){
    console.log(err.message)
        error.innerText = err.message;
        error.style.display = 'block';
}



//All signup parts
function authenticateSignup() {
    const emailVal = create_Email.value;
    const passVal = create_Pass.value;
    const cnfPassVal = create_CnfPass.value;
    const nameVal = create_Name.value;
    const phoneVal = create_Phone.value;

    const isValidEmail = /^[a-zA-Z0-9._%+-]+@kiit\.ac\.in$/.test(emailVal);
    const isValidPass = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/.test(passVal);
    const isPhoneValid = /^[6-9]\d{9}$/.test(phoneVal);

    if (
        isLoading ||
        !isValidEmail ||
        !isValidPass ||
        passVal !== cnfPassVal ||
        nameVal.length < 3 ||
        !isPhoneValid
    ) {
        alert("check email and password again and password should have 1 uppercase 1 number 1 charecter with length >=6");
    }
}

createSignup.addEventListener('click',authenticateSignup);