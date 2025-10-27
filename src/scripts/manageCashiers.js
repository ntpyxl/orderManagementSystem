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
		await apiRequest("addCashier", formData, "cashierManager");

		toastSuccess("Successfully added cashier!");
		loadCashier();
		// close modal too
	} catch (error) {
		toastFailed(error?.message || "Failed to add new cashier!");
		// close modal too
	}
}

async function changeUserStatus(cashierId, status) {
	const formData = {
		cashier_id: cashierId,
		new_cashier_status: status,
	};

	try {
		const cashierData = await apiRequest(
			"getCashierById",
			formData,
			"cashierManager"
		);
		const confirmed = await confirmAction(
			`Are you sure you want to ${status} ${cashierData.first_name} ${cashierData.last_name}?`
		);

		if (!confirmed) return;

		await apiRequest("changeCashierStatus", formData, "cashierManager");
		toastSuccess(
			`${cashierData.first_name} ${cashierData.last_name} is now ${status}ed!`
		);

		loadCashier();
	} catch (error) {
		alertError(error);
	}
}
