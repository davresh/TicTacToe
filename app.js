let block = document.getElementById('block');
let winner = document.getElementById('winner');
let winAcc = document.getElementById('winAcc');
let playAgain = document.getElementById('playAgain');
let ask =  document.getElementById('ask')
let TicTac = ['','','','','','','','',''];
let audio = new Audio();
audio.src = './audio/arcadeGame.wav';
let winAudio = new Audio()
winAudio.src = './audio/interface.mp3'
let index = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let player = 'O';
let noOne = 0;
TicTac.forEach((el,i) => {
    let div = document.createElement('div');
    div.className = 'play';
    div.innerText = el;
    div.addEventListener('click',()=>{
        if(div.innerText == ''){
            audio.play();
            ask.innerText = `${player} - ի Խաղալու հերթն է `
            player = player !='X'?'X':'O';
            div.innerText = player;
            TicTac[i] = player;
            noOne++;
            win(TicTac,player,noOne);
        };
    });
    block.append(div);
});
let cup = document.querySelectorAll('.play')
function win(del,val,lose){
    let win = 0;
    let int = [];
    index.forEach(el => {
        el.forEach(el => {
            if(del[el] == val){
                win++;
                int.push(el);
            };
        });
        if(win == 3){
            lose = 0
            noOne = 0;
            player = 'O';
            del.forEach((el,i) => del[i] = '');
            int.forEach(el => cup[el].style.color = 'snow');
            winAudio.play();
            setTimeout(() => {
                winner.style.display = 'flex';
                ask.innerText = ''
                winAcc.innerText = `Հաղթեց ${val} - ով խաղացողը`;
                cup.forEach(el => el.innerText = '');
                int.forEach(el => cup[el].style.color = '#039A0D');
                playAgain.addEventListener('click',()=>{
                    winner.style.display = 'none';
                    audio.play();
                    int = [];
                    win = 0;
                });
            },1500);
        }else{
            win = 0;
            int = [];
        }
    });
    if(lose == 9){
        noOne = 0;
        player = 'O';
        del.forEach((el,i) => del[i] = '');
        cup.forEach((el,i) => cup[i].style.color = 'snow');
        setTimeout(() => {
            ask.innerText = ''
            winner.style.display = 'flex';
            winAudio.play();
            winAcc.innerText = `Խաղը ավարտվեց ոչ ոքի 0:0`;
            cup.forEach(el => el.innerText = '');
            cup.forEach((el,i) => cup[i].style.color = '#039A0D');
            playAgain.addEventListener('click',()=>{
                winner.style.display = 'none';
                audio.play();
                int = [];
                win = 0;
            });
        },1500);
    };
};
