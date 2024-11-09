
// Import JSCroot from the CDN
// import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
// import {addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

// addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

document.getElementById("add-product-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Get form values
    const productName = document.getElementById("product-name").value;
    const productPrice = parseFloat(document.getElementById("product-price").value);
    const productCategory = document.getElementById("product-category").value;
    const productDescription = document.getElementById("product-description").value;
    const productStock = parseInt(document.getElementById("product-stock").value, 10);


    
    // Create new product object
    const newProduct = {
        name: productName,
        price: productPrice,
        category: productCategory,
        description: productDescription,
        stock: productStock
    };

    try {
        const response = await fetch('https://asia-southeast2-awangga.cloudfunctions.net/itungin/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            alert("Product added successfully!");
            window.location.href = "Product.html";
        } else {
            const errorText = await response.text();
            alert(`Failed to add product: ${errorText}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});


document.getElementById("backToProductBtn").addEventListener("click", function() {
    window.location.href = "Product.html";
});

// document.getElementById("add-product-form").addEventListener("submit", async function(event) {
//     event.preventDefault();

//     // Get form values
//     const productName = document.getElementById("product-name").value;
//     const productPrice = parseFloat(document.getElementById("product-price").value);
//     const productCategory = document.getElementById("product-category").value;
//     const productDescription = document.getElementById("product-description").value;
//     const productStock = parseInt(document.getElementById("product-stock").value, 10);


//     // Create new product object
//     const newProduct = {
//         name: productName,
//         price: productPrice,
//         category: productCategory,
//         description: productDescription,
//         stock: productStock
//     };

//     try {
//         const response = await fetch('https://asia-southeast2-awangga.cloudfunctions.net/itungin/products', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(newProduct)
//         });

//         if (response.ok) {
//             alert("Product added successfully!");
//             window.location.href = "Product.html";
//         } else {
//             const errorText = await response.text();
//             alert(`Failed to add product: ${errorText}`);
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         alert("An error occurred. Please try again.");
//     }
// });


// document.getElementById("backToProductBtn").addEventListener("click", function() {
//     window.location.href = "Product.html";
// });