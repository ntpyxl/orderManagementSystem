<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixelshop</title>

    <link href="./styles.css" rel="stylesheet">
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

    <div class="flex flex-row flex-wrap mx-12 mt-5 justify-center space-x-5 space-y-5">
        
        <div class="flex flex-col w-72 h-full p-3 rounded-xl bg-amber-50 drop-shadow-lg">
            <div class="mx-auto my-3 p-2 rounded-xl w-fit">
                <img src="images/khabylamemech.jpg" class="w-56 object-contain select-none">
            </div>

            <h5 class="font-bold text-xl">Khaby Lame Mechanism</h5>
            <p class="text-xl text-right">PHP 67</p>
            
            <div class="flex mt-8 mb-3 justify-between items-center">
                <input type="number" class="w-36 h-9 pl-3 pr-1 border-2 rounded-xl focus:outline-none focus:ring-0">
                <button class="px-3 py-1 border-2 border-black rounded-4xl hover:bg-black hover:text-amber-50 duration-150 cursor-pointer select-none">Add to Cart</button>
            </div>
        </div>

    </div>

</body>
</html>