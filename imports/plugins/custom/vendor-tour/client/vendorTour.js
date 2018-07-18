import introJs from "intro.js";
import vendorTourSteps from "./vendorTourSteps";

const intro = introJs();

const startTour = () => {
  const steps = vendorTourSteps;
  intro.setOptions({
    overlayOpacity: 0.9,
    showProgress: true,
    exitOnEsc: true,
    showStepNumbers: true,
    stepNumberPosition: "top-right",
    showBullets: true,
    disableInteraction: false,
    skipLabel: "Exit",
    scrollToElement: true,
    steps
  });
  setTimeout(() => {
    intro.start();
  }, 1000);
};

export default startTour;
