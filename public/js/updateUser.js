//Creating instance of necessary all html elements
const upadateForm = document.getElementById('update-form');
const firstName = document.getElementById('ufirst-name');
const lastName = document.getElementById('ulast-name');
const email = document.getElementById('uemail');
const dateOfBirth = document.getElementById('udate-of-birth');
const shortBio = document.getElementById('ushort-bio');
const Msg = document.getElementById('uinfo-message');
const upadateBtn = document.getElementById('update-btn');
const viewBtn = document.getElementById('uview-btn');

const userValue = document.getElementById('user_id').textContent;

//Event Listener when form is submitted
upadateForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    Msg.textContent = ''
    Msg.classList.remove("error-content")
    Msg.classList.remove("success-content")
    upadateBtn.disable = true
    viewBtn.hidden = true
    let user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        dateOfBirth: dateOfBirth.value,
        shortBio: shortBio.value
    }
    let url = 'http://localhost:3000/userUpdate/'+userValue;

    //fetching response after updating records
    fetch(url,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      }).then((response) => {
        response.json().then((data) => {
            if(data.error){
                //Display errors if any
                upadateBtn.disable = false
                Msg.textContent = data.message
                Msg.classList.add("error-content")
                
            }
            else{
                //Display success message on response
                upadateBtn.disable = false
                upadateBtn.hidden = true
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
 