export default class ComponentOne {

    createHelloWorld() {
        return {
            hello: 'world',
            version: 13,
            some: ['deploy', 'to', 'production'],
            requested_at: Date.now(),
            success: true,
        }
    }

    throwError(str) {
        throw new Error(str);
    }

    seven() {
        return 7;
    }
}