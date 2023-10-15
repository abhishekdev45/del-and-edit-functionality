var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var search = document.getElementById('filter');

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
search.addEventListener('keyup' , filter);

function addItem(e){
  e.preventDefault();
  var newItem = document.getElementById('item').value;
  newItem += " " + document.getElementById('desc').value;
  var li = document.createElement('li');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(newItem));
  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  deleteBtn.appendChild(document.createTextNode('X'));
 
  li.appendChild(deleteBtn);
  itemList.appendChild(li);

  updateLocalStorage();
}

function removeItem(e){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      var li = e.target.parentElement;
      itemList.removeChild(li);
      updateLocalStorage();
    }
  }
}

function updateLocalStorage() {
    var items = [];
    var listItems = document.querySelectorAll('.list-group-item');
    listItems.forEach(function(item) {
      items.push(item.textContent);
    });

    localStorage.setItem('items', JSON.stringify(items));
}

function filter(e){
    var text = e.target.value.toLowerCase();
    var items = itemList.getElementsByTagName('li');

    Array.from(items).forEach((item) => {
        var itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text) != -1){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    })
}

function loadItemsFromLocalStorage() {
    var items = JSON.parse(localStorage.getItem('items'));

    if (items && items.length > 0) {
      items.forEach(function (itemText) {
        var li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(itemText));
        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        deleteBtn.appendChild(document.createTextNode('X'));

        li.appendChild(deleteBtn);
        itemList.appendChild(li);
      });
    }
  }
  
window.addEventListener('load', loadItemsFromLocalStorage);
  
