export class ComponentOne {

    createHelloWorld() {
        return {
            hello: 'world',
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