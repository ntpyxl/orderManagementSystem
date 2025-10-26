<div class="px-6 pt-5 pb-3 space-x-2">
    <button id="cashiersAddCashierButton" class="px-3 py-1 border-2 border-black rounded-4xl hover:bg-black hover:text-amber-50 duration-150 cursor-pointer select-none">Add New Cashier</button>
</div>

<div class="px-10 py-5">
    <table>
        <thead>
            <tr>
                <th class="border px-2">ID</th>
                <th class="border px-2">Last Name</th>
                <th class="border px-2">First Name</th>
                <th class="border px-2">Email</th>
                <th class="border px-2">Role</th>
                <th class="border px-2">Status</th>
                <th class="border px-2">Contact Number</th>
                <th class="border px-2">Date Added</th>
            </tr>
        </thead>
        
        <tbody id="cashiersBody"></tbody>
    </table>
</div>

<script src="../scripts/loadCashiers.js"></script>