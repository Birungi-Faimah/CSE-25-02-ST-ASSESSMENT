function validateForm() {
  const fields = [
    { id: 'productName', minLength: 3 },
    { id: 'category', minLength: 3 },
    { id: 'price', min: 1, isNumber: true },
    { id: 'quantity', min: 1, isNumber: true },
    { id: 'color', minLength: 3 }
  ];

  let allValid = true;
  const productData = {};

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.id + 'Error');
    const value = input.value.trim();

    let isValid = true;
    if (field.isNumber) {
      isValid = !isNaN(value) && Number(value) >= field.min;
      productData[field.id] = Number(value);
    } else {
      isValid = value.length >= field.minLength;
      productData[field.id] = value;
    }

    if (isValid) {
      input.classList.remove('invalid');
      input.classList.add('valid');
      error.textContent = '';
    } else {
      input.classList.remove('valid');
      input.classList.add('invalid');
      error.textContent = 'Invalid input';
      allValid = false;
    }
  });

  if (allValid) {
    // Send data to the server
    fetch('/addproduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const successMessageElement = document.getElementById('successMessage');
        successMessageElement.textContent = 'Product added successfully!';
        successMessageElement.classList.add('success-message'); // Add the success class dynamically
        addProductToTable(data.product);
        clearForm();
      } else {
        alert('Error: ' + data.message);
      }
    })
    .catch(err => {
      console.error('Submission error:', err);
      alert('Failed to submit product. Please try again.');
    });
  }
}


function clearForm() {
  document.querySelectorAll("input").forEach(input => {
    input.value = '';
    input.classList.remove('valid', 'invalid');
  });
  document.querySelectorAll(".error").forEach(err => err.textContent = '');
  document.getElementById('successMessage').textContent = '';
}

function addProductToTable(product) {
  const tbody = document.getElementById('productTableBody');
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${product.Id}</td>
    <td>${product.Name}</td>
    <td>${product.Category}</td>
    <td>${product.price}</td>
    <td>${product.Quantity}</td>
  `;

  tbody.appendChild(tr);
}

