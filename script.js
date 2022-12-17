let data = []
let url = ' https://crudcrud.com/api/96599d8a260d4b88ac761335edbf8abe/contacts'

const fetchContact = () => {
  fetch(url).then(res => res.json()).then(res => {
    console.log(res)
    data = res
  }).then(() => {
    printContact()
  }).catch(err => console.log(err))
}

const printContact = _ => {
  const coba = document.getElementById("parent")
  if (coba) {
    coba.innerHTML = ''
  }

  data.forEach(value => {
    // create div with class card
    const divCard = document.createElement('div')
    divCard.classList.add('card')

    // create div.container
    const divContainer = document.createElement('div')
    divContainer.classList.add('container')
    // append div.container
    divCard.appendChild(divContainer)

    // create title
    const title = document.createElement('p')
    // append title
    title.innerHTML = 'Name: ' + value.name
    divContainer.appendChild(title)

    // create number
    const number = document.createElement('p')
    // append number
    number.innerHTML = 'Number: ' + value.number
    divContainer.appendChild(number)

    const btnEdit = document.createElement('button')
    btnEdit.innerText = 'Edit'
    btnEdit.onclick = function() { setEditContact(value) };
    divContainer.appendChild(btnEdit)

    const btnDelete = document.createElement('button')
    btnDelete.innerText = 'Delete'
    btnDelete.onclick = function() { deleteContact(value._id) };
    divContainer.appendChild(btnDelete)

    // finally, append the parent to existing div in html with id = parent
    document.getElementById("parent").appendChild(divCard);
  })
}

const deleteElements = () => {
  const coba = document.getElementById("parent")
  if (coba) {
    coba.innerHTML = ''
  }
}

const addContact = () => {
  // get input data
  const name = document.getElementById("inputName").value
  const number = document.getElementById("inputNumber").value

  // post
  const objectContact = {
    name,
    number,
  };

  fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objectContact),
  })
    .then(response => response.json())
    .then(data => {
      deleteElements()
    })
    .then(() => {
      fetchContact()
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const setEditContact = (value) => {
  // set input data
  document.getElementById("idEdit").innerHTML = `Id: ${value._id}`
  document.getElementById("inputNameEdit").value = value.name
  document.getElementById("inputNumberEdit").value = value.number

  //   // post
  //   const objectContact = {
  //     name,
  //     number,
  //   };

  //   fetch(url, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(objectContact),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       deleteElements()
  //     })
  //     .then(() => {
  //       fetchContact()
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
}

const editContact = (value) => {
  // set input data
  const id = document.getElementById("idEdit").innerHTML.split(' ')[1]
  const name = document.getElementById("inputNameEdit").value
  const number = document.getElementById("inputNumberEdit").value

  // object
  const objectContact = {
    name,
    number,
  };

  fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objectContact),
  })
    .then(() => {
      deleteElements()
    })
    .then(() => {
      fetchContact()
    })
    .then(() => {
      document.getElementById("idEdit").innerHTML = ''
      document.getElementById("inputNameEdit").value = ''
      document.getElementById("inputNumberEdit").value = ''
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const deleteContact = (id) => {
  // delete

  fetch(`${url}/${id}`, {
    method: 'DELETE', // or 'PUT'
  })
    .then(() => {
      deleteElements()
    })
    .then(() => {
      fetchContact()
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}