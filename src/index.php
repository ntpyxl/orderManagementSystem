<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixelshop</title>

    <link href="./styles.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body class="bg-cyan-100">
    <?php include 'components/navbar.php'; ?>
    
    <div class="px-6 pt-5 pb-3">
        <select class="px-3 py-1 border-2 border-black rounded-4xl hover:bg-black hover:text-amber-50 duration-150 focus:bg-black focus:text-amber-50 cursor-pointer select-none">
            <option disabled selected>Filter by</option>
            <option>Ascending (A - Z)</option>
            <option>Descending (Z - A)</option>
            <option>Recently</option>
            <option>Oldest</option>
        </select>
    </div>

    <div id="inventoryBody" class="flex flex-row flex-wrap mx-12 mt-5 justify-center space-x-5 space-y-5">
    </div>

    <script src="scripts/loadInventory.js"></script>
</body>
</html>