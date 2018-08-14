let input,scoreToWin,scores,roundScore,activePlayer,gamePlaying;function init(){scores=[0,0],activePlayer=0,roundScore=0,gamePlaying=!0,document.getElementById("dice-1").style.display="none",document.getElementById("dice-2").style.display="none",document.getElementById("score-0").textContent="0",document.getElementById("score-1").textContent="0",document.getElementById("current-0").textContent="0",document.getElementById("current-1").textContent="0",document.getElementById("name-0").textContent="Player 1",document.getElementById("name-1").textContent="Player 2",document.querySelector(".player-0-panel").classList.remove("winner"),document.querySelector(".player-1-panel").classList.remove("winner"),document.querySelector(".player-0-panel").classList.remove("active"),document.querySelector(".player-1-panel").classList.remove("active"),document.querySelector(".player-0-panel").classList.add("active")}function nextPlayer(){activePlayer=0===activePlayer?1:0,roundScore=0,document.getElementById("current-0").textContent="0",document.getElementById("current-1").textContent="0",document.querySelector(".player-0-panel").classList.toggle("active"),document.querySelector(".player-1-panel").classList.toggle("active"),document.getElementById("dice-1").style.display="none",document.getElementById("dice-2").style.display="none"}init(),document.querySelector(".btn-roll").addEventListener("click",function(){if(gamePlaying){const e=Math.floor(6*Math.random())+1,t=Math.floor(6*Math.random())+1;document.getElementById("dice-1").style.display="block",document.getElementById("dice-2").style.display="block",document.getElementById("dice-1").src=`assets/images/dice-${e}.png`,document.getElementById("dice-2").src=`assets/images/dice-${t}.png`,6===e&&6===t?(scores[activePlayer]=0,document.querySelector(`#score-${activePlayer}`).textContent="0",nextPlayer()):1!==e&&1!==t?(roundScore+=e+t,document.querySelector(`#current-${activePlayer}`).textContent=roundScore):nextPlayer()}}),document.querySelector(".btn-hold").addEventListener("click",function(){gamePlaying&&(scores[activePlayer]+=roundScore,document.querySelector(`#score-${activePlayer}`).textContent=scores[activePlayer],input=document.querySelector(".final-score").value,scoreToWin=input||100,scores[activePlayer]>=scoreToWin?(document.querySelector(`#name-${activePlayer}`).textContent="Winner!",document.getElementById("dice-1").style.display="none",document.getElementById("dice-2").style.display="none",document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner"),document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active"),gamePlaying=!1):nextPlayer())}),document.querySelector(".btn-new").addEventListener("click",init);