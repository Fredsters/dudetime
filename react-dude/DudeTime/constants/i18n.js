import { Localization } from 'expo';
import i18n from 'i18n-js';

const en = {
    title: 'Title',
    bar: 'Bar {{someValue}}',
    tags: "Tags",
    addTagDescription: "#AddDescribingTags"
}

const de = {
    title: 'Titel',
    bar: 'Ein bar wert {{someValue}}',
    tags: "Tags",
    addTagDescription: "#FügeBeschreibendeTagsHinzu",
}

i18n.fallbacks = true;
i18n.translations = { de, en };
//i18n.locale = Localization.locale;
// console.log("gallo: " + Localization.locales);

export default i18n;