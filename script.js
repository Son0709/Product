//Fetch data from API
//Find all products
document.getElementById('find-all-form').addEventListener('submit', function (event) {
    event.preventDefault();
    fetch('https://wtpmidexam20240421175323.azurewebsites.net/api/product')
        .then(response => response.json())
        .then(data => document.getElementById('product-list').textContent = JSON.stringify(data, null, 2))
        .catch(error => document.getElementById('product-list').textContent = 'There was a problem with the fetch operation: ' + error.message);
});

//Find product by ID
document.getElementById('find-id-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let id = document.getElementById('find-id-productId').value;
    if (id.length !== 9) {
        document.getElementById('product-list').textContent = 'Product ID must be 9 characters';
        return;
    }
    let url = `https://wtpmidexam20240421175323.azurewebsites.net/api/product/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => document.getElementById('product-list').textContent = JSON.stringify(data, null, 2))
        .catch(error => document.getElementById('product-list').textContent = 'There was a problem with the fetch operation: ' + error.message);
});

//Create product
document.getElementById('create-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let productId = document.getElementById('create-productId').value;
    let productName = document.getElementById('create-productName').value;
    let quantity = document.getElementById('create-quantity').value;
    let note = document.getElementById('create-note').value;
    if (productId.length !== 9) {
        document.getElementById('product-list').textContent = 'Product ID must be 9 characters';
        return;
    }
    let product = {
        id: productId,
        name: productName,
        quantity: quantity,
        note: note
    };
    fetch('https://wtpmidexam20240421175323.azurewebsites.net/api/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
        .then(response => response.json())
        .then(data => document.getElementById('product-list').textContent = JSON.stringify(data, null, 2))
        .catch(error => document.getElementById('product-list').textContent = 'There was a problem with the fetch operation: ' + error.message);
});

//Update product
document.getElementById('update-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let productId = document.getElementById('update-productId').value;
    let productName = document.getElementById('update-productName').value;
    let quantity = document.getElementById('update-quantity').value;
    let note = document.getElementById('update-note').value;
    if (productId.length !== 9) {
        document.getElementById('product-list').textContent = 'Product ID must be 9 characters';
        return;
    }
    let product = {
        id: productId
    };
    if (productName) {
        product.name = productName;
    }
    if (quantity) {
        product.quantity = quantity;
    }
    if (note) {
        product.note = note;
    }
    fetch(`https://wtpmidexam20240421175323.azurewebsites.net/api/product/${product.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
        .then(response => response.json())
        .then(data => document.getElementById('product-list').textContent = JSON.stringify(data, null, 2))
        .catch(error => document.getElementById('product-list').textContent = 'There was a problem with the fetch operation: ' + error.message);
});

//Delete product
document.getElementById('delete-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let id = document.getElementById('delete-productId').value;
    if (id.length !== 9) {
        document.getElementById('product-list').textContent = 'Product ID must be 9 characters';
        return;
    }
    fetch(`https://wtpmidexam20240421175323.azurewebsites.net/api/product/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => document.getElementById('product-list').textContent = JSON.stringify(data, null, 2))
        .catch(error => document.getElementById('product-list').textContent = 'There was a problem with the fetch operation: ' + error.message);
});

//Update note
document.getElementById('update-note-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let productId = document.getElementById('update-note-productId').value;
    let note = document.getElementById('update-note-note').value;
    if (productId.length !== 9) {
        document.getElementById('product-list').textContent = 'Product ID must be 9 characters';
        return;
    }
    let product = {
        id: productId,
        note: note
    };
    fetch(`https://wtpmidexam20240421175323.azurewebsites.net/api/product/${product.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
        .then(response => response.json())
        .then(data => document.getElementById('product-list').textContent = JSON.stringify(data, null, 2))
        .catch(error => document.getElementById('product-list').textContent = 'There was a problem with the fetch operation: ' + error.message);
});

//Extra features
//Allow only numbers in quantities fields
document.querySelectorAll('input[type=number]').forEach(function (input) {
    input.addEventListener('input', function (e) {
        // Replace any non-digit character with an empty string
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
});

//Allow numbers, lowercase and uppercase letters in ids fields
document.querySelectorAll('input[id$=productId]').forEach(function (input) {
    input.addEventListener('input', function (e) {
        // Replace any non-digit character with an empty string
        e.target.value = e.target.value.replace(/[^0-9a-zA-Z]/g, '');
    });
});