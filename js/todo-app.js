//Создать заголовок
    //список дел 1
     let outputItem = [
        {name: 'Купить печенки для темной стороны силы',
        done: true,
        index: 0,},
        {name: 'Отыскать вход в Нарнию',
        done: false,
        index: 1,},
        {name: 'Поймать всех мозгошмыгов',
        done: false,
        index: 2,},
        {name: 'Захватить мир',
        done: false,
        index: 3,}]
    let outputItemThird = [
        {name: 'Поймать фею за хвост',
        done: true,
        index: 0,},
        {name: 'Дойти до конца радуги',
        done: false,
        index: 1,},
        {name: 'Понять фильм "Довод"',
        done: false,
        index: 2,},]
        let outputItemSecond = [
        {name: 'Делать все наоборот',
        done: true,
        index: 0,},
        {name: 'Спрятать вход в Нарнию',
        done: false,
        index: 1,},
        {name: 'Отпустить всех мозгошмыгов',
        done: false,
        index: 2,},
        {name: 'Раздать печеньки наконец',
        done: false,
        index: 3,}]


        
    


    
    function createAppTitle(title){
        let appTitle = document.createElement('h2')
        appTitle.innerHTML = title 
        
        return appTitle

    }


    //Создать форму для создания итема
    function createTodoItrmForm(){
        
        //переменные для создания форм и кнопок
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        //Добавить классы
        
        form.classList.add('input-group', 'mb-3');
        
        input.classList.add('form-control');
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');

        //Заполняем placeholder
        input.placeholder = 'Введите название дела';
        button.textContent = 'Добавить дело';
        
        
        // объединяем
        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return{
            form,
            input,
            button,
        }
    }


    //Создатить и венруть список элементов
    function createTodoList(){
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list
    }
    
   
    
    
    function createTodoItem(name){
        let item = document.createElement('li');
        //div и кнопки управления
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        //задаем стили элементов
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        deleteButton.classList.add('btn', 'btn-danger');

        //textContent
        doneButton.textContent = 'Готово'
        deleteButton.textContent = 'Удалить'
        item.textContent = name


        //объеденяем
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return{
            item,
            doneButton,
            deleteButton,
        }
}
function createTodoApp(container, title = 'Список дел', mustHave, key){
    
            if(JSON.parse(localStorage.getItem(key))){
                console.log(mustHave)
            mustHave = JSON.parse(localStorage.getItem(key))//это массив
            console.log(mustHave)
        }
        
        
        let todoAppTitle = createAppTitle(title)
        let todoItemForm = createTodoItrmForm();
        let todoList = createTodoList();
        
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);



        //логика блока кнопки
        todoItemForm.button.setAttribute("disabled", "true");
        todoItemForm.form.addEventListener('input', function(){
            if(!todoItemForm.input.value){
                todoItemForm.button.setAttribute("disabled", "true");
                return
            }
             todoItemForm.button.removeAttribute("disabled")
         });
         //Логика кнопки Готово
        function successItem (name, index) {
            name.doneButton.addEventListener('click', function() {
               
                name.item.classList.toggle('list-group-item-success');
                console.log(mustHave[3].done)
                if(mustHave[index].done){
                    mustHave[index].done = false                    
                }else{
                    mustHave[index].done = true
                }
                console.log(mustHave[index].done)
                save(mustHave, key)
                

                
                        
            })
        }
        // Логика кнопки Удалить        
        function deleteItem (name, index) {
            name.deleteButton.addEventListener('click', function() {
                
                if(confirm('Вы уверены?')){
                    name.item.remove()
                    console.log(mustHave[index])
                    delete mustHave[index]
                    save(mustHave, key)

        }})}   
        //Список при загрузке страницы
        if(mustHave.length > 0){     
            for(i = 0; i < mustHave.length; i++){
                if(mustHave[i] != null){
                    let defautItem = createTodoItem(mustHave[i].name)
                    let index = i
                    
                    if(mustHave[i].done){
                        defautItem.item.classList.add('list-group-item-success');
                        save(mustHave, key)
                    }
                    successItem (defautItem, index)
                    deleteItem (defautItem, index)
                    todoList.append(defautItem.item)
                    }else{
                        delete mustHave[i]
                        
                    }
                    save(mustHave, key)
            }}
        

        todoItemForm.form.addEventListener('submit', function(e){
            //отмена стандартных действий
            e.preventDefault();

            //проверка
            if(!todoItemForm.input.value){
                return
            }
            
            let todoItem = createTodoItem(todoItemForm.input.value)
            //мучу Output
            todoItem.name = todoItemForm.input.value
            todoItem.index = mustHave.length
            mustHave[todoItem.index]={name: todoItem.name, done: false, index: todoItem.index}
            


            //Готово!
            successItem (todoItem, todoItem.index)
            //Удалить итем
            deleteItem (todoItem, todoItem.index)



            todoList.append(todoItem.item);

            //Очистить поле ввода
            todoItemForm.input.value = '';
            todoItemForm.button.setAttribute("disabled", "true");
            save(mustHave, key)
            return createTodoItem()
        }) 


}
//Сохраняем текущее состояние
function save(name, key){
        let serialObj = JSON.stringify(name); //сериализуем его

            localStorage.setItem(key, serialObj); //запишем его в хранилище по ключу "myKey"
            name = JSON.parse(localStorage.getItem(key))

            
    }    
 


