$(document).ready(function () {
	loadCashier();
});

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

		if (
			!response.success ||
			!Array.isArray(response.data) ||
			response.data.length === 0
		) {
			$("#cashiersBody").html(`
				<p class="text-gray-500 text-center">No records found</p>
			`);
			return;
		}

		const rows = response.data
			.map((cashier) => createCashierRow(cashier))
			.join("");

		$("#cashiersBody").html(rows);
	} catch (error) {
		$("#cashiersBody").html(`
			<p class="text-gray-500 text-center">Error loading data</p>;	
		`);
	}
}

function createCashierRow(cashier) {
	return `
		<tr>
			<td class="border px-2">${cashier.cashier_id}</td>
			<td class="border px-2">${cashier.last_name}</td>
			<td class="border px-2">${cashier.first_name}</td>
			<td class="border px-2">${cashier.user_email}</td>
			<td class="border px-2">${cashier.user_role}</td>
			<td class="border px-2">${cashier.user_status}</td>
			<td class="border px-2">${cashier.contact_number}</td>
			<td class="border px-2">${cashier.date_added}</td>
		</tr>
	`;
}
