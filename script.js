document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los elementos de menú desplegable
    var dropdownLinks = document.querySelectorAll('.dropdown > a');

    dropdownLinks.forEach(function(link) {
        var parentLi = link.parentElement;
        var subMenu = parentLi.querySelector('.dropdown-menu');

        // Mostrar submenú al hacer clic en el enlace principal
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar que el enlace cambie la URL

            // Toggle para mostrar u ocultar el submenú
            if (subMenu.style.display === 'block') {
                subMenu.style.display = 'none';
            } else {
                closeOtherSubmenus(parentLi);
                subMenu.style.display = 'block';
            }
        });

        // Manejar sub-submenús
        var submenuItems = subMenu.querySelectorAll('.submenu-item > a');
        submenuItems.forEach(function(subMenuLink) {
            var subSubmenu = subMenuLink.nextElementSibling; // Obtiene el sub-submenú

            if (subSubmenu) {
                subMenuLink.addEventListener('click', function(event) {
                    event.preventDefault(); // Evitar que el enlace cambie la URL

                    // Toggle para mostrar u ocultar el sub-submenú
                    if (subSubmenu.style.display === 'block') {
                        subSubmenu.style.display = 'none';
                    } else {
                        closeOtherSubSubmenus(subMenuLink);
                        subSubmenu.style.display = 'block';
                    }
                });
            }
        });

        // Función para cerrar otros submenús
        function closeOtherSubmenus(currentLi) {
            dropdownLinks.forEach(function(link) {
                var parentLi = link.parentElement;
                var otherSubMenu = parentLi.querySelector('.dropdown-menu');

                if (parentLi !== currentLi && otherSubMenu.style.display === 'block') {
                    otherSubMenu.style.display = 'none';
                }
            });
        }

        // Función para cerrar otros sub-submenús
        function closeOtherSubSubmenus(currentLink) {
            submenuItems.forEach(function(link) {
                var subSubmenu = link.nextElementSibling;

                if (link !== currentLink && subSubmenu && subSubmenu.style.display === 'block') {
                    subSubmenu.style.display = 'none';
                }
            });
        }

        // Ocultar submenús y sub-submenús cuando se sale del área
        parentLi.addEventListener('mouseleave', function() {
            subMenu.style.display = 'none';
            submenuItems.forEach(function(subMenuLink) {
                var subSubmenu = subMenuLink.nextElementSibling;
                if (subSubmenu) {
                    subSubmenu.style.display = 'none';
                }
            });
        });
    });
});
