export class ComponentOne {

    createHelloWorld() {
        return {
            hello: 'world',
            version: 4,
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
