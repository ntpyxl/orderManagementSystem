$(document).ready(function () {
	loadCashier();
});

/*
$("#searchField").on("input", function (event) {
	event.preventDefault();
	loadUsers($(this).val());
});


$("#clearSearchFieldButton").on("click", () => {
	$("#searchField").val("");
	loadUsers();
});
*/

async function loadCashier(search = "") {
	try {
		const request = await fetch(`${BASE_URL}/api/cashierManager.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				action: "getCashiers",
				search: search,
			}),
		});

		const response = await request.json();
		if (response.success) {
			let cashierList = "";
			response.data.forEach((cashier) => {
				cashierList += `<tr>
                                <td class="border px-2">${cashier.cashier_id}</td>
								<td class="border px-2">${cashier.last_name}</td>
								<td class="border px-2">${cashier.first_name}</td>
								<td class="border px-2">${cashier.user_email}</td>
								<td class="border px-2">${cashier.user_role}</td>
								<td class="border px-2">${cashier.user_status}</td>
								<td class="border px-2">${cashier.contact_number}</td>
								<td class="border px-2">${cashier.date_added}</td>
                            </tr>`;
			});

			cashiersBody.innerHTML = cashierList;
		} else {
			cashiersBody.innerHTML = "No records found";
		}
	} catch (error) {
		console.error(error);
		cashiersBody.innerHTML = "Error loading data";
	}
}
