/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';
var allProducts=[];
var leftSideImageElement=document.getElementById('left_product_img');
var centerSideImageElement=document.getElementById('center_product_img');
var rightSideImageElement=document.getElementById('right_product_img');
var imagesSection=document.getElementById('all_products');
var leftSideImage;
var centerSideImage;
var rightSideImage;
var totalClicks=0;
var arraynames=[];
var arrayvotes=[];
var arraydispaly=[];
var arrayrepeat=[-1,-1,-1];
var resultList=document.getElementById('finalResult');

// constructer
// eslint-disable-next-line no-unused-vars
function ProductImage(productName,link){
  this.productName=productName;
  this.link=link;
  this.votes=0;
  this.timesDisplayed=0;
  allProducts.push(this);
  localStorage.setItem('allVotes', JSON.stringify(ProductImage.votes));

}
if(localStorage.getItem('allVotes')){
  ProductImage.votes = JSON.parse(localStorage.getItem('allVotes'));
} else{
ProductImage.votes = [];
}



//Creating objects
new ProductImage('bag','img/bag.jpg');
new ProductImage('banana','img/banana.jpg');
new ProductImage('bathroom','img/bathroom.jpg');
new ProductImage('boots','img/boots.jpg');
new ProductImage('breakfast','img/breakfast.jpg');
new ProductImage('bubblegum','img/bubblegum.jpg');
new ProductImage('chair','img/chair.jpg');
new ProductImage('cthulhu','img/cthulhu.jpg');
new ProductImage('dog-duck','img/dog-duck.jpg');
new ProductImage('dragon','img/dragon.jpg');
new ProductImage('pen','img/pen.jpg');
new ProductImage('pet-sweep','img/pet-sweep.jpg');
new ProductImage('scissors','img/scissors.jpg');
new ProductImage('shark','img/shark.jpg');
new ProductImage('sweep','img/sweep.png');
new ProductImage('tauntaun','img/tauntaun.jpg');
new ProductImage('unicorn','img/unicorn.jpg');
new ProductImage('usb','img/usb.gif');
new ProductImage('water-can','img/water-can.jpg');
new ProductImage('wine-glass','img/wine-glass.jpg');

//Function
function displayRandomImages(){
  var leftImageIndex;
  var centerImageIndex;
  var rightImageIndex;
  do{
    leftImageIndex = Math.floor((Math.random() * allProducts.length));
    console.log('leftImageIndex',leftImageIndex);
  }while(arrayrepeat[0]===leftImageIndex ||arrayrepeat[1]===leftImageIndex|| arrayrepeat[2]===leftImageIndex);

  do{
    centerImageIndex = Math.floor((Math.random() * allProducts.length));
    console.log(centerImageIndex+'yasmeen');
  } while(leftImageIndex === centerImageIndex ||arrayrepeat[0]===centerImageIndex ||arrayrepeat[1]===centerImageIndex|| arrayrepeat[2]===centerImageIndex );
  do{
    rightImageIndex = Math.floor((Math.random() * allProducts.length));
    console.log(rightImageIndex+'yasmeen');
  } while(leftImageIndex === rightImageIndex || centerImageIndex ===rightImageIndex ||arrayrepeat[0]===rightImageIndex ||arrayrepeat[1]===rightImageIndex|| arrayrepeat[2]===rightImageIndex);
  arrayrepeat=[];
  arrayrepeat.push(leftImageIndex);
  arrayrepeat.push(centerImageIndex);
  arrayrepeat.push(rightImageIndex);
  displayImages(leftImageIndex,centerImageIndex,rightImageIndex);
}
// Function to display the images
function displayImages(leftIndex,centerIndex,rightIndex){
  leftSideImage=allProducts[leftIndex];
  centerSideImage=allProducts[centerIndex];
  rightSideImage=allProducts[rightIndex];
  leftSideImage.timesDisplayed++;
  centerSideImage.timesDisplayed++;
  rightSideImage.timesDisplayed++;

  leftSideImageElement.setAttribute('src',leftSideImage.link);
  centerSideImageElement.setAttribute('src',centerSideImage.link);
  rightSideImageElement.setAttribute('src',rightSideImage.link);
}
displayRandomImages();

//event listener
imagesSection.addEventListener('click',handleVote);
function handleVote(event){
    console.log(event.target.id);
    var clickedImage;
    if(event.target.id==='left_product_img'){
        clickedImage=leftSideImage;
    }else if(event.target.id==='center_product_img'){
        clickedImage=centerSideImage;
    }else if(event.target.id==='right_product_img'){
       clickedImage=rightSideImage;
    }
    if(clickedImage){
clickedImage.votes++;
displayRandomImages();
totalClicks++;
    }
    if(totalClicks>=25){
        imagesSection.removeEventListener('click',handleVote);
        console.log(allProducts);
        for (var i=0;i<allProducts.length;i++){
          arraynames[i]=allProducts[i].productName;
          arrayvotes[i]=allProducts[i].votes;
          arraydispaly[i]=allProducts[i].timesDisplayed;
          console.log(allProducts[i]);
       }
        displayResults();
        thechart();
    }
}
function displayResults(){
    var listItem;
    for(var i=0;i<allProducts.length;i++){
listItem=document.createElement('li');
listItem.textContent= allProducts[i].productName+' had '+allProducts[i].votes+' votes and was showen '+allProducts[i].timesDisplayed+' times .';
resultList.appendChild(listItem);
    }
}
//to make a chart
function thechart(){
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: arraynames,
        datasets: [{
            label: 'Number of Votes',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: arrayvotes,
        }, {label: 'Number of display',
        backgroundColor: 'rgb(155, 52, 235)',
        borderColor: 'rgb(155, 52, 235)',
        data: arraydispaly,
      }]
    },

    // Configuration options go here
    options: {}
});
}



