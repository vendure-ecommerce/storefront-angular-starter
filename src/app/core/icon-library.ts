import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebook';
import faInstagram from '@fortawesome/fontawesome-free-brands/faInstagram';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import faYoutube from '@fortawesome/fontawesome-free-brands/faYoutube';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCreditCard,
    faFilter,
    faMinus,
    faPlus,
    faSadCry,
    faSearch,
    faShoppingCart,
    faTimes,
    faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

/**
 * All the icons used in the library are declared here. This allows us to
 * ship only the needed icons so that the bundle does not get bloated.
 */
export function buildIconLibrary() {
    library.add(
       // faTwitter, faFacebook, faInstagram, faYoutube,
        faTimes,
        faMinus,
        faPlus,
        faShoppingCart,
        faUserCircle,
        faCreditCard,
        faSearch,
        faSadCry,
        faFilter,
    )
    ;
}
