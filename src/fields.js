import intersect from "intersect";

/**
 * @param {string} string fields string
 * @param {string[]} allowedFields array of allowed fields
 * @param {int} maximumFields maximum amount of fields to parse
 * @return {string[]} array containing only allowed requested fields
 */
export default function fields(string, allowedFields, maximumFields = allowedFields !== null ? allowedFields.length : 0) {

    // Bail early if we have enough information to safely say that there are no intersections.
    if (string.trim().length === 0 ||
        maximumFields === 0 ||
        allowedFields === null ||
        allowedFields.length === 0) {
        return [];
    }

    // If not, compute intersection and return it.
    const fields = string.split(',', maximumFields);
    return intersect(fields, allowedFields);
}