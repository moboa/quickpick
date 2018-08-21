// Sends the action processed by client store to the server store.
export default socket => store => next => action => {
    if (action.meta && action.meta.remote) {
        socket.emit('action', action);
    }
    return next(action);
}