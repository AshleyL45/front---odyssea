export const formatDate = (rawDate: Date | string, locale = "en-UK") => {
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(new Date(rawDate));
};