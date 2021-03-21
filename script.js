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
        // let counter = 0
        // for (let key of this.data) {        // проверка на повторение id при добавлении контакта
        //     if (this.data.length > 0) {
        //         if (event.currentTarget[0].value === key.id) {
        //             alert('Контакт с таким ID уже существует')
        //             // counter++
        //         } 
        //     } 
        // }
        if (this.data.find(item => item.id === event.currentTarget[0].value)) { // проверка на повторение id при добавлении контакта
            alert('Контакт с таким ID уже существует')
        } else {
            this.data.push(newUser.data)        // добавление контакта в массив this.data
        }
        // if (counter === 0) {
        //     if (event.currentTarget[0].value !== '') { // проверка на пустую строку ID
        //         this.data.push(newUser.data)        // добавление контакта в массив this.data
        //     } else {
        //         alert('Введите ID')
        //     }
        // }  
        
        for (let i=0; i < event.currentTarget.length; i++) { 
            event.currentTarget[i].value = ''
        }
        this.result()
        console.log(this.data);
    }
    edit(event) {       // редактирлвание контакта в массив this.data
        event.preventDefault()
        for (let key of this.data) {
            if (+key.id === +event.currentTarget[0].value) { // поиск ID уже созданного контакта и изменяемого
                let arr = []
                for (let key1 in key) { // массив свойст объекта
                    arr.push(key1)
                }
                for (let i=1; i < event.currentTarget.length-1; i++) { // изменение данных объекта
                    if (event.currentTarget[i].value !== undefined) {
                        key[arr[i]] = event.currentTarget[i].value
                    }
                }
            }
        }
        for (let i=0; i < event.currentTarget.length; i++) {
            event.currentTarget[i].value = ''
        }
        this.result()
        console.log(this.data);
    }
    remove(event) {        // удаление контакта в массив this.data
        event.preventDefault()
        for (let i=0; i < this.data.length; i++) {  // поиск совпадений по ID
            if (this.data[i].id === event.currentTarget[0].value) {
                this.data.splice(i, 1)
            }
        }
        for (let i=0; i < event.currentTarget.length; i++) {
            event.currentTarget[i].value = ''
        }
        console.log(this.data);
        this.result()
    }
    result(){       // вывод результата в контейнер
        document.querySelector('.result-contacts').innerHTML = ''
        let counter = 1;
        for (let key of this.data) {
            let h2 = document.createElement('h2') 
            document.querySelector('.result-contacts').appendChild(h2)
            h2.innerHTML = `Контакт №${counter}`
            counter++
            for (let key1 in key) { // вовод строк со свойствами объекта
               let string = document.createElement('p') 
                document.querySelector('.result-contacts').appendChild(string)
                string.innerHTML = `${key1}: ${key[key1]}`
            }
            let line = document.createElement('p') 
            document.querySelector('.result-contacts').appendChild(line)
            line.innerHTML = `---------------------`
        }
    }
    get() {
        return console.log(this.data);
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
}


const list = new ContactsApp()
list.app()
list.onAdd()
list.onEdit()
list.onRemove()
// list.get()
// list.add()
// list.add(2, 'Valya', 'Valya@gmail.com', 'Lobcha', '+375 44 222-22-22')
// list.add(6, 'Kostya', 'Kostyaa@gmail.com', 'Luninets', '+375 44 111-11-11')
// list.add(4, 'John', 'John@gmail.com', 'Memphis', '+375 44 222-22-22')
// list.edit(2, {
//     email: 'Nick@gmail.com',
//     address: 'Pinsk',
// })
// list.remove(3)

// const list1 = new ContactsApp()
// list1.add(4, 'John', 'John@gmail.com', 'Memphis', '+375 44 222-22-22')
// list1.app()
// console.log(list1);
