// ---Project Dropdown Menu--- //
var DropdownCollector = document.getElementsByClassName("Projcet-DropDownButton")
for (let i = 0; i < DropdownCollector.length; i++){
    DropdownCollector[i].addEventListener("click", function() {
        this.classList.toggle("Project-ActiveDropDownButton")
        var panel = this.nextElementSibling;
        var image = this.childNodes[5].childNodes[3].childNodes[1]
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            image.src = "images/pictures/dropdown/DdpDownOrange.png"
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            image.src = "images/pictures/dropdown/DdpUpLight.png"
        }
    })
}

// ---Sticky NavBar--- //
// Get the navbar
var NavBar = document.getElementById("NavBar-Section");

// there should only be 1 main section
var MainSection = document.getElementsByClassName("Main-Section")[0];



// Get the offset position of the navbar
var PosStickyStart = NavBar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset >= PosStickyStart) {
    NavBar.classList.add("NavBar-StickyNavBar");
    MainSection.style.marginTop = "var(--NavBarHeight)";
    } else {
    NavBar.classList.remove("NavBar-StickyNavBar");
    MainSection.style.marginTop = "0cm";
    }
}
  
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};



// // Get the navbar
// var NavBar = document.getElementsByClassName("NavBar-Section");

// // Get the offset position of the navbar
// var PosStickyStart = NavBar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= PosStickyStart) {
    NavBar.classList.add("NavBar-StickyNavBar");
    MainSection.style.marginTop = "var(--NavBarHeight)";
  } else {
    NavBar.classList.remove("NavBar-StickyNavBar");
    MainSection.style.marginTop = "0cm";
  }
}
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// TL: New Tempinput
var tempinput = [[[6,6,6],[6,5,6],[6,6,6]],[[6,6,6],[6,3,6],[6,6,6]],[[6,6,6],[6,2,6],[6,6,6]],[[6,6,6],[6,1,6],[6,6,6]],[[6,6,6],[6,0,6],[6,6,6]],[[6,6,6],[6,4,6],[6,6,6]]]
// 


// var tempinput = [[[0,5,0],[0,5,0],[0,5,0]],[[0,3,0],[0,3,0],[0,3,0]],[[0,2,0],[0,2,0],[0,2,0]],[[0,1,0],[0,1,0],[0,1,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,4,0],[0,4,0],[0,4,0]]]
var outflag = false
var GICollector = document.getElementsByClassName("Grid-Item");
var solverbutton = document.getElementById("Solver-Button-Wrapper");

solverbutton.style.display = "none";

for (let i = 0; i < GICollector.length; i++){ 
  GICollector[i].addEventListener("click", function() {
    
      let out = change(i)
      changeinput(out[0],out[1],out[2],1)
      currcol = tempinput[out[0]][out[1]][out[2]]

      //r, o, b, g, w, y
      if (currcol==6){
        this.style.backgroundColor = "grey"
      } else if (currcol==0) {
        this.style.backgroundColor = "red"
      } else if (currcol==1) {
        this.style.backgroundColor = "blue"
      } else if (currcol==2) {
        this.style.backgroundColor = "green"
      } else if (currcol==3) {
        this.style.backgroundColor = "orange"
      } else if (currcol==4) {
        this.style.backgroundColor = "yellow"
      } else if (currcol==5) {
        this.style.backgroundColor = "var(--LightOffWhite)"
      }

      checkinput()
      if (outflag == true){
        solverbutton.style.display = "block"
      } else {
        solverbutton.style.display = "none"
      }
  })
}

function change(n){
  face = Math.floor(n/9)
  blocknum = n%9
  x = Math.floor(blocknum/3)
  y = blocknum%3
  return [face, x, y]
} 

function changeinput(face, x, y, colchange){
  if (!(x==1 && y==1)){
    let color = tempinput[face][x][y]
    if (color == 6){
      tempinput[face][x][y] = 0
    } else {
      tempinput[face][x][y] = (tempinput[face][x][y]+colchange)%6
    } 
  }
}

function checkinput()
{
  for (let j = 0; j < GICollector.length; j++) {
    out = change(j)
    val = 0
    if (tempinput[out[0]][out[1]][out[2]]==6) {
      val +=1
    }
    if (val != 0){
      outflag = false
    } else {
      outflag = true
    }
  }
}

