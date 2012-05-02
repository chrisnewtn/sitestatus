require(['jquery', 'mustache', 'text!status.html'], function ($, mustache, statusTemplate) {
  
  var $input,
      $form,
      $submit,
      domains = {};
  
  function saveDomain ( data ) {
    
    var domain = $input.val();
    
    domains[domain] = {
      data : data,
      retrieved : new Date()
    };
    
    var row = mustache.render(statusTemplate, data);
    
    $form.append(row);
    
  }
  
  function addDomain ( e ) {
    
    e.preventDefault();
    
    var domain = $input.val();
    
    if (domain !== '') {
      $.get('http://isitup.org/' + domain + '.json', saveDomain, 'jsonp');
    }
    
  }
  
  function removeDomain ( e ) {
    
    var domain = $(this).find('td:first').text();
    
    delete domains[domain];
    
    $(this).parent().parent().remove();
    
  }
  
  $(document).ready(function () {
    
    $input = $('#domain-box');
    $form = $('tbody');
    $submit = $('.remove');
    
    $input.focus();
    $('form').on('submit', addDomain);
    $('button.remove').live('click', removeDomain);
    
  });
  
});