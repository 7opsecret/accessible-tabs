// Util(s):
import { isStringMatchedList } from '~/src/utils/assert';

// Enum(s):
import { ARIA_ORIENTATION } from '~/src/enums/aria-values';

export const AriaValidationService = (() => {
    const isValidOrientation = isStringMatchedList([
        ARIA_ORIENTATION.VERTICAL,
        ARIA_ORIENTATION.HORIZONTAL
    ]);

    return {
        isValidOrientation
    };
})();