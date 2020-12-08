<template>
    <section>
        <h2>Register Form</h2>
        <form @submit.prevent='submitForm()'>
            
            <div class='formElement' >
                <label for='email'>E-mail</label>
                <input type='email' name='email' v-model.trim='email.value' @blur='update("email")' :class='{invalid:!email.isValid}'>
                <p v-if='!email.isValid'>Invalid email</p>
            </div>
             <div class='formElement' >
                <label for='userName'>User Name</label>
                <input name='userName' type='text' v-model.trim='userName.value' autocomplete="new-username" @blur='update("userName")' :class='{invalid:!userName.isValid}'>
                 <p v-if='!userName.isValid'>User Name cant contain special symbols like - ?';_</p>
            </div>
             <div class='formElement' > 
                <label for='password'> Password</label>
                <input name='password' type='password' v-model.trim='passwords.value1' autocomplete=“new-password” @blur='update("passwords")' :class='{invalid:!passwords.isValid}'>
                <label for='passwordConfirmation'> Confirm password</label>
                <input name='passwordConfirmation' type='password' autocomplete="new-password" v-model.trim='passwords.value2' @blur='update("passwords")' :class='{invalid:!passwords.isValid}'>
                <p v-if='!passwords.isValid'>Password do not match ! Please try again</p>
            </div>
            <base-button CSS='common userSignUpForm'> SIGN UP !</base-button>
        </form>
    </section>
</template>

<script>


export default {
    data(){
        return {
            email:{
                value:'',
                isValid:true,
            },
            userName:{
                value:'',
                isValid:true,
            },
            passwords:{
                value1:'',
                value2:'',
                isValid:true,
            },
          

        }
    },
   
    methods:{
        update(type){
            this[type].isValid = true;
        },
        submitForm(){

           
            if(this.passwords.value1 !== this.passwords.value2 ||  this.passwords.value1 === '' ||  this.passwords.value2 === ''){
                this.password = '';
                this.passwordConfirmation = '';
                this.passwords.isValid = false;
                return
            }
            if(!this.validateMail(this.email.value) || this.email.value === ''){
                this.email.value = '';
                this.email.isValid = false;
                return
            }

             if(!this.validateUserName(this.userName.value) ||  this.userName.value === ''){
                this.userName.value = '';
                this.userName.isValid = false;
                return
            }
           
        },

        validateMail(email){

            const regEx = /\S+@\S+\.\S+/;
            return regEx.test(String(email).toLowerCase());
         },

         validateUserName(userName){
             const regEx = /^[a-zA-Z0-9]*$/
             return regEx.test(String(userName));
         }
        
    }
}
</script>
<style scoped>
h2 {
    margin-top:20rem ;
    text-align: center;
}
form {
    
    margin: 2rem 50%;
    display:flex;
    flex-direction: column;
    align-items: center;
}
h2 {
    font-size:3rem;
}
label {
    font-size:1.5rem;
    
}

.formElement {
    display:flex;
    flex-direction: column;
    align-items: center;
    margin:1rem 0;
}

input {
    margin-top:0.7rem;
    margin-bottom:2rem;
    padding:0.3rem 0;
    height:3rem;
    border:2px solid black;
    border-radius:10px;
    text-align:center;
    font-size:1.5rem;
    font-family: inherit;
}
p {
    font-size:1rem;
    text-align: center;
}
.invalid {
    border-color:red;
}


</style>