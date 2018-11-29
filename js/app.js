'use strict';

function Animal(animal) {
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}

Animal.allAnimals = [];
let options = [];

Animal.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let animalClone = $('div[class = "clone"]');
  let animalHtml = $('#photo-template').html();
  animalClone.html(animalHtml);

  animalClone.find('h2').text(this.title);
  animalClone.find('img').attr('src', this.image_url);
  animalClone.find('img').attr('alt', this.title);
  animalClone.find('img').addClass(this.keyword);
  animalClone.find('figcaption').text(this.description);
  animalClone.find('p').text(`Horns: ${this.horns}`);
  animalClone.removeClass('clone');

  if (options.indexOf(this.keyword) === -1) {
    options.push(this.keyword);
    $('select').append(`<option value="${this.keyword}">${this.keyword}</option>`);
  }
}

Animal.readJSON = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Animal.allAnimals.push(new Animal(obj))
      })
    })
    .then(Animal.loadAnimals)
}

Animal.loadAnimals = () => {
  Animal.allAnimals.forEach(animal => animal.render());
}

$('select').on('change', function() {
  console.log($(this).val());
  console.log(this);
  let selection = $(this).val();
  $('div').hide();
  $(`img[class="${selection}"`).parent().show();
  if ($(this).val() === 'default') {
    $('div').show();
  }
});

$(() => Animal.readJSON())
