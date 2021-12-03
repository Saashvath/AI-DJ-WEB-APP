song  = "";
leftWristX=0;
leftWristY=0;
scoreRightWrist=0;
scoreLefftWrist=0;
rightWristX=0;
rightWristY=0;
function preload(){

    song = loadSound("music.mp3");

}


function setup(){

    canvas = createCanvas(550,550);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    storage = ml5.poseNet(video,modelLoaded)
    storage.on('pose' ,gotPoses)
}

function modelLoaded(){

    console.log("Model has been sucessfuly loaded!");

}



function draw(){


    image(video,0,0,550,550);
    fill("#FF0000")
    stroke("#FF0000")

    if(scoreRightWrist > 0.2){

        circle(rightWristX,rightWristY,25)

        if(rightWristY> 0 && rightWristY <= 100 ){

            document.getElementById("speed").innerHTML = "Speed = 0.5x"
            song.rate(0.5)
        }

        else if(rightWristY > 100 && rightWristY <= 100 ){

            document.getElementById("speed").innerHTML = "Speed = 1x"
            song.rate(1)
        }

        else if(rightWristY > 200 && rightWristY <= 300){

            document.getElementById("speed").innerHTML = "Speed = 1.5x"
        }

        else if(rightWristY > 300 && rightWristY <= 400){

            document.getElementById("speed").innerHTML = "Speed = 2x"
            song.rate(2)
        }
         
        else if (rightWristY > 400 && rightWristY <= 550){

            document.getElementById("speed").innerHTML = "Speed = 2.5x"
            song.rate(2.5)
        }
    }

    if(scoreLefftWrist > 0.2){
    circle(leftWristX,leftWristY,25)
    inLeftWristY = Number(leftWristY)
    remove_decimal = floor(leftWristY)
    volume  = remove_decimal/550
    song.setVolume(volume)
    document.getElementById("volume").innerHTML = "Volume = " + volume.toFixed(3);
}
}


function play(){

    song.play();
    song.setVolume(1);
    song.rate(1);

}

function gotPoses(result){

    if(result.length>0){

        console.log(result)

        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        rightWristX = result[0].pose.rightWrist.x;
        rightWristY = result[0].pose.rightWristY;

        console.log( "leftWristX = " + leftWristX +  "leftWristY = " + leftWristY)
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY)
        scoreLefftWrist= result[0].pose.keypoints[9].score;
        scoreRightWrist= result[0].pose.keypoints[10].score;

    }



}