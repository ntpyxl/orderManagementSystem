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
		// Wait for image upload to complete
		const uploadItemImageResult = await uploadItemImage();
		console.log(uploadItemImageResult);

		if (!uploadItemImageResult.success) {
			throw uploadItemImageResult.message || "Image upload failed";
		}
		formData.itemImage = uploadItemImageResult.fileName;

		const response = await fetch(`${BASE_URL}/api/inventoryManager.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
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
			throw result.message || "Something else went wrong!";
		}
	} catch (error) {
		Swal.fire({
			title: "Failed to add item!",
			text: error?.message || error || "Something else went wrong!",
			icon: "error",
			confirmButtonColor: "#ef4444",
		});
	}
}

async function uploadItemImage() {
	const itemImage = $("#itemImageField")[0].files[0];
	if (!itemImage) return { success: false, message: "No image selected" };

	const formData = new FormData();
	formData.append("action", "uploadItemImage");
	formData.append("itemImage", itemImage);

	try {
		const response = await fetch(`${BASE_URL}/api/inventoryManager.php`, {
			method: "POST",
			body: formData,
		});
		return await response.json();
	} catch (error) {
		console.error("Upload error:", error);
		return { success: false, message: error };
	}
}
