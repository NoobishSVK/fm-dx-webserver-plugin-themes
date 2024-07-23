/*!
 * ************************************************
 * FM-DX Webserver Theme Plugin
 * ************************************************
 * Created by NoobishSVK
 * Join our Discord: https://discord.gg/fmdx
 * ************************************************
 *
 * This script extends the functionality of the FM-DX 
 * Webserver theme system by adding new themes and
 * integrating them into the existing theme selector.
 *
 * It dynamically appends new themes to the dropdown menu,
 * applies selected themes, and saves the user's choice.
 *
 * ************************************************
 */

// Immediately Invoked Function Expression (IIFE) to avoid polluting the global scope
(function() {
    // Define additional themes to be added
    const additionalThemes = {
        theme10: ['rgb(10, 10, 10)', 'rgb(255, 100, 100)', 'rgb(200, 200, 200)', 'rgb(20, 20, 20)'], // Dark Red
        theme11: ['rgb(20, 20, 40)', 'rgb(100, 200, 255)', 'rgb(240, 240, 240)', 'rgb(30, 30, 60)']  // Ocean Blue
    };

    // Define user-friendly names for the new themes
    const themeNames = {
        theme10: 'Dark Red',
        theme11: 'Ocean Blue'
    };

    const themeObserver = new MutationObserver(function() {
        if (typeof themes !== 'undefined') {
            themeObserver.disconnect(); // Stop observing once `themes` is available
    
            // Extend the existing themes with new ones
            Object.assign(themes, additionalThemes);
    
            // Get the dropdown menu for themes
            const $themeSelectorOptions = $('#theme-selector .options').length ? $('#theme-selector .options') : $('#server-theme-selector .options');
    
            // Append new theme options to the dropdown
            for (const [key, name] of Object.entries(themeNames)) {
                if (themes[key]) {
                    const listItem = `<li class="option" data-value="${key}">${name}</li>`;
                    $themeSelectorOptions.append(listItem);
                }
            }
    
            // Apply the saved theme if it exists
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme && themes[savedTheme]) {
                if (typeof setTheme === 'function') {
                    setTheme(savedTheme);
                }
                $('#theme-selector input').val($(`#theme-selector .option[data-value="${savedTheme}"]`).text());
            }
        }
    });
    
    themeObserver.observe(document, { childList: true, subtree: true });    

    // Event handler for theme selection
    $(document).on('click', '#theme-selector .option', function() {
        const selectedTheme = $(this).data('value');
        if (themes[selectedTheme]) {
            if (typeof setTheme === 'function') {
                setTheme(selectedTheme);
            }
            $('#theme-selector input').val($(this).text()); // Update input field with selected theme
            localStorage.setItem('theme', selectedTheme); // Save the selected theme
        }
    });

    $('#server-theme-selector').on('click', '.option', function() {
        $('#server-theme-selector input').val($(this).text()); // Update input field with selected theme
    });
})();