// get modal
var modal = document.getElementById("Modal");



//var btn = document.getElementById("Solver-Button-Wrapper");

var span = document.getElementsByClassName("close")[0];

// ---------------------------------------|
var solveMovesArray = [];

function SolvesCube()
{
  const solver = require('rubiks-cube-solver');
  let cubeState = tempinput.join('').split(",").join("");
  cubeState = cubeState.replace(/0/g,'l').replace(/1/g,'d').replace(/2/g,'u').replace(/3/g,'r').replace(/4/g,'b').replace(/5/g,'f');
  console.log(cubeState);

  /*cubeState = [
    'flulfbddr', // front
    'rudrruddl', // right
    'dbbburrfb', // up
    'llffdrubf', // down
    'rludlubrf', // left
    'lubfbfudl' // back
  ].join('');*/

  // Temp
  //cubeState = "ffbffbffbrrrrrrrrruuduuduudddudduddulllllllllfbbfbbfbb";
   

  let solveMoves = solver(cubeState).replace(/prime/g, '-');
  for (let i = 0; i < solveMoves.length; i++) 
  {
    if (solveMoves[i] == '2') 
    {
      solveMoves = solveMoves.substring(0, i) + " " + solveMoves[i-1] + solveMoves.substring(i+1);
    }
  }
  solveMovesArray = solveMoves.split(' ')
  console.log(solveMovesArray);
}

