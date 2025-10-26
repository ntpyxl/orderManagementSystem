async function loadInventory(search = "", layout = "customer") {
	try {
		const request = await fetch(`${BASE_URL}/api/inventoryManager.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ action: "getInventoryItems", search }),
		});

		const response = await request.json();

		if (
			!response.success ||
			!Array.isArray(response.data) ||
			response.data.length === 0
		) {
			$("#inventoryBody").html(`
				<p class="text-gray-500 text-center">No records found</p>
			`);
			return;
		}

		const cards = response.data
			.map((item) => createInventoryCard(item, layout))
			.join("");

		$("#inventoryBody").html(cards);
	} catch (err) {
		console.error(err);
		$("#inventoryBody").html(`
			<p class="text-red-500 text-center">Error loading data</p>
		`);
	}
}

function createInventoryCard(item, layout) {
	const image = `<img src="${BASE_URL}/images/${item.item_image}" 
					alt="${item.item_name}" 
					class="w-56 h-56 border text-center object-contain select-none">`;

	const info = `
		<h5 class="font-bold text-xl">${item.item_name}</h5>
		<p class="text-xl text-right">PHP ${item.price}</p>
	`;

	let action = "";
	if (layout === "customer") {
		action = `
			<form onsubmit="addToCart(event)" class="flex mt-8 mb-3 justify-between items-end">
				<input type="hidden" name="itemName" value="${item.item_name}">
				<input type="hidden" name="itemPrice" value="${item.price}">
				<div class="flex flex-col">
					<label for="itemQuantityField" class="ml-2">Quantity</label>
					<input type="number" id="itemQuantityField" name="itemQuantity" class="w-36 h-9 pl-3 pr-1 border-2 rounded-xl focus:outline-none focus:ring-0">
				</div>
				<button class="px-3 py-1 border-2 border-black rounded-4xl hover:bg-black hover:text-amber-50 duration-150 cursor-pointer select-none">
					Add to Cart
				</button>
			</form>
		`;
	} else if (layout === "admin") {
		action = `
			<button class="mt-8 px-3 py-1 border-2 border-black rounded-4xl hover:bg-black hover:text-amber-50 duration-150 cursor-pointer select-none">
				Edit Item
			</button>
		`;
	}

	return `
		<div class="flex flex-col w-72 h-full p-3 rounded-xl bg-amber-50 drop-shadow-lg">
			<div class="mx-auto my-3 p-2 rounded-xl w-fit">${image}</div>
			${info}
			${action}
		</div>
	`;
}
