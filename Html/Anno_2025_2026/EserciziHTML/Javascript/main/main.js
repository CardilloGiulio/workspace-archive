import { BasicCalculator } from "../core/Implementation/BasicCalculator.js";
import { LocalhostAccessPolicy } from "../core/Implementation/LocalhostAccessPolicy.js";
import { HttpCommunicationService } from "../services/HttpCommunicationService.js";
import { initializeExercise1 } from "../Exercises/exercise1.js";
import { initializeTheme } from "../Exercises/theme.js";

function buildApplication() {
    const accessPolicy = new LocalhostAccessPolicy();
    const communicationService = new HttpCommunicationService(accessPolicy);

    return {
        accessPolicy,
        communicationService,
        createCalculator(displayElement) {
            return new BasicCalculator(displayElement);
        }
    };
}

function bootstrapExercise1(application) {
    initializeExercise1({
        createCalculator: application.createCalculator
    });
}

function bootstrapPage(application) {
    const page = document.body.dataset.page;

    initializeTheme();

    switch (page) {
        case "exercise1":
            bootstrapExercise1(application);
            break;
        default:
            console.warn(`No bootstrap configured for page: ${page}`);
    }
}

const application = buildApplication();
bootstrapPage(application);
