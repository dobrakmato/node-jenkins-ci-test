export default class ComponentOne {

    createHelloWorld() {
        return {
            hello: 'world',
            breaking: 'changes',
            version: 11,
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