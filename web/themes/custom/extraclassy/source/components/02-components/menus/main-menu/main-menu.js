/**
 * @file
 * A JavaScript file containing the main menu functionality (small/large screen)
 *
 */

(function(Drupal) {
  Drupal.behaviors.mainMenu = {
    attach: function(context) {
      'use strict';

      // Use context instead of document IF DRUPAL.
      const toggle_expand = document.getElementById('toggle-expand');
      const menu = document.getElementById('main-nav');
      const expand_menu = menu.getElementsByClassName('expand-sub');

      // Mobile Menu Show/Hide.
      toggle_expand.addEventListener('click', function(e) {
        toggle_expand.classList.toggle('toggle-expand--open');
        menu.classList.toggle('main-nav--open');
      });

      // Expose mobile sub menu on click.
      for (var i = 0; i < expand_menu.length; i++) {
        expand_menu[i].addEventListener('click', function(e) {
          var menu_item = e.currentTarget;
          var sub_menu = menu_item.nextElementSibling;

          menu_item.classList.toggle('expand-sub--open');
          sub_menu.classList.toggle('main-menu--sub-open');
        });
      }
    }
  };
})(Drupal); // UNCOMMENT IF DRUPAL.