solverbutton.onclick = function() 
{
  SolvesCube()
  ShowStep(currstep)
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//var solution = ["R","U","B","D"]

// display
var currstep = 1


// function StepUp(n){
//   console.log("")
//   ShowStep(currstep+=n)
// }

//ffdffdffdrrrrrrrrruufuufuufddbddbddblllllllllubbubbubb

// function plusSlides(n) {
//   ShowStep(slideIndex += n);
// }


var MLeft = document.getElementById("mleft");
var MRight = document.getElementById("mright");
MLeft.onclick = function () { ShowStep(currstep-=1); }
MRight.onclick = function () { ShowStep(currstep+=1); }

function ShowStep(i) {

  let len = solveMovesArray.length

  var MGCollector = document.getElementsByClassName("Modal-Grid-Items");

  var MDisplay = document.getElementById("action");
  var MBgc = document.getElementById("mbgc");
  var text = document.getElementById("text");

  // Format i
  if (i>=len){currstep=len; i=len;MRight.style.opacity=0; MLeft.style.opacity=1;}
  else if (i<=1){currstep=1; i=1;MLeft.style.opacity=0; MRight.style.opacity=1;}
  else {MRight.style.opacity=1; MLeft.style.opacity=1}
  var MCode = solveMovesArray[i-1]


  // steps
  text.textContent = currstep + "/" + len;
  MDisplay.textContent = MCode;
  for (j=0;j<MGCollector.length;j++){
    MGCollector[j].textContent ="";
  }

  if(i==1) {
    MBgc.style.backgroundColor="var(--LightOffWhite)";
    MGCollector[12].textContent = "W";
  }
  else {
    MBgc.style.backgroundColor="lightgray";
  }

  // cursed bit
  if (MCode === "R") {
    MGCollector[4].textContent = "L0";
    MGCollector[8].textContent = "↑";
    MGCollector[13].textContent = "↑";
    MGCollector[18].textContent = "↑";
  } else if (MCode === "R-") {
    MGCollector[4].textContent = "L0";
    MGCollector[8].textContent = "↓";
    MGCollector[13].textContent = "↓";
    MGCollector[18].textContent = "↓";
  } else if (MCode === "M") {
    MGCollector[4].textContent = "L0";
    MGCollector[7].textContent = "↑";
    MGCollector[12].textContent = "↑";
    MGCollector[17].textContent = "↑";
  } else if (MCode === "M-") {
    MGCollector[4].textContent = "L0";
    MGCollector[7].textContent = "↓";
    MGCollector[12].textContent = "↓";
    MGCollector[17].textContent = "↓";
  } else if (MCode === "L") {
    MGCollector[4].textContent = "L0";
    MGCollector[6].textContent = "↓";
    MGCollector[11].textContent = "↓";
    MGCollector[16].textContent = "↓";
  } else if (MCode === "L-") {
    MGCollector[4].textContent = "L0";
    MGCollector[6].textContent = "↑";
    MGCollector[11].textContent = "↑";
    MGCollector[16].textContent = "↑";
  }
  if (MCode === "F")
  {
    MGCollector[4].textContent = "L0";
    MGCollector[7].textContent = "→";
    MGCollector[11].textContent = "↑";
    MGCollector[13].textContent = "↓";
    MGCollector[17].textContent = "←";
  }
  if (MCode === "F-")
  {
    MGCollector[4].textContent = "L0";
    MGCollector[17].textContent = "→";
    MGCollector[13].textContent = "↑";
    MGCollector[11].textContent = "↓";
    MGCollector[7].textContent = "←";
  }

  if (MCode === "U")
  {
    MGCollector[4].textContent = "L0";
    MGCollector[6].textContent = "←";
    MGCollector[7].textContent = "←";
    MGCollector[8].textContent = "←";
  }
  if (MCode === "U-")
  {
    MGCollector[4].textContent = "L0";
    MGCollector[6].textContent = "→";
    MGCollector[7].textContent = "→";
    MGCollector[8].textContent = "→";
  }
  if (MCode === "D")
  {
    MGCollector[4].textContent = "L0";
    MGCollector[16].textContent = "→";
    MGCollector[17].textContent = "→";
    MGCollector[18].textContent = "→";
  }

  if (MCode === "D-") {
    MGCollector[4].textContent = "L0";
    MGCollector[16].textContent = "←";
    MGCollector[17].textContent = "←";
    MGCollector[18].textContent = "←";
  }

  if (MCode === "E")
  {
    MGCollector[4].textContent = "L0";
    MGCollector[11].textContent = "→";
    MGCollector[12].textContent = "→";
    MGCollector[13].textContent = "→";
  }

  if (MCode === "E-") {
    MGCollector[4].textContent = "L0";
    MGCollector[11].textContent = "←";
    MGCollector[12].textContent = "←";
    MGCollector[13].textContent = "←";
  }

  if (MCode === "B")
  {
    MGCollector[4].textContent = "L2";
    MGCollector[1].textContent = "←";
    MGCollector[2].textContent = "←";
    MGCollector[3].textContent = "←";
    MGCollector[5].textContent = "↓";
    MGCollector[9].textContent = "↑";
    MGCollector[10].textContent = "↓";
    MGCollector[14].textContent = "↑";
    MGCollector[15].textContent = "↓";
    MGCollector[19].textContent = "↑";
  }

  if (MCode === "B-")
  {
    MGCollector[4].textContent = "L2";
    MGCollector[1].textContent = "→";
    MGCollector[2].textContent = "→";
    MGCollector[3].textContent = "→";
    MGCollector[9].textContent = "↓";
    MGCollector[5].textContent = "↑";
    MGCollector[14].textContent = "↓";
    MGCollector[10].textContent = "↑";
    MGCollector[19].textContent = "↓";
    MGCollector[15].textContent = "↑";
  }
  if (MCode === "S")
  {
    MGCollector[4].textContent = "L1";
    MGCollector[1].textContent = "→";
    MGCollector[2].textContent = "→";
    MGCollector[3].textContent = "→";
    MGCollector[9].textContent = "↓";
    MGCollector[5].textContent = "↑";
    MGCollector[14].textContent = "↓";
    MGCollector[10].textContent = "↑";
    MGCollector[19].textContent = "↓";
    MGCollector[15].textContent = "↑";
  }
  if (MCode === "S-")
  {
    MGCollector[4].textContent = "L1";
    MGCollector[1].textContent = "←";
    MGCollector[2].textContent = "←";
    MGCollector[3].textContent = "←";
    MGCollector[5].textContent = "↓";
    MGCollector[9].textContent = "↑";
    MGCollector[10].textContent = "↓";
    MGCollector[14].textContent = "↑";
    MGCollector[15].textContent = "↓";
    MGCollector[19].textContent = "↑";
  }

}