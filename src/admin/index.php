<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixelshop</title>

    <link href="../styles.css" rel="stylesheet">
</head>
<body class="bg-cyan-100">
    <?php include '../components/navbar.php'; ?>

    <div class="mx-5 mt-5">
        <div class="space-x-1">
            <button class="px-3 py-1 bg-amber-200 hover:bg-amber-50 duration-150 cursor-pointer select-none">Inventory</button>
            <button class="px-3 py-1 bg-amber-200 hover:bg-amber-50 duration-150 cursor-pointer select-none">Accounts</button>
            <button class="px-3 py-1 bg-amber-200 hover:bg-amber-50 duration-150 cursor-pointer select-none">Transactions</button>
        </div>
        <div id="mainSection" class="bg-amber-50">
            <?php include 'components/inventory.php'; ?>
        </div>
    </div>
    
</body>
</html>