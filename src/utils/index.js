import transform from 'lodash/transform';
import startCase from 'lodash/startCase';
import last from 'lodash/last';
import parseInt from 'lodash/parseInt';

const GENDER_LIST = ['male', 'female'];

export function getProfileUrl(gender) {
    const imgName = (GENDER_LIST.includes(gender) && gender) || 'na';
    return `resources/profile/${imgName}.png`;
}

// Transform
// {key_name: value, ...} to
// {title: "Key Name", description: value } format
export function normalizeKeyValue(object) {
    return transform(
        object,
        (result, value, key) => {
            result.push({ title: startCase(key), description: value });
        },
        []
    );
}

// Find out id from URL given in API response
export function getIdFromUrl(url) {
    const res = url.split('/').filter(Boolean);
    return parseInt(last(res));
}
