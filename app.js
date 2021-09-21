var curTime = document.getElementById('curTime')
var start = document.getElementById('start')
var board = document.getElementsByClassName('board')
var level = document.getElementById('level')
var matrix = [[]];
var res=0;
var min=0;
var sec=0;
const easy = {2:6,4:3,7:8,9:4,10:5,11:3,12:7,14:9,20:4,24:6,25:3,27:7,29:9,32:5,33:1,34:2,35:3,36:8,46:7,47:1,48:3,49:6,50:2,53:4,55:3,57:6,58:4,62:1,68:6,70:5,71:2,72:3,73:1,75:2,78:9,80:8}

const medium = {1:5,3:7,4:2,8:9,12:6,14:3,16:7,18:1,19:4,26:6,28:1,31:4,32:9,36:7,40:5,42:8,46:8,50:2,51:7,54:5,56:7,63:9,64:2,66:9,68:8,70:6,74:4,78:9,79:3,81:8}

const hard = {4:7,10:1,22:4,23:3,25:2,36:6,40:5,42:9,52:4,53:1,54:8,59:8,60:1,66:2,71:5,74:4,79:3}

start.addEventListener("click",()=>{
    var stop;
    var value = start.innerText;
    
    if(value==="Start"){
        main();
        start.innerText = "Stop"
        stop = setInterval(timer,1000);
    }
    else{
        start.innerText = "Start";
        window.clearInterval(stop,timer);
        location.reload();
    }
})

var counter=0;
function timer(){
    sec = counter%60;
    min = parseInt(counter/60);
    curTime.innerHTML = `Timer ${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`
    counter++;
}


function main(){
    create(matrix)
    var td = [];
    for(var i=1;i<=81;i++){
        td[i] = document.getElementById('td'+i)
        td[i].value='';
        if(level.value=='easy' && i in easy){
            td[i].value=easy[i];
            td[i].readOnly=true;
            update(i-1,easy[i]);
        }
        else if(level.value=='medium' && i in medium){
            td[i].value=medium[i];
            td[i].readOnly=true;
            update(i-1,medium[i]);
        }
        else if(level.value=='hard' && i in hard){
            td[i].value=hard[i];
            td[i].readOnly=true;
            update(i-1,hard[i]);
        }
        
        td[i].addEventListener('input',(x)=>{
            run(x);
        })
    }

}


function create(arr){
    for(var i=0;i<9;i++){
        var l=[];
        for(var j=0;j<9;j++){
            l[j]=0;
        }
        arr[i]=l;
    }
}


function run(j){
    var id = document.getElementById(j.target.id)
    const idNum = j.target.id.slice(2,)
    var val = parseInt(j.data)

    if(!val){
        if(matrix[i][j]>0){
            res--;
            update(idNum-1,0);
        }
        id.value="";
        return;
    }

    if(check(idNum-1,val)){
        if(id.classList.contains('bg-red')){
            id.classList.remove('bg-red');
        }
        if(res==81){
            alert(`Congo!!\nCompleted in ${min}min and ${sec}sec`);
            location.reload();
        }
    }
    else{
        id.classList.add('bg-red');
    }
}

function update(pos,val){
    var i = Math.floor(pos/9);
    var j = pos%9;
    matrix[i][j] = val;
    res++;
}

function check(pos,val){
    var i = Math.floor(pos/9);
    var j = pos%9;
    if(matrix[i][j]>0){
        res--;
        matrix[i][j]=0;
    }
    if(matrix[i].includes(val)){
        return false;
    }
    for(var k=0;k<9;k++){
        if(matrix[k][j]===val){
            return false;
        }
    }
    var r = Math.floor(i/3);
    var c = Math.floor(j/3);
    for(var m=r*3;m<r*3+3;m++){
        for(var n=c*3;n<c*3+3;n++){
            if(matrix[m][n]===val){
                return false;
            }
        }
    }
    if(matrix[i][j]==0){
        res++;
    }
    matrix[i][j] = val;
    return true;
}

// x.path[0].id
    //x.data
    // console.log(j.target.id);
    // if(j.target.id==="td1"){
    //     var x = document.getElementById("td1")
    //     x.classList.add('bg-red')
    // }

/* 123456789
456789123
789123456
214365897
365897214
897214365
531642978
642978531
978531642 */

/*easy
261375894
537894162
948216357
694751238
825943671
713628945
356482719
489167523
172539486
*/