function addToCart(event) {
	event.preventDefault();

	const formData = Object.fromEntries(new FormData(event.target).entries());
	formData.itemPrice = parseInt(formData.itemPrice);
	formData.itemQuantity = parseInt(formData.itemQuantity);

	console.log(formData);
}
