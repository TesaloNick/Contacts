class Users {
    constructor(idData, nameData, emailData, addressData, phoneData) {
        this.data = {
            id: idData, 
            name: nameData, 
            email: emailData, 
            address: addressData, 
            phone: phoneData
        }
    }
    edit(obj) {
        for (let key in obj) { // 
            if (obj[key] !== undefined){
                this.data[key] = obj[key]
            }
        }
    }
    get() {
        return this.data
    }
}

class Contacts{
    constructor() {
        this.data = []
        this.add = this.add.bind(this)
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
    }
    add(event){     // добаление контакта
        event.preventDefault()
        let newUser = new Users(event.currentTarget[0].value, event.currentTarget[1].value, event.currentTarget[2].value,  event.currentTarget[3].value, event.currentTarget[4].value) // создание объекта с новым контактом
        if (this.data.find(item => item.id === event.currentTarget[0].value)) { // проверка на повторение id при добавлении контакта
            alert('Контакт с таким ID уже существует')
        } else {
            this.data.push(newUser.data)        // добавление контакта в массив this.data
        } 
        
        this.clear(event);
        this.result()
    }
    edit(event, id) {       // редактирлвание контакта в массив this.data
        event.preventDefault()
        for (let key of this.data) {
            if (+key.id === +event.currentTarget[0].value) { // поиск ID уже созданного контакта и изменяемого
                let arr = Object.keys(key)
                for (let i=1; i < event.currentTarget.length-1; i++) { // изменение данных объекта
                    if (event.currentTarget[i].value !== '') {
                        key[arr[i]] = event.currentTarget[i].value
                    }
                }
            }
        }

        // const user = this.data.find(item => item.id === id) // альтернативный способ (не работает)
        // const indexToField = {
        //     '0': 'name',
        //     '1': 'email',
        //     '2': 'address',
        //     '3': 'phone'
        // } 
        // Object.keys(event.currentTarget).map(function(key, index) {
        //     if (event.currentTarget[+key].value !== '') {
        //         user[indexToField[key]] = event.currentTarget[+key].value
        //     }
        // })

        // let name = event.currentTarget[1].value      // альтернативный способ (замена всех значений)
        // let email = event.currentTarget[2].value
        // let address = event.currentTarget[3].value
        // let phone = event.currentTarget[4].value
        // let contact = this.data.find(item => item.id === event.currentTarget[0].value) 
        // contact.name = name
        // contact.email = email
        // contact.address = address
        // contact.phone = phone  
     
        this.clear(event)
        this.result()
    }
    remove(event) {        // удаление контакта в массив this.data
        event.preventDefault()
        this.data = this.data.filter(item => item.id !== event.currentTarget[0].value)

        this.clear(event)
        this.result()
    }
    result(){       // вывод результата в контейнер
        document.querySelector('.result-contacts').innerHTML = ''
        let counter = 1;
        this.data.forEach(item => {
            document.querySelector('.result-contacts').insertAdjacentHTML('beforeend', `
                <h2>Контакт №${counter}</h2>
                <p>id: ${item.id}</p>
                <p>name: ${item.name}</p>
                <p>email: ${item.email}</p>
                <p>address: ${item.address}</p>
                <p>phone: ${item.phone}</p>
                <p>---------------------</p>
            `)
            counter++
        })
        console.log(this.data);
    }
    clear(event){
        for (let i=0; i < event.currentTarget.length; i++) {
            event.currentTarget[i].value = ''
        }
    }
    get() {
        return this.data
    }

}

class ContactsApp extends Contacts{
    app(){          // создание контейнера в DOM
        let div = document.createElement('div')
        div.classList.add('contacts')
        document.body.appendChild(div)
        div.innerHTML = `
        <form class="form-add">
            <h1>Добавить контакт</h1>
            <input type="number" placeholder="id" class="id-add" required>
            <input type="text" placeholder="name" class="name-add">
            <input type="email" placeholder="email" class="email-add">
            <input type="text" placeholder="address" class="address-add">
            <input type="tel" placeholder="phone" class="phone-add">
            <button class="button-add-contact">Добавить контакт</button>
        </form>
        <form class="form-edit">
            <h1>Изменить контакт</h1>
            <input type="number" placeholder="id" class="id-edit" required>
            <input type="text" placeholder="name" class="name-edit">
            <input type="email" placeholder="email" class="email-edit">
            <input type="text" placeholder="address" class="address-edit">
            <input type="tel" placeholder="phone" class="phone-edit">
            <button class="button-edit-contact">Изменить контакт</button>
        </form>
        <form class="form-remove">
            <h1>Удалить контакт</h1>
            <input type="tel" placeholder="id" class="id-remove" required>
            <button class="button-remove-contact">Удалить контакт</button>
        </form>
        <div class="result-contacts"></div>
        `
    }
    onAdd(){        // добавление данных из DOM в массив
        document.querySelector('.form-add').addEventListener('submit', this.add)
    }
    onEdit(){        // изменение данных из DOM в массив
        document.querySelector('.form-edit').addEventListener('submit', this.edit)
    }
    onRemove(){        // удаление данных из DOM в массив
        document.querySelector('.form-remove').addEventListener('submit', this.remove)
    }
    get(){
        super.get()
    }
    get storage() {
        
    }
    set storage() {

    }
}

const list = new ContactsApp()
list.app()
list.onAdd()
list.onEdit()
list.onRemove()
