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

async function changeUserStatus(cashierId, status) {
	const formData = {
		cashier_id: cashierId,
		new_cashier_status: status,
	};

	try {
		const cashierData = await apiRequest("getCashierById", formData);
		const confirmed = await confirmAction(
			`Are you sure you want to ${status} ${cashierData.first_name} ${cashierData.last_name}?`
		);

		if (!confirmed) return;

		await apiRequest("changeCashierStatus", formData);
		toastSuccess(
			`${cashierData.first_name} ${cashierData.last_name} is now ${status}ed!`
		);

		loadCashier();
	} catch (error) {
		alertError(error);
	}
}

async function apiRequest(action, data) {
	const response = await fetch(`${BASE_URL}/api/cashierManager.php`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ action, data }),
	});

	const result = await response.json();
	if (!response.ok || result.success === false) {
		throw new Error(result.message || "Request failed");
	}
	return result.data;
}

async function confirmAction(title, confirmText = "Yes", denyText = "No") {
	const result = await Swal.fire({
		title,
		showDenyButton: true,
		confirmButtonText: confirmText,
		confirmButtonColor: "#14b8a6",
		denyButtonText: denyText,
		customClass: {
			title: "text-lg",
			actions: "my-actions",
			confirmButton: "order-1",
			denyButton: "order-2",
		},
	});

	return result.isConfirmed;
}

function alertSuccess(message) {
	Swal.fire({
		title: message,
		icon: "success",
		confirmButtonColor: "#14b8a6",
	});
}

function alertError(error) {
	Swal.fire({
		title: "Something went wrong!",
		text: error?.message || error || "Something else went wrong!",
		icon: "error",
		confirmButtonColor: "#ef4444",
	});
}

function toastSuccess(message) {
	Swal.fire({
		toast: true,
		position: "bottom-start",
		icon: "success",
		title: message,
		showConfirmButton: false,
		timer: 2500,
		timerProgressBar: true,
		background: "#fef3c7",
		color: "#1f2937",
	});
}
