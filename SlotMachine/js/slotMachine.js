window.onload = function () {
    var slotCanvas = document.getElementById('slotCanvas');
    var ctx = slotCanvas.getContext("2d");
    slotCanvas.width = 800;
    slotCanvas.height = 800;

    function drawSlotMachine()
    {
        var imgPath = "images/slotmachine1/png";
        slotMachine = new createJS.Bitmap(imgPath);
        stage.addChild(slotMachine);
        stage.update();
    }
}