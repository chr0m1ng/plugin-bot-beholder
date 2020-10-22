const tryParseJsonObj = (obj) => {
    try {
        const parsed = JSON.parse(obj);
        return typeof parsed === 'object' ? parsed : null;
    } catch {
        return null;
    }
};

export { tryParseJsonObj };
