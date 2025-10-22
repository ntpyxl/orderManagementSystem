const BASE_URL = `${window.location.origin}/orderManagementSystem/src/`;

$("#inventoryAddItemButton").on("click", function (event) {
	event.preventDefault();
	$("#inventoryAddItemModal").addClass("flex").removeClass("hidden");
	$("body").addClass("overflow-hidden");
});

$("#inventoryAddItemCancelButton").on("click", function (event) {
	event.preventDefault();
	$("#inventoryAddItemModal").addClass("hidden").removeClass("flex");
	$("body").removeClass("overflow-hidden");
});

$("#itemImageField").on("change", function (event) {
	const file = event.target.files[0];
	if (file) {
		const previewUrl = URL.createObjectURL(file);
		$("#previewImage").attr("src", previewUrl);
	} else {
		$("#previewImage").attr("src", "");
	}
});

async function inventoryAddItem(event) {
	event.preventDefault();

	const formData = Object.fromEntries(new FormData(event.target).entries());
	formData.itemPrice = parseInt(formData.itemPrice);

	try {
		const response = await fetch(`${BASE_URL}/api/inventoryManager.php`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ action: "addItem", data: formData }),
		});

		const result = await response.json();

		if (response.ok) {
			Swal.fire({
				title: "Successfully added item!",
				icon: "success",
				confirmButtonColor: "#14b8a6",
			});
		} else {
			Swal.fire({
				title: "Failed to add item!",
				text: result.message || "Something else went wrong!",
				icon: "error",
				confirmButtonColor: "#ef4444",
			});
		}
	} catch (error) {
		Swal.fire({
			title: "Failed to add item!",
			text: result.message || "Something else went wrong!",
			icon: "error",
			confirmButtonColor: "#ef4444",
		});
	}
}
