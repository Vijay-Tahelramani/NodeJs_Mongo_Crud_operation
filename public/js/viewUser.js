const table_columns = ["First Name","Last Name","Email","Date Of Birth","Short Bio","Manage"]

//Creating instance of necessary all html elements
const table_div = document.getElementById('table-div');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-name');
const searchMsg = document.getElementById('search-message');
const seachBtn = document.getElementById('search-btn');
const sortBy = document.getElementById('sort-data');

let table = document.createElement('table');
let url = 'http://localhost:3000/usersList';

//Event Listener for searching user by first name
searchForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    sortBy.selectedIndex = 0
    if(searchInput.value){
        let searchUrl = url + '?firstName='+searchInput.value;
        getUsers(searchUrl)
    }
})

//Event Listener for sorting data
sortBy.addEventListener('change',(e) =>{
    e.preventDefault();
    
    let sortUrl = url + '?sortBy='+sortBy.value;
    getUsers(sortUrl)
})

//get all users
const getUsers = (url) =>{
    searchMsg.textContent = ''
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data){

                //removing all childs of table
                while (table.hasChildNodes()) {
                    table.removeChild(table.firstChild);
                }

                if(data.length){
                    table.border = "1px";
                    table.style.margin = "auto";
                    table.style.boxSizing = "border-box";

                const tr = document.createElement("tr")
                tr.style.background = "#e97a68";
                tr.style.color = "#ffffff";

                //appeding field names to table
                for(let i = 0;i<table_columns.length;i++){

                    
                    const td = document.createElement('td');
                    const text = document.createTextNode(table_columns[i]);

                    td.appendChild(text);
                    tr.appendChild(td);
                }
                table.appendChild(tr);

                //appending all the records to table
                for(let i=0;i<data.length;i++){

                    const tr = document.createElement("tr")
                    for(let j=0;j<Object.keys(data[i]).length-2;j++){
                        const td = document.createElement('td');
                        let text = ''
                        if(j === 3){

                            text = document.createTextNode(new Date(data[i][Object.keys(data[i])[j+1]]).toISOString().split('T')[0])
                        }else{
                            text = document.createTextNode(data[i][Object.keys(data[i])[j+1]]);
                        }
                        
                        td.appendChild(text);
                        tr.appendChild(td);
                    }
                    /* Update and Delete Button Code Start */
                    const updatebtn = document.createElement('input');
                    updatebtn.type = "image"
                    updatebtn.src = "/img/update.png"
                    updatebtn.style.margin = "0 8px"
                    updatebtn.style.border = "1px solid #071b37"
                    updatebtn.addEventListener('click',(e)=>{
                        updateUser(data[i]);
                    })

                    const deletebtn = document.createElement('input');
                    deletebtn.type = "image"
                    deletebtn.src = "/img/delete.png"
                    deletebtn.style.margin = "0 8px"
                    deletebtn.style.border = "1px solid #071b37"
                    deletebtn.addEventListener('click',(e)=>{
                        deleteUser(data[i][Object.keys(data[i])[0]]);
                    })

                    const td1 = document.createElement('td');

                    td1.appendChild(updatebtn)
                    td1.appendChild(deletebtn)
                    tr.appendChild(td1);

                    /* Update and Delete Button Code End */
                    
                    table.appendChild(tr);
                }
                
                table_div.appendChild(table);
                }
                else{
                    searchMsg.textContent = 'No Record Found!!'
                }
            }
            else{
                searchMsg.textContent = 'Something went wrong!!'
            }
        })
    })
}
getUsers(url)

//webcall when delete button is clicked
const deleteUser = (id) => {
    sortBy.selectedIndex = 0
    fetch('http://localhost:3000/userDelete?id='+id,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then((response) => {
        response.json().then((data) => {
            if(data.error){
            }
            else{
                getUsers(url)
            }
        })
    })
}

//redirect user on update page with current user data when update button is clicked
const updateUser = (params) => {
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    const form = document.createElement('form');
    form.method = 'post';
    form.action = '/update';
    form.id = 'update-form'
  
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];
  
        form.appendChild(hiddenField);
      }
    }
  
    document.body.appendChild(form);
    form.submit();
}