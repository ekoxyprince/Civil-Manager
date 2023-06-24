const loginForm = document.getElementById('loginForm')
const loginBtn = document.getElementById('loginBtn')


loginForm.addEventListener('submit',function(e){
 e.preventDefault()
 data= {email:document.getElementById('email').value,password:document.getElementById('password').value}
 fetch('/auth/signin',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
 })
 .then(response=>response.json())
 .then(data=>{
    if(data.status==="Error"){
        alert(data.message)
    }else{
        alert(data.message)
        window.location.href = '/'  
    }
 })
})

