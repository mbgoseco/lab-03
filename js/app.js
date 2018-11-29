'use strict';

let allAnimals = [];
let options = [];

function Animal(animal) {
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}

Animal.prototype.toHtml = function() {
  //template from html doc
  const $template = $('#photo-template').html();
  // compile template to regular html
  const $dataSource = Handlebars.compile($template);
  // return the filled out template in the html
  return $dataSource(this);
}

Animal.readJSON = (page) => {
  $.get(page, 'json')
    .then(data => {
      data.forEach(obj => {
        allAnimals.push(new Animal(obj))
      })
    })
    .then(Animal.loadAnimals)
}

Animal.readJSONtitle = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        allAnimals.push(new Animal(obj))
      })
    });
  $.get('data/page-2.json', 'json')
    .then(data => {
      data.forEach(obj => {
        allAnimals.push(new Animal(obj))
      })
    })
    .then(Animal.loadAnimalsTitle)
}

Animal.readJSONhorns = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        allAnimals.push(new Animal(obj))
      })
    });
  $.get('data/page-2.json', 'json')
    .then(data => {
      data.forEach(obj => {
        allAnimals.push(new Animal(obj))
      })
    })
    .then(Animal.loadAnimalsHorns)
}

Animal.loadAnimals = () => {
  allAnimals.forEach(animal => {
    $('#animals').append(animal.toHtml());
    if (options.indexOf(animal.keyword) === -1) {
      options.push(animal.keyword);
      $('select').append(`<option value="${animal.keyword}">${animal.keyword}</option>`);
    }
  })
}

Animal.loadAnimalsTitle = () => {
  allAnimals.sort(function(a, b) {
    let titleA = a.title.toUpperCase();
    let titleB = b.title.toUpperCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });
  allAnimals.forEach(animal => {
    $('#animals').append(animal.toHtml());
    if (options.indexOf(animal.keyword) === -1) {
      options.push(animal.keyword);
      $('select').append(`<option value="${animal.keyword}">${animal.keyword}</option>`);
    }
  })
}

Animal.loadAnimalsHorns = () => {
  allAnimals.sort(function(a, b) {
    return a.horns - b.horns;
  });
  allAnimals.forEach(animal => {
    $('#animals').append(animal.toHtml());
    if (options.indexOf(animal.keyword) === -1) {
      options.push(animal.keyword);
      $('select').append(`<option value="${animal.keyword}">${animal.keyword}</option>`);
    }
  })
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

$('#page1').on('click', function() {
  $('div').remove();
  $('#page1').css('visibility', 'hidden');
  $('#page2').css('visibility', 'visible');
  $('option:nth-child(1n+2)').remove();
  allAnimals = [];
  options = [];
  $(() => Animal.readJSON('data/page-1.json'));
});

$('#page2').on('click', function() {
  $('div').remove();
  $('#page2').css('visibility', 'hidden');
  $('#page1').css('visibility', 'visible');
  $('option:nth-child(1n+2)').remove();
  allAnimals = [];
  options = [];
  $(() => Animal.readJSON('data/page-2.json'));
});

$('#sortTitle').on('click', function() {
  $('div').remove();
  $('option:nth-child(1n+2)').remove();
  allAnimals = [];
  options = [];
  $(() => Animal.readJSONtitle());
});

$('#sortHorns').on('click', function() {
  $('div').remove();
  $('option:nth-child(1n+2)').remove();
  allAnimals = [];
  options = [];
  $(() => Animal.readJSONhorns());
});

$(() => Animal.readJSON('data/page-1.json'));
