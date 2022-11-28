import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
    faFacebook,
    faInstagram,
    faTwitter,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
    faBars, faCheck, faChevronRight,
    faCreditCard,
    faFilter, faHeart,
    faHome,
    faMinus,
    faPlus,
    faSadCry,
    faSearch,
    faShoppingCart, faStar,
    faTimes,
    faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

/**
 * All the icons used in the library are declared here. This allows us to
 * ship only the needed icons so that the bundle does not get bloated.
 */
export function buildIconLibrary(library: FaIconLibrary) {
    library.addIcons(
        faTwitter,
        faFacebook,
        faInstagram,
        faYoutube,
        faTimes,
        faMinus,
        faPlus,
        faShoppingCart,
        faUserCircle,
        faCreditCard,
        faSearch,
        faSadCry,
        faFilter,
        faBars,
        faHome,
        faHeart,
        faStar,
        faChevronRight,
        faCheck,
    );
}
