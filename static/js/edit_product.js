

document.getElementById("Backproductbtn").addEventListener("click", function () {
    window.location.href = "Product.html";
});

async function fetchProductById(productId) {
    try {
        console.log(`Fetching product with ID: ${productId}`);
        
        const response = await fetch(`https://asia-southeast2-awangga.cloudfunctions.net/itungin/product-id?id=${productId}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const product = await response.json();
        console.log("Product data fetched:", product);
        
        // Populate the form fields with the product data
        document.getElementById('product-name').value = product.data.name;
        document.getElementById('product-price').value = product.data.price;
        document.getElementById('product-category').value = product.data.category;
        document.getElementById('product-description').value = product.data.description;
        document.getElementById('product-stock').value = product.data.stock;

    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

// Function to handle product update on form submission
document.getElementById("edit-product-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const productId = new URLSearchParams(window.location.search).get("id");
    console.log("Updating product with ID:", productId);

    const updatedProduct = {
        name: document.getElementById("product-name").value,
        price: parseFloat(document.getElementById("product-price").value),
        category: document.getElementById("product-category").value,
        description: document.getElementById("product-description").value,
        stock: parseInt(document.getElementById("product-stock").value, 10)
    };

    // Confirm update action
    const result = await Swal.fire({
        icon: "warning",
        title: "Are you sure you want to update this product?",
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel'
    });

    if (result.isConfirmed) {
        try {
            const response = await fetch(`https://asia-southeast2-awangga.cloudfunctions.net/itungin/products?id=${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct)
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Updated",
                    text: "Product updated successfully!"
                }).then(() => {
                    window.location.href = "Product.html";
                });
            } else {
                const errorText = await response.text();
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: `Failed to update product: ${errorText}`
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred. Please try again."
            });
        }
    }
});

// Initial loading function
window.onload = function() {
    const productId = new URLSearchParams(window.location.search).get("id");
    console.log("Product ID dari URL:", productId);
    if (productId) {
        fetchProductById(productId);
    } else {
        console.error('Product ID not found in URL');
    }
};
