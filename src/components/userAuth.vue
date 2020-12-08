<template>
    <section>
        <h3>Login</h3>
        <form @submit.prevent="submitForm()">
            <label for='email'>E-mail</label>
            <input type='email' name='email' v-model='email'>
            <label for='password'>Password</label>
            <input type='password' name='password' autocomplete="on" v-model='password'>
            <button>Login</button>
        </form>
        <h4> You dont have account? Click below and Sing Up !</h4>
        <base-button CSS='userAuth'></base-button> //class='signup'>Sign up
    </section>

</template>

<script>
export default {
    data(){
        return {

            currentMode:'login',
            email:'',
            password:'',
        }
    },
    computed:{

    },
    methods:{
        submitForm(){
            console.log(this.email + this.password)
        },
    },
}
</script>

<style scoped>

section {
    margin: 30rem 50%;
    display:flex;
    flex-direction: column;
    align-items: center;
}
h3 {
    font-size:3rem;
}

h4 {
    margin-top:2rem;
    text-align: center;
    line-height: 2rem;
    width: 16rem;
}

form {
    margin-top:2rem;
    text-align:center;
}
label {
    font-size:1.5rem;
}
input {
    margin-top:0.7rem;
    margin-bottom:2rem;
    height:3rem;
    border:2px solid black;
    border-radius:10px;
    text-align:center;
    font-size:1.5rem;
    font-family: inherit;
}



.signup {
    margin-top:1rem;
    width:10rem;
    font-size:1.5rem;
}

</style>