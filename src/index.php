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
    
    <div class="flex flex-row flex-wrap mx-12 mt-5 justify-center space-x-5 space-y-5">
        <div class="flex flex-col w-80 h-full p-3 rounded-xl bg-amber-50">
            <div class="mx-auto my-3 p-2 rounded-xl w-fit">
                <img src="images/khabylamemech.jpg" class="w-56">
            </div>

            <h5 class="font-bold text-2xl">Khably Lame Mechanism</h5>
            <p class="text-xl text-right">PHP 67</p>
            
            <div class="flex mt-8 justify-between items-center">
                <input type="number" class="w-36 h-9 pl-3 pr-1 border-2 rounded-xl focus:outline-none focus:ring-0">
                <button class="px-3 py-1 border-2 border-black rounded-4xl hover:bg-black hover:text-amber-50  duration-150 cursor-pointer">Add to Cart</button>
            </div>
        </div>

    </div>

</body>
</html>