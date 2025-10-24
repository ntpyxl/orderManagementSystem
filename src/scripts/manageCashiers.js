$("#cashiersAddCashierButton").on("click", function (event) {
	event.preventDefault();
	$("#cashiersAddCashierModal").addClass("flex").removeClass("hidden");
	$("body").addClass("overflow-hidden");
});

$("#cashiersAddCashierCancelButton").on("click", function (event) {
	event.preventDefault();
	$("#cashiersAddCashierModal").addClass("hidden").removeClass("flex");
	$("body").removeClass("overflow-hidden");
});

async function cashiersAddCashier(event) {
	event.preventDefault();

	const formData = Object.fromEntries(new FormData(event.target).entries());

	try {
		const response = await fetch(`${BASE_URL}/api/cashierManager.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ action: "addCashier", data: formData }),
		});

		const result = await response.json();

		if (response.ok) {
			Swal.fire({
				title: "Successfully added cashier!",
				icon: "success",
				confirmButtonColor: "#14b8a6",
			});
		} else {
			throw result.message || "Something else went wrong!";
		}
	} catch (error) {
		Swal.fire({
			title: "Failed to add new cashier!",
			text: error?.message || error || "Something else went wrong!",
			icon: "error",
			confirmButtonColor: "#ef4444",
		});
	}
}
