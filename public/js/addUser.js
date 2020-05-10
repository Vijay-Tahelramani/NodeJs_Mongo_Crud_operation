//Creating instance of necessary all html elements
const userForm = document.getElementById('user-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const dateOfBirth = document.getElementById('date-of-birth');
const shortBio = document.getElementById('short-bio');
const Msg = document.getElementById('info-message');
const signupBtn = document.getElementById('signup-btn');
const viewBtn = document.getElementById('view-btn');

//Event Listener when form is submitted
userForm.addEventListener('submit',(e) =>{
    e.preventDefault(); //e.preventDefault() prevents from reloading of whole html page
    Msg.textContent = ''
    Msg.classList.remove("error-content")
    Msg.classList.remove("success-content")
    signupBtn.disable = true
    viewBtn.hidden = true
    let user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        dateOfBirth: dateOfBirth.value,
        shortBio: shortBio.value
    }

    //fetch() allows to perfrom webcalls or network requests it returns promise handled in then() and catch()
    fetch('http://localhost:3000/signUp',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      }).then((response) => {
        response.json().then((data) => {
            if(data.error){
                //Display errors if any
                signupBtn.disable = false
                Msg.textContent = data.message
                Msg.classList.add("error-content")
                
            }
            else{
                //Display success message on response
                signupBtn.disable = false
                signupBtn.hidden = true
                Msg.textContent = data.message
                Msg.classList.add("success-content")
                viewBtn.hidden = false
            }
        })
    })
});

//Event Listener for view records button
viewBtn.addEventListener('click',(e)=>{
    window.location.href = "/view"
});
