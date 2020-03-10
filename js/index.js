$(function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var pX = 300;
    var eteint = 'rgb(40, 40, 40)';
    var temps = 15;
    var tableauX = [300, 300, 300];
    var tableauY = [190, 120, 50];
    var tableauColors = ['rgb(9, 243, 9)','rgb(255, 166, 0)', 'rgb(255, 24, 24)'];
    var tableauTemps = [temps, 2, temps];
    var j = 0;
    var animationID;

    function cercleVide (x, y, r, color) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke(); 
    }

    function cerclePlein (x, y, r, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill(); 
    }

    function rectangeVide (x, y, rw, rh, color) {
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.strokeStyle = color;
        ctx.rect(x, y, rw, rh);
        ctx.stroke();
    }

    function rectangePlein (x, y, rw, rh, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(x, y, rw, rh);
        ctx.fill();
    }

    function ligne (xdebut, ydebut, xfin, yfin, color, w) {
        ctx.strokeStyle = color;
        ctx.lineWidth = w;
        ctx.beginPath();
        ctx.moveTo(xdebut, ydebut);
        ctx.lineTo(xfin, yfin);
        ctx.stroke();
    }

    function texte (text, x, y, taille, police, color) {
        ctx.fillStyle = color;
        var tailPol = taille + 'px ' + police;
        ctx.font = tailPol;
        ctx.textAlign = "center";
        ctx.fillText(text, x, y); 
    }

    function moveX (d) {
        pX = pX + d;
    }

    function dessineFeuTricolor () {
        cerclePlein(pX, 50, 40, 'black');//grands cercles
        cerclePlein(pX, 120, 40, 'black');
        cerclePlein(pX, 190, 40, 'black');
        rectangePlein(pX-35, 15, 70, 70, 'black');//rectanges
        rectangePlein(pX-35, 85, 70, 70, 'black');
        rectangePlein(pX-35, 155, 70, 70, 'black');
        cerclePlein(pX, 50, 30, eteint);
        cerclePlein(pX, 120, 30, eteint);
        cerclePlein(pX, 190, 30, eteint);
        //Pilier
        ligne (pX, 225, 300, 445, 'black', '15');
        cerclePlein(pX, 445, 60, 'black');
        //Compteur
        ligne (230, 190, 260, 190, 'black', '10');
        cerclePlein(pX-90, 190, 40, 'black');
        rectangePlein(pX-125, 155, 70, 70, 'black');
        cerclePlein(pX-90, 190, 30, eteint);
        texte (compteRebours, 211, 206, 50, 'DS-Digital', tableauColors[j]);
    }

    function main () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dessineFeuTricolor();
        cerclePlein(tableauX[j], tableauY[j], 30, tableauColors[j]);

        animationID = requestAnimationFrame(main);
    }
    
    main();
    //console.log(animationID);

    var compteRebours = tableauTemps[j];
    setInterval(function () {
        compteRebours--;
        if (compteRebours < 0) {
            j++;
            if (j > 2) {
            j = 0
            compteRebours = tableauTemps[j];
            } else {
                compteRebours = tableauTemps[j];
            }
        }
    }, 1000);
    
    jQuery('#affiche').html(temps);
    jQuery('#temps').val(temps);
    jQuery('#temps').mousemove(function () {
        temps = parseInt(jQuery('#temps').val());
        jQuery('#affiche').html(temps);
    });

    jQuery('#valider').click(function (event) {
        event.preventDefault();        
        cancelAnimationFrame(animationID);
        tableauTemps = [temps, 2, temps];
        j = 0;
        compteRebours = tableauTemps[j];
        main();
    });
});
