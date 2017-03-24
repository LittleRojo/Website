async_mode = None

from flask import Flask, render_template
import socketio

sio = socketio.Server(logger=True, async_mode=async_mode)
app = Flask(__name__)
app.wsgi_app = socketio.Middleware(sio, app.wsgi_app)
app.config['SECRET_KEY'] = 'secret!'
thread = None


def background_thread():
    """Example of how to send server generated events to clients."""
    #application.logger.warning('BG Started')
    count = 0
    while True:
        sio.sleep(1)
        count += 1
        sio.emit('my response', {'data': 'Server Generated event' + count},
                 namespace='/test')


@app.route('/')
def main():
    global thread
    if thread is None:
        thread = sio.start_background_task(background_thread)
    #logger.error('before html')
    return render_template('main.html')


@sio.on('my event', namespace='/test')
def test_message(sid, message):
    sio.emit('my response', {'data': message['data']}, room=sid,
             namespace='/test')


@sio.on('my broadcast event', namespace='/test')
def test_broadcast_message(sid, message):
    sio.emit('my response', {'data': message['data']}, namespace='/test')


@sio.on('join', namespace='/test')
def join(sid, message):
    sio.enter_room(sid, message['room'], namespace='/test')
    sio.emit('my response', {'data': 'Entered room: ' + message['room']},
             room=sid, namespace='/test')


@sio.on('leave', namespace='/test')
def leave(sid, message):
    sio.leave_room(sid, message['room'], namespace='/test')
    sio.emit('my response', {'data': 'Left room: ' + message['room']},
             room=sid, namespace='/test')


@sio.on('close room', namespace='/test')
def close(sid, message):
    sio.emit('my response',
             {'data': 'Room ' + message['room'] + ' is closing.'},
             room=message['room'], namespace='/test')
    sio.close_room(message['room'], namespace='/test')


@sio.on('my room event', namespace='/test')
def send_room_message(sid, message):
    sio.emit('my response', {'data': message['data']}, room=message['room'],
             namespace='/test')


@sio.on('disconnect request', namespace='/test')
def disconnect_request(sid):
    sio.disconnect(sid, namespace='/test')


@sio.on('connect', namespace='/test')
def test_connect(sid, environ):
    #logger.error('before connect')
    sio.emit('my response', {'data': 'Connected', 'count': 0},
             namespace='/test')
    #logger.error('after connect')
    print('connected')


@sio.on('disconnect', namespace='/test')
def test_disconnect(sid):
    print('Client disconnected')


if __name__ == '__main__':
    #application.run();
    #handler = RotatingFileHandler('app.log', maxBytes=100000, backupCount=3)
    #logger = logging.getLogger('tdm')
    #logger.setLevel(logging.ERROR)
    #logger.addHandler(handler)
    #logger.error('started')
    if sio.async_mode == 'threading':
        # deploy with Werkzeug
        app.run(threaded=True)
    elif sio.async_mode == 'eventlet':
        # deploy with eventlet
        import eventlet
        import eventlet.wsgi
        eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 9903)), app)
    elif sio.async_mode == 'gevent':
        # deploy with gevent
        from gevent import pywsgi
        try:
            from geventwebsocket.handler import WebSocketHandler
            websocket = True
        except ImportError:
            websocket = False
        if websocket:
            pywsgi.WSGIServer(('0.0.0.0', 9903), app,
                              handler_class=WebSocketHandler).serve_forever()
        else:
            pywsgi.WSGIServer(('0.0.0.0', 9903), app).serve_forever()
    #elif sio.async_mode == 'gevent_uwsgi':
    #    print('Start the application through the uwsgi server. Example:')
    #    print('uwsgi --http :9902 --gevent 1000 --http-websockets --master '
    #          '--wsgi-file app.py --callable app')
    #else:
        print('Unknown async_mode: ' + sio.async_mode)
