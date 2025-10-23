$(document).ready(function () {
	loadInventory();
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

async function loadInventory(search = "") {
	try {
		const request = await fetch(`${BASE_URL}/api/inventoryManager.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				action: "getInventoryItems",
				search: search,
			}),
		});

		const response = await request.json();
		if (response.success) {
			let itemCards = "";
			response.data.forEach((item) => {
				itemCards += `<div class="flex flex-col w-72 h-full p-3 rounded-xl bg-amber-50 drop-shadow-lg">
                                <div class="mx-auto my-3 p-2 rounded-xl w-fit">
                                    <img src="${BASE_URL}/images/${item.item_image}" alt="${item.item_name}" class="w-56 h-56 border text-center object-contain select-none">
                                </div>

                                <h5 class="font-bold text-xl">${item.item_name}</h5>
                                <p class="text-xl text-right">PHP ${item.price}</p>
                                
                                <button class="mt-8 px-3 py-1 border-2 border-black rounded-4xl hover:bg-black hover:text-amber-50 duration-150 cursor-pointer select-none">Edit Item</button>
                            </div>`;
			});

			inventoryBody.innerHTML = itemCards;
		} else {
			inventoryBody.innerHTML = "No records found";
		}
	} catch (error) {
		console.error(error);
		inventoryBody.innerHTML = "Error loading data";
	}
}
