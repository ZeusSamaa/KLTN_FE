export default function generateSubjectCode(id) {
    const prefix = 'SE5';
    const suffix = id.toString().padStart(2, '0');
    return `${prefix}${suffix}`;
}