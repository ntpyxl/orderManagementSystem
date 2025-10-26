function addToCart(event) {
	event.preventDefault();

	const formData = Object.fromEntries(new FormData(event.target).entries());
	formData.itemPrice = parseInt(formData.itemPrice);
	formData.itemQuantity = parseInt(formData.itemQuantity);

	cart.push(formData);
	updateCartDisplay();
}

function updateCartDisplay() {
	$("#cartListBody").html(cart.map((item) => createItemRow(item)).join(""));

	const total = cart.reduce(
		(sum, item) => sum + item.itemPrice * item.itemQuantity,
		0
	);

	$("#totalAmount").text(`${total.toFixed(2)} PHP`);
}

function createItemRow(item) {
	return `
        <div class="grid grid-cols-[7fr_2fr_3fr] px-1 py-1 gap-2 border-gray-500">
            <span class="text-left">
                ${item.itemName} @ ${item.itemPrice} PHP
            </span>
            <span class="text-center">x${item.itemQuantity}</span>
            <span class="text-right">
                ${item.itemPrice * item.itemQuantity} PHP
            </span>
        </div>
    `;
}
