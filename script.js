// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to the navigation links
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      // Prevent default navigation behavior
      event.preventDefault();

      // Get the target section from the link's href attribute
      const targetSection = document.querySelector(this.getAttribute('href'));

      // Scroll smoothly to the target section
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Add event listener to the "Learn More" button
  const learnMoreBtn = document.querySelector('.btn-primary');
  learnMoreBtn.addEventListener('click', function(event) {
    // Prevent default button behavior
    event.preventDefault();

    // Get the target section to scroll to
    const targetSection = document.querySelector('.features');

    // Scroll smoothly to the target section
    targetSection.scrollIntoView({
      behavior: 'smooth'
    });
  });
});
